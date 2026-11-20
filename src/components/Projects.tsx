import React, { useState } from 'react';
import { 
  BarChart3, 
  ArrowRight, 
  TrendingUp, 
  Download, 
  Database, 
  Sparkles,
  PieChart,
  Code,
  GitBranch,
  Cpu,
  Layers,
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { downloadFile } from '../utils/helpers';
import { trackEvent } from '../utils/adminService';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    'All', 
    'AI & NLP Analytics', 
    'Customer Analytics', 
    'Machine Learning & Algorithms', 
    'Sales Analytics', 
    'Financial Analysis', 
    'Business Intelligence'
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const categoryIcons: Record<string, React.ReactNode> = {
    'AI & NLP Analytics': <Cpu className="w-4 h-4 text-sky-500" />,
    'Customer Analytics': <PieChart className="w-4 h-4 text-sky-500" />,
    'Machine Learning & Algorithms': <Layers className="w-4 h-4 text-sky-600" />,
    'Sales Analytics': <TrendingUp className="w-4 h-4 text-sky-500" />,
    'Financial Analysis': <Database className="w-4 h-4 text-sky-600" />,
    'Business Intelligence': <BarChart3 className="w-4 h-4 text-sky-500" />,
    'Data Engineering & EDA': <Code className="w-4 h-4 text-sky-600" />
  };

  return (
    <section id="projects" className="py-24 bg-sky-50/30 border-b border-sky-100/80 relative overflow-hidden">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Featured Case Studies & Demonstrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            Data Analytics Project Showcase
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            End-to-end analytical implementations demonstrating data cleaning, SQL CTEs/window functions, statistical exploratory analysis, and executive dashboard design with downloadable synthetic assets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                  : 'bg-white text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-sky-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const icon = categoryIcons[project.category] || <BarChart3 className="w-4 h-4 text-sky-500" />;

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-sky-100/60 hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden group relative"
              >
                {/* Top Accent Sky Gradient Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-100" />

                {/* Card Top Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Category & Project Index Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                          {icon}
                          <span>{project.category}</span>
                        </span>
                        {project.isRealRepo && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200" title="Verified GitHub Repository & Real Dataset">
                            <GitBranch className="w-3 h-3 text-emerald-600" />
                            <span>GitHub Real Data</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold font-mono text-sky-400">
                        CASE 0{index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-navy-950 group-hover:text-sky-600 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {/* Tagline / Subtitle */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-2 gap-2.5 my-5">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-sky-50/50 border border-sky-100">
                        <div className="text-[10px] text-slate-500 font-semibold truncate uppercase">{m.label}</div>
                        <div className="text-base font-extrabold text-navy-950 mt-0.5">{m.value}</div>
                        {m.change && (
                          <div className={`text-[10px] font-bold mt-0.5 ${
                            m.positive ? 'text-sky-600' : 'text-slate-500'
                          }`}>
                            {m.change}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Tools Applied Badges */}
                  <div className="pt-2 border-t border-sky-100 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-white text-sky-800 border border-sky-200 shadow-xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Card Bottom Actions */}
                <div className="p-4 bg-sky-50/40 border-t border-sky-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setActiveProject(project);
                      trackEvent('project_view');
                    }}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-slate-700 hover:text-sky-700 bg-white hover:bg-sky-50 border border-sky-200 shadow-xs transition-colors"
                        title="View Repository on GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-slate-800" />
                        <span>Repo</span>
                      </a>
                    )}

                    <button
                      onClick={() => downloadFile(project.downloadableFiles.datasetFilename, project.downloadableFiles.datasetContent, 'text/csv')}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-sky-700 hover:text-sky-800 bg-white hover:bg-sky-50 border border-sky-200 shadow-xs transition-colors"
                      title={`Download Dataset (${project.downloadableFiles.datasetFilename})`}
                    >
                      <Download className="w-3.5 h-3.5 text-sky-500" />
                      <span>Data</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

      </div>
    </section>
  );
};
