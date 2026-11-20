import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Storage File Path
const DATA_DIR = path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'backend-store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory Database State with Disk Persistence
let db = {
  inquiries: [
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
  ],
  telemetry: {
    pageViews: 375,
    uniqueVisitors: 192,
    resumeDownloads: 72,
    projectViews: 258,
    inquiriesCount: 11,
    lastVisitAt: new Date().toISOString()
  },
  portfolioOverrides: null,
  lastUpdated: new Date().toISOString()
};

// Load existing data from disk if present
if (fs.existsSync(STORE_FILE)) {
  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    db = { ...db, ...JSON.parse(raw) };
    console.log('Loaded backend state from', STORE_FILE);
  } catch (err) {
    console.warn('Failed to parse backend-store.json, using defaults', err);
  }
}

// Helper to persist to disk
function persistDatabase() {
  try {
    db.lastUpdated = new Date().toISOString();
    fs.writeFileSync(STORE_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Disk persistence warning (normal in read-only containers):', err.message);
  }
}

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'dist')));

// =========================================================================
// API ENDPOINTS (FULL CRUD BACKEND)
// =========================================================================

// 1. Health & Service Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Revathi Murugan Portfolio Fullstack API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    records: {
      inquiries: db.inquiries.length,
      pageViews: db.telemetry.pageViews,
      resumeDownloads: db.telemetry.resumeDownloads
    }
  });
});

// 2. Recruiter Contacts & Inquiries (GET, POST, PATCH, DELETE)
app.get('/api/contacts', (req, res) => {
  res.json({
    status: 'online',
    service: 'Revathi Murugan Portfolio Backend API',
    version: '2.0.0',
    endpoints: ['/api/contacts', '/api/portfolio', '/api/telemetry', '/api/auth/login'],
    inquiriesCount: db.inquiries.length,
    inquiries: db.inquiries,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contacts', (req, res) => {
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

  db.inquiries.unshift(record);
  db.telemetry.inquiriesCount += 1;
  persistDatabase();

  console.log('New Recruiter Inquiry Stored in Backend:', record);

  res.status(200).json({
    success: true,
    message: 'Inquiry received successfully! Thank you for reaching out.',
    leadId: record.id,
    timestamp: record.receivedAt
  });
});

app.patch('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};
  const index = db.inquiries.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  db.inquiries[index] = { ...db.inquiries[index], ...updates };
  persistDatabase();

  res.json({
    success: true,
    message: 'Inquiry updated successfully',
    lead: db.inquiries[index]
  });
});

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.inquiries = db.inquiries.filter(i => i.id !== id);
  persistDatabase();

  res.json({
    success: true,
    message: `Inquiry ${id} deleted successfully`
  });
});

// 3. Portfolio CRUD Data Sync (GET, POST, DELETE)
app.get('/api/portfolio', (req, res) => {
  res.json({
    success: true,
    data: db.portfolioOverrides,
    lastUpdated: db.lastUpdated
  });
});

app.post('/api/portfolio/sync', (req, res) => {
  const payload = req.body;
  if (!payload) {
    return res.status(400).json({ error: 'Missing portfolio payload' });
  }

  db.portfolioOverrides = {
    ...(db.portfolioOverrides || {}),
    ...payload
  };
  persistDatabase();

  res.json({
    success: true,
    message: 'Portfolio data synchronized with backend store successfully!',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/portfolio/reset', (req, res) => {
  db.portfolioOverrides = null;
  persistDatabase();
  res.json({
    success: true,
    message: 'Backend portfolio overrides reset to default dossier data.'
  });
});

// 4. Telemetry & Analytics Tracking
app.get('/api/telemetry', (req, res) => {
  res.json({
    success: true,
    telemetry: db.telemetry
  });
});

app.post('/api/telemetry/track', (req, res) => {
  const { event } = req.body || {};
  if (event === 'page_view') db.telemetry.pageViews += 1;
  if (event === 'resume_download') db.telemetry.resumeDownloads += 1;
  if (event === 'project_view') db.telemetry.projectViews += 1;
  if (event === 'inquiry') db.telemetry.inquiriesCount += 1;
  db.telemetry.lastVisitAt = new Date().toISOString();
  persistDatabase();

  res.json({ success: true, telemetry: db.telemetry });
});

// 5. Admin Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { identifier, password, pin } = req.body || {};
  const id = (identifier || '').trim().toLowerCase();
  const pwd = (password || '').trim();
  const p = (pin || '').trim();

  const isIdentifierMatch = id === 'admin' || id === 'admin@revathimurugan.com' || id === 'softonicreva@gmail.com';
  const isPwdMatch = pwd === 'admin' || pwd === 'admin123' || pwd === '2026';
  const isPinMatch = p === '2026';

  if ((isIdentifierMatch && isPwdMatch) || isPinMatch) {
    return res.json({
      success: true,
      token: 'jwt_backend_auth_' + Math.random().toString(36).substring(2) + Date.now(),
      user: {
        email: 'admin@revathimurugan.com',
        role: 'Super Administrator',
        name: 'Revathi Murugan'
      },
      message: 'Authentication successful'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid administrator credentials'
  });
});

// SPA Catch-All fallback to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Revathi Murugan Portfolio Fullstack Server running on port ${PORT}`);
});
