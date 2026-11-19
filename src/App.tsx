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
