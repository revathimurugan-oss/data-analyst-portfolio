// Vercel Serverless Function: Portfolio CRUD Synchronization
let portfolioOverrides = null;

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

    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            service: 'Revathi Murugan Portfolio Serverless Sync',
            data: portfolioOverrides,
            timestamp: new Date().toISOString()
        });
    }

    if (req.method === 'POST') {
        const { action, payload } = req.body || {};

        if (action === 'reset') {
            portfolioOverrides = null;
            return res.status(200).json({
                success: true,
                message: 'Backend portfolio reset to default Anna University dossier data.'
            });
        }

        portfolioOverrides = {
            ...(portfolioOverrides || {}),
            ...(payload || req.body)
        };

        return res.status(200).json({
            success: true,
            message: 'Portfolio data synchronized with cloud serverless store!',
            timestamp: new Date().toISOString()
        });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
