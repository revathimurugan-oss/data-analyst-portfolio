export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  tools: string[];
  businessProblem: string;
  datasetDescription: string;
  methodology: string[];
  findings: string[];
  recommendations: string[];
  demoDataLabel: string;
  sampleData: Array<Record<string, string | number>>;
  downloadableFiles: {
    datasetFilename: string;
    datasetContent: string;
    scriptFilename?: string;
    scriptContent?: string;
    scriptLanguage?: string;
    additionalNote?: string;
  };
  metrics: {
    label: string;
    value: string;
    change?: string;
    positive?: boolean;
  }[];
  chartType: 'bar' | 'line' | 'pie' | 'composed' | 'comparison';
  chartData: any[];
  githubUrl?: string;
  isRealRepo?: boolean;
  repoStats?: {
    repoName: string;
    language: string;
    stars?: number;
    forks?: number;
    status?: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    description: string;
    tags: string[];
    iconName: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  affiliation?: string;
  location: string;
  score: string;
  period?: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  hours?: string;
  partner?: string;
  date: string;
  status: 'Completed' | 'Issued';
  skillsCovered: string[];
  certificatePdfUrl?: string;
  certificateImageUrl?: string;
  certificateNo?: string;
  enrolmentNo?: string;
  recognitionCode?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  operationalStrengths: string[];
}
