import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building,
  Sparkles,
  Download,
  Eye,
  X,
  FileText
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificationItem } from '../types';

export const EducationCertifications: React.FC = () => {
  const { educationList, certificationsList } = usePortfolio();
  const [selectedCertificate, setSelectedCertificate] = useState<CertificationItem | null>(null);
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                          {cert.status}
                        </span>
                        {cert.recognitionCode && (
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            NCVET, Govt. of India
                          </span>
                        )}
                      </div>
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

                  {/* Document Identifiers (If available) */}
                  {(cert.enrolmentNo || cert.certificateNo) && (
                    <div className="p-3 rounded-2xl bg-sky-50/50 border border-sky-100 text-[11px] space-y-1">
                      {cert.enrolmentNo && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Enrolment No:</span>
                          <span className="font-mono font-bold text-navy-950">{cert.enrolmentNo}</span>
                        </div>
                      )}
                      {cert.certificateNo && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Certificate No:</span>
                          <span className="font-mono font-bold text-sky-700">{cert.certificateNo}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Certificate Image Thumbnail Preview & Actions (If image/PDF exists) */}
                  {cert.certificateImageUrl && (
                    <div className="pt-2">
                      <div 
                        onClick={() => setSelectedCertificate(cert)}
                        className="relative rounded-2xl overflow-hidden border border-sky-200 bg-sky-50 group cursor-pointer shadow-2xs hover:shadow-md transition-all aspect-[16/10]"
                      >
                        <img 
                          src={cert.certificateImageUrl} 
                          alt={cert.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/15 backdrop-blur-[1px] transition-all flex items-center justify-center">
                          <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-navy-950 text-xs font-bold shadow-md flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-sky-600" />
                            <span>Inspect Official Certificate</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => setSelectedCertificate(cert)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors border border-sky-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Certificate</span>
                        </button>

                        {cert.certificatePdfUrl && (
                          <a
                            href={cert.certificatePdfUrl}
                            download="TN_Skill_Certificate_Revathi_Murugan.pdf"
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-colors shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

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
                  <span className="font-bold text-navy-950">Official Verification:</span> Certificates issued under Tamil Nadu Skill Corporation (Government of Tamil Nadu) and Vishlesan i-Hub (IIT Patna) are authentic and verifiable.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Official Certificate Full Preview Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-sky-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-sky-50/80 border-b border-sky-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-950">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedCertificate.issuer} • Awarded to Revathi Murugan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedCertificate.certificatePdfUrl && (
                  <a
                    href={selectedCertificate.certificatePdfUrl}
                    download="TN_Skill_Certificate_Revathi_Murugan.pdf"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Full Resolution Certificate */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 flex flex-col items-center justify-center">
              {selectedCertificate.certificateImageUrl ? (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white max-w-3xl w-full">
                  <img 
                    src={selectedCertificate.certificateImageUrl} 
                    alt={selectedCertificate.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <FileText className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Document view available via direct download</p>
                </div>
              )}

              {/* Verification Metadata Footer */}
              <div className="w-full max-w-3xl mt-4 p-4 rounded-2xl bg-white border border-sky-100 shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-slate-500">Candidate Name: </span>
                    <strong className="text-navy-950 font-bold">Revathi Murugan</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Enrolment No: </span>
                    <strong className="font-mono text-navy-950 font-bold">{selectedCertificate.enrolmentNo || 'SL2025-F337796'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Certificate No: </span>
                    <strong className="font-mono text-sky-700 font-bold">{selectedCertificate.certificateNo || 'TNSC-VN-ITS-ART-0526-0015'}</strong>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 border-t border-sky-50 pt-2 flex items-center justify-between flex-wrap gap-1">
                  <span>Recognition Code: <strong>ABDS/0088/SGO/2024/R0 (NCVET, Govt. of India)</strong></span>
                  <span>Issued at: <strong>Salem, Tamil Nadu (29 May 2026)</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
