import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const LINKS = [
  ['#home', 'Home'],
  ['#about', 'About'],
  ['#skills', 'Skills'],
  ['#services', 'Services'],
  ['#projects', 'Projects'],
  ['#experience', 'Experience'],
  ['#contact', 'Contact'],
];

export default function Navbar({ scrolled, progress, activeSection, onLogoClick }) {
  const {  toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.slice(1); // "#about" -> "about", "#home" -> "home"
    navigate(`/index.html/${id}`);
    closeMenu();
  };

  // Clicking the logo acts like a fresh load: URL resets to "/" and the
  // branded loader plays again.
  const handleLogoClick = (e) => {
    e.preventDefault();
    onLogoClick?.();
    navigate('/');
    closeMenu();
  };

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" style={{ width: `${progress}%` }}></div>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="container nav-wrap">
          <a href="/" className="logo" onClick={handleLogoClick}>
            <span className="logo-mark">JJRA</span>
            <span className="logo-text">Jonee<span>.dev</span></span>
          </a>

          <nav className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
            {LINKS.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme" onClick={toggleTheme}>
              <Sun className="icon-sun" size={18} strokeWidth={2} />
              <Moon className="icon-moon" size={18} strokeWidth={2} />
            </button>
            <a href="#contact" className="btn btn-primary btn-sm" onClick={(e) => handleNavClick(e, '#contact')}>Hire Me</a>
            <button
              className={`menu-btn${menuOpen ? ' open' : ''}`}
              id="menuBtn"
              aria-label="Menu"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}