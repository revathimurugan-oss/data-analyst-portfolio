import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { copyToClipboard } from '../utils/helpers';
import { addInquiry } from '../utils/adminService';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    role: 'Junior Data Analyst',
    message: ''
  });

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(personalInfo.email);
    if (ok) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = async () => {
    const ok = await copyToClipboard(personalInfo.phone);
    if (ok) {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save locally for admin dashboard
    try {
      addInquiry(formData);
    } catch (e) {
      console.warn('Failed to record inquiry locally', e);
    }

    // Asynchronously log inquiry to serverless backend
    try {
      fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(err => {
        console.warn('Backend logging endpoint reached fallback:', err);
      });
    } catch {
      // Fallback gracefully
    }

    // Construct mailto link with encoded subject and body
    const subject = encodeURIComponent(`Data Analyst Opportunity - ${formData.role} at ${formData.company || 'Our Company'}`);
    const body = encodeURIComponent(
      `Hello Revathi,\n\nI reviewed your Data Analyst portfolio and would like to connect regarding an opportunity.\n\n` +
      `Role: ${formData.role}\n` +
      `Company: ${formData.company}\n` +
      `Sender Name: ${formData.name}\n` +
      `Sender Email: ${formData.email}\n\n` +
      `Message Details:\n${formData.message}\n\nBest regards,\n${formData.name}`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-sky-50/30 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            Let's Discuss Data Analyst Opportunities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Open for Entry-Level Data Analyst, Junior Data Analyst, and Business Intelligence Analyst positions. Ready to contribute analytical rigor and problem-solving to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Availability in White + Sky Blue */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-sky-100 shadow-xl shadow-sky-100/50 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Contact Coordinates
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 mt-1">
                  Revathi Murugan
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Aspiring Data Analyst | MCA Graduate (83%)
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2 border-t border-sky-100">
                
                {/* Email Item */}
                <div className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 text-sky-600 shadow-xs mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 font-semibold">Direct Email</div>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-sm font-bold text-navy-950 hover:text-sky-600 transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-xl bg-white text-slate-500 hover:text-sky-600 border border-sky-200 shadow-xs transition-colors"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-sky-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 text-sky-600 shadow-xs mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 font-semibold">Phone / WhatsApp</div>
                      <a 
                        href={`tel:${personalInfo.phone.replace(/\\s+/g, '')}`}
                        className="text-sm font-bold text-navy-950 hover:text-sky-600 transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-xl bg-white text-slate-500 hover:text-sky-600 border border-sky-200 shadow-xs transition-colors"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-sky-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 text-sky-600 shadow-xs mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold">Current Location</div>
                    <div className="text-sm font-bold text-navy-950">
                      {personalInfo.location}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Native: {personalInfo.native}
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-sky-100">
                <div className="text-[11px] text-slate-500 font-semibold mb-3">
                  Professional Networks
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 shadow-xs transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4 text-sky-500" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-slate-700 text-xs font-bold border border-sky-200 shadow-xs transition-all"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-800" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Availability Badges */}
            <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Hiring & Availability Status</span>
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Immediate Joiner / Ready to start immediately</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Open to Relocate (Coimbatore, Chennai, Bengaluru, or Remote)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Full-Time In-Office, Hybrid, or Remote roles</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Recruiter Message Form in White + Sky Blue */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-md shadow-sky-100/40">
            
            <div className="border-b border-sky-100 pb-4 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-950">
                Send an Interview Inquiry or Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                Fill in the details below to initiate direct email contact with Revathi Murugan.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-sky-50 border border-sky-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-white text-sky-600 border border-sky-200 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-navy-950">
                  Email Client Draft Launched!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Your email client has been opened with the pre-filled message. If it didn't open automatically, you can email directly at <span className="font-bold text-sky-700">{personalInfo.email}</span>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 transition-colors shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Analytics Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-white font-medium"
                    >
                      <option value="Junior Data Analyst">Junior Data Analyst</option>
                      <option value="Entry-Level Data Analyst">Entry-Level Data Analyst</option>
                      <option value="Business Intelligence Analyst">Business Intelligence Analyst</option>
                      <option value="SQL / Database Specialist">SQL / Database Specialist</option>
                      <option value="Data Analytics Trainee / Intern">Data Analytics Trainee / Intern</option>
                      <option value="General Exploration / Other">General Exploration / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Job Brief *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="We have an opening for a Data Analyst role and would like to schedule an introductory interview..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-white"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Directly opens your mail client addressed to <span className="font-semibold text-sky-700">{personalInfo.email}</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-400/25 hover:shadow-lg hover:shadow-sky-400/35 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via Email</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
