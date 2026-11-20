import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { InteractiveDashboardSection } from './components/InteractiveDashboardSection';
import { EducationCertifications } from './components/EducationCertifications';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AdminModal } from './components/AdminModal';
import { trackEvent } from './utils/adminService';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { ShieldCheck } from 'lucide-react';

const PortfolioAppContent: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const { sectionVisibility } = usePortfolio();

  useEffect(() => {
    // Record page view telemetry
    trackEvent('page_view');

    // URL Hash listener for #admin
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setAdminModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Keyboard shortcut listener: Ctrl + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-600 flex flex-col font-sans selection:bg-sky-400 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar 
        onOpenResumeModal={() => setResumeModalOpen(true)} 
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Main Content Sections with Dynamic Visibility Controls */}
      <main className="flex-grow">
        {/* Hero Section */}
        {sectionVisibility.hero && (
          <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />
        )}

        {/* About Section */}
        {sectionVisibility.about && <About />}

        {/* Technical Skills Section */}
        {sectionVisibility.skills && <Skills />}

        {/* Featured Projects Showcase */}
        {sectionVisibility.projects && <Projects />}

        {/* Interactive Live BI Dashboard Section */}
        {sectionVisibility.dashboards && <InteractiveDashboardSection />}

        {/* Education & Certifications */}
        {sectionVisibility.education && <EducationCertifications />}

        {/* Professional Experience */}
        {sectionVisibility.experience && <Experience />}

        {/* Contact Section */}
        {sectionVisibility.contact && <Contact />}
      </main>

      {/* Footer */}
      <Footer 
        onOpenResumeModal={() => setResumeModalOpen(true)} 
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Admin Operations & Recruiter Leads Control Center */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
      {/* Floating Quick Admin Studio Access Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setAdminModalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white shadow-lg shadow-sky-500/20 backdrop-blur-md border border-sky-400/40 hover:border-sky-400 text-xs font-bold transition-all duration-300 hover:scale-105 cursor-pointer"
          title="Open Admin Studio & CRUD Controls (PIN: 2026)"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <ShieldCheck className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Admin Studio</span>
        </button>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
};

export default App;
