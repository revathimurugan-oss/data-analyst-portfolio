import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Users, 
  BarChart3, 
  Settings, 
  Activity, 
  Download, 
  Trash2, 
  Mail, 
  RefreshCw, 
  X, 
  Check, 
  Search, 
  Filter, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  FileSpreadsheet,
  Globe,
  Clock
} from 'lucide-react';
import { 
  checkAdminAuth, 
  loginAdmin, 
  logoutAdmin, 
  getInquiries, 
  updateInquiryStatus, 
  deleteInquiry, 
  exportInquiriesToCSV,
  getTelemetry, 
  resetTelemetry,
  getPortfolioSettings, 
  updatePortfolioSettings,
  RecruiterInquiry,
  TelemetryStats,
  PortfolioSettings
} from '../utils/adminService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Tab Navigation: 'leads' | 'telemetry' | 'settings' | 'diagnostics'
  const [activeTab, setActiveTab] = useState<'leads' | 'telemetry' | 'settings' | 'diagnostics'>('leads');

  // Inquiries State
  const [inquiries, setInquiries] = useState<RecruiterInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'reviewed' | 'contacted'>('all');

  // Telemetry State
  const [telemetry, setTelemetry] = useState<TelemetryStats>(getTelemetry());

  // Settings State
  const [settings, setSettings] = useState<PortfolioSettings>(getPortfolioSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Diagnostics State
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [pingResult, setPingResult] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const auth = checkAdminAuth();
      setIsAuthenticated(auth);
      if (auth) {
        loadData();
      }
    }
  }, [isOpen]);

  const loadData = () => {
    setInquiries(getInquiries());
    setTelemetry(getTelemetry());
    setSettings(getPortfolioSettings());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pinInput)) {
      setIsAuthenticated(true);
      setLoginError('');
      setPinInput('');
      loadData();
    } else {
      setLoginError('Invalid PIN code. Try default PIN: 2026');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleStatusChange = (id: string, status: RecruiterInquiry['status']) => {
    const updated = updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recruiter inquiry?')) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
    }
  };

  const handleResetTelemetry = () => {
    if (window.confirm('Reset all visitor counters and analytics metrics to zero?')) {
      const reset = resetTelemetry();
      setTelemetry(reset);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePortfolioSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleTestApi = async () => {
    setPingStatus('testing');
    setPingResult('Testing /api/contacts endpoint...');
    try {
      const startTime = performance.now();
      const res = await fetch('/api/contacts', { method: 'GET' });
      const latency = Math.round(performance.now() - startTime);
      const data = await res.json();
      setPingStatus('success');
      setPingResult(`HTTP ${res.status} OK (${latency}ms)\n${JSON.stringify(data, null, 2)}`);
    } catch (err: any) {
      setPingStatus('error');
      setPingResult(`Connection notice: ${err.message || 'Server responded offline or endpoint is static'}`);
    }
  };

  if (!isOpen) return null;

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-sky-100 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-sky-50/70 border-b border-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-sm shadow-sky-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-navy-950 flex items-center gap-2">
                <span>Portfolio Admin Control Center</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                  {isAuthenticated ? 'Admin Active' : 'Restricted Access'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Revathi Murugan • Data Analyst Operations & Recruiter Leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAuthenticated ? (
            /* PIN Gate Login View */
            <div className="max-w-md mx-auto py-8 text-center">
              <div className="w-16 h-16 rounded-3xl bg-sky-50 border-2 border-sky-200 text-sky-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Lock className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-navy-950 mb-1">
                Enter Admin Access PIN
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                This management area allows viewing inbound recruiter inquiries, candidate telemetry, and setting live portfolio status.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter PIN (e.g. 2026)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    autoFocus
                    className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-2xl bg-sky-50/50 border border-sky-200 text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
                  />
                  {loginError && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 font-semibold mt-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{loginError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-400/30 transition-all"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Admin Portal</span>
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Default Access PIN: <strong className="text-sky-700">2026</strong></span>
                <span>Protected by Client & Server Session</span>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              
              {/* Tab Navigation Bar */}
              <div className="flex items-center gap-2 border-b border-sky-100 pb-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'leads'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Recruiter Inquiries ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'telemetry'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Visitor Telemetry</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'settings'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Candidate Controls</span>
                </button>

                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'diagnostics'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>API Diagnostics</span>
                </button>
              </div>

              {/* TAB 1: RECRUITER INQUIRIES */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  {/* Top Bar: Search, Filters, Export */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-sky-50/50 p-3 rounded-2xl border border-sky-100">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by recruiter name, company, role, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-sky-200 text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={statusFilter}
                        onChange={(e: any) => setStatusFilter(e.target.value)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-slate-700 font-medium focus:outline-none"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New Inquiries</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                      </select>

                      <button
                        onClick={exportInquiriesToCSV}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors"
                        title="Download Inquiries as CSV"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Leads List */}
                  {filteredInquiries.length === 0 ? (
                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-sky-200">
                      <Users className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                      <p className="text-sm font-bold text-navy-950">No inquiries found</p>
                      <p className="text-xs text-slate-500">Recruiter messages submitted via the Contact form appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredInquiries.map((lead) => (
                        <div 
                          key={lead.id}
                          className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs hover:border-sky-300 transition-all space-y-2.5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-navy-950">{lead.name}</span>
                                {lead.company && (
                                  <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200">
                                    {lead.company}
                                  </span>
                                )}
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  lead.status === 'new' 
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                    : lead.status === 'reviewed'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-sky-100 text-sky-800 border border-sky-200'
                                }`}>
                                  {lead.status}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                                <span>Role Target: <strong className="text-slate-700">{lead.role}</strong></span>
                                <span>•</span>
                                <span>{new Date(lead.receivedAt).toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 self-start sm:self-auto">
                              <select
                                value={lead.status}
                                onChange={(e: any) => handleStatusChange(lead.id, e.target.value)}
                                className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 focus:outline-none"
                              >
                                <option value="new">Mark New</option>
                                <option value="reviewed">Mark Reviewed</option>
                                <option value="contacted">Mark Contacted</option>
                              </select>

                              <a
                                href={`mailto:${lead.email}?subject=Regarding ${lead.role} Opportunity - Revathi Murugan&body=Dear ${lead.name},%0D%0A%0D%0AThank you for reaching out through my portfolio website regarding the ${lead.role} opportunity at ${lead.company}.`}
                                className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                                title="Reply via Email"
                              >
                                <Mail className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs text-slate-600 bg-sky-50/40 p-3 rounded-xl border border-sky-100/80 leading-relaxed">
                            "{lead.message}"
                          </div>

                          <div className="text-[11px] text-slate-500 font-medium">
                            Direct Email: <a href={`mailto:${lead.email}`} className="text-sky-600 hover:underline">{lead.email}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: VISITOR TELEMETRY */}
              {activeTab === 'telemetry' && (
                <div className="space-y-6">
                  {/* KPI Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Total Page Visits</div>
                      <div className="text-2xl font-black text-navy-950">{telemetry.pageViews}</div>
                      <div className="text-[10px] text-sky-600 font-semibold mt-1">Portfolio Sessions</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Resume Downloads</div>
                      <div className="text-2xl font-black text-navy-950">{telemetry.resumeDownloads}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                        {telemetry.pageViews > 0 ? ((telemetry.resumeDownloads / telemetry.pageViews) * 100).toFixed(1) : 0}% of visitors
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Projects Explored</div>
                      <div className="text-2xl font-black text-navy-950">{telemetry.projectViews}</div>
                      <div className="text-[10px] text-sky-600 font-semibold mt-1">Code & Data Modals</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Recruiter Inquiries</div>
                      <div className="text-2xl font-black text-navy-950">{inquiries.length}</div>
                      <div className="text-[10px] text-purple-600 font-semibold mt-1">High-intent leads</div>
                    </div>
                  </div>

                  {/* Analytical Telemetry Summary */}
                  <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-sky-500" />
                        <span>Recruiter Conversion Funnel</span>
                      </div>
                      <button
                        onClick={handleResetTelemetry}
                        className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
                      >
                        Reset Counters
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700 font-semibold">
                          <span>Portfolio Views → Resume PDF Downloads</span>
                          <span>{telemetry.pageViews > 0 ? ((telemetry.resumeDownloads / telemetry.pageViews) * 100).toFixed(1) : 0}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-sky-100 overflow-hidden">
                          <div 
                            className="h-full bg-sky-500 rounded-full" 
                            style={{ width: `${Math.min(100, telemetry.pageViews > 0 ? (telemetry.resumeDownloads / telemetry.pageViews) * 100 : 0)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-slate-700 font-semibold">
                          <span>Portfolio Views → Recruiter Inquiries</span>
                          <span>{telemetry.pageViews > 0 ? ((inquiries.length / telemetry.pageViews) * 100).toFixed(1) : 0}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-sky-100 overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${Math.min(100, telemetry.pageViews > 0 ? (inquiries.length / telemetry.pageViews) * 100 : 0)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CANDIDATE SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-4 bg-sky-50/40 p-5 rounded-2xl border border-sky-100">
                  <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-navy-950">
                      Live Candidate Availability Status
                    </div>
                    {settingsSaved && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Settings Saved!</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Current Employment Seeking Status
                      </label>
                      <input
                        type="text"
                        value={settings.availabilityStatus}
                        onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-navy-950 focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Notice Period
                      </label>
                      <input
                        type="text"
                        value={settings.noticePeriod}
                        onChange={(e) => setSettings({ ...settings, noticePeriod: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-navy-950 focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Preferred Work Locations
                      </label>
                      <input
                        type="text"
                        value={settings.targetLocations}
                        onChange={(e) => setSettings({ ...settings, targetLocations: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-navy-950 focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.openToRelocate}
                          onChange={(e) => setSettings({ ...settings, openToRelocate: e.target.checked })}
                          className="w-4 h-4 text-sky-600 rounded border-sky-300 focus:ring-sky-400"
                        />
                        <span className="font-semibold text-slate-700">Open to Relocation</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.highlightBiCockpit}
                          onChange={(e) => setSettings({ ...settings, highlightBiCockpit: e.target.checked })}
                          className="w-4 h-4 text-sky-600 rounded border-sky-300 focus:ring-sky-400"
                        />
                        <span className="font-semibold text-slate-700">Highlight Live BI Cockpit</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Save Status Updates
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: API DIAGNOSTICS */}
              {activeTab === 'diagnostics' && (
                <div className="space-y-4 bg-white p-5 rounded-2xl border border-sky-100 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-navy-950">
                        Live Cloud Backend Diagnostics
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tests the active `/api/contacts` serverless route and Express instance.
                      </p>
                    </div>

                    <button
                      onClick={handleTestApi}
                      disabled={pingStatus === 'testing'}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${pingStatus === 'testing' ? 'animate-spin' : ''}`} />
                      <span>{pingStatus === 'testing' ? 'Testing...' : 'Ping /api/contacts'}</span>
                    </button>
                  </div>

                  {pingResult && (
                    <div className="p-4 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto whitespace-pre">
                      {pingResult}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-2">
                    <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                      <div className="font-bold text-navy-950 mb-1">Vercel Serverless Integration</div>
                      <p className="text-[11px]">Handler located at <code className="text-sky-700 font-bold">api/contacts.js</code> responding to POST inquiries and GET health probes.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                      <div className="font-bold text-navy-950 mb-1">Render Web Service Integration</div>
                      <p className="text-[11px]">Powered by <code className="text-sky-700 font-bold">server.js</code> on port <code className="text-sky-700 font-bold">process.env.PORT</code> serving fullstack bundle.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-sky-50/50 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-sky-500" />
            <span>Revathi Murugan Analytics Platform</span>
          </div>
          <div>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-sky-200 text-[10px] font-mono text-slate-700">ESC</kbd> to exit</span>
          </div>
        </div>

      </div>
    </div>
  );
};
