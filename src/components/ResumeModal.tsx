import React from 'react';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { trackEvent } from '../utils/adminService';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personalInfo } = usePortfolio();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-sky-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-sky-100 bg-sky-50/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-navy-950">
                Official Resume — Revathi Murugan
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Verified candidate document for Entry-Level & Junior Data Analyst roles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Revathi_Murugan_Resume.pdf"
              download="Revathi_Murugan_Resume.pdf"
              onClick={() => trackEvent('resume_download')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-400/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-sky-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body: Resume Document View */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-sky-50/30 font-sans">
          
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-sky-100 max-w-3xl mx-auto space-y-6">
            
            {/* Resume Header */}
            <div className="text-center pb-5 border-b-2 border-sky-100 space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                REVATHI MURUGAN
              </h1>
              <div className="text-xs sm:text-sm font-bold text-sky-700 tracking-wider uppercase">
                Aspiring Data Analyst | MCA Graduate
              </div>
              <div className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1 font-medium">
                <span>Coimbatore, Tamil Nadu</span>
                <span>•</span>
                <span>Native: Salem, Tamil Nadu</span>
                <span>•</span>
                <span>+91 73058 61615</span>
                <span>•</span>
                <span className="text-sky-700 font-semibold">revathimcajs@gmail.com</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider border-b border-sky-100 pb-1">
                Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 font-normal">
                MCA graduate with a foundation in data analysis, SQL, databases, programming and analytical problem-solving. Experienced in maintaining accurate customer transaction records, documentation and operational data through work as a Cashier cum Gold Appraiser at Karur Gold Finance. Practical exposure to Advanced Excel, SQL/MySQL, Python, Power BI, Tableau, Power Query and Google Sheets. Seeking an entry-level Data Analyst or Junior Data Analyst opportunity to apply analytical skills and develop data-driven business insights.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider border-b border-sky-100 pb-1">
                Technical Skills
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 space-y-1 pt-1">
                <div><span className="font-bold text-navy-950">Data Analysis & Spreadsheets:</span> Advanced Excel, Google Sheets, Microsoft Power Query</div>
                <div><span className="font-bold text-navy-950">Database:</span> SQL, MySQL, database concepts, data handling and record management</div>
                <div><span className="font-bold text-navy-950">Programming:</span> Python, C, C++, Java, PHP</div>
                <div><span className="font-bold text-navy-950">Data Visualization:</span> Power BI, Tableau</div>
                <div><span className="font-bold text-navy-950">Presentation & Tools:</span> Microsoft PowerPoint, Microsoft Office, HTML</div>
                <div><span className="font-bold text-navy-950">Business Operations:</span> Documentation, transaction records, data accuracy, customer coordination</div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider border-b border-sky-100 pb-1">
                Professional Experience
              </h3>
              <div className="pt-1">
                <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-navy-950">
                  <span>Cashier cum Gold Appraiser | Karur Gold Finance, Salem</span>
                  <span className="text-slate-500 font-normal">July 2024 – May 2026</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1 mt-1 pl-1 font-normal">
                  <li>Handled customer transactions and maintained accurate operational records with attention to detail.</li>
                  <li>Maintained business documentation and day-to-day records, supporting data accuracy and organized record keeping.</li>
                  <li>Coordinated with customers and internal teams to support smooth daily operations.</li>
                  <li>Supported sales and business development activities alongside routine operational responsibilities.</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider border-b border-sky-100 pb-1">
                Education
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 space-y-1 pt-1">
                <div><span className="font-bold text-navy-950">Master of Computer Applications (MCA)</span> — The Kavery Engineering College, Salem | Anna University | 83%</div>
                <div><span className="font-bold text-navy-950">Bachelor of Computer Applications (BCA)</span> — Shri Sakthi Kailassh Women's College, Salem | Periyar University | 75%</div>
                <div><span className="font-bold text-navy-950">Higher Secondary Certificate (HSC)</span> — 68%</div>
                <div><span className="font-bold text-navy-950">Secondary School Leaving Certificate (SSLC)</span> — 87%</div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider border-b border-sky-100 pb-1">
                Certification & Professional Development
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 pt-1">
                <div>
                  <span className="font-bold text-navy-950">Artificial Intelligence Programmer</span> — TN Skill Corporation | 300 hours | Cultus Education and Technology Services Pvt. Ltd. | Issued: 29 May 2026
                </div>
                <div>
                  <span className="font-bold text-navy-950">Completed: Applied AI & ML Essentials (Tamil)</span> — Vishlesan i-Hub, IIT Patna | Completed: 05 November 2026
                </div>
              </div>
            </div>

            {/* Core Strengths & Languages */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider border-b border-sky-100 pb-1">
                Core Strengths & Languages
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 pt-1 space-y-1">
                <div><span className="font-bold text-navy-950">Strengths:</span> Analytical thinking | Attention to detail | Accuracy | Quick learning | Adaptability | Team collaboration | Communication</div>
                <div><span className="font-bold text-navy-950">Languages:</span> Tamil, English</div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-sky-50/70 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            <span>Exact replica of candidate uploaded resume.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold bg-white text-slate-700 hover:bg-sky-50 border border-sky-200 transition-colors shadow-xs"
            >
              Close Preview
            </button>
            <a
              href="/Revathi_Murugan_Resume.pdf"
              download="Revathi_Murugan_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-400/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF File</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
