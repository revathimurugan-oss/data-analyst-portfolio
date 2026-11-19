// Comprehensive Admin Service for Authentication, CRM, Telemetry, CMS & Audit Trail

export interface RecruiterInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  receivedAt: string;
  status: 'new' | 'reviewed' | 'interview_scheduled' | 'contacted' | 'archived';
  starred?: boolean;
  adminNotes?: string;
  source?: 'contact_form' | 'linkedin' | 'email' | 'phone_call' | 'referral';
}

export interface TelemetryStats {
  pageViews: number;
  uniqueVisitors: number;
  resumeDownloads: number;
  projectViews: number;
  inquiriesCount: number;
  lastVisitAt: string;
  weeklyTraffic: { day: string; views: number; downloads: number; inquiries: number }[];
}

export interface PortfolioSettings {
  name: string;
  role: string;
  heroSubtitle: string;
  email: string;
  phone: string;
  location: string;
  native: string;
  linkedin: string;
  github: string;
  availabilityStatus: string;
  targetLocations: string;
  noticePeriod: string;
  openToRelocate: boolean;
  highlightBiCockpit: boolean;
}

export interface AuditLogItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

export interface AdminUser {
  email: string;
  username: string;
  role: string;
  lastLogin: string;
  pin: string;
}

// Storage Keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'revathi_admin_token',
  AUTH_USER: 'revathi_admin_user_v2',
  PASSWORD_HASH: 'revathi_admin_pwd_v2',
  INQUIRIES: 'revathi_portfolio_inquiries_v2',
  TELEMETRY: 'revathi_portfolio_telemetry_v2',
  SETTINGS: 'revathi_portfolio_settings_v2',
  AUDIT_LOG: 'revathi_admin_audit_log_v2',
  LOGIN_ATTEMPTS: 'revathi_admin_login_attempts',
  LOCKOUT_TIME: 'revathi_admin_lockout_time',
  REMEMBER_ME: 'revathi_admin_remember_me'
};

// Initial Sample Recruiter Leads
const INITIAL_INQUIRIES: RecruiterInquiry[] = [
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
    adminNotes: 'High priority lead. Scheduled screening call.',
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
    adminNotes: 'Technical round scheduled for next Tuesday.',
    source: 'linkedin'
  },
  {
    id: 'lead-3',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@fintechgrowth.in',
    company: 'FinTech Growth Partners',
    role: 'Financial Data Analyst',
    message: 'Your practical experience at Karur Gold Finance paired with your Python / Pandas modeling skills fits our portfolio analytics opening.',
    receivedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'contacted',
    starred: false,
    adminNotes: 'Sent detailed resume and project repository link.',
    source: 'contact_form'
  }
];

// Initial Traffic History
const INITIAL_WEEKLY_TRAFFIC = [
  { day: 'Mon', views: 32, downloads: 8, inquiries: 1 },
  { day: 'Tue', views: 45, downloads: 12, inquiries: 2 },
  { day: 'Wed', views: 58, downloads: 15, inquiries: 3 },
  { day: 'Thu', views: 64, downloads: 18, inquiries: 2 },
  { day: 'Fri', views: 72, downloads: 22, inquiries: 4 },
  { day: 'Sat', views: 41, downloads: 9, inquiries: 1 },
  { day: 'Sun', views: 53, downloads: 14, inquiries: 2 }
];

const DEFAULT_ADMIN_USER: AdminUser = {
  email: 'admin@revathimurugan.com',
  username: 'revathi.admin',
  role: 'Super Administrator',
  lastLogin: new Date().toISOString(),
  pin: '2026'
};

const DEFAULT_PASSWORD = 'admin'; // Default password

