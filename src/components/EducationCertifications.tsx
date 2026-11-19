import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationCertifications: React.FC = () => {
  const { educationList, certificationsList } = usePortfolio();
  return (
    <section id="education" className="py-24 bg-sky-50/30 border-b border-sky-100/80 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Academic Credentials & Government Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            Education & Certifications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Formal qualifications in Computer Applications from Anna University and verified AI/ML development certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Formal Education */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950">Academic Qualifications</h3>
              </div>
              <span className="text-xs font-bold text-sky-700 font-mono">Anna & Periyar Univ</span>
            </div>

            <div className="space-y-6">
              {educationList.map((edu, index) => (
                <div 
                  key={index}
                  className="p-6 sm:p-7 rounded-3xl border border-sky-100 bg-white hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50 transition-all relative overflow-hidden shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold text-navy-950">{edu.degree}</h4>
                      <p className="text-sm font-bold text-sky-700 mt-0.5">{edu.institution}</p>
                    </div>

                    <div className="sm:text-right">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 shadow-xs">
                        {edu.score}
                      </span>
                      {edu.affiliation && (
                        <div className="text-xs text-slate-500 font-semibold mt-1">
                          {edu.affiliation}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{edu.location}</span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pt-3 border-t border-sky-50">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Certifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950">Verified Certifications</h3>
              </div>
              <span className="text-xs font-bold text-sky-700 font-mono">TN Skill & IIT-P</span>
            </div>

            <div className="space-y-6">
              {certificationsList.map((cert, index) => (
                <div 
                  key={index}
                  className="p-6 sm:p-7 rounded-3xl border border-sky-100 bg-white hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50 transition-all shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                        {cert.status}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-navy-950 mt-2">
                        {cert.title}
                      </h4>
                    </div>

                    <Award className="w-6 h-6 text-sky-500 shrink-0" />
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-sky-500" />
                      <span>{cert.issuer}</span>
                    </div>
                    {cert.partner && (
                      <div className="text-slate-500">Partner: {cert.partner}</div>
                    )}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-slate-500 font-medium">
                      {cert.hours && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-sky-500" />
                          <strong className="text-navy-950">{cert.hours}</strong>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-sky-400" />
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-sky-50">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Competencies Verified:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsCovered.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Verified Certificate Banner */}
              <div className="p-5 rounded-3xl bg-white border border-sky-200 flex items-start gap-3 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  <span className="font-bold text-navy-950">Official Verification:</span> Certificates issued under Tamil Nadu Skill Corporation (Government of TN) and Vishlesan i-Hub (IIT Patna) are authentic and verifiable.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
