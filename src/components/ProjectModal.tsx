import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Table, 
  BarChart3, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2, 
  Database,
  ExternalLink,
  GitBranch
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '../types';
import { downloadFile, copyToClipboard, formatCurrency } from '../utils/helpers';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  ComposedChart, 
  Line, 
  CartesianGrid 
} from 'recharts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = async () => {
    if (project.downloadableFiles.scriptContent) {
      const ok = await copyToClipboard(project.downloadableFiles.scriptContent);
      if (ok) {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    }
  };

  const handleDownloadDataset = () => {
    downloadFile(
      project.downloadableFiles.datasetFilename,
      project.downloadableFiles.datasetContent,
      'text/csv;charset=utf-8;'
    );
  };

  const handleDownloadScript = () => {
    if (project.downloadableFiles.scriptFilename && project.downloadableFiles.scriptContent) {
      downloadFile(
        project.downloadableFiles.scriptFilename,
        project.downloadableFiles.scriptContent
      );
    }
  };

  const SKY_COLORS = ['#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD', '#0284C7', '#0369A1'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-sky-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-5 border-b border-sky-100 bg-sky-50/70 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-sky-800 border border-sky-200 shadow-xs">
                {project.category}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-100/60 text-sky-900 border border-sky-200 flex items-center gap-1">
                {project.isRealRepo ? <GitBranch className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-sky-600" />}
                {project.demoDataLabel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-navy-950">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              {project.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-sm"
                title="Open GitHub Repository"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors shrink-0 border border-transparent hover:border-sky-200 shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 border-b border-sky-100 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-sky-500 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-navy-950'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-sky-500" />
              <span>Analysis & Findings</span>
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'data'
                  ? 'border-sky-500 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-navy-950'
              }`}
            >
              <Table className="w-4 h-4 text-sky-500" />
              <span>Dataset Preview ({project.sampleData.length} Rows)</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'code'
                  ? 'border-sky-500 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-navy-950'
              }`}
            >
              <FileCode className="w-4 h-4 text-sky-500" />
              <span>
                {project.downloadableFiles.scriptLanguage === 'sql' 
                  ? 'SQL Queries' 
                  : project.downloadableFiles.scriptLanguage === 'python' 
                  ? 'Python Pipeline' 
                  : 'DAX & Formulas'}
              </span>
            </button>
          </div>

          {/* Quick Download Button */}
          <div className="hidden sm:flex items-center gap-2 py-2">
            <button
              onClick={handleDownloadDataset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm shadow-sky-400/25"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 bg-sky-50/20">
          
          {/* TAB 1: OVERVIEW & ANALYSIS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* GitHub Repository Live Verified Banner */}
              {project.repoStats && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-sky-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-slate-900 text-white shadow-xs">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-navy-950 font-mono">
                          {project.repoStats.repoName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <GitBranch className="w-3 h-3 text-emerald-600" />
                          <span>Real GitHub Project</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-normal">
                        Language: <span className="font-semibold text-slate-700">{project.repoStats.language}</span> • {project.repoStats.status}
                      </p>
                    </div>
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors shadow-2xs"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Explore Repository Files</span>
                      <ExternalLink className="w-3 h-3 text-sky-500" />
                    </a>
                  )}
                </div>
              )}

              {/* Metrics Ribbon */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs hover:border-sky-300 transition-colors">
                    <div className="text-xs text-slate-500 font-semibold uppercase">{metric.label}</div>
                    <div className="text-xl sm:text-2xl font-black text-navy-950 mt-1">
                      {metric.value}
                    </div>
                    {metric.change && (
                      <div className={`text-[11px] font-bold mt-1 ${
                        metric.positive ? 'text-sky-600' : 'text-slate-500'
                      }`}>
                        {metric.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tools Used Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tools Implemented:</span>
                {project.tools.map(tool => (
                  <span key={tool} className="text-xs font-bold px-3 py-1 rounded-xl bg-white text-sky-800 border border-sky-200 shadow-2xs">
                    {tool}
                  </span>
                ))}
              </div>

              {/* Business Problem & Dataset Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-xs space-y-2.5">
                  <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-sky-600" />
                    <span>The Business Problem</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {project.businessProblem}
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-xs space-y-2.5">
                  <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <Database className="w-4 h-4 text-sky-600" />
                    <span>Dataset Structure</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {project.datasetDescription}
                  </p>
                </div>
              </div>

              {/* Interactive Visualization Chart in White Canvas */}
              <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-sky-600" />
                      <span>Analytical Visualization</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Visual diagnostic derived from demonstration dataset
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                    Interactive Recharts
                  </span>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    {project.id === 'trendpulse-sentiment-intelligence' ? (
                      <BarChart data={project.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }}
                          formatter={(val: any, name: any) => [
                            name === 'articles' ? `${val} Articles` : `${val}%`, 
                            name === 'articles' ? 'ARTICLE COUNT' : name === 'trendScore' ? 'TREND SCORE %' : 'NEGATIVE SENTIMENT %'
                          ]} 
                        />
                        <Legend />
                        <Bar dataKey="articles" name="Article Count" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="trendScore" name="Trend Score %" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="negativePct" name="Negative Sentiment %" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    ) : project.id === 'instamart-customer-intelligence' ? (
                      <BarChart data={project.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }}
                          formatter={(val: any, name: any) => [
                            name === 'revenue' ? `₹${Number(val).toLocaleString('en-IN')}` : `${val}%`, 
                            name === 'revenue' ? 'COMPLETED REVENUE (INR)' : 'REVENUE SHARE %'
                          ]} 
                        />
                        <Legend />
                        <Bar dataKey="revenue" name="Completed Revenue (₹)" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="marginPct" name="Revenue Share %" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    ) : project.id === 'kmeans-from-scratch' ? (
                      <ComposedChart data={project.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis dataKey="k" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 1]} />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="customInertia" name="Custom NumPy Inertia" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                        <Bar yAxisId="left" dataKey="sklearnInertia" name="Scikit-Learn Inertia" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="silhouette" name="Silhouette Score" stroke="#0284C7" strokeWidth={2.5} />
                      </ComposedChart>
                    ) : project.chartType === 'bar' && project.id === 'sales-performance-analysis' ? (
                      <BarChart data={project.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }}
                          formatter={(val: any, name: any) => [
                            name === 'revenue' || name === 'profit' ? formatCurrency(Number(val)) : `${val}%`, 
                            name.toUpperCase()
                          ]} 
                        />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue ($)" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="profit" name="Profit ($)" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    ) : project.chartType === 'bar' && project.id === 'financial-data-analysis' ? (
                      <BarChart data={project.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis dataKey="creditTier" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }} />
                        <Legend />
                        <Bar dataKey="totalLoans" name="Total Loans" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="defaultRatePct" name="Delinquency %" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    ) : project.chartType === 'pie' ? (
                      <PieChart>
                        <Pie
                          data={project.chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                          outerRadius={95}
                          dataKey="value"
                        >
                          {project.chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={SKY_COLORS[index % SKY_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }} formatter={(val: any) => [`${val} Customers`, 'Volume']} />
                      </PieChart>
                    ) : project.chartType === 'composed' ? (
                      <ComposedChart data={project.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }} formatter={(val: any) => [formatCurrency(Number(val)), 'Amount']} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenue" name="Actual Revenue ($)" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                        <Line yAxisId="left" type="monotone" dataKey="target" name="Target ($)" stroke="#0284C7" strokeWidth={2.5} />
                      </ComposedChart>
                    ) : (
                      <BarChart data={project.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px' }} />
                        <Legend />
                        <Bar dataKey="rawData" name="Raw Uncleaned %" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="cleanedData" name="Cleaned Pipeline %" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Methodology & Analytical Steps */}
              <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-xs space-y-3.5">
                <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Analytical Methodology & Implementation Steps</span>
                </h3>
                <div className="space-y-2.5">
                  {project.methodology.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-sky-50/40 p-3 rounded-2xl border border-sky-100">
                      <span className="w-6 h-6 rounded-xl bg-white border border-sky-200 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        {idx + 1}
                      </span>
                      <span className="font-normal">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Findings & Recommendations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Findings */}
                <div className="p-6 rounded-3xl bg-white border border-sky-200/80 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-sky-600" />
                    <span>Key Analytical Findings</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                    {project.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-500 font-bold mt-0.5">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-6 rounded-3xl bg-sky-50/60 border border-sky-200 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-sky-600" />
                    <span>Actionable Business Recommendations</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                    {project.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: DATA PREVIEW & DOWNLOAD */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-sky-100 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold text-navy-950">
                    Demonstration Dataset Records
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">
                    Showing representative sample rows. You can download the complete synthetic CSV file below.
                  </p>
                </div>

                <button
                  onClick={handleDownloadDataset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-400/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {project.downloadableFiles.datasetFilename}</span>
                </button>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-sky-100 overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-sky-50 text-slate-800 uppercase tracking-wider text-[11px] font-bold border-b border-sky-200">
                    <tr>
                      {Object.keys(project.sampleData[0] || {}).map((header) => (
                        <th key={header} className="px-4 py-3 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100 font-mono">
                    {project.sampleData.map((row, index) => (
                      <tr key={index} className="hover:bg-sky-50/50 transition-colors">
                        {Object.values(row).map((val, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-2.5 whitespace-nowrap">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-slate-600 font-normal">
                <span className="font-bold text-navy-950">Dataset Note:</span> This dataset is synthetically compiled to illustrate real-world schema design, business metrics, and edge cases.
              </div>
            </div>
          )}

          {/* TAB 3: CODE & SCRIPTS */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-sky-100 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold text-navy-950">
                    Source Script: {project.downloadableFiles.scriptFilename}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">
                    Written by Revathi Murugan for structured analytical calculation.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-sky-600" />
                        <span className="text-sky-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadScript}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-400/30 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              {/* Code Pre Box */}
              <div className="rounded-2xl overflow-hidden bg-slate-900 text-sky-100 p-4 font-mono text-xs leading-relaxed shadow-inner border border-slate-800 max-h-[480px] overflow-y-auto">
                <pre>{project.downloadableFiles.scriptContent}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-sky-50/70 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            {project.isRealRepo ? (
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                <GitBranch className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified GitHub Codebase & Dataset</span>
              </span>
            ) : (
              <span>Portfolio Showcase Project • Validated Implementation</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-700 hover:bg-sky-50 border border-sky-200 transition-colors shadow-xs"
            >
              Close Window
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
