import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'summary', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsOpen(false);
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      setIsOpen(false);
    }
  };

  const navLinkStyle = (id) => ({
    color: activeSection === id ? 'var(--primary-color)' : 'var(--text-color)',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: '0.3s',
    cursor: 'pointer',
    fontWeight: activeSection === id ? 'bold' : 'normal',
    borderBottom: activeSection === id ? '2px solid var(--primary-color)' : 'none'
  });

  return (
    <nav className="glass-panel" style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1000', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0 0 20px 20px' }}>
      <h1 className="neon-text" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => scrollToSection('home')}>Portfolio</h1>

      {/* Desktop Menu */}
      <ul className="nav-links" style={{ display: 'flex', gap: '30px', listStyle: 'none', alignItems: 'center' }}>
        <li><span onClick={() => scrollToSection('home')} style={navLinkStyle('home')}>Home</span></li>
        <li><span onClick={() => scrollToSection('summary')} style={navLinkStyle('summary')}>Summary</span></li>
        <li><span onClick={() => scrollToSection('skills')} style={navLinkStyle('skills')}>Skills</span></li>
        <li><span onClick={() => scrollToSection('experience')} style={navLinkStyle('experience')}>Experience</span></li>
        <li><span onClick={() => scrollToSection('education')} style={navLinkStyle('education')}>Education</span></li>
        <li><span onClick={() => scrollToSection('projects')} style={navLinkStyle('projects')}>Projects</span></li>
        <li><span onClick={() => scrollToSection('certifications')} style={navLinkStyle('certifications')}>Certifications</span></li>
        <li><span onClick={() => scrollToSection('contact')} style={navLinkStyle('contact')}>Contact</span></li>
        <li onClick={toggleTheme} style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
          {isDark ? <FaSun /> : <FaMoon />}
        </li>
        <li><Link to="/login" style={{ padding: '8px 20px', border: '1px solid var(--primary-color)', borderRadius: '20px', color: 'var(--primary-color)', textDecoration: 'none', transition: '0.3s' }}>Login</Link></li>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="hamburger" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--text-color)' }}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu glass-panel" style={{ position: 'absolute', top: '70px', right: '0', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', borderRadius: '0 0 10px 10px' }}>
          <span onClick={() => scrollToSection('home')} style={navLinkStyle('home')}>Home</span>
          <span onClick={() => scrollToSection('summary')} style={navLinkStyle('summary')}>Summary</span>
          <span onClick={() => scrollToSection('skills')} style={navLinkStyle('skills')}>Skills</span>
          <span onClick={() => scrollToSection('projects')} style={navLinkStyle('projects')}>Projects</span>
          <span onClick={() => scrollToSection('experience')} style={navLinkStyle('experience')}>Experience</span>
          <span onClick={() => scrollToSection('education')} style={navLinkStyle('education')}>Education</span>
          <span onClick={() => scrollToSection('certifications')} style={navLinkStyle('certifications')}>Certifications</span>
          <span onClick={() => scrollToSection('contact')} style={navLinkStyle('contact')}>Contact</span>
          <div onClick={() => { toggleTheme(); toggleMenu(); }} style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
            {isDark ? <FaSun /> : <FaMoon />}
          </div>
          <Link to="/login" onClick={toggleMenu} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '1.1rem' }}>Login</Link>
        </div>
      )}

      <style>{`
                @media (max-width: 768px) {
                    .nav-links {
                        display: none !important;
                    }
                    .hamburger {
                        display: block !important;
                    }
                }
            `}</style>
    </nav>
  );
};

export default Navbar;
