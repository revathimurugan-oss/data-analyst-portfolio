// Admin Service for Recruiter Leads, Telemetry & Portfolio Controls

export interface RecruiterInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  receivedAt: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface TelemetryStats {
  pageViews: number;
  resumeDownloads: number;
  projectViews: number;
  inquiriesCount: number;
  lastVisitAt: string;
}

export interface PortfolioSettings {
  availabilityStatus: string;
  targetLocations: string;
  noticePeriod: string;
  openToRelocate: boolean;
  highlightBiCockpit: boolean;
}

const INQUIRIES_STORAGE_KEY = 'revathi_portfolio_inquiries_v1';
const TELEMETRY_STORAGE_KEY = 'revathi_portfolio_telemetry_v1';
const SETTINGS_STORAGE_KEY = 'revathi_portfolio_settings_v1';
const AUTH_KEY = 'revathi_portfolio_admin_auth';

// Initial sample inquiries for demonstration
const INITIAL_INQUIRIES: RecruiterInquiry[] = [
  {
    id: 'lead-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@analyticsfirm.com',
    company: 'Apex Analytics India',
    role: 'Junior Data Analyst',
    message: 'Hello Revathi, impressed by your Power BI DAX library and SQL case studies. We have an open analyst position in Bangalore.',
    receivedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'new'
  },
  {
    id: 'lead-2',
    name: 'Karthik Raman',
    email: 'karthik.r@techsolutions.io',
    company: 'Nexus Tech Global',
    role: 'Business Intelligence Analyst',
    message: 'We are expanding our BI operations team in Chennai. Your 83% distinction in MCA and hands-on data cleaning pipeline align well with our stack.',
    receivedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'reviewed'
  }
];

const DEFAULT_SETTINGS: PortfolioSettings = {
  availabilityStatus: 'Actively Seeking Immediate Opportunities',
  targetLocations: 'Bangalore, Chennai, Coimbatore, Hyderabad & Remote',
  noticePeriod: 'Immediate Joining (0 Days)',
  openToRelocate: true,
  highlightBiCockpit: true
};

// --- AUTHENTICATION ---
export function checkAdminAuth(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'authenticated';
}

export function loginAdmin(pinOrPassword: string): boolean {
  const normalized = pinOrPassword.trim().toLowerCase();
  // Accepts standard default PIN 2026 or admin123
  if (normalized === '2026' || normalized === 'admin' || normalized === 'admin123') {
    localStorage.setItem(AUTH_KEY, 'authenticated');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(AUTH_KEY);
}

// --- TELEMETRY ---
export function getTelemetry(): TelemetryStats {
  try {
    const data = localStorage.getItem(TELEMETRY_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return {
    pageViews: 142,
    resumeDownloads: 38,
    projectViews: 215,
    inquiriesCount: 6,
    lastVisitAt: new Date().toISOString()
  };
}

export function trackEvent(eventType: 'page_view' | 'resume_download' | 'project_view' | 'inquiry'): void {
  try {
    const stats = getTelemetry();
    if (eventType === 'page_view') stats.pageViews += 1;
    if (eventType === 'resume_download') stats.resumeDownloads += 1;
    if (eventType === 'project_view') stats.projectViews += 1;
    if (eventType === 'inquiry') stats.inquiriesCount += 1;
    stats.lastVisitAt = new Date().toISOString();
    localStorage.setItem(TELEMETRY_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Telemetry write error', e);
  }
}

export function resetTelemetry(): TelemetryStats {
  const resetStats: TelemetryStats = {
    pageViews: 0,
    resumeDownloads: 0,
    projectViews: 0,
    inquiriesCount: 0,
    lastVisitAt: new Date().toISOString()
  };
  localStorage.setItem(TELEMETRY_STORAGE_KEY, JSON.stringify(resetStats));
  return resetStats;
}

// --- INQUIRIES ---
export function getInquiries(): RecruiterInquiry[] {
  try {
    const data = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }
  // Initialize with initial samples if empty
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
  return INITIAL_INQUIRIES;
}

export function addInquiry(inquiry: Omit<RecruiterInquiry, 'id' | 'receivedAt' | 'status'>): RecruiterInquiry {
  const list = getInquiries();
  const newInquiry: RecruiterInquiry = {
    ...inquiry,
    id: 'lead-' + Date.now(),
    receivedAt: new Date().toISOString(),
    status: 'new'
  };
  const updated = [newInquiry, ...list];
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  trackEvent('inquiry');
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: RecruiterInquiry['status']): RecruiterInquiry[] {
  const list = getInquiries();
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteInquiry(id: string): RecruiterInquiry[] {
  const list = getInquiries();
  const updated = list.filter(item => item.id !== id);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearAllInquiries(): void {
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([]));
}

// Export inquiries to CSV (Data Analyst feature)
export function exportInquiriesToCSV(): void {
  const list = getInquiries();
  if (list.length === 0) return;

  const headers = ['ID', 'Date Received', 'Sender Name', 'Email', 'Company', 'Role Opportunity', 'Status', 'Message'];
  const rows = list.map(item => [
    item.id,
    new Date(item.receivedAt).toLocaleString(),
    `"${(item.name || '').replace(/"/g, '""')}"`,
    `"${(item.email || '').replace(/"/g, '""')}"`,
    `"${(item.company || '').replace(/"/g, '""')}"`,
    `"${(item.role || '').replace(/"/g, '""')}"`,
    item.status,
    `"${(item.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Revathi_Murugan_Recruiter_Leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- PORTFOLIO SETTINGS ---
export function getPortfolioSettings(): PortfolioSettings {
  try {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_SETTINGS;
}

export function updatePortfolioSettings(settings: Partial<PortfolioSettings>): PortfolioSettings {
  const current = getPortfolioSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
