import React, { useState } from 'react';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Projects', href: '#projects' },
  { label: 'Teams', href: '#teams' },
  { label: 'FAQs', href: '#faqs' },
];

const Navbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 50;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        {/* Brand */}
        <a href="#hero" className="navbar__brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <span className="navbar__brand-logo">
            <AdobeLogo size={32} color="#E8302A" />
          </span>
          <span>ACS Interns 2026</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="navbar__right">
          {/* Theme Toggle */}
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger */}
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

      {/* Mobile Menu Overlay */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
