const inquiries = [];

export default async function handler(req, res) {
    // Enable CORS for testing
    res.setHeader('Access-Control-Allow-Credentials', true);
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

    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'online',
            service: 'Revathi Murugan Portfolio Backend API',
            version: '1.0.0',
            endpoints: ['/api/contacts'],
            inquiriesCount: inquiries.length,
            inquiries: inquiries
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, company, role, message } = req.body || {};

    const record = {
        id: 'lead-' + Date.now(),
        name: name || 'Anonymous',
        email: email || '',
        company: company || 'Not specified',
        role: role || 'Junior Data Analyst',
        message: message || '',
        status: 'new',
        receivedAt: new Date().toISOString()
    };

    inquiries.unshift(record);

    // Log recruiter inquiry
    console.log('New Recruiter Inquiry:', record);

    return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully! Thank you for reaching out.',
        leadId: record.id,
        timestamp: record.receivedAt
    });
}
