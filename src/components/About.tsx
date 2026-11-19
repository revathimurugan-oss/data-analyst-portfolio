import React from 'react';
import { 
  Sparkles, 
  Target, 
  Globe, 
  CheckCircle2, 
  Compass
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const analyticalWorkflow = [
    {
      step: "01",
      title: "Business Problem & Scoping",
      desc: "Translating ambiguous business challenges into quantifiable analytical questions with clear success metrics and stakeholder goals."
    },
    {
      step: "02",
      title: "Data Extraction & Integrity Auditing",
      desc: "Querying relational databases with SQL, identifying missing values, evaluating schema integrity, and handling anomalies."
    },
    {
      step: "03",
      title: "Exploratory Analysis & Transformation",
      desc: "Transforming datasets via Power Query and Python Pandas, uncovering distributions, correlations, and segment behaviors."
    },
    {
      step: "04",
      title: "Executive Storytelling & Action",
      desc: "Translating data findings into intuitive Power BI dashboards and actionable recommendations for management decision-making."
    }
  ];

  return (
    <section id="about" className="py-24 bg-sky-50/40 border-b border-sky-100/80 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Candidate Background & Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            About Revathi Murugan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Bridging structured computer applications knowledge with real-world financial transaction discipline and modern data analytics workflows.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative Background & Creed */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed">
            
            {/* Professional Creed Banner in White + Sky Blue */}
            <div className="bg-white text-navy-950 p-6 sm:p-7 rounded-3xl shadow-sm border border-sky-200 relative overflow-hidden">
              <div className="h-full w-1.5 bg-sky-400 absolute left-0 top-0" />
              <p className="font-semibold text-navy-950 text-base sm:text-lg leading-relaxed italic pl-3">
                "Data analysis is fundamentally about trust and clarity. It requires verifying raw record accuracy at the root, uncovering genuine trends, and presenting findings so leadership can act with certainty."
              </p>
              <div className="mt-3 pl-3 flex items-center gap-2 text-xs font-bold text-sky-600">
                <span>— Analytical Approach</span>
              </div>
            </div>

            {/* Narrative Paragraphs in Pure White Cards */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs">
                I am an <strong className="text-navy-950">MCA graduate from Anna University (83% First Class with Distinction)</strong> with a focused ambition to launch a career in Data Analytics and Business Intelligence. My academic training provided me with strong computational thinking, database architecture understanding, and algorithmic problem-solving.
              </p>

              <p className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs">
                My corporate experience as a <strong className="text-navy-950">Cashier cum Gold Appraiser at Karur Gold Finance</strong> instilled in me a strict respect for data integrity, financial reconciliation, and zero-defect record keeping. Handling daily branch transactions reinforced that analytical models are only as reliable as the underlying data they process.
              </p>

              <p className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs">
                Through intensive training with <strong className="text-navy-950">Tamil Nadu Skill Corporation (300 hours)</strong> and <strong className="text-navy-950">IIT Patna Vishlesan i-Hub</strong>, I refined practical skills in SQL querying, Python data wrangling (Pandas/NumPy), Advanced Excel modeling, and interactive Power BI storytelling.
              </p>
            </div>

          </div>

          {/* Right Column: Problem-Solving Methodology & Languages */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Analytical Methodology Card in White with Sky Accents */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-sky-500" />
                  <h3 className="font-bold text-navy-950 text-base">Analytical Problem-Solving Framework</h3>
                </div>
                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  4 Stages
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {analyticalWorkflow.map((item) => (
                  <div key={item.step} className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100 hover:border-sky-200 transition-colors flex items-start gap-3">
                    <span className="font-mono text-xs font-black text-sky-700 bg-white px-2 py-1 rounded-xl border border-sky-200 shrink-0 shadow-xs">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-navy-950">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Behavioral Strengths Card */}
            <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-sky-100">
                <Target className="w-4 h-4 text-sky-500" />
                <h3 className="text-sm font-bold text-navy-950">Professional Strengths</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {personalInfo.coreStrengths.slice(0, 6).map((strength, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-xl bg-sky-50/50 border border-sky-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="text-[11px] font-medium text-slate-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Known Card */}
            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-500" />
                <span>Languages Known</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {personalInfo.languages.map((lang, index) => (
                  <div key={index} className="p-3 rounded-2xl bg-sky-50/50 border border-sky-100">
                    <div className="font-bold text-sm text-navy-950">{lang.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{lang.proficiency}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
