import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, SkillCategory, EducationItem, CertificationItem, ExperienceItem } from '../types';
import { projectsData as defaultProjects } from '../data/projectsData';
import { 
  personalInfo as defaultPersonalInfo, 
  skillCategories as defaultSkillCategories, 
  educationList as defaultEducationList, 
  certificationsList as defaultCertificationsList, 
  experienceList as defaultExperienceList 
} from '../data/portfolioData';
import { addAuditLog } from '../utils/adminService';

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  skills: boolean;
  projects: boolean;
  dashboards: boolean;
  education: boolean;
  experience: boolean;
  contact: boolean;
}

interface PortfolioContextType {
  // Data
  personalInfo: typeof defaultPersonalInfo;
  projects: Project[];
  skillCategories: SkillCategory[];
  educationList: EducationItem[];
  certificationsList: CertificationItem[];
  experienceList: ExperienceItem[];
  sectionVisibility: SectionVisibility;

  // Personal Info CRUD
  updatePersonalInfo: (updates: Partial<typeof defaultPersonalInfo>) => void;

  // Projects CRUD
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Skills CRUD
  addSkillCategory: (category: SkillCategory) => void;
  addSkillToCategory: (categoryTitle: string, skill: SkillCategory['skills'][0]) => void;
  updateSkill: (categoryTitle: string, skillName: string, updates: Partial<SkillCategory['skills'][0]>) => void;
  deleteSkill: (categoryTitle: string, skillName: string) => void;
  deleteSkillCategory: (categoryTitle: string) => void;

  // Education CRUD
  addEducation: (item: EducationItem) => void;
  updateEducation: (index: number, updates: Partial<EducationItem>) => void;
  deleteEducation: (index: number) => void;

  // Certifications CRUD
  addCertification: (item: CertificationItem) => void;
  updateCertification: (index: number, updates: Partial<CertificationItem>) => void;
  deleteCertification: (index: number) => void;

  // Experience CRUD
  addExperience: (item: ExperienceItem) => void;
  updateExperience: (index: number, updates: Partial<ExperienceItem>) => void;
  deleteExperience: (index: number) => void;

  // Section Visibility Toggle
  toggleSectionVisibility: (section: keyof SectionVisibility) => void;

  // Global Reset
  resetAllToDefaults: () => void;
}

const STORAGE_KEYS = {
  PERSONAL_INFO: 'revathi_crud_personal_info_v1',
  PROJECTS: 'revathi_crud_projects_v1',
  SKILLS: 'revathi_crud_skills_v1',
  EDUCATION: 'revathi_crud_education_v1',
  CERTIFICATIONS: 'revathi_crud_certifications_v1',
  EXPERIENCE: 'revathi_crud_experience_v1',
  VISIBILITY: 'revathi_crud_visibility_v1'
};

