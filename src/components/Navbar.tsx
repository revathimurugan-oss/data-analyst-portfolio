import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Menu, 
  X, 
  Download, 
  ChevronRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'dashboards', 'education', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Dashboards', href: '#dashboards' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-sky-100/50 border-b border-sky-100 py-3' 
          : 'bg-white/90 backdrop-blur-sm border-b border-sky-100/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border-2 border-sky-200 group-hover:border-sky-400 transition-colors shrink-0">
              <img src="/profile.jpg" alt="Revathi Murugan" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="font-bold text-navy-950 tracking-tight text-base sm:text-lg flex items-center gap-2">
                <span>{personalInfo.name}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  Data Analyst
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                MCA Graduate • Coimbatore, TN
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 border border-sky-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors border border-sky-200 shadow-xs"
              title="Preview and Download Resume"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Resume</span>
            </button>

            <a
              href="/Revathi_Murugan_Resume.pdf"
              download="Revathi_Murugan_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold rounded-xl text-white bg-sky-500 hover:bg-sky-600 shadow-sm shadow-sky-400/30 hover:shadow-md hover:shadow-sky-400/40 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="/Revathi_Murugan_Resume.pdf"
              download="Revathi_Murugan_Resume.pdf"
              className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-200"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-sky-50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg shadow-sky-100/50">
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </a>
            ))}
          </div>
          
          <div className="pt-3 border-t border-sky-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-sky-700 bg-sky-50 border border-sky-200"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Preview Resume PDF</span>
            </button>
            <a
              href="/Revathi_Murugan_Resume.pdf"
              download="Revathi_Murugan_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-500 shadow-sm shadow-sky-400/30"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
