// Vercel Serverless Function: Recruiter Inquiries & Contact Operations
let inquiries = [
    {
        id: 'lead-1',
        name: 'Priya Sharma',
        email: 'priya.sharma@apexanalytics.com',
        company: 'Apex Analytics India',
        role: 'Junior Data Analyst',
        message: 'Hello Revathi, we reviewed your Power BI DAX library and SQL case studies. Your 83% distinction in MCA makes you an exceptional match for our Bangalore enterprise analytics team.',
        receivedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        status: 'new',
        starred: true,
        adminNotes: 'High priority lead. Screening call scheduled.',
        source: 'contact_form'
    },
    {
        id: 'lead-2',
        name: 'Karthik Ramanathan',
        email: 'karthik.r@nexustechnologies.io',
        company: 'Nexus Tech Global',
        role: 'Business Intelligence Analyst',
        message: 'We are expanding our BI team in Chennai. Impressed with your financial risk analysis project and data cleaning pipeline.',
        receivedAt: new Date(Date.now() - 3600000 * 22).toISOString(),
        status: 'interview_scheduled',
        starred: true,
        adminNotes: 'Technical round scheduled.',
        source: 'linkedin'
    }
];

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 1. GET: List all inquiries & server health
    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'online',
            service: 'Revathi Murugan Portfolio Serverless Backend',
            version: '2.0.0',
            endpoints: ['/api/contacts', '/api/portfolio'],
            inquiriesCount: inquiries.length,
            inquiries: inquiries,
            timestamp: new Date().toISOString()
        });
    }

    // 2. POST: Submit a new inquiry or lead
    if (req.method === 'POST') {
        const { name, email, company, role, message, source } = req.body || {};

        const record = {
            id: 'lead-' + Date.now(),
            name: name || 'Anonymous Recruiter',
            email: email || '',
            company: company || 'Not specified',
            role: role || 'Junior Data Analyst',
            message: message || '',
            status: 'new',
            starred: false,
            source: source || 'contact_form',
            receivedAt: new Date().toISOString()
        };

        inquiries.unshift(record);

        console.log('New Recruiter Inquiry Stored (Vercel Serverless):', record);

        return res.status(200).json({
            success: true,
            message: 'Inquiry received successfully! Thank you for reaching out.',
            leadId: record.id,
            timestamp: record.receivedAt
        });
    }

    // 3. PATCH: Update inquiry status / notes
    if (req.method === 'PATCH') {
        const { id, status, adminNotes, starred } = req.body || {};
        const index = inquiries.findIndex(i => i.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }

        if (status) inquiries[index].status = status;
        if (adminNotes !== undefined) inquiries[index].adminNotes = adminNotes;
        if (starred !== undefined) inquiries[index].starred = starred;

        return res.status(200).json({
            success: true,
            message: 'Inquiry updated successfully',
            lead: inquiries[index]
        });
    }

    // 4. DELETE: Remove inquiry
    if (req.method === 'DELETE') {
        const { id } = req.query || req.body || {};
        if (id) {
            inquiries = inquiries.filter(i => i.id !== id);
        }
        return res.status(200).json({
            success: true,
            message: `Inquiry ${id || ''} deleted successfully`,
            inquiriesCount: inquiries.length
        });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
