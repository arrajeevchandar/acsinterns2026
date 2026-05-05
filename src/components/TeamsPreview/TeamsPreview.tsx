import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TEAMS = [
  {
    name: 'AEM',
    full: 'Adobe Experience Manager',
    desc: 'Content management, digital assets, and experience delivery at enterprise scale.',
  },
  {
    name: 'Workfront',
    full: 'Adobe Workfront',
    desc: 'Work management, intake, planning, approvals, and cross-functional execution.',
  },
  {
    name: 'Data',
    full: 'Data Competency',
    desc: 'Analytics, insights, quality signals, and intelligence that guide product decisions.',
  },
  {
    name: 'UI',
    full: 'User Interface',
    desc: 'Design systems, interaction craft, accessibility, and high-quality product surfaces.',
  },
  {
    name: 'DACOE',
    full: 'Delivery and Cloud Ops Excellence',
    desc: 'Operational excellence, reliability, automation, and enablement across ACS.',
  },
];

const TeamsPreview: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="teams" ref={ref} className="home-section home-section--band">
      <div className="home-wrap">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Teams</span>
          <h2 className="section-heading">Five squads. One cohort pulse.</h2>
          <p className="section-copy">
            The future Teams page can expand these rows into banners, team
            photos, member cards, mentor testimony, and project links.
          </p>
        </div>

        <div className={`teams-cinema ${isVisible ? 'is-visible' : ''}`}>
          {TEAMS.map((team, index) => (
            <article className="team-line" key={team.name} style={{ transitionDelay: `${index * 80}ms` }}>
              <span className="team-line__num">0{index + 1}</span>
              <div>
                <div className="team-line__name">{team.name}</div>
                <span className="team-line__cta">{team.full}</span>
              </div>
              <p>{team.desc}</p>
              <span className="team-line__cta">Open</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsPreview;
