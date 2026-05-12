import { useEffect, useState } from 'react';
import { MEMBERS_BY_TEAM, TEAMS, type Team, type TeamId } from './data';

interface TeamsOverviewProps {
  onSelectTeam: (teamId: TeamId) => void;
}

export default function TeamsOverview({ onSelectTeam }: TeamsOverviewProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), 100);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="teams-page">
      <section className="teams-hero">
        <div className="teams-hero__mesh" />
        <div className="teams-hero__grid" />
        <div className="teams-hero__beam teams-hero__beam--one" />
        <div className="teams-hero__beam teams-hero__beam--two" />

        <div className={`teams-hero__content ${visible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Teams</span>
          <h1 className="teams-hero__title">Meet the teams.</h1>
          <p className="teams-hero__copy">
            Six squads. Forty-eight interns. One cohort building, measuring, and
            shipping what matters at Adobe this summer.
          </p>

          <div className="teams-hero__stats">
            {[
              { num: '48', label: 'Interns' },
              { num: '06', label: 'Teams' },
              { num: '12', label: 'Weeks' },
            ].map((stat) => (
              <div className="teams-hero__stat" key={stat.label}>
                <span className="teams-hero__stat-num">{stat.num}</span>
                <span className="teams-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="teams-section">
        <div className="teams-section__header">
          <span className="section-kicker">All Squads</span>
          <h2 className="section-heading">Pick your team.</h2>
          <p className="section-copy">
            Each team tackles a distinct surface of the Adobe Customer Solutions
            stack. Click any card to meet the people behind it.
          </p>
        </div>

        <div className="teams-grid">
          {TEAMS.map((team, index) => (
            <TeamCard
              key={team.id}
              team={team}
              index={index}
              onClick={() => onSelectTeam(team.id)}
              visible={visible}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

interface TeamCardProps {
  team: Team;
  index: number;
  onClick: () => void;
  visible: boolean;
}

function TeamCard({ team, index, onClick, visible }: TeamCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`team-tile reveal ${visible ? 'is-visible' : ''} ${hovered ? 'is-hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="button"
    >
      <span className="team-tile__shine" />
      <span className="team-tile__highlight" />
      <span className="team-tile__shutter" />

      <div className="team-tile__top">
        <span className="team-tile__kicker">{team.code}</span>
      </div>

      <div className="team-tile__body">
        <h3 className="team-tile__name">{team.name}</h3>
        <p className="team-tile__tagline">{team.tagline}</p>
      </div>

      <div className="team-tile__stack">
        {team.stack.slice(0, 3).map((item) => (
          <span key={item} className="team-tile__chip">{item}</span>
        ))}
      </div>

      <div className="team-tile__foot">
        <span className="team-tile__count">{MEMBERS_BY_TEAM[team.id].length} interns</span>
        <span className="team-tile__cta">
          <span className="team-tile__cta-icon">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </div>
    </button>
  );
}
