import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-600 flex flex-col font-sans selection:bg-sky-400 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar onOpenResumeModal={() => setResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />

        {/* About Section */}
        <About />

        {/* Technical Skills Section */}
        <Skills />

        {/* Featured Projects Showcase */}
        <Projects />

        {/* Interactive Live BI Dashboard Section */}
        <InteractiveDashboardSection />

        {/* Education & Certifications */}
        <EducationCertifications />

        {/* Professional Experience */}
        <Experience />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenResumeModal={() => setResumeModalOpen(true)} />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
