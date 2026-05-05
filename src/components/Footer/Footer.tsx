import React from 'react';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="faqs">
      <div className="footer__accent" />
      <div className="footer__grid-bg" />
      <div className="footer__watermark">ACS INTERNS 2026</div>

      <div className="footer__content">
        {/* Brand Column */}
        <div className="footer__brand">
          <div className="footer__brand-name">
            <AdobeLogo size={28} color="#E8302A" />
            ACS Interns 2026
          </div>
          <p className="footer__brand-desc">
            A collaborative portal built by and for the Adobe Cloud Services
            intern cohort of 2026. Innovating together, one sprint at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer__column-title">Quick Links</h4>
          <ul className="footer__column-links">
            <li><a href="#hero" className="footer__column-link">Home</a></li>
            <li><a href="#values" className="footer__column-link">Core Values</a></li>
            <li><a href="#teams" className="footer__column-link">Teams</a></li>
            <li><a href="#gallery" className="footer__column-link">Gallery</a></li>
          </ul>
        </div>

        {/* Teams */}
        <div>
          <h4 className="footer__column-title">Teams</h4>
          <ul className="footer__column-links">
            <li><a href="#teams" className="footer__column-link">AEM</a></li>
            <li><a href="#teams" className="footer__column-link">Workfront</a></li>
            <li><a href="#teams" className="footer__column-link">Data</a></li>
            <li><a href="#teams" className="footer__column-link">UI</a></li>
            <li><a href="#teams" className="footer__column-link">DACOE</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="footer__column-title">Connect</h4>
          <ul className="footer__column-links">
            <li><a href="https://github.com" className="footer__column-link" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://linkedin.com" className="footer__column-link" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="#faqs" className="footer__column-link">FAQs</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          Copyright 2026 Adobe. All rights reserved.
        </p>
        <div className="footer__bottom-links">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#privacy" className="footer__bottom-link">Privacy</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#terms" className="footer__bottom-link">Terms</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#accessibility" className="footer__bottom-link">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
