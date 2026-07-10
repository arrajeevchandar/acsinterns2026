import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Teams', href: '/teams' },
  { label: 'Projects', href: '/projects' },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    if (href === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname === href;
  };

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
                className={`navbar__link ${isActive(link.href) ? 'is-active' : ''}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
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
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </span>
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
              className={`navbar__mobile-link ${isActive(link.href) ? 'is-active' : ''}`}
              aria-current={isActive(link.href) ? 'page' : undefined}
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
