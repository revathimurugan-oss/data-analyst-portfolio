import React from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Database, 
  BarChart3, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section 
      id="hero" 
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white border-b border-sky-100/80"
    >
      {/* Subtle Sky Blue Grid & Ambient Soft Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-sky-50/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 shadow-xs text-xs sm:text-sm font-semibold text-sky-900">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
              </span>
              <span className="text-navy-950 font-bold">Immediate Joiner</span>
              <span className="text-sky-300">•</span>
              <span className="text-sky-700">Open for Data Analyst Roles</span>
            </div>

            {/* Main Greeting & Title */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-bold text-sky-600 tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>Hello, I'm Revathi Murugan</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-[1.15]">
                Turning Data Into{' '}
                <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 bg-clip-text text-transparent">
                  Meaningful Insights
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {personalInfo.heroSubtitle}
            </p>

            {/* Quick Metadata Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-sky-100 shadow-xs font-medium text-slate-700">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-sky-100 shadow-xs font-medium text-slate-700">
                <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                <span>MCA • Anna University <strong className="text-navy-950">(83% Distinction)</strong></span>
              </div>

              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-sky-100 shadow-xs font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>TN Skill Corp & IIT Patna Certified</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-400/25 hover:shadow-lg hover:shadow-sky-400/35 transition-all transform hover:-translate-y-0.5"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#dashboards"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-navy-950 bg-white hover:bg-sky-50 border border-sky-200 shadow-xs hover:border-sky-300 transition-all transform hover:-translate-y-0.5"
              >
                <BarChart3 className="w-4 h-4 text-sky-500" />
                <span>Interactive Dashboards</span>
              </a>

              <a
                href="/Revathi_Murugan_Resume.pdf"
                download="Revathi_Murugan_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold text-slate-700 bg-white hover:bg-sky-50 border border-sky-200 shadow-xs hover:border-sky-300 transition-all"
              >
                <Download className="w-4 h-4 text-sky-600" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-500" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links & Trust Indicators */}
            <div className="pt-5 border-t border-sky-100 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Official Profiles:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-sky-100 text-slate-700 hover:text-sky-600 hover:border-sky-300 shadow-xs transition-all text-xs font-semibold"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-500" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-sky-100 text-slate-700 hover:text-navy-950 hover:border-sky-300 shadow-xs transition-all text-xs font-semibold"
                >
                  <GithubIcon className="w-4 h-4 text-slate-800" />
                  <span>GitHub Repository</span>
                </a>

                <button
                  onClick={onOpenResumeModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 transition-colors text-xs font-bold"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span>View Verified CV</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Executive Profile Card in White + Sky Blue */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Decorative Glow Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-400 to-sky-200 opacity-30 blur-lg" />

              <div className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/50 p-6 sm:p-7 relative overflow-hidden space-y-6">
                
                {/* Top Sky Accent Bar */}
                <div className="h-2 w-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-200 absolute top-0 left-0" />

                {/* Profile Photo & Primary Info */}
                <div className="flex items-center gap-4 pt-1">
                  <div className="relative shrink-0">
                    <img
                      src="/profile.jpg"
                      alt="Revathi Murugan"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top shadow-md border-2 border-white ring-4 ring-sky-100"
                    />
                    <div 
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center shadow-xs"
                      title="Verified Candidate"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-bold border border-sky-200 mb-1">
                      <span>Aspiring Data Analyst</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-navy-950">
                      Revathi Murugan
                    </h2>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      MCA Graduate • Anna University
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      Coimbatore, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Core Competencies Tech Badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>Core Analytical Arsenal</span>
                    <span className="text-[11px] text-sky-600 normal-case font-semibold">Practical Exposure</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-sky-50/60 border border-sky-100 hover:border-sky-300 transition-colors flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs">
                        <Database className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy-950">SQL / MySQL</div>
                        <div className="text-[10px] text-slate-500">Queries, Joins, CTEs</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-sky-50/60 border border-sky-100 hover:border-sky-300 transition-colors flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs">
                        <FileSpreadsheet className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy-950">Advanced Excel</div>
                        <div className="text-[10px] text-slate-500">Pivots, XLOOKUP, M</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-sky-50/60 border border-sky-100 hover:border-sky-300 transition-colors flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs">
                        <BarChart3 className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy-950">Power BI & DAX</div>
                        <div className="text-[10px] text-slate-500">Star Schema Models</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-sky-50/60 border border-sky-100 hover:border-sky-300 transition-colors flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs">
                        <Code2 className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy-950">Python & EDA</div>
                        <div className="text-[10px] text-slate-500">Pandas, NumPy Pipelines</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Dashboard Banner in Soft Sky Blue */}
                <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sky-800 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                      Verified Academic & Training Standing
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Class of 2026</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-sky-200/60">
                    <div className="bg-white rounded-xl p-2 border border-sky-100 shadow-xs">
                      <div className="text-sm font-black text-sky-600">83%</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">MCA Score</div>
                    </div>
                    <div className="bg-white rounded-xl p-2 border border-sky-100 shadow-xs">
                      <div className="text-sm font-black text-sky-600">300h</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">TN Skill AI</div>
                    </div>
                    <div className="bg-white rounded-xl p-2 border border-sky-100 shadow-xs">
                      <div className="text-sm font-black text-sky-600">IIT-P</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Vishlesan Hub</div>
                    </div>
                  </div>
                </div>

                {/* Practical Operational Discipline Note */}
                <div className="pt-1 text-center">
                  <p className="text-xs text-slate-600">
                    <span className="font-bold text-navy-950">Practical Experience:</span> Cashier cum Gold Appraiser at Karur Gold Finance (Transaction Records & Data Accuracy)
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
