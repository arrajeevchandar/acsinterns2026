import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import ContributorsModal from './ContributorsModal';
import './Footer.css';

const Footer: React.FC = () => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  const openTeam = useCallback(() => setIsTeamOpen(true), []);
  const closeTeam = useCallback(() => setIsTeamOpen(false), []);

  return (
    <>
      <footer className="footer" id="faqs">
        <div className="footer__mark">
          <AdobeLogo size={30} color="#EB1C24" />
          <span>ACS Interns 2026</span>
        </div>

        <p className="footer__credit">
          Developed by Adobe's Intern 2026.
        </p>

        <div className="footer__links">
          <Link to="/home">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/teams">Teams</Link>
          <a href="#faqs">FAQs</a>
        </div>
      </footer>

      {isTeamOpen && <ContributorsModal onClose={closeTeam} />}
    </>
  );
};

export default Footer;
