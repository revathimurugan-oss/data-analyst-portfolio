import React, { useState } from 'react';
import { 
  FolderGit2, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  User, 
  Eye, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  RotateCcw, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  FileSpreadsheet,
  Award,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, SkillCategory, EducationItem, CertificationItem, ExperienceItem } from '../types';

export const AdminCrudStudio: React.FC = () => {
  const {
    personalInfo,
    updatePersonalInfo,
    projects,
    addProject,
    updateProject,
    deleteProject,
    skillCategories,
    addSkillCategory,
    addSkillToCategory,
    updateSkill,
    deleteSkill,
    deleteSkillCategory,
    educationList,
    addEducation,
    updateEducation,
    deleteEducation,
    certificationsList,
    addCertification,
    updateCertification,
    deleteCertification,
    experienceList,
    addExperience,
    updateExperience,
    deleteExperience,
    sectionVisibility,
    toggleSectionVisibility,
    resetAllToDefaults
  } = usePortfolio();

  // Sub-tab Navigation
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'skills' | 'experience' | 'education' | 'profile' | 'visibility'>('projects');
  const [successToast, setSuccessToast] = useState('');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // --- PROJECTS CRUD STATE ---
  const [projectSearch, setProjectSearch] = useState('');
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '',
    title: '',
    tagline: '',
    category: 'Sales Analytics',
    tools: [],
    businessProblem: '',
    datasetDescription: '',
    methodology: [],
    findings: [],
    recommendations: [],
    metrics: [
      { label: 'Primary KPI', value: '100%' },
      { label: 'Secondary KPI', value: '100%' }
    ]
  });

  const handleOpenAddProject = () => {
    setProjectForm({
      id: 'custom-proj-' + Date.now(),
      title: '',
      tagline: '',
      category: 'Sales Analytics',
      tools: ['SQL', 'Excel', 'Power BI'],
      businessProblem: '',
      datasetDescription: 'Enterprise business transaction dataset.',
      demoDataLabel: 'Analytical Dataset (Portfolio Case Study)',
      methodology: ['Data cleaning & transformation', 'Exploratory data analysis', 'Statistical modeling'],
      findings: ['Key performance trend identified', 'Operational bottleneck resolved'],
      recommendations: ['Implement continuous monitoring', 'Optimize resource allocation'],
      metrics: [
        { label: 'Revenue Impact', value: '+15.4%', positive: true },
        { label: 'Efficiency Gain', value: '28%', positive: true }
      ],
      chartType: 'bar',
      chartData: [
        { category: 'Segment A', revenue: 120000, profit: 34000 },
        { category: 'Segment B', revenue: 95000, profit: 26000 }
      ],
      sampleData: [
        { ID: '101', Category: 'Segment A', Revenue: 120000, Profit: 34000 }
      ],
      downloadableFiles: {
        datasetFilename: 'analysis_dataset.csv',
        datasetContent: 'ID,Category,Revenue,Profit\n101,Segment A,120000,34000'
      }
    });
    setIsEditingProject(true);
  };

  const handleEditProject = (p: Project) => {
    setProjectForm({ ...p });
    setIsEditingProject(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.id) return;
    const existing = projects.find(p => p.id === projectForm.id);
    if (existing) {
      updateProject(projectForm.id, projectForm as Project);
      triggerToast(`Project "${projectForm.title}" updated successfully!`);
    } else {
      addProject(projectForm as Project);
      triggerToast(`New project "${projectForm.title}" added to showcase!`);
    }
    setIsEditingProject(false);
  };

  // --- SKILLS CRUD STATE ---
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [skillForm, setSkillForm] = useState<{ categoryTitle: string; originalName?: string; name: string; level: string; description: string; tags: string; iconName: string }>({
    categoryTitle: skillCategories[0]?.title || 'Data Analysis & Spreadsheets',
    name: '',
    level: 'Proficient',
    description: '',
    tags: 'SQL, Analytics',
    iconName: 'Database'
  });

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name) return;
    const newSkill = {
      name: skillForm.name,
      level: skillForm.level,
      description: skillForm.description,
      tags: skillForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      iconName: skillForm.iconName || 'Code'
    };

    if (skillForm.originalName) {
      updateSkill(skillForm.categoryTitle, skillForm.originalName, newSkill);
      triggerToast(`Skill "${skillForm.name}" updated!`);
    } else {
      addSkillToCategory(skillForm.categoryTitle, newSkill);
      triggerToast(`Skill "${skillForm.name}" added to ${skillForm.categoryTitle}!`);
    }
    setIsEditingSkill(false);
  };

  // --- EXPERIENCE CRUD STATE ---
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [expIndex, setExpIndex] = useState<number | null>(null);
  const [expForm, setExpForm] = useState<{ role: string; company: string; location: string; period: string; responsibilities: string; strengths: string }>({
    role: '',
    company: '',
    location: 'Salem, Tamil Nadu',
    period: 'July 2024 – Present',
    responsibilities: '',
    strengths: ''
  });

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.role || !expForm.company) return;
    const item: ExperienceItem = {
      role: expForm.role,
      company: expForm.company,
      location: expForm.location,
      period: expForm.period,
      responsibilities: expForm.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
      operationalStrengths: expForm.strengths.split('\n').map(s => s.trim()).filter(Boolean)
    };
    if (expIndex !== null) {
      updateExperience(expIndex, item);
      triggerToast(`Experience at ${item.company} updated!`);
    } else {
      addExperience(item);
      triggerToast(`New experience at ${item.company} added!`);
    }
    setIsEditingExp(false);
  };

  // --- EDUCATION CRUD STATE ---
  const [isEditingEdu, setIsEditingEdu] = useState(false);
  const [eduIndex, setEduIndex] = useState<number | null>(null);
  const [eduForm, setEduForm] = useState<{ degree: string; institution: string; affiliation: string; location: string; score: string; highlights: string }>({
    degree: '',
    institution: '',
    affiliation: 'Anna University',
    location: 'Tamil Nadu',
    score: '83%',
    highlights: ''
  });

  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.degree) return;
    const item: EducationItem = {
      degree: eduForm.degree,
      institution: eduForm.institution,
      affiliation: eduForm.affiliation,
      location: eduForm.location,
      score: eduForm.score,
      highlights: eduForm.highlights.split('\n').map(s => s.trim()).filter(Boolean)
    };
    if (eduIndex !== null) {
      updateEducation(eduIndex, item);
      triggerToast(`Education "${item.degree}" updated!`);
    } else {
      addEducation(item);
      triggerToast(`Education "${item.degree}" added!`);
    }
    setIsEditingEdu(false);
  };

  // --- CERTIFICATIONS CRUD STATE ---
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [certIndex, setCertIndex] = useState<number | null>(null);
  const [certForm, setCertForm] = useState<{ title: string; issuer: string; partner: string; hours: string; date: string; status: 'Completed' | 'Issued'; skillsCovered: string }>({
    title: '',
    issuer: '',
    partner: '',
    hours: '',
    date: '2026',
    status: 'Issued',
    skillsCovered: ''
  });

  const handleSaveCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title) return;
    const item: CertificationItem = {
      title: certForm.title,
      issuer: certForm.issuer,
      partner: certForm.partner,
      hours: certForm.hours,
      date: certForm.date,
      status: certForm.status,
      skillsCovered: certForm.skillsCovered.split('\n').map(s => s.trim()).filter(Boolean)
    };
    if (certIndex !== null) {
      updateCertification(certIndex, item);
      triggerToast(`Certification "${item.title}" updated!`);
    } else {
      addCertification(item);
      triggerToast(`Certification "${item.title}" added!`);
    }
    setIsEditingCert(false);
  };

  // --- PROFILE INFO FORM ---
  const [profileForm, setProfileForm] = useState({
    name: personalInfo.name,
    role: personalInfo.role,
    heroSubtitle: personalInfo.heroSubtitle,
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    native: personalInfo.native,
    linkedin: personalInfo.linkedin,
    github: personalInfo.github
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    triggerToast('Profile & Bio details updated successfully!');
  };

  return (
    <div className="space-y-5">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-emerald-500 hover:text-emerald-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-sky-100 pb-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'projects'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-50/70 text-slate-700 hover:bg-sky-100'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('skills')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'skills'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-50/70 text-slate-700 hover:bg-sky-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Skills ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('experience')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'experience'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-50/70 text-slate-700 hover:bg-sky-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience ({experienceList.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('education')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'education'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-50/70 text-slate-700 hover:bg-sky-100'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education & Certs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'profile'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-50/70 text-slate-700 hover:bg-sky-100'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveSubTab('visibility')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'visibility'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-50/70 text-slate-700 hover:bg-sky-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Sections On/Off</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Restore original authentic resume data and defaults? Any custom added items will be reset.')) {
              resetAllToDefaults();
              triggerToast('Restored authentic dossier defaults successfully!');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-slate-500 hover:text-red-600 border border-slate-200 text-xs font-semibold hover:border-red-200 transition-colors"
          title="Restore authentic resume data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* ========================================================
          SUB-TAB 1: PROJECTS CRUD
          ======================================================== */}
      {activeSubTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
              />
            </div>

            <button
              onClick={handleOpenAddProject}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Project</span>
            </button>
          </div>

          {/* Projects Table / Card List */}
          <div className="space-y-2.5">
            {projects
              .filter(p => p.title.toLowerCase().includes(projectSearch.toLowerCase()) || p.category.toLowerCase().includes(projectSearch.toLowerCase()))
              .map((p) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-2xs hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-navy-950">{p.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{p.tagline}</p>
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {p.tools.map(tool => (
                        <span key={tool} className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      onClick={() => handleEditProject(p)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete project "${p.title}"?`)) {
                          deleteProject(p.id);
                          triggerToast(`Project "${p.title}" deleted.`);
                        }
                      }}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Add/Edit Project Modal */}
          {isEditingProject && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-sky-100">
                <div className="px-6 py-4 bg-sky-50/80 border-b border-sky-100 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-navy-950">
                    {projects.some(p => p.id === projectForm.id) ? 'Edit Case Study Project' : 'Create New Case Study Project'}
                  </h4>
                  <button onClick={() => setIsEditingProject(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Sales Performance & Margin Optimization"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Short Tagline *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.tagline || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      placeholder="One-sentence executive summary..."
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e: any) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950 font-medium"
                      >
                        <option value="AI & NLP Analytics">AI & NLP Analytics</option>
                        <option value="Customer Analytics">Customer Analytics</option>
                        <option value="Machine Learning & Algorithms">Machine Learning & Algorithms</option>
                        <option value="Sales Analytics">Sales Analytics</option>
                        <option value="Financial Analysis">Financial Analysis</option>
                        <option value="Business Intelligence">Business Intelligence</option>
                        <option value="Data Engineering & EDA">Data Engineering & EDA</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tools (comma separated)</label>
                      <input
                        type="text"
                        value={projectForm.tools?.join(', ') || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        placeholder="Python, Scikit-Learn, SQL, Power BI"
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">GitHub Repository URL (Optional)</label>
                      <input
                        type="url"
                        value={projectForm.githubUrl || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value, isRealRepo: Boolean(e.target.value) })}
                        placeholder="https://github.com/revathimurugan-oss/..."
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.isRealRepo || false}
                          onChange={(e) => setProjectForm({ ...projectForm, isRealRepo: e.target.checked })}
                          className="w-4 h-4 text-sky-600 rounded border-sky-300 focus:ring-sky-500"
                        />
                        <span>Verified Real GitHub Repository</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business Problem Definition</label>
                    <textarea
                      rows={3}
                      value={projectForm.businessProblem || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, businessProblem: e.target.value })}
                      placeholder="Explain the commercial or analytical issue resolved..."
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Findings & Insights (one per line)</label>
                    <textarea
                      rows={3}
                      value={projectForm.findings?.join('\n') || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, findings: e.target.value.split('\n').filter(Boolean) })}
                      placeholder="Insight 1&#10;Insight 2"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Strategic Recommendations (one per line)</label>
                    <textarea
                      rows={3}
                      value={projectForm.recommendations?.join('\n') || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, recommendations: e.target.value.split('\n').filter(Boolean) })}
                      placeholder="Actionable takeaway 1&#10;Actionable takeaway 2"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/40 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-sky-100">
                    <button
                      type="button"
                      onClick={() => setIsEditingProject(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                    >
                      Save Project to Portfolio
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: SKILLS CRUD
          ======================================================== */}
      {activeSubTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-950">Manage Technical Competency Cards</span>
            <button
              onClick={() => {
                setSkillForm({
                  categoryTitle: skillCategories[0]?.title || 'Data Analysis & Spreadsheets',
                  name: '',
                  level: 'Proficient',
                  description: '',
                  tags: 'Analytics',
                  iconName: 'Database'
                });
                setIsEditingSkill(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Skill</span>
            </button>
          </div>

          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.title} className="p-4 rounded-2xl bg-white border border-sky-100 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-sky-50">
                  <div>
                    <h5 className="font-bold text-navy-950 text-xs">{category.title}</h5>
                    <p className="text-[11px] text-slate-500">{category.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete entire category "${category.title}"?`)) {
                        deleteSkillCategory(category.title);
                        triggerToast(`Deleted category "${category.title}"`);
                      }
                    }}
                    className="text-[11px] text-red-500 hover:underline"
                  >
                    Delete Category
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="p-2.5 rounded-xl bg-sky-50/40 border border-sky-100 flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-navy-950 text-xs">{skill.name}</div>
                        <div className="text-[10px] text-sky-700 font-semibold">{skill.level}</div>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{skill.description}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setSkillForm({
                              categoryTitle: category.title,
                              originalName: skill.name,
                              name: skill.name,
                              level: skill.level,
                              description: skill.description,
                              tags: skill.tags.join(', '),
                              iconName: skill.iconName
                            });
                            setIsEditingSkill(true);
                          }}
                          className="p-1 rounded text-sky-600 hover:bg-sky-100"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete skill "${skill.name}"?`)) {
                              deleteSkill(category.title, skill.name);
                              triggerToast(`Deleted skill "${skill.name}"`);
                            }
                          }}
                          className="p-1 rounded text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Skill Modal */}
          {isEditingSkill && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sky-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                  <h4 className="text-sm font-bold text-navy-950">
                    {skillForm.originalName ? `Edit Skill: ${skillForm.originalName}` : 'Add New Skill'}
                  </h4>
                  <button onClick={() => setIsEditingSkill(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveSkill} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Category</label>
                    <select
                      value={skillForm.categoryTitle}
                      onChange={(e) => setSkillForm({ ...skillForm, categoryTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950 font-medium"
                    >
                      {skillCategories.map(c => (
                        <option key={c.title} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Skill Name *</label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      placeholder="e.g. SQL (Window Functions)"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Proficiency Level</label>
                    <input
                      type="text"
                      value={skillForm.level}
                      onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                      placeholder="Proficient / Advanced"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Brief Description</label>
                    <textarea
                      rows={2}
                      value={skillForm.description}
                      onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                      placeholder="Key competencies..."
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={skillForm.tags}
                      onChange={(e) => setSkillForm({ ...skillForm, tags: e.target.value })}
                      placeholder="Database, Queries, Joins"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingSkill(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                    >
                      Save Skill
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: EXPERIENCE CRUD
          ======================================================== */}
      {activeSubTab === 'experience' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-950">Operational Experience History</span>
            <button
              onClick={() => {
                setExpIndex(null);
                setExpForm({
                  role: '',
                  company: '',
                  location: 'Salem, Tamil Nadu',
                  period: '2024 – Present',
                  responsibilities: '',
                  strengths: ''
                });
                setIsEditingExp(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Role</span>
            </button>
          </div>

          <div className="space-y-3">
            {experienceList.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-sky-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-navy-950 text-sm">{exp.role}</h5>
                    <div className="text-xs text-sky-700 font-semibold">{exp.company} • {exp.location}</div>
                    <div className="text-[11px] text-slate-400">{exp.period}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setExpIndex(idx);
                        setExpForm({
                          role: exp.role,
                          company: exp.company,
                          location: exp.location,
                          period: exp.period,
                          responsibilities: exp.responsibilities.join('\n'),
                          strengths: exp.operationalStrengths.join('\n')
                        });
                        setIsEditingExp(true);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete experience at "${exp.company}"?`)) {
                          deleteExperience(idx);
                          triggerToast(`Deleted role at ${exp.company}`);
                        }
                      }}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pt-1">
                  {exp.responsibilities.map((r, ri) => (
                    <li key={ri}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Add/Edit Experience Modal */}
          {isEditingExp && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-sky-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                  <h4 className="text-sm font-bold text-navy-950">
                    {expIndex !== null ? 'Edit Experience Role' : 'Add Experience Role'}
                  </h4>
                  <button onClick={() => setIsEditingExp(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveExperience} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Role Title *</label>
                      <input
                        type="text"
                        required
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Company *</label>
                      <input
                        type="text"
                        required
                        value={expForm.company}
                        onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={expForm.location}
                        onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Period</label>
                      <input
                        type="text"
                        value={expForm.period}
                        onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Responsibilities (one per line)</label>
                    <textarea
                      rows={3}
                      value={expForm.responsibilities}
                      onChange={(e) => setExpForm({ ...expForm, responsibilities: e.target.value })}
                      placeholder="Handled operational records with detail..."
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingExp(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                    >
                      Save Role
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: EDUCATION & CERTIFICATIONS CRUD
          ======================================================== */}
      {activeSubTab === 'education' && (
        <div className="space-y-6">
          {/* Education List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy-950">Academic Degrees (Anna University Dossier)</span>
              <button
                onClick={() => {
                  setEduIndex(null);
                  setEduForm({
                    degree: '',
                    institution: '',
                    affiliation: 'Anna University',
                    location: 'Tamil Nadu',
                    score: '83%',
                    highlights: ''
                  });
                  setIsEditingEdu(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {educationList.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-2xs space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h6 className="font-bold text-navy-950 text-xs">{edu.degree}</h6>
                      <p className="text-[11px] text-slate-500">{edu.institution}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                        Score: {edu.score}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEduIndex(idx);
                          setEduForm({
                            degree: edu.degree,
                            institution: edu.institution,
                            affiliation: edu.affiliation || '',
                            location: edu.location,
                            score: edu.score,
                            highlights: edu.highlights.join('\n')
                          });
                          setIsEditingEdu(true);
                        }}
                        className="p-1 rounded text-sky-600 hover:bg-sky-50"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${edu.degree}"?`)) {
                            deleteEducation(idx);
                            triggerToast(`Deleted ${edu.degree}`);
                          }
                        }}
                        className="p-1 rounded text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications List */}
          <div className="space-y-3 pt-4 border-t border-sky-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy-950">Professional Certifications</span>
              <button
                onClick={() => {
                  setCertIndex(null);
                  setCertForm({
                    title: '',
                    issuer: '',
                    partner: '',
                    hours: '300 Hours',
                    date: '2026',
                    status: 'Issued',
                    skillsCovered: ''
                  });
                  setIsEditingCert(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certification</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certificationsList.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-2xs space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h6 className="font-bold text-navy-950 text-xs">{cert.title}</h6>
                      <p className="text-[11px] text-slate-500">{cert.issuer}</p>
                      <div className="text-[10px] text-sky-700 font-semibold">{cert.date} • {cert.status}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setCertIndex(idx);
                          setCertForm({
                            title: cert.title,
                            issuer: cert.issuer,
                            partner: cert.partner || '',
                            hours: cert.hours || '',
                            date: cert.date,
                            status: cert.status,
                            skillsCovered: cert.skillsCovered.join('\n')
                          });
                          setIsEditingCert(true);
                        }}
                        className="p-1 rounded text-sky-600 hover:bg-sky-50"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${cert.title}"?`)) {
                            deleteCertification(idx);
                            triggerToast(`Deleted ${cert.title}`);
                          }
                        }}
                        className="p-1 rounded text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Education Modal */}
          {isEditingEdu && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sky-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                  <h4 className="text-sm font-bold text-navy-950">
                    {eduIndex !== null ? 'Edit Degree' : 'Add Degree'}
                  </h4>
                  <button onClick={() => setIsEditingEdu(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEducation} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Degree Title *</label>
                    <input
                      type="text"
                      required
                      value={eduForm.degree}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                      placeholder="Master of Computer Applications (MCA)"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Institution</label>
                    <input
                      type="text"
                      value={eduForm.institution}
                      onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Score / Percentage</label>
                      <input
                        type="text"
                        value={eduForm.score}
                        onChange={(e) => setEduForm({ ...eduForm, score: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={eduForm.location}
                        onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Highlights (one per line)</label>
                    <textarea
                      rows={3}
                      value={eduForm.highlights}
                      onChange={(e) => setEduForm({ ...eduForm, highlights: e.target.value })}
                      placeholder="Specialized in Database Management..."
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingEdu(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                    >
                      Save Degree
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Cert Modal */}
          {isEditingCert && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sky-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                  <h4 className="text-sm font-bold text-navy-950">
                    {certIndex !== null ? 'Edit Certification' : 'Add Certification'}
                  </h4>
                  <button onClick={() => setIsEditingCert(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCertification} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Certification Title *</label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Issuing Authority / Partner</label>
                    <input
                      type="text"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Issue Date</label>
                      <input
                        type="text"
                        value={certForm.date}
                        onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hours / Duration</label>
                      <input
                        type="text"
                        value={certForm.hours}
                        onChange={(e) => setCertForm({ ...certForm, hours: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Skills Covered (one per line)</label>
                    <textarea
                      rows={3}
                      value={certForm.skillsCovered}
                      onChange={(e) => setCertForm({ ...certForm, skillsCovered: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingCert(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                    >
                      Save Certification
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 5: PROFILE & ABOUT BIO CRUD
          ======================================================== */}
      {activeSubTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-4 bg-white p-5 rounded-2xl border border-sky-100 shadow-xs text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-sky-100">
            <span className="font-bold text-navy-950 uppercase tracking-wider text-xs">
              Candidate Dossier & Personal Contact Details
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Candidate Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Professional Title / Headline</label>
              <input
                type="text"
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Email Address</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Direct Phone Number</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Location</label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Native Town / Region</label>
              <input
                type="text"
                value={profileForm.native}
                onChange={(e) => setProfileForm({ ...profileForm, native: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile Link</label>
              <input
                type="url"
                value={profileForm.linkedin}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">GitHub Profile Link</label>
              <input
                type="url"
                value={profileForm.github}
                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Hero Section Subtitle</label>
              <textarea
                rows={2}
                value={profileForm.heroSubtitle}
                onChange={(e) => setProfileForm({ ...profileForm, heroSubtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/50 border border-sky-200 text-navy-950"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Save Profile Updates
            </button>
          </div>
        </form>
      )}

      {/* ========================================================
          SUB-TAB 6: SECTION VISIBILITY & OPTIONS CRUD
          ======================================================== */}
      {activeSubTab === 'visibility' && (
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-sky-100 shadow-xs text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-sky-100">
            <div>
              <span className="font-bold text-navy-950 uppercase tracking-wider text-xs">
                Section Display & Layout Options
              </span>
              <p className="text-[11px] text-slate-500">
                Toggle individual portfolio sections ON or OFF dynamically.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'hero', label: 'Hero Banner Section', desc: 'Greeting, candidate title, immediate joiner badge, primary CTAs' },
              { key: 'about', label: 'About & Analytical Approach', desc: 'Candidate background, education summary, 4-step framework' },
              { key: 'skills', label: 'Technical Skills Grid', desc: 'Categorized tools (SQL, Excel, Python, Power BI)' },
              { key: 'projects', label: 'Featured Projects Showcase', desc: 'Case studies, code viewers, synthetic CSV downloads' },
              { key: 'dashboards', label: 'Live Interactive BI Cockpit', desc: 'Analytical dashboard with quarter & region slicers' },
              { key: 'education', label: 'Education & Certifications', desc: 'Anna University MCA dossier & AI certifications' },
              { key: 'experience', label: 'Professional Experience', desc: 'Karur Gold Finance cashier & gold appraiser tenure' },
              { key: 'contact', label: 'Direct Recruiter Contact Section', desc: 'Inquiry form, email, phone, location cards' }
            ].map((sec) => {
              const isVisible = sectionVisibility[sec.key as keyof typeof sectionVisibility];
              return (
                <div 
                  key={sec.key}
                  className="p-3 rounded-xl bg-sky-50/40 border border-sky-100 flex items-center justify-between gap-3 hover:border-sky-300 transition-all"
                >
                  <div>
                    <div className="font-bold text-navy-950">{sec.label}</div>
                    <div className="text-[10px] text-slate-500">{sec.desc}</div>
                  </div>

                  <button
                    onClick={() => {
                      toggleSectionVisibility(sec.key as keyof typeof sectionVisibility);
                      triggerToast(`Toggled ${sec.label}: ${!isVisible ? 'Visible' : 'Hidden'}`);
                    }}
                    className={`p-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
                      isVisible 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isVisible ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                    <span className="text-[10px] uppercase font-bold">{isVisible ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
