import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store for recruiter inquiries
const inquiries = [];

// Body parser
app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api/contacts', (req, res) => {
  res.json({
    status: 'online',
    service: 'Revathi Murugan Portfolio Backend API',
    version: '1.0.0',
    endpoints: ['/api/contacts'],
    inquiriesCount: inquiries.length,
    inquiries: inquiries,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contacts', (req, res) => {
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

  console.log('New Recruiter Inquiry Stored:', record);

  res.status(200).json({
    success: true,
    message: 'Inquiry received successfully! Thank you for reaching out.',
    leadId: record.id,
    timestamp: record.receivedAt
  });
});

// SPA Catch-All fallback to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server is running on port ${PORT}`);
});
