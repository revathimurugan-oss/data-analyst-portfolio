import React from 'react';
import { 
  ArrowUp, 
  FileText,
  ShieldCheck,
  Award
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onOpenResumeModal: () => void;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal, onOpenAdminModal }) => {
  const { personalInfo } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sky-50/70 text-slate-600 py-16 border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-sky-200/70">
          
          {/* Col 1: Identity & Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border-2 border-sky-200 shrink-0">
                <img src="/profile.jpg" alt="Revathi Murugan" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-lg font-bold text-navy-950 tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Aspiring Data Analyst & MCA Graduate from Anna University (83%). Dedicated to converting complex transactional and operational data into clear, decision-ready business intelligence.
            </p>
            <div className="text-xs text-slate-500 font-semibold">
              Coimbatore & Salem, Tamil Nadu, India
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white hover:bg-sky-50 text-sky-600 flex items-center justify-center transition-colors border border-sky-200 shadow-xs"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-500" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white hover:bg-sky-50 text-slate-700 hover:text-navy-950 flex items-center justify-center transition-colors border border-sky-200 shadow-xs"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-slate-700" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#hero" className="hover:text-sky-600 transition-colors">Home Overview</a></li>
              <li><a href="#about" className="hover:text-sky-600 transition-colors">About Me & Background</a></li>
              <li><a href="#skills" className="hover:text-sky-600 transition-colors">Technical Skills & Tooling</a></li>
              <li><a href="#projects" className="hover:text-sky-600 transition-colors">Featured Analytics Projects</a></li>
              <li><a href="#dashboards" className="hover:text-sky-600 transition-colors">Live Interactive BI Cockpit</a></li>
              <li><a href="#education" className="hover:text-sky-600 transition-colors">Education & Certifications</a></li>
              <li><a href="#experience" className="hover:text-sky-600 transition-colors">Operational Experience</a></li>
            </ul>
          </div>

          {/* Col 3: Core Analytical Toolkit */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider">
              Analytical Competencies
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">SQL / MySQL</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">Advanced Excel</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">Python (Pandas)</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">Power BI (DAX)</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">Tableau</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">Power Query ETL</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">Data Cleansing</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-sky-800 border border-sky-100 shadow-2xs">Star Schema</span>
            </div>
          </div>

          {/* Col 4: Candidate Verification & Downloads */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider">
              Resume & Documents
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Review and download the authentic candidate resume verified from the Anna University MCA graduate dossier.
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenResumeModal}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 text-xs font-bold transition-colors border border-sky-200 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>Preview Resume PDF</span>
              </button>

              <a
                href="/Revathi_Murugan_Resume.pdf"
                download="Revathi_Murugan_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-sm shadow-sky-400/30 transition-colors"
              >
                <span>Direct Download Resume</span>
              </a>

              <a
                href="/TN_Skill_Certificate_Revathi_Murugan.pdf"
                download="TN_Skill_Certificate_Revathi_Murugan.pdf"
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-sky-50 text-slate-700 text-xs font-bold transition-colors border border-sky-200 shadow-xs"
              >
                <Award className="w-3.5 h-3.5 text-sky-600" />
                <span>TN Skill Certificate (PDF)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Revathi Murugan. All rights reserved. Professional Data Analyst Portfolio.
          </div>

          <div className="flex items-center gap-4">
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-700 transition-colors"
                title="Admin Control Center (PIN: 2026)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>Admin Portal</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