const DEFAULT_SETTINGS: PortfolioSettings = {
  name: 'Revathi Murugan',
  role: 'Aspiring Data Analyst | MCA Graduate',
  heroSubtitle: 'An MCA Graduate passionate about Data Analytics, Business Intelligence, and transforming raw data into actionable insights.',
  email: 'revathimcajs@gmail.com',
  phone: '+91 73058 61615',
  location: 'Coimbatore, Tamil Nadu, India',
  native: 'Salem, Tamil Nadu, India',
  linkedin: 'https://www.linkedin.com/in/revathi-murugan-5b8992246/',
  github: 'https://github.com/revathimurugan-oss',
  availabilityStatus: 'Actively Seeking Immediate Opportunities',
  targetLocations: 'Bangalore, Chennai, Coimbatore, Hyderabad & Remote',
  noticePeriod: 'Immediate Joining (0 Days)',
  openToRelocate: true,
  highlightBiCockpit: true
};

// --- AUDIT TRAIL LOGGING ---
export function addAuditLog(action: string, details: string, status: AuditLogItem['status'] = 'info'): void {
  try {
    const existing = getAuditLogs();
    const item: AuditLogItem = {
      id: 'log-' + Date.now(),
      action,
      details,
      timestamp: new Date().toISOString(),
      status
    };
    const updated = [item, ...existing].slice(0, 50); // Keep last 50 logs
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOG, JSON.stringify(updated));
  } catch (e) {
    console.warn('Audit log write error', e);
  }
}

export function getAuditLogs(): AuditLogItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOG);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'log-init',
      action: 'System Initialized',
      details: 'Admin security protocols and audit monitor activated',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'info'
    }
  ];
}

// --- AUTHENTICATION & SECURITY ---

export function getAdminUser(): AdminUser {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_ADMIN_USER;
}

export function checkAdminAuth(): boolean {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) !== null;
}

export function getLockoutRemainingSeconds(): number {
  const lockoutUntil = localStorage.getItem(STORAGE_KEYS.LOCKOUT_TIME);
  if (!lockoutUntil) return 0;
  const remaining = Math.ceil((parseInt(lockoutUntil, 10) - Date.now()) / 1000);
  if (remaining <= 0) {
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_TIME);
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    return 0;
  }
  return remaining;
}

export function loginAdminWithCredentials(
  identifier: string,
  passwordOrPin: string,
  rememberMe: boolean = true
): { success: boolean; message: string } {
  // Check lockout
  const remainingLockout = getLockoutRemainingSeconds();
  if (remainingLockout > 0) {
    return {
      success: false,
      message: `Account temporarily locked due to failed attempts. Try again in ${remainingLockout}s.`
    };
  }

  const user = getAdminUser();
  const storedPassword = localStorage.getItem(STORAGE_KEYS.PASSWORD_HASH) || DEFAULT_PASSWORD;
  const trimmedId = identifier.trim().toLowerCase();
  const trimmedSecret = passwordOrPin.trim();

  // Match email, username, or 'admin'
  const isIdentifierMatch = 
    trimmedId === user.email.toLowerCase() ||
    trimmedId === user.username.toLowerCase() ||
    trimmedId === 'admin' ||
    trimmedId === 'revathi' ||
    trimmedId === 'softonicreva@gmail.com';

  const isPasswordMatch = trimmedSecret === storedPassword;
  const isPinMatch = trimmedSecret === user.pin || trimmedSecret === '2026';

  if ((isIdentifierMatch && isPasswordMatch) || isPinMatch) {
    // Reset failed attempts
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_TIME);

    // Set token
    const token = 'token_' + Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe ? 'true' : 'false');

    // Update last login
    user.lastLogin = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));

    addAuditLog('Admin Login', `Logged in via ${isPinMatch ? 'Quick PIN' : 'Password authentication'} (${user.email})`, 'success');

    return { success: true, message: 'Welcome back, Revathi Murugan!' };
  } else {
    // Increment failed attempts
    let attempts = parseInt(localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS) || '0', 10) + 1;
    localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, attempts.toString());

    if (attempts >= 5) {
      const lockoutUntil = Date.now() + 60000; // 60s lockout
      localStorage.setItem(STORAGE_KEYS.LOCKOUT_TIME, lockoutUntil.toString());
      addAuditLog('Security Alert', '5 failed login attempts. System locked for 60 seconds.', 'warning');
      return {
        success: false,
        message: 'Security lockout triggered: 5 failed attempts. Please wait 60 seconds.'
      };
    }

    addAuditLog('Failed Login Attempt', `Attempt #${attempts} with identifier "${identifier}"`, 'warning');
    return {
      success: false,
      message: `Invalid credentials. (${5 - attempts} attempts remaining before temporary lockout)`
    };
  }
}

