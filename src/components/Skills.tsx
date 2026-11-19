import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Database, 
  BarChart3, 
  Code, 
  Presentation, 
  Search, 
  Sparkles, 
  Layers, 
  Server, 
  RefreshCw, 
  Table, 
  FolderGit2, 
  PieChart, 
  Terminal, 
  ShieldCheck
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const iconMap: Record<string, React.ReactNode> = {
    FileSpreadsheet: <FileSpreadsheet className="w-5 h-5 text-sky-500" />,
    RefreshCw: <RefreshCw className="w-5 h-5 text-sky-500" />,
    Table: <Table className="w-5 h-5 text-sky-500" />,
    Database: <Database className="w-5 h-5 text-sky-600" />,
    Server: <Server className="w-5 h-5 text-sky-600" />,
    FolderGit2: <FolderGit2 className="w-5 h-5 text-sky-600" />,
    BarChart3: <BarChart3 className="w-5 h-5 text-sky-500" />,
    PieChart: <PieChart className="w-5 h-5 text-sky-500" />,
    Code: <Code className="w-5 h-5 text-sky-600" />,
    Terminal: <Terminal className="w-5 h-5 text-sky-600" />,
    Presentation: <Presentation className="w-5 h-5 text-sky-500" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-sky-600" />
  };

  const categories = ['All', ...skillCategories.map(cat => cat.title)];

  const filteredCategories = skillCategories.map(cat => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) {
      return null;
    }

    const filteredSkills = cat.skills.filter(skill => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.tags.some(t => t.toLowerCase().includes(q))
      );
    });

    if (filteredSkills.length === 0) return null;

    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-24 bg-white border-b border-sky-100/80 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-sky-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Core Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            Data Analytics Competencies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Organized into key operational competencies backed by genuine practical exposure, certified training hours, and computer applications coursework.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-sky-50/80 rounded-2xl border border-sky-100 shadow-inner max-w-full overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                    : 'text-slate-600 hover:text-sky-700 hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools, formulas, SQL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-sky-200 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all shadow-xs font-medium"
            />
          </div>

        </div>

        {/* Skill Category Cards */}
        <div className="space-y-10">
          {filteredCategories.map((cat) => {
            if (!cat) return null;

            return (
              <div 
                key={cat.title} 
                className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm shadow-sky-100/50 hover:shadow-md hover:border-sky-200 transition-all relative overflow-hidden"
              >
                {/* Top Accent Sky Gradient Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-100 absolute top-0 left-0" />

                {/* Category Header */}
                <div className="border-b border-sky-100 pb-4 mb-6 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-navy-950 flex items-center gap-2.5">
                      <Layers className="w-5 h-5 text-sky-500" />
                      <span>{cat.title}</span>
                    </h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {cat.skills.length} Capabilities
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal">
                    {cat.description}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="p-5 rounded-2xl border border-sky-100 bg-sky-50/40 hover:bg-white hover:border-sky-300 hover:shadow-md hover:shadow-sky-100/60 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="w-11 h-11 rounded-2xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:bg-sky-50 transition-all">
                            {iconMap[skill.iconName] || <Code className="w-5 h-5 text-sky-500" />}
                          </div>
                          <span className="text-[11px] font-bold px-3 py-1 rounded-full border bg-white text-sky-700 border-sky-200 shadow-xs">
                            {skill.level}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-navy-950 mb-1.5 group-hover:text-sky-600 transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                          {skill.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-sky-100">
                        {skill.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-sky-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Note on Proficiency Authenticity */}
        <div className="mt-12 p-5 rounded-2xl bg-sky-50/70 border border-sky-200 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-sky-950">Ethical Integrity Standard:</span> Skills are represented through actual hands-on project deliverables, verified coursework, and 300+ training hours rather than arbitrary percentage metrics.
          </p>
        </div>

      </div>
    </section>
  );
};
