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
            endpoints: ['/api/contacts']
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, company, role, message } = req.body || {};

    // Log recruiter inquiry
    console.log('New Recruiter Inquiry:', {
        name,
        email,
        company,
        role,
        message,
        receivedAt: new Date().toISOString()
    });

    return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully! Thank you for reaching out.',
        timestamp: new Date().toISOString()
    });
}
