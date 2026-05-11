import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Teams', href: '/teams' },
  { label: 'Projects', href: '/projects' },
  { label: 'FAQs', href: '/faqs' },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <Link to="/teams" className="navbar__brand">
        <svg className="navbar__brand-logo" width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M58.3 7H93v86L58.3 7ZM41.7 7H7v86L41.7 7ZM50 52.5 66.3 93H50.1l-4.9-13H33.6L50 52.5Z" fill="#eb1c24"/>
        </svg>
        <span className="navbar__brand-sep" />
        <span>ACS Interns 2026</span>
      </Link>

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
      </div>
    </nav>
  );
};

export default Navbar;
