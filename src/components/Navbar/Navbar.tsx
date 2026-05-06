import React, { useState } from 'react';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useTheme } from '../../hooks/useTheme';
import { useZenith } from '../../context/ZenithContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Teams', href: '#teams' },
  { label: 'FAQs', href: '#faqs', isZenith: true },
];

const Navbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const { openChat } = useZenith();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 30;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string, isZenith?: boolean) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    if (isZenith) {
      openChat();
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <a href="#hero" className="navbar__brand" onClick={(event) => handleNavClick(event, '#hero')}>
          <span className="navbar__brand-logo">
            <AdobeLogo size={28} color="#eb1c24" />
          </span>
          <span className="navbar__brand-sep" />
          <span>ACS Interns 2026</span>
        </a>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${link.isZenith ? 'navbar__link--zenith' : ''}`}
                onClick={(event) => handleNavClick(event, link.href, link.isZenith)}
              >
                {link.isZenith && <span className="navbar__link-dot" />}
                {link.label}
              </a>
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
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={(event) => handleNavClick(event, link.href, link.isZenith)}
          >
            <span className="navbar__mobile-link-num">0{i + 1}</span>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
