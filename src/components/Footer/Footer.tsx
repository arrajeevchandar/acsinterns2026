import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import './Footer.css';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#teams') {
      if (location.pathname === '/') {
        document.querySelector('#teams')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/teams');
      }
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 120);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="faqs">
      <div className="footer__mark">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', color: 'inherit' }}>
          <AdobeLogo size={30} color="#EB1C24" />
          <span>ACS Interns 2026</span>
        </Link>
      </div>
      <div className="footer__links">
        <a href="#hero" onClick={(e) => handleAnchorLink(e, '#hero')}>Home</a>
        <a href="#gallery" onClick={(e) => handleAnchorLink(e, '#gallery')}>Gallery</a>
        <a href="#teams" onClick={(e) => handleAnchorLink(e, '#teams')}>Teams</a>
        <a href="#faqs" onClick={(e) => handleAnchorLink(e, '#faqs')}>FAQs</a>
      </div>
    </footer>
  );
};

export default Footer;
