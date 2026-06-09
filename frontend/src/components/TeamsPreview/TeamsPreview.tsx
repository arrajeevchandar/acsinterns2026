import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TEAMS = ['CJM', 'Workfront', 'Data', 'UI', 'DACOE'];

const TeamsPreview: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [active, setActive] = useState(0);

  return (
    <section id="teams" ref={ref} className="home-section home-section--light">
      <div className="home-wrap team-switcher">
        <div className={`team-switcher__visual reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="team-switcher__orb">
            <span>{TEAMS[active]}</span>
          </div>
        </div>

        <div className={`team-switcher__panel reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Teams</span>
          <h2 className="section-heading">Pick a squad.</h2>
          <div className="team-switcher__list">
            {TEAMS.map((team, index) => (
              <button
                type="button"
                key={team}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsPreview;
