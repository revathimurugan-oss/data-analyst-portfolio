export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, company, role, message } = req.body;

    // Log or forward to an email API (e.g., Resend, Nodemailer)
    console.log('New Recruiter Inquiry:', { name, email, company, role, message });

    return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully!'
    });
}