const DEFAULT_VISIBILITY: SectionVisibility = {
  hero: true,
  about: true,
  skills: true,
  projects: true,
  dashboards: true,
  education: true,
  experience: true,
  contact: true
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization from LocalStorage or Defaults
  const [personalInfo, setPersonalInfo] = useState<typeof defaultPersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultPersonalInfo;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultProjects;
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultSkillCategories;
  });

  const [educationList, setEducationList] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultEducationList;
  });

  const [certificationsList, setCertificationsList] = useState<CertificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultCertificationsList;
  });

  const [experienceList, setExperienceList] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultExperienceList;
  });

  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISIBILITY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_VISIBILITY;
  });

  // Sync to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillCategories));
  }, [skillCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(educationList));
  }, [educationList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certificationsList));
  }, [certificationsList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experienceList));
  }, [experienceList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VISIBILITY, JSON.stringify(sectionVisibility));
  }, [sectionVisibility]);

  // --- PERSONAL INFO CRUD ---
  const updatePersonalInfo = (updates: Partial<typeof defaultPersonalInfo>) => {
    setPersonalInfo(prev => {
      const updated = { ...prev, ...updates };
      addAuditLog('Updated Profile Info', `Modified profile attributes: ${Object.keys(updates).join(', ')}`, 'success');
      return updated;
    });
  };

  // --- PROJECTS CRUD ---
  const addProject = (project: Project) => {
    setProjects(prev => {
      const updated = [project, ...prev];
      addAuditLog('Created Project', `Added new case study: "${project.title}" (${project.category})`, 'success');
      return updated;
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      addAuditLog('Updated Project', `Modified case study ID: ${id}`, 'info');
      return updated;
    });
  };

  const deleteProject = (id: string) => {
    setProjects(prev => {
      const target = prev.find(p => p.id === id);
      const updated = prev.filter(p => p.id !== id);
      addAuditLog('Deleted Project', `Removed case study: "${target?.title || id}"`, 'warning');
      return updated;
    });
  };

  // --- SKILLS CRUD ---
  const addSkillCategory = (category: SkillCategory) => {
    setSkillCategories(prev => {
      const updated = [...prev, category];
      addAuditLog('Created Skill Category', `Added category "${category.title}"`, 'success');
      return updated;
    });
  };

  const addSkillToCategory = (categoryTitle: string, skill: SkillCategory['skills'][0]) => {
    setSkillCategories(prev => {
      const updated = prev.map(cat => {
        if (cat.title === categoryTitle) {
          return { ...cat, skills: [...cat.skills, skill] };
        }
        return cat;
      });
      addAuditLog('Created Skill', `Added skill "${skill.name}" to ${categoryTitle}`, 'success');
      return updated;
    });
  };

  const updateSkill = (categoryTitle: string, skillName: string, updates: Partial<SkillCategory['skills'][0]>) => {
    setSkillCategories(prev => {
      const updated = prev.map(cat => {
        if (cat.title === categoryTitle) {
          return {
            ...cat,
            skills: cat.skills.map(s => s.name === skillName ? { ...s, ...updates } : s)
          };
        }
        return cat;
      });
      addAuditLog('Updated Skill', `Modified skill "${skillName}" in ${categoryTitle}`, 'info');
      return updated;
    });
  };

  const deleteSkill = (categoryTitle: string, skillName: string) => {
    setSkillCategories(prev => {
      const updated = prev.map(cat => {
        if (cat.title === categoryTitle) {
          return { ...cat, skills: cat.skills.filter(s => s.name !== skillName) };
        }
        return cat;
      });
      addAuditLog('Deleted Skill', `Removed skill "${skillName}" from ${categoryTitle}`, 'warning');
      return updated;
    });
  };

  const deleteSkillCategory = (categoryTitle: string) => {
    setSkillCategories(prev => {
      const updated = prev.filter(c => c.title !== categoryTitle);
      addAuditLog('Deleted Skill Category', `Removed category "${categoryTitle}"`, 'warning');
      return updated;
    });
  };

  // --- EDUCATION CRUD ---
  const addEducation = (item: EducationItem) => {
    setEducationList(prev => {
      const updated = [item, ...prev];
      addAuditLog('Created Education', `Added degree: ${item.degree} (${item.institution})`, 'success');
      return updated;
    });
  };

  const updateEducation = (index: number, updates: Partial<EducationItem>) => {
    setEducationList(prev => {
      const updated = prev.map((item, i) => i === index ? { ...item, ...updates } : item);
      addAuditLog('Updated Education', `Updated education item #${index + 1}`, 'info');
      return updated;
    });
  };

  const deleteEducation = (index: number) => {
    setEducationList(prev => {
      const target = prev[index];
      const updated = prev.filter((_, i) => i !== index);
      addAuditLog('Deleted Education', `Removed degree: ${target?.degree || index}`, 'warning');
      return updated;
    });
  };

  // --- CERTIFICATIONS CRUD ---
  const addCertification = (item: CertificationItem) => {
    setCertificationsList(prev => {
      const updated = [item, ...prev];
      addAuditLog('Created Certification', `Added certification: ${item.title} (${item.issuer})`, 'success');
      return updated;
    });
  };

  const updateCertification = (index: number, updates: Partial<CertificationItem>) => {
    setCertificationsList(prev => {
      const updated = prev.map((item, i) => i === index ? { ...item, ...updates } : item);
      addAuditLog('Updated Certification', `Updated certification item #${index + 1}`, 'info');
      return updated;
    });
  };

  const deleteCertification = (index: number) => {
    setCertificationsList(prev => {
      const target = prev[index];
      const updated = prev.filter((_, i) => i !== index);
      addAuditLog('Deleted Certification', `Removed certification: ${target?.title || index}`, 'warning');
      return updated;
    });
  };

  // --- EXPERIENCE CRUD ---
  const addExperience = (item: ExperienceItem) => {
    setExperienceList(prev => {
      const updated = [item, ...prev];
      addAuditLog('Created Experience', `Added role: ${item.role} at ${item.company}`, 'success');
      return updated;
    });
  };

  const updateExperience = (index: number, updates: Partial<ExperienceItem>) => {
    setExperienceList(prev => {
      const updated = prev.map((item, i) => i === index ? { ...item, ...updates } : item);
      addAuditLog('Updated Experience', `Updated experience at #${index + 1}`, 'info');
      return updated;
    });
  };

  const deleteExperience = (index: number) => {
    setExperienceList(prev => {
      const target = prev[index];
      const updated = prev.filter((_, i) => i !== index);
      addAuditLog('Deleted Experience', `Removed experience: ${target?.role} at ${target?.company}`, 'warning');
      return updated;
    });
  };

  // --- VISIBILITY TOGGLE ---
  const toggleSectionVisibility = (section: keyof SectionVisibility) => {
    setSectionVisibility(prev => {
      const updated = { ...prev, [section]: !prev[section] };
      addAuditLog('Toggled Section Visibility', `Section "${section}" set to ${updated[section] ? 'Visible' : 'Hidden'}`, 'info');
      return updated;
    });
  };

  // --- GLOBAL RESET ---
  const resetAllToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PERSONAL_INFO);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
    localStorage.removeItem(STORAGE_KEYS.VISIBILITY);

    setPersonalInfo(defaultPersonalInfo);
    setProjects(defaultProjects);
    setSkillCategories(defaultSkillCategories);
    setEducationList(defaultEducationList);
    setCertificationsList(defaultCertificationsList);
    setExperienceList(defaultExperienceList);
    setSectionVisibility(DEFAULT_VISIBILITY);

    addAuditLog('Reset Portfolio Data', 'Restored all authentic resume and project defaults', 'warning');
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        projects,
        skillCategories,
        educationList,
        certificationsList,
        experienceList,
        sectionVisibility,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addSkillCategory,
        addSkillToCategory,
        updateSkill,
        deleteSkill,
        deleteSkillCategory,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        addExperience,
        updateExperience,
        deleteExperience,
        toggleSectionVisibility,
        resetAllToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
