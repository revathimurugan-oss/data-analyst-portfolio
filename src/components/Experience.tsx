import React from 'react';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { experienceList } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-white border-b border-sky-100/80 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-sky-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Professional Grounding & Record Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            Professional Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real-world discipline in daily ledger accuracy, transaction documentation, audit consistency, and customer coordination at Karur Gold Finance.
          </p>
        </div>

        {/* Experience Card */}
        <div className="max-w-4xl mx-auto">
          {experienceList.map((exp, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/50 p-7 sm:p-10 relative overflow-hidden space-y-6"
            >
              {/* Top Accent Strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-100 absolute top-0 left-0" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200 mb-2">
                    <Building2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-navy-950">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 mt-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-sky-500" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-sky-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>100% Audit Consistency</span>
                  </span>
                </div>
              </div>

              {/* Responsibilities Narrative */}
              <div className="space-y-3 pt-2 border-t border-sky-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Operational & Data Responsibilities
                </h4>
                <div className="space-y-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-sky-50/40 p-3.5 rounded-2xl border border-sky-100">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Competency Chips */}
              <div className="pt-4 border-t border-sky-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Competencies Developed for Data Analysis
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {exp.operationalStrengths.map((str, sIdx) => (
                    <div 
                      key={sIdx}
                      className="p-3 rounded-2xl bg-white border border-sky-200 text-center shadow-xs"
                    >
                      <div className="text-xs font-bold text-navy-950">{str}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrity & Authenticity Note */}
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  <span className="font-bold text-navy-950">Direct Career Honesty:</span> This position reflects genuine corporate experience in high-volume transaction processing, record auditing, and customer KYC compliance, instilling the exact rigor required for enterprise data analytics.
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