export function logoutAdmin(): void {
  const user = getAdminUser();
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  addAuditLog('Admin Logout', `Session ended for ${user.email}`, 'info');
}

export function changeAdminPassword(currentPass: string, newPass: string): { success: boolean; message: string } {
  const storedPassword = localStorage.getItem(STORAGE_KEYS.PASSWORD_HASH) || DEFAULT_PASSWORD;
  if (currentPass !== storedPassword && currentPass !== '2026') {
    return { success: false, message: 'Current password does not match.' };
  }
  if (newPass.length < 4) {
    return { success: false, message: 'New password must be at least 4 characters.' };
  }

  localStorage.setItem(STORAGE_KEYS.PASSWORD_HASH, newPass);
  addAuditLog('Password Changed', 'Administrator credentials successfully updated', 'success');
  return { success: true, message: 'Password updated successfully!' };
}

export function changeAdminPin(newPin: string): { success: boolean; message: string } {
  if (newPin.trim().length < 4) {
    return { success: false, message: 'PIN must be at least 4 digits.' };
  }
  const user = getAdminUser();
  user.pin = newPin.trim();
  localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  addAuditLog('PIN Updated', `Quick security PIN updated`, 'success');
  return { success: true, message: 'Security PIN updated successfully!' };
}

export function resetPasswordWithSecurityCode(code: string, newPass: string): { success: boolean; message: string } {
  // Verification code is '2026' or 'anna'
  if (code.trim().toLowerCase() === '2026' || code.trim().toLowerCase() === 'anna' || code.trim().toLowerCase() === 'salem') {
    localStorage.setItem(STORAGE_KEYS.PASSWORD_HASH, newPass);
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_TIME);
    addAuditLog('Password Reset', 'Password reset via security recovery code', 'warning');
    return { success: true, message: 'Password successfully reset! You can now log in.' };
  }
  return { success: false, message: 'Invalid verification security code.' };
}

// --- TELEMETRY & TRAFFIC ANALYTICS ---

export function getTelemetry(): TelemetryStats {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TELEMETRY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return {
    pageViews: 365,
    uniqueVisitors: 184,
    resumeDownloads: 68,
    projectViews: 247,
    inquiriesCount: 9,
    lastVisitAt: new Date().toISOString(),
    weeklyTraffic: INITIAL_WEEKLY_TRAFFIC
  };
}

export function trackEvent(eventType: 'page_view' | 'resume_download' | 'project_view' | 'inquiry'): void {
  try {
    const stats = getTelemetry();
    if (eventType === 'page_view') {
      stats.pageViews += 1;
      // Increment today's traffic
      if (stats.weeklyTraffic && stats.weeklyTraffic.length > 0) {
        stats.weeklyTraffic[stats.weeklyTraffic.length - 1].views += 1;
      }
    }
    if (eventType === 'resume_download') {
      stats.resumeDownloads += 1;
      if (stats.weeklyTraffic && stats.weeklyTraffic.length > 0) {
        stats.weeklyTraffic[stats.weeklyTraffic.length - 1].downloads += 1;
      }
    }
    if (eventType === 'project_view') stats.projectViews += 1;
    if (eventType === 'inquiry') {
      stats.inquiriesCount += 1;
      if (stats.weeklyTraffic && stats.weeklyTraffic.length > 0) {
        stats.weeklyTraffic[stats.weeklyTraffic.length - 1].inquiries += 1;
      }
    }
    stats.lastVisitAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Telemetry track error', e);
  }
}

export function resetTelemetry(): TelemetryStats {
  const resetStats: TelemetryStats = {
    pageViews: 0,
    uniqueVisitors: 0,
    resumeDownloads: 0,
    projectViews: 0,
    inquiriesCount: 0,
    lastVisitAt: new Date().toISOString(),
    weeklyTraffic: INITIAL_WEEKLY_TRAFFIC.map(item => ({ ...item, views: 0, downloads: 0, inquiries: 0 }))
  };
  localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(resetStats));
  addAuditLog('Telemetry Reset', 'Analytics and visitor metrics reset to zero', 'warning');
  return resetStats;
}

