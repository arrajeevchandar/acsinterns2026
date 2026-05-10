import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import './Navbar.css';

<<<<<<< HEAD
=======
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Teams', href: '/teams' },
  { label: 'Projects', href: '/projects' },
];

>>>>>>> main
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar" id="navbar">
      <Link to="/teams" className="navbar__brand">
        <svg className="navbar__brand-logo" width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M58.3 7H93v86L58.3 7ZM41.7 7H7v86L41.7 7ZM50 52.5 66.3 93H50.1l-4.9-13H33.6L50 52.5Z" fill="#eb1c24"/>
        </svg>
        <span className="navbar__brand-sep" />
        <span>ACS Interns 2026</span>
      </Link>

<<<<<<< HEAD
      <div className="navbar__right">
        <button
          className={`navbar__theme-toggle navbar__theme-toggle--${theme}`}
          onClick={toggleTheme}
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span>Light</span>
          <span>Dark</span>
        </button>
=======
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.href.startsWith('#') ? (
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={(event) => handleNavClick(event, link.href)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="navbar__link"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar__right">
          <button
            className={`navbar__theme-toggle navbar__theme-toggle--${theme}`}
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span>Light</span>
            <span>Dark</span>
          </button>

          <button
            className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {NAV_LINKS.map((link, i) =>
          link.href.startsWith('#') ? (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={(event) => handleNavClick(event, link.href)}
            >
              <span className="navbar__mobile-link-num">0{i + 1}</span>
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              to={link.href}
              className="navbar__mobile-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="navbar__mobile-link-num">0{i + 1}</span>
              {link.label}
            </Link>
          )
        )}
>>>>>>> main
      </div>
    </nav>
  );
};

export default Navbar;
