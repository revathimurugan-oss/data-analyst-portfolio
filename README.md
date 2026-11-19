# Revathi Murugan — Professional Data Analyst Portfolio

A modern, high-performance, responsive Data Analyst Portfolio Website built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**.

Designed specifically for **Entry-Level Data Analyst** and **Junior Data Analyst** hiring pipelines, showcasing practical analytical rigor, relational database querying (SQL), statistical exploratory analysis (Python/Pandas), financial and retail modeling (Excel), and interactive business intelligence (Power BI/Tableau).

---

## 🌟 Portfolio Highlights

- **Design Identity**: **Premium White + Sky Blue Theme** — Pure White (`#FFFFFF`) dominant background with Sky Blue (`#38BDF8` / `#0EA5E9`) highlights, soft blue-grey borders (`#E0F2FE`), Deep Navy headings (`#0F172A`), and Slate Grey body text (`#475569`).
- **Candidate Identity**: Revathi Murugan, MCA Graduate (Anna University, 83% Distinction), based in Coimbatore, Tamil Nadu (Native: Salem).
- **GitHub**: [github.com/revathimurugan-oss](https://github.com/revathimurugan-oss)
- **LinkedIn**: [linkedin.com/in/revathi-murugan-5b8992246](https://www.linkedin.com/in/revathi-murugan-5b8992246/)
- **Core Toolset**: SQL / MySQL, Advanced Excel (XLOOKUP, Pivot Tables, Scenarios), Python (Pandas, NumPy, Matplotlib), Power BI (DAX, Star Schema), Tableau, Power Query, Google Sheets.
- **Genuine Professional Grounding**: Cashier cum Gold Appraiser at Karur Gold Finance (July 2024 – May 2026) — highlighting transaction auditing, ledger reconciliation, operational data integrity, and customer coordination.
- **Authentic Resume Integration**: Direct 1-click download of the genuine candidate resume (`Revathi_Murugan_Resume.pdf`) and an on-page verified preview modal.
- **Interactive BI Cockpit**: Real-time dimensional slicers (Quarter, Region, Category) with dynamic KPI calculations (Gross Revenue, Net Profit %, AOV, Return Rate %) and responsive Recharts graphs.
- **5 Complete Data Analytics Projects**:
  1. **Sales Performance & Revenue Growth Analysis** (Excel, Power BI, SQL)
  2. **Financial Transactions & Loan Portfolio Risk Analysis** (SQL, Python, Excel)
  3. **Customer RFM Segmentation & Behavior Profiling** (Python, SQL, Power BI)
  4. **Executive Business KPI & Operations Dashboard** (Power BI, Excel, Power Query)
  5. **Data Cleaning, Transformation & Exploratory Analysis Pipeline** (Python, Pandas, Excel)
  - Every project includes: Business Problem, Synthetic Dataset Description, Implementation Methodology, Interactive Charts, Findings, Actionable Recommendations, Interactive Tabular Data Previews, and 1-Click Downloads for Synthetic CSVs and SQL/Python source scripts!

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, Lucide React icons, Inter & Plus Jakarta Sans typography
- **Data Visualization**: Recharts (Area, Bar, Composed, and Pie charts)
- **Deployment Ready**: Zero external runtime server dependencies; pre-bundled into static `dist/` HTML, CSS, JS, and PDF assets.

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle is generated in the `dist/` folder.

### 4. Preview the Production Build Locally
```bash
npm run preview
```

---

## 🌐 Free Online Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
1. Push this directory to your GitHub account (e.g., `github.com/revathi-murugan/portfolio`).
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and select your repository.
4. Framework Preset: **Vite** (Vercel detects this automatically).
5. Click **"Deploy"**. Your portfolio will be live at `https://revathi-murugan.vercel.app` in less than a minute!

### Option 2: Deploy to Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Click **"Add new site" > "Import an existing project"**.
3. Choose your repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **"Deploy site"**.

### Option 3: Deploy to GitHub Pages
1. In `vite.config.ts`, set `base: '/<repo-name>/'`.
2. Run `npm run build`.
3. Use `gh-pages` or deploy the `dist/` directory directly via GitHub Actions.

---

## 📁 Project Structure

```
PORTFOLIO/
├── public/
│   ├── favicon.svg                  # Modern analytics favicon
│   └── Revathi_Murugan_Resume.pdf   # Authentic uploaded candidate resume
├── src/
│   ├── components/
│   │   ├── Navbar.tsx               # Sticky responsive navigation with scroll spy
│   │   ├── Hero.tsx                 # Hero section with headline, bio, CTAs & stats
│   │   ├── About.tsx                # Professional summary & MCA background
│   │   ├── Skills.tsx               # Categorized skills with search & tags
│   │   ├── Projects.tsx             # Featured projects cards & category filter
│   │   ├── ProjectModal.tsx         # Comprehensive case study, code viewer & CSV download
│   │   ├── InteractiveDashboardSection.tsx # Real-time interactive BI slicers & KPIs
│   │   ├── EducationCertifications.tsx     # MCA, BCA, HSC, SSLC, and AI/ML Certs
│   │   ├── Experience.tsx           # Cashier cum Gold Appraiser operational record
│   │   ├── Contact.tsx              # Direct contact coordinates & recruiter form
│   │   ├── Footer.tsx               # Professional footer with back-to-top
│   │   ├── ResumeModal.tsx          # Verified resume document preview modal
│   │   └── Icons.tsx                # Reusable LinkedIn and GitHub SVG icons
│   ├── data/
│   │   ├── portfolioData.ts         # User bio, skills, education, experience data
│   │   ├── projectsData.ts          # 5 detailed analytics case studies with code & CSVs
│   │   └── dashboardData.ts         # Synthetic multidimensional records & calculation engine
│   ├── types/
│   │   └── index.ts                 # Full TypeScript interfaces
│   ├── utils/
│   │   └── helpers.ts               # File download, clipboard & currency helpers
│   ├── App.tsx                      # Root application layout
│   ├── main.tsx                     # React root mount
│   └── index.css                    # Tailwind CSS directives & custom scrollbars
├── dist/                            # Production distribution build (generated)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License & Integrity Statement

All demonstration datasets in this repository are synthetic, generated for portfolio showcase and interview assessments. Candidate educational qualifications, certifications (TN Skill Corporation, IIT Patna Vishlesan i-Hub), and operational experience at Karur Gold Finance are authentic representations from Revathi Murugan's curriculum vitae.