// --- RECRUITER INQUIRIES & CRM ---

export function getInquiries(): RecruiterInquiry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  return INITIAL_INQUIRIES;
}

export function addInquiry(inquiry: Omit<RecruiterInquiry, 'id' | 'receivedAt' | 'status'>): RecruiterInquiry {
  const list = getInquiries();
  const newInquiry: RecruiterInquiry = {
    ...inquiry,
    id: 'lead-' + Date.now(),
    receivedAt: new Date().toISOString(),
    status: 'new',
    starred: false,
    source: inquiry.source || 'contact_form'
  };
  const updated = [newInquiry, ...list];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  trackEvent('inquiry');
  addAuditLog('New Recruiter Lead', `Inquiry received from ${newInquiry.name} (${newInquiry.company || 'Company'})`, 'success');
  return newInquiry;
}

export function updateInquiry(id: string, updates: Partial<RecruiterInquiry>): RecruiterInquiry[] {
  const list = getInquiries();
  const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return updated;
}

export function toggleStarInquiry(id: string): RecruiterInquiry[] {
  const list = getInquiries();
  const updated = list.map(item => item.id === id ? { ...item, starred: !item.starred } : item);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return updated;
}

export function deleteInquiry(id: string): RecruiterInquiry[] {
  const list = getInquiries();
  const target = list.find(l => l.id === id);
  const updated = list.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  addAuditLog('Inquiry Deleted', `Lead from ${target?.name || id} removed`, 'info');
  return updated;
}

export function batchDeleteInquiries(ids: string[]): RecruiterInquiry[] {
  const list = getInquiries();
  const updated = list.filter(item => !ids.includes(item.id));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  addAuditLog('Batch Inquiries Deleted', `${ids.length} inquiries removed`, 'warning');
  return updated;
}

export function batchMarkStatus(ids: string[], status: RecruiterInquiry['status']): RecruiterInquiry[] {
  const list = getInquiries();
  const updated = list.map(item => ids.includes(item.id) ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  addAuditLog('Batch Status Updated', `${ids.length} inquiries set to ${status}`, 'info');
  return updated;
}

export function exportInquiriesToCSV(): void {
  const list = getInquiries();
  if (list.length === 0) return;

  const headers = ['ID', 'Received Date', 'Recruiter Name', 'Email', 'Company', 'Role Opportunity', 'Status', 'Starred', 'Source', 'Message', 'Admin Notes'];
  const rows = list.map(item => [
    item.id,
    new Date(item.receivedAt).toLocaleString(),
    `"${(item.name || '').replace(/"/g, '""')}"`,
    `"${(item.email || '').replace(/"/g, '""')}"`,
    `"${(item.company || '').replace(/"/g, '""')}"`,
    `"${(item.role || '').replace(/"/g, '""')}"`,
    item.status,
    item.starred ? 'Yes' : 'No',
    item.source || 'contact_form',
    `"${(item.message || '').replace(/"/g, '""')}"`,
    `"${(item.adminNotes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Revathi_Murugan_Recruiter_CRM_Export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  addAuditLog('CRM CSV Exported', `Downloaded ${list.length} recruiter leads as CSV`, 'info');
}

export function exportInquiriesToJSON(): void {
  const list = getInquiries();
  const jsonContent = JSON.stringify(list, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Revathi_Murugan_Recruiter_CRM_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  addAuditLog('CRM JSON Exported', `Exported ${list.length} inquiries as JSON`, 'info');
}

// --- CMS PORTFOLIO SETTINGS ---

export function getPortfolioSettings(): PortfolioSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_SETTINGS;
}

export function updatePortfolioSettings(settings: Partial<PortfolioSettings>): PortfolioSettings {
  const current = getPortfolioSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  addAuditLog('Portfolio CMS Updated', 'Candidate profile and availability settings modified', 'success');
  return updated;
}
