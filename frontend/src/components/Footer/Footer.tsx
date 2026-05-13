import React from 'react';
import { Link } from 'react-router-dom';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="faqs">
      <div className="footer__mark">
        <AdobeLogo size={30} color="#EB1C24" />
        <span>ACS Interns 2026</span>
      </div>
      <div className="footer__links">
        <a href="#hero">Home</a>
        <Link to="/gallery">Gallery</Link>
        <a href="teams">Teams</a>
        <a href="#faqs">FAQs</a>
      </div>
    </footer>
  );
};

export default Footer;