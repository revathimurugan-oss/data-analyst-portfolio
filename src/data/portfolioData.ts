import { SkillCategory, EducationItem, CertificationItem, ExperienceItem } from '../types';

export const personalInfo = {
  name: "Revathi Murugan",
  role: "Aspiring Data Analyst | MCA Graduate",
  heroSubtitle: "An MCA Graduate passionate about Data Analytics, Business Intelligence, and transforming raw data into actionable insights.",
  location: "Coimbatore, Tamil Nadu, India",
  native: "Salem, Tamil Nadu, India",
  phone: "+91 73058 61615",
  email: "revathimcajs@gmail.com",
  linkedin: "https://www.linkedin.com/in/revathi-murugan-5b8992246/",
  github: "https://github.com/revathimurugan-oss",
  aboutParagraphs: [
    "I am an MCA graduate from Anna University (83%) with a strong analytical foundation in data analysis, SQL databases, programming, and data visualization. I am passionate about examining complex business datasets, uncovering underlying patterns, and translating numbers into clear, actionable business strategies.",
    "During my academic tenure and certification training with TN Skill Corporation and IIT Patna Vishlesan i-Hub, I developed hands-on competencies in SQL queries, Advanced Excel modeling, Python data pipelines (Pandas/NumPy), and interactive visual storytelling using Power BI and Tableau.",
    "My professional background as a Cashier cum Gold Appraiser at Karur Gold Finance provided me with real-world exposure to financial transaction handling, customer record maintenance, documentation accuracy, and operational data integrity. This practical grounding in precision and record management reinforces my ability to handle enterprise datasets with meticulous attention to detail.",
    "I am seeking an entry-level Data Analyst or Junior Data Analyst opportunity where I can apply my analytical thinking, database expertise, and visualization capabilities to solve real business challenges and support data-driven decision-making."
  ],
  stats: [
    { label: "Academic Distinction", value: "83% MCA", subtitle: "Anna University" },
    { label: "Core Competencies", value: "SQL & Excel", subtitle: "Data Modeling & ETL" },
    { label: "BI & Visualization", value: "Power BI & Tableau", subtitle: "Interactive Dashboards" },
    { label: "Professional Training", value: "300+ Hours", subtitle: "AI & ML Certifications" }
  ],
  coreStrengths: [
    "Analytical Thinking & Problem Solving",
    "High Attention to Detail & Record Accuracy",
    "Database Querying & Schema Understanding",
    "Data Wrangling, Cleaning & ETL Workflows",
    "Business Intelligence & Dashboard Design",
    "Cross-functional Team Collaboration",
    "Quick Learner & High Adaptability",
    "Effective Communication & Stakeholder Reporting"
  ],
  languages: [
    { name: "English", proficiency: "Professional Working Proficiency" },
    { name: "Tamil", proficiency: "Native / Bilingual Proficiency" }
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Data Analysis & Spreadsheets",
    description: "Spreadsheet modeling, dynamic lookups, automated data transformation, and business calculations.",
    skills: [
      {
        name: "Advanced Excel",
        level: "Proficient",
        description: "Pivot Tables, XLOOKUP, VLOOKUP, INDEX/MATCH, Conditional Formatting, Nested IF, What-If Analysis",
        tags: ["Data Modeling", "Functions", "Pivot Tables"],
        iconName: "FileSpreadsheet"
      },
      {
        name: "Microsoft Power Query",
        level: "Proficient",
        description: "Automated ETL pipelines, data unpivoting, column splitting, merging datasets, data type conversions",
        tags: ["ETL", "Data Cleaning", "M-Code"],
        iconName: "RefreshCw"
      },
      {
        name: "Google Sheets",
        level: "Proficient",
        description: "Collaborative reporting, QUERY functions, IMPORTRANGE, data validation, dynamic summaries",
        tags: ["Cloud Sheets", "QUERY()", "Real-time"],
        iconName: "Table"
      }
    ]
  },
  {
    title: "Database Management",
    description: "Relational database querying, schema design, record integrity, and analytical data extraction.",
    skills: [
      {
        name: "SQL",
        level: "Proficient",
        description: "SELECT, multi-table JOINs, subqueries, Aggregate Functions (GROUP BY, HAVING), CTEs, Window Functions",
        tags: ["Joins", "Aggregation", "Window Functions"],
        iconName: "Database"
      },
      {
        name: "MySQL",
        level: "Proficient",
        description: "Database normalization, table creation, constraints, index optimization, CRUD operations",
        tags: ["RDBMS", "Data Integrity", "Normalization"],
        iconName: "Server"
      },
      {
        name: "Database Concepts & Records",
        level: "Proficient",
        description: "Entity-Relationship modeling, relational integrity, primary/foreign keys, transactional auditing",
        tags: ["ER Modeling", "Data Consistency", "Auditing"],
        iconName: "FolderGit2"
      }
    ]
  },
  {
    title: "Data Visualization & BI",
    description: "Building interactive executive dashboards, KPI scorecards, and visual business narratives.",
    skills: [
      {
        name: "Power BI",
        level: "Proficient",
        description: "DAX calculations (CALCULATE, RELATED, SUMX), Star Schema relationships, interactive slicers, drill-down charts",
        tags: ["DAX", "Star Schema", "Executive KPIs"],
        iconName: "BarChart3"
      },
      {
        name: "Tableau",
        level: "Practical Exposure",
        description: "Calculated fields, dual-axis graphs, interactive storyboards, parameter controls, geographical maps",
        tags: ["Dashboards", "Visual Analytics", "Stories"],
        iconName: "PieChart"
      }
    ]
  },
  {
    title: "Programming & Data Science Foundations",
    description: "Automated scripting, data manipulation libraries, and exploratory statistical analysis.",
    skills: [
      {
        name: "Python",
        level: "Proficient",
        description: "Data manipulation with Pandas, numerical computing with NumPy, visualization with Matplotlib & Seaborn",
        tags: ["Pandas", "NumPy", "EDA", "Matplotlib"],
        iconName: "Code"
      },
      {
        name: "Foundational Programming",
        level: "Academic Foundations",
        description: "Core computer science fundamentals: C, C++, Java, PHP, HTML for web integration",
        tags: ["OOP", "Data Structures", "Algorithms"],
        iconName: "Terminal"
      }
    ]
  },
  {
    title: "Business Operations & Presentation",
    description: "Stakeholder communication, documentation precision, and operational transaction auditing.",
    skills: [
      {
        name: "Microsoft PowerPoint",
        level: "Proficient",
        description: "Executive presentation decks, insight visualization, chart embedding, storytelling for non-technical stakeholders",
        tags: ["Presentations", "Storytelling", "Visual Reports"],
        iconName: "Presentation"
      },
      {
        name: "Transaction Records & Documentation",
        level: "Experienced",
        description: "Audit trail maintenance, operational accuracy, financial ledger verification, customer record coordination",
        tags: ["Accuracy", "Auditing", "Compliance"],
        iconName: "ShieldCheck"
      }
    ]
  }
];

