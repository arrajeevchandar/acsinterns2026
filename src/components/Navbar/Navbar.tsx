import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

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
      </div>
    </nav>
  );
};

export default Navbar;
