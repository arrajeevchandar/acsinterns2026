import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__mark">
        <Link to="/teams" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', color: 'inherit' }}>
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M58.3 7H93v86L58.3 7ZM41.7 7H7v86L41.7 7ZM50 52.5 66.3 93H50.1l-4.9-13H33.6L50 52.5Z" fill="#eb1c24"/>
          </svg>
          <span>ACS Interns 2026</span>
        </Link>
      </div>
      <div className="footer__links">
        <Link to="/teams">Teams</Link>
      </div>
    </footer>
  );
};

export default Footer;