export const educationList: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "The Kavery Engineering College, Salem",
    affiliation: "Anna University",
    location: "Salem, Tamil Nadu",
    score: "83% (First Class with Distinction)",
    highlights: [
      "Specialized in Database Management Systems, Advanced Programming, and Software Engineering.",
      "Graduated with 83% academic standing under Anna University curriculum.",
      "Completed practical lab courses covering SQL database design, Python programming, and enterprise software concepts."
    ]
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Shri Sakthi Kailassh Women's College, Salem",
    affiliation: "Periyar University",
    location: "Salem, Tamil Nadu",
    score: "75% (First Class)",
    highlights: [
      "Rigorous grounding in computer fundamentals, data structures, relational databases, and algorithm logic.",
      "Hands-on exposure to C, C++, Java, and Web Technologies (HTML/PHP).",
      "Participated actively in college tech symposiums and academic seminars."
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "State Board of Tamil Nadu",
    location: "Tamil Nadu",
    score: "68%",
    highlights: [
      "Higher secondary education with focus on science and mathematics fundamentals."
    ]
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "State Board of Tamil Nadu",
    location: "Tamil Nadu",
    score: "87%",
    highlights: [
      "Achieved 87% academic score demonstrating strong analytical and quantitative foundations."
    ]
  }
];

export const certificationsList: CertificationItem[] = [
  {
    title: "Artificial Intelligence Programmer",
    issuer: "TN Skill Corporation (Government of Tamil Nadu)",
    partner: "Cultus Education and Technology Services Pvt. Ltd.",
    hours: "300 Hours Intensive Training",
    date: "Issued: 29 May 2026",
    status: "Issued",
    skillsCovered: [
      "Python for Data Science",
      "Machine Learning Algorithms & Predictive Modeling",
      "Exploratory Data Analysis (EDA)",
      "Model Evaluation Metrics & Feature Engineering",
      "Real-world Data Pipeline Projects"
    ]
  },
  {
    title: "Applied AI & ML Essentials (Tamil)",
    issuer: "Vishlesan i-Hub, IIT Patna",
    partner: "IIT Patna Technology Innovation Hub",
    date: "Completed: 05 November 2026",
    status: "Completed",
    skillsCovered: [
      "AI & Machine Learning Foundations",
      "Statistical Data Concepts & Patterns",
      "Practical Algorithmic Workflows",
      "Modern Applications of AI in Analytics"
    ]
  }
];

export const experienceList: ExperienceItem[] = [
  {
    role: "Cashier cum Gold Appraiser",
    company: "Karur Gold Finance",
    location: "Salem, Tamil Nadu",
    period: "July 2024 – May 2026",
    responsibilities: [
      "Handled high-value customer transactions and maintained accurate operational records with strict attention to detail and zero discrepancies.",
      "Maintained business documentation and day-to-day transaction records, ensuring systematic data accuracy, ledger reconciliation, and organized record keeping.",
      "Coordinated with customers and internal branch teams to facilitate smooth daily operations, customer KYC verification, and transaction processing.",
      "Supported sales and business development initiatives alongside routine operational responsibilities, providing customer service excellence."
    ],
    operationalStrengths: [
      "High Financial & Record Accuracy",
      "Data Reconciliation & Auditing",
      "Regulatory & KYC Compliance",
      "Customer Communication & Relationship Management"
    ]
  }
];
