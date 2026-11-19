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
  EyeOff,
  CheckCircle2, 
  FileSpreadsheet,
  Globe,
  Clock,
  KeyRound,
  Maximize2,
  Minimize2,
  Star,
  PlusCircle,
  FileText,
  ShieldAlert,
  Sliders,
  History,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { 
  checkAdminAuth, 
  loginAdminWithCredentials, 
  logoutAdmin, 
  getAdminUser,
  getLockoutRemainingSeconds,
  changeAdminPassword,
  changeAdminPin,
  resetPasswordWithSecurityCode,
  getInquiries, 
  addInquiry,
  updateInquiry,
  toggleStarInquiry,
  deleteInquiry, 
  batchDeleteInquiries,
  batchMarkStatus,
  exportInquiriesToCSV,
  exportInquiriesToJSON,
  getTelemetry, 
  resetTelemetry,
  getPortfolioSettings, 
  updatePortfolioSettings,
  getAuditLogs,
  RecruiterInquiry,
  TelemetryStats,
  PortfolioSettings,
  AuditLogItem
} from '../utils/adminService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  // Authentication & Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'pin'>('password');
  const [identifierInput, setIdentifierInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Password Recovery State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newRecoveryPass, setNewRecoveryPass] = useState('');
  const [recoveryMsg, setRecoveryMsg] = useState({ text: '', isError: false });

  // Fullscreen View Mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Tab Navigation: 'leads' | 'telemetry' | 'cms' | 'security' | 'diagnostics'
  const [activeTab, setActiveTab] = useState<'leads' | 'telemetry' | 'cms' | 'security' | 'diagnostics'>('leads');

  // Leads CRM State
  const [inquiries, setInquiries] = useState<RecruiterInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Junior Data Analyst',
    source: 'linkedin' as RecruiterInquiry['source'],
    message: ''
  });

  // Telemetry State
  const [telemetry, setTelemetry] = useState<TelemetryStats>(getTelemetry());

  // CMS Settings State
  const [cmsSettings, setCmsSettings] = useState<PortfolioSettings>(getPortfolioSettings());
  const [cmsSavedToast, setCmsSavedToast] = useState(false);

  // Security Credentials State
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passChangeStatus, setPassChangeStatus] = useState({ text: '', isError: false });
  const [newPinField, setNewPinField] = useState('');
  const [pinChangeStatus, setPinChangeStatus] = useState({ text: '', isError: false });
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  // Diagnostics State
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [pingResult, setPingResult] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const auth = checkAdminAuth();
      setIsAuthenticated(auth);
      setLockoutRemaining(getLockoutRemainingSeconds());
      if (auth) {
        refreshDashboardData();
      }
    }
  }, [isOpen]);

  // Lockout timer ticker
  useEffect(() => {
    if (lockoutRemaining > 0) {
      const timer = setTimeout(() => {
        setLockoutRemaining(getLockoutRemainingSeconds());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutRemaining]);

  const refreshDashboardData = () => {
    setInquiries(getInquiries());
    setTelemetry(getTelemetry());
    setCmsSettings(getPortfolioSettings());
    setAuditLogs(getAuditLogs());
  };

  // Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginMethod === 'password') {
      if (!identifierInput || !passwordInput) {
        setLoginError('Please enter both identifier and password.');
        return;
      }
      const res = loginAdminWithCredentials(identifierInput, passwordInput, rememberMe);
      if (res.success) {
        setIsAuthenticated(true);
        refreshDashboardData();
      } else {
        setLoginError(res.message);
        setLockoutRemaining(getLockoutRemainingSeconds());
      }
    } else {
      // PIN Mode
      if (!pinInput) {
        setLoginError('Please enter your 4-digit security PIN.');
        return;
      }
      const res = loginAdminWithCredentials('admin', pinInput, rememberMe);
      if (res.success) {
        setIsAuthenticated(true);
        refreshDashboardData();
      } else {
        setLoginError(res.message);
        setLockoutRemaining(getLockoutRemainingSeconds());
      }
    }
  };

  // Demo Credentials Autofill
  const handleAutofillDemo = () => {
    setLoginMethod('password');
    setIdentifierInput('admin@revathimurugan.com');
    setPasswordInput('admin');
    setLoginError('');
  };

  // Logout Handler
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setIdentifierInput('');
    setPasswordInput('');
    setPinInput('');
  };

  // Password Recovery Handler
  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = resetPasswordWithSecurityCode(recoveryCode, newRecoveryPass);
    if (res.success) {
      setRecoveryMsg({ text: res.message, isError: false });
      setTimeout(() => {
        setShowForgotPassword(false);
        setRecoveryCode('');
        setNewRecoveryPass('');
        setRecoveryMsg({ text: '', isError: false });
      }, 2000);
    } else {
      setRecoveryMsg({ text: res.message, isError: true });
    }
  };

  // CRM Lead Handlers
  const handleStatusUpdate = (id: string, status: RecruiterInquiry['status']) => {
    const updated = updateInquiry(id, { status });
    setInquiries(updated);
  };

  const handleToggleStar = (id: string) => {
    const updated = toggleStarInquiry(id);
    setInquiries(updated);
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to remove this recruiter lead?')) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
      setSelectedLeadIds(selectedLeadIds.filter(i => i !== id));
    }
  };

  const handleNotesUpdate = (id: string, adminNotes: string) => {
    const updated = updateInquiry(id, { adminNotes });
    setInquiries(updated);
  };

  const handleBatchDelete = () => {
    if (selectedLeadIds.length === 0) return;
    if (window.confirm(`Delete ${selectedLeadIds.length} selected inquiries?`)) {
      const updated = batchDeleteInquiries(selectedLeadIds);
      setInquiries(updated);
      setSelectedLeadIds([]);
    }
  };

  const handleBatchStatus = (status: RecruiterInquiry['status']) => {
    if (selectedLeadIds.length === 0) return;
    const updated = batchMarkStatus(selectedLeadIds, status);
    setInquiries(updated);
    setSelectedLeadIds([]);
  };

  const handleSelectAllLeads = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredInquiries.map(i => i.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) return;
    addInquiry({
      name: newLeadForm.name,
      email: newLeadForm.email,
      company: newLeadForm.company,
      role: newLeadForm.role,
      message: newLeadForm.message || 'Direct lead captured by administrator.',
      source: newLeadForm.source
    });
    setInquiries(getInquiries());
    setShowAddLeadModal(false);
    setNewLeadForm({
      name: '',
      email: '',
      company: '',
      role: 'Junior Data Analyst',
      source: 'linkedin',
      message: ''
    });
  };

  // CMS Settings Handlers
  const handleSaveCmsSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePortfolioSettings(cmsSettings);
    setCmsSavedToast(true);
    setTimeout(() => setCmsSavedToast(false), 2500);
  };

  // Security Credentials Handlers
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setPassChangeStatus({ text: 'New passwords do not match.', isError: true });
      return;
    }
    const res = changeAdminPassword(currPass, newPass);
    setPassChangeStatus({ text: res.message, isError: !res.success });
    if (res.success) {
      setCurrPass('');
      setNewPass('');
      setConfirmPass('');
      setAuditLogs(getAuditLogs());
    }
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = changeAdminPin(newPinField);
    setPinChangeStatus({ text: res.message, isError: !res.success });
    if (res.success) {
      setNewPinField('');
      setAuditLogs(getAuditLogs());
    }
  };

  // API Diagnostics Ping
  const handleTestApi = async () => {
    setPingStatus('testing');
    setPingResult('Sending live GET request to /api/contacts...');
    try {
      const startTime = performance.now();
      const res = await fetch('/api/contacts', { method: 'GET' });
      const latency = Math.round(performance.now() - startTime);
      const data = await res.json();
      setPingStatus('success');
      setPingResult(`HTTP ${res.status} OK (${latency}ms roundtrip)\nHeaders: Content-Type: application/json\nResponse Payload:\n${JSON.stringify(data, null, 2)}`);
    } catch (err: any) {
      setPingStatus('error');
      setPingResult(`Offline / Network Fallback Notice:\n${err.message || 'Server responded offline or endpoint is in static hosting mode.'}`);
    }
  };

  if (!isOpen) return null;

  // Filtered Leads
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.adminNotes && item.adminNotes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter || (statusFilter === 'starred' && item.starred);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className={`bg-white rounded-3xl shadow-2xl border border-sky-100 flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-full h-full max-w-none max-h-none rounded-none' : 'w-full max-w-5xl max-h-[94vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* TOP SYSTEM BAR */}
        <div className="px-6 py-4 bg-sky-50/80 border-b border-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-sm shadow-sky-400/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-navy-950 flex items-center gap-2">
                <span>Revathi Murugan — Executive Admin Studio</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  isAuthenticated 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {isAuthenticated ? 'Super Admin Verified' : 'Authentication Required'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Data Analyst Operations • Recruiter CRM • Telemetry Intelligence • Portfolio CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-white transition-colors border border-transparent hover:border-sky-200"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

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
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isAuthenticated ? (
            /* ========================================================
               LOGIN SCREEN (WITH ALL FEATURES)
               ======================================================== */
            <div className="max-w-md mx-auto py-6 sm:py-10">
              
              {!showForgotPassword ? (
                <div className="space-y-6">
                  {/* Brand Header */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-3xl bg-sky-50 border-2 border-sky-200 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-navy-950">
                      Administrator Login
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Secure gateway to recruiter leads, traffic intelligence, and portfolio CMS
                    </p>
                  </div>

                  {/* Login Method Toggle */}
                  <div className="grid grid-cols-2 p-1 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => { setLoginMethod('password'); setLoginError(''); }}
                      className={`py-2 rounded-xl transition-all ${
                        loginMethod === 'password'
                          ? 'bg-white text-navy-950 shadow-xs'
                          : 'text-slate-500 hover:text-navy-950'
                      }`}
                    >
                      Email & Password
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLoginMethod('pin'); setLoginError(''); }}
                      className={`py-2 rounded-xl transition-all ${
                        loginMethod === 'pin'
                          ? 'bg-white text-navy-950 shadow-xs'
                          : 'text-slate-500 hover:text-navy-950'
                      }`}
                    >
                      Quick Security PIN
                    </button>
                  </div>

                  {/* Lockout Notice */}
                  {lockoutRemaining > 0 && (
                    <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Security lockout in effect. Please wait {lockoutRemaining} seconds.</span>
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {loginMethod === 'password' ? (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Administrator Email or Username
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="admin@revathimurugan.com or admin"
                            value={identifierInput}
                            onChange={(e) => setIdentifierInput(e.target.value)}
                            disabled={lockoutRemaining > 0}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all font-medium"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-bold text-slate-700">
                              Password
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowForgotPassword(true)}
                              className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                            >
                              Forgot Password?
                            </button>
                          </div>

                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              required
                              placeholder="Enter admin password (default: admin)"
                              value={passwordInput}
                              onChange={(e) => setPasswordInput(e.target.value)}
                              disabled={lockoutRemaining > 0}
                              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                              title={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          4-Digit Security Access PIN
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={6}
                          placeholder="Default PIN: 2026"
                          value={pinInput}
                          onChange={(e) => setPinInput(e.target.value)}
                          disabled={lockoutRemaining > 0}
                          className="w-full text-center tracking-widest text-xl font-black py-3 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all"
                        />
                      </div>
                    )}

                    {/* Remember Me */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-sky-600 border-sky-300 focus:ring-sky-400"
                        />
                        <span>Remember credentials on this browser</span>
                      </label>
                    </div>

                    {/* Error Display */}
                    {loginError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={lockoutRemaining > 0}
                      className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-400/30 hover:shadow-lg hover:shadow-sky-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Authenticate & Enter Studio</span>
                    </button>
                  </form>

                  {/* Demo Helper Box */}
                  <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200/80 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy-950">Default Credentials:</span>
                      <button
                        type="button"
                        onClick={handleAutofillDemo}
                        className="px-2 py-0.5 rounded-lg bg-sky-500 text-white font-bold text-[10px] hover:bg-sky-600 transition-colors"
                      >
                        Auto-Fill Demo
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 flex justify-between">
                      <span>Username / Email: <code className="font-mono text-sky-700 font-bold">admin</code></span>
                      <span>Password: <code className="font-mono text-sky-700 font-bold">admin</code></span>
                    </div>
                    <div className="text-[11px] text-slate-500 text-right">
                      Quick PIN: <code className="font-mono text-sky-700 font-bold">2026</code>
                    </div>
                  </div>
                </div>
              ) : (
                /* Password Recovery Simulation View */
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mx-auto mb-2">
                      <KeyRound className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-950">Password Recovery</h3>
                    <p className="text-xs text-slate-500">
                      Enter your master recovery security code (e.g., <code className="font-bold text-sky-700">2026</code> or <code className="font-bold text-sky-700">anna</code>) to set a new password.
                    </p>
                  </div>

                  <form onSubmit={handleRecoverySubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Master Recovery Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter 2026 or anna"
                        value={recoveryCode}
                        onChange={(e) => setRecoveryCode(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        New Administrator Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Enter at least 4 characters"
                        value={newRecoveryPass}
                        onChange={(e) => setNewRecoveryPass(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
                      />
                    </div>

                    {recoveryMsg.text && (
                      <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                        recoveryMsg.isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {recoveryMsg.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                        <span>{recoveryMsg.text}</span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(false)}
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Back to Login
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          ) : (
            /* ========================================================
               AUTHENTICATED ADMIN STUDIO (5 FULL FEATURE TABS)
               ======================================================== */
            <div className="space-y-6">
              
              {/* Studio Navigation Tabs */}
              <div className="flex items-center gap-1.5 border-b border-sky-100 pb-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'leads'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50/60 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Recruiter CRM ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'telemetry'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50/60 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Traffic & Telemetry</span>
                </button>

                <button
                  onClick={() => setActiveTab('cms')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'cms'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50/60 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>Portfolio CMS & Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'security'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50/60 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Security & Audit Trail</span>
                </button>

                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === 'diagnostics'
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                      : 'bg-sky-50/60 text-slate-700 hover:bg-sky-100 hover:text-navy-950'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Cloud API Diagnostics</span>
                </button>
              </div>

              {/* --------------------------------------------------------
                  TAB 1: RECRUITER CRM LEADS
                  -------------------------------------------------------- */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  {/* Lead KPI summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
                      <div className="text-[11px] font-semibold text-slate-500">Total Recruiter Leads</div>
                      <div className="text-xl font-black text-navy-950">{inquiries.length}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
                      <div className="text-[11px] font-semibold text-slate-500">New Inquiries</div>
                      <div className="text-xl font-black text-emerald-600">
                        {inquiries.filter(i => i.status === 'new').length}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
                      <div className="text-[11px] font-semibold text-slate-500">Interviews Scheduled</div>
                      <div className="text-xl font-black text-sky-600">
                        {inquiries.filter(i => i.status === 'interview_scheduled').length}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
                      <div className="text-[11px] font-semibold text-slate-500">Starred / High Priority</div>
                      <div className="text-xl font-black text-amber-500">
                        {inquiries.filter(i => i.starred).length}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white p-3 rounded-2xl border border-sky-100 shadow-xs">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by recruiter, company, email, notes, role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-sky-50/60 border border-sky-200 text-slate-700 font-semibold focus:outline-none"
                      >
                        <option value="all">All Leads</option>
                        <option value="new">Status: New</option>
                        <option value="interview_scheduled">Status: Interview Scheduled</option>
                        <option value="reviewed">Status: Reviewed</option>
                        <option value="contacted">Status: Contacted</option>
                        <option value="starred">Starred Only</option>
                      </select>

                      <button
                        onClick={() => setShowAddLeadModal(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Add Lead</span>
                      </button>

                      <button
                        onClick={exportInquiriesToCSV}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold shadow-2xs transition-colors"
                        title="Download Leads Spreadsheet"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>CSV</span>
                      </button>

                      <button
                        onClick={exportInquiriesToJSON}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-slate-600 border border-sky-200 text-xs font-bold shadow-2xs transition-colors"
                        title="Export JSON"
                      >
                        <span>JSON</span>
                      </button>
                    </div>
                  </div>

                  {/* Batch Selection Banner */}
                  {selectedLeadIds.length > 0 && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-100 text-sky-900 text-xs font-semibold">
                      <span>{selectedLeadIds.length} lead(s) selected</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBatchStatus('contacted')}
                          className="px-2.5 py-1 rounded-lg bg-white text-sky-800 text-[11px] font-bold shadow-2xs hover:bg-sky-50"
                        >
                          Mark Contacted
                        </button>
                        <button
                          onClick={handleBatchDelete}
                          className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold shadow-2xs hover:bg-red-700"
                        >
                          Delete Selected
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Leads List */}
                  {filteredInquiries.length === 0 ? (
                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-sky-200">
                      <Users className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                      <p className="text-sm font-bold text-navy-950">No inquiries match criteria</p>
                      <p className="text-xs text-slate-500">Recruiter messages submitted via the Contact form or manually added will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-2 text-[11px] font-bold text-slate-400">
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.length === filteredInquiries.length && filteredInquiries.length > 0}
                          onChange={handleSelectAllLeads}
                          className="w-3.5 h-3.5 rounded text-sky-600 border-sky-300"
                        />
                        <span>Select All ({filteredInquiries.length})</span>
                      </div>

                      {filteredInquiries.map((lead) => (
                        <div 
                          key={lead.id}
                          className={`p-4 rounded-2xl bg-white border transition-all space-y-3 ${
                            lead.starred ? 'border-amber-200 bg-amber-50/20 shadow-xs' : 'border-sky-100 shadow-2xs hover:border-sky-300'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <input
                                type="checkbox"
                                checked={selectedLeadIds.includes(lead.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedLeadIds([...selectedLeadIds, lead.id]);
                                  } else {
                                    setSelectedLeadIds(selectedLeadIds.filter(i => i !== lead.id));
                                  }
                                }}
                                className="w-3.5 h-3.5 rounded text-sky-600 border-sky-300"
                              />

                              <button
                                onClick={() => handleToggleStar(lead.id)}
                                className={`p-1 rounded-lg transition-colors ${
                                  lead.starred ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-amber-400'
                                }`}
                                title={lead.starred ? 'Unstar' : 'Star lead'}
                              >
                                <Star className={`w-4 h-4 ${lead.starred ? 'fill-amber-400 text-amber-500' : ''}`} />
                              </button>

                              <span className="text-sm font-bold text-navy-950">{lead.name}</span>
                              
                              {lead.company && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200">
                                  {lead.company}
                                </span>
                              )}

                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                lead.status === 'new' 
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                  : lead.status === 'interview_scheduled'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : lead.status === 'reviewed'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-sky-100 text-sky-800 border border-sky-200'
                              }`}>
                                {lead.status.replace('_', ' ')}
                              </span>

                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                Via {lead.source || 'contact_form'}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 self-start sm:self-auto">
                              <select
                                value={lead.status}
                                onChange={(e: any) => handleStatusUpdate(lead.id, e.target.value)}
                                className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 focus:outline-none"
                              >
                                <option value="new">New</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="interview_scheduled">Interview Scheduled</option>
                                <option value="contacted">Contacted</option>
                                <option value="archived">Archived</option>
                              </select>

                              <a
                                href={`mailto:${lead.email}?subject=Regarding ${lead.role} Opportunity - Revathi Murugan&body=Dear ${lead.name},%0D%0A%0D%0AThank you for connecting with me regarding the ${lead.role} position at ${lead.company}.`}
                                className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                                title="Reply via Email"
                              >
                                <Mail className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs text-slate-500 flex items-center gap-3">
                            <span>Role: <strong className="text-navy-950">{lead.role}</strong></span>
                            <span>•</span>
                            <span>Received: {new Date(lead.receivedAt).toLocaleString()}</span>
                            <span>•</span>
                            <a href={`mailto:${lead.email}`} className="text-sky-600 hover:underline">{lead.email}</a>
                          </div>

                          {/* Recruiter Note */}
                          <div className="text-xs text-slate-700 bg-sky-50/40 p-3 rounded-xl border border-sky-100/70 leading-relaxed font-normal">
                            "{lead.message}"
                          </div>

                          {/* Private Administrator Notes */}
                          <div className="pt-1">
                            <input
                              type="text"
                              placeholder="Add private admin follow-up note (press Enter)..."
                              defaultValue={lead.adminNotes || ''}
                              onBlur={(e) => handleNotesUpdate(lead.id, e.target.value)}
                              className="w-full text-[11px] px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Manual Lead Modal */}
                  {showAddLeadModal && (
                    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
                      <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-sky-100 shadow-xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                          <h4 className="text-base font-bold text-navy-950">Add Inbound Recruiter Lead</h4>
                          <button onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Recruiter Name *</label>
                              <input
                                type="text"
                                required
                                value={newLeadForm.name}
                                onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Recruiter Email *</label>
                              <input
                                type="email"
                                required
                                value={newLeadForm.email}
                                onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Company</label>
                              <input
                                type="text"
                                value={newLeadForm.company}
                                onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Channel / Source</label>
                              <select
                                value={newLeadForm.source}
                                onChange={(e: any) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950 font-medium"
                              >
                                <option value="linkedin">LinkedIn InMail</option>
                                <option value="email">Direct Email</option>
                                <option value="phone_call">Phone Call / WhatsApp</option>
                                <option value="referral">Campus / Network Referral</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Role Opportunity</label>
                            <input
                              type="text"
                              value={newLeadForm.role}
                              onChange={(e) => setNewLeadForm({ ...newLeadForm, role: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Message / Discussion Notes</label>
                            <textarea
                              rows={3}
                              value={newLeadForm.message}
                              onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                              placeholder="Recruiter discussed opening for Junior Data Analyst..."
                              className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                            />
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => setShowAddLeadModal(false)}
                              className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                            >
                              Save Lead to CRM
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* --------------------------------------------------------
                  TAB 2: TRAFFIC TELEMETRY & CHARTS
                  -------------------------------------------------------- */}
              {activeTab === 'telemetry' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Total Page Visits</div>
                      <div className="text-2xl font-black text-navy-950">{telemetry.pageViews}</div>
                      <div className="text-[10px] text-sky-600 font-semibold mt-1">Portfolio Sessions</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Unique Visitors</div>
                      <div className="text-2xl font-black text-navy-950">{telemetry.uniqueVisitors}</div>
                      <div className="text-[10px] text-purple-600 font-semibold mt-1">Recruiters & Engineers</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Resume Downloads</div>
                      <div className="text-2xl font-black text-navy-950">{telemetry.resumeDownloads}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                        {telemetry.pageViews > 0 ? ((telemetry.resumeDownloads / telemetry.pageViews) * 100).toFixed(1) : 0}% Conversion
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Projects Explored</div>
                      <div className="text-2xl font-black text-navy-950">{telemetry.projectViews}</div>
                      <div className="text-[10px] text-sky-600 font-semibold mt-1">Code & DAX Modals</div>
                    </div>
                  </div>

                  {/* 7-Day Interaction Trend Chart */}
                  <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-sky-500" />
                        <span>Weekly Engagement & Interaction Trend</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">Past 7 Days Traffic</span>
                    </div>

                    <div className="h-56 w-full pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={telemetry.weeklyTraffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="downloadsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.5}/>
                              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0f2fe" />
                          <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#bae6fd', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} 
                          />
                          <Area type="monotone" dataKey="views" name="Page Views" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#viewsGradient)" />
                          <Area type="monotone" dataKey="downloads" name="CV Downloads" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#downloadsGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Conversion Funnel */}
                  <div className="p-5 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-sky-500" />
                        <span>Recruiter Conversion Funnel</span>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm('Reset all analytics counters to zero?')) {
                            setTelemetry(resetTelemetry());
                          }
                        }}
                        className="text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors"
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

              {/* --------------------------------------------------------
                  TAB 3: PORTFOLIO CMS & PROFILE CONTROLS
                  -------------------------------------------------------- */}
              {activeTab === 'cms' && (
                <form onSubmit={handleSaveCmsSettings} className="space-y-5 bg-white p-5 rounded-2xl border border-sky-100 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                        Live Candidate Profile & Availability CMS
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Changes modify live display values and state.
                      </p>
                    </div>

                    {cmsSavedToast && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                        <Check className="w-4 h-4" />
                        <span>Changes Applied Successfully!</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Candidate Full Name</label>
                      <input
                        type="text"
                        value={cmsSettings.name}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Professional Headline / Role</label>
                      <input
                        type="text"
                        value={cmsSettings.role}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Direct Email Address</label>
                      <input
                        type="email"
                        value={cmsSettings.email}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Direct Phone Number</label>
                      <input
                        type="text"
                        value={cmsSettings.phone}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Current Availability Status</label>
                      <input
                        type="text"
                        value={cmsSettings.availabilityStatus}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, availabilityStatus: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Notice Period</label>
                      <input
                        type="text"
                        value={cmsSettings.noticePeriod}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, noticePeriod: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Preferred Target Locations</label>
                      <input
                        type="text"
                        value={cmsSettings.targetLocations}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, targetLocations: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={cmsSettings.linkedin}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">GitHub Profile URL</label>
                      <input
                        type="url"
                        value={cmsSettings.github}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, github: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-5 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cmsSettings.openToRelocate}
                          onChange={(e) => setCmsSettings({ ...cmsSettings, openToRelocate: e.target.checked })}
                          className="w-4 h-4 text-sky-600 rounded border-sky-300"
                        />
                        <span className="font-semibold text-slate-700">Open to Relocation (Bangalore / Chennai / Hyderabad)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cmsSettings.highlightBiCockpit}
                          onChange={(e) => setCmsSettings({ ...cmsSettings, highlightBiCockpit: e.target.checked })}
                          className="w-4 h-4 text-sky-600 rounded border-sky-300"
                        />
                        <span className="font-semibold text-slate-700">Highlight Live BI Cockpit</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Save & Apply CMS Updates
                    </button>
                  </div>
                </form>
              )}

              {/* --------------------------------------------------------
                  TAB 4: SECURITY & AUDIT TRAIL
                  -------------------------------------------------------- */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Password Update Form */}
                    <form onSubmit={handleChangePasswordSubmit} className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-3 text-xs">
                      <h4 className="font-bold text-navy-950 uppercase tracking-wider text-xs pb-2 border-b border-sky-100 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-sky-500" />
                        <span>Update Administrator Password</span>
                      </h4>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          required
                          value={currPass}
                          onChange={(e) => setCurrPass(e.target.value)}
                          placeholder="Current password"
                          className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">New Password</label>
                        <input
                          type="password"
                          required
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="Min 4 characters"
                          className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                        />
                      </div>

                      {passChangeStatus.text && (
                        <div className={`p-2 rounded-xl font-semibold flex items-center gap-1.5 ${
                          passChangeStatus.isError ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {passChangeStatus.isError ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          <span>{passChangeStatus.text}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
                      >
                        Update Password
                      </button>
                    </form>

                    {/* PIN & Account Info */}
                    <div className="space-y-4">
                      {/* PIN Update */}
                      <form onSubmit={handleChangePinSubmit} className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-3 text-xs">
                        <h4 className="font-bold text-navy-950 uppercase tracking-wider text-xs pb-2 border-b border-sky-100 flex items-center gap-2">
                          <KeyRound className="w-4 h-4 text-sky-500" />
                          <span>Change Quick Security PIN</span>
                        </h4>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">New 4-Digit PIN</label>
                          <input
                            type="password"
                            maxLength={6}
                            required
                            value={newPinField}
                            onChange={(e) => setNewPinField(e.target.value)}
                            placeholder="e.g. 2026"
                            className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 text-center font-bold tracking-widest text-base"
                          />
                        </div>

                        {pinChangeStatus.text && (
                          <div className={`p-2 rounded-xl font-semibold flex items-center gap-1.5 ${
                            pinChangeStatus.isError ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {pinChangeStatus.isError ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            <span>{pinChangeStatus.text}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
                        >
                          Save New PIN
                        </button>
                      </form>

                      {/* Active Session Info */}
                      <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 text-xs space-y-2">
                        <div className="font-bold text-navy-950">Active Session Status</div>
                        <div className="text-[11px] text-slate-600 space-y-1">
                          <div>Logged in as: <strong className="text-sky-700">{getAdminUser().email}</strong></div>
                          <div>Role: <strong className="text-slate-800">{getAdminUser().role}</strong></div>
                          <div>Session: <span className="text-emerald-600 font-bold">Active & Authenticated</span></div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Security Audit Trail Log */}
                  <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <History className="w-4 h-4 text-sky-500" />
                        <span>Security & Activity Audit Trail</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Chronological Event History</span>
                    </div>

                    <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                      {auditLogs.map((log) => (
                        <div key={log.id} className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-sky-50/40 border border-sky-100/60 text-xs">
                          <div>
                            <span className="font-bold text-navy-950">{log.action}</span>
                            <span className="text-slate-500 ml-2">{log.details}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --------------------------------------------------------
                  TAB 5: CLOUD API DIAGNOSTICS
                  -------------------------------------------------------- */}
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

        {/* BOTTOM SYSTEM BAR */}
        <div className="px-6 py-3.5 bg-sky-50/60 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-sky-500" />
            <span>Revathi Murugan Analytics Platform • Secure Administrator Environment</span>
          </div>
          <div>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-sky-200 text-[10px] font-mono text-slate-700">ESC</kbd> to close</span>
          </div>
        </div>

      </div>
    </div>
  );
};
