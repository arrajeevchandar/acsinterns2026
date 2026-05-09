// Teams Overview — matching ACS Interns 2026 design system exactly

const { useState, useEffect, useRef, useMemo } = React;

function TeamsOverview({ onSelectTeam }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className="teams-page">
      {/* Hero */}
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
            ].map((s) => (
              <div className="teams-hero__stat" key={s.label}>
                <span className="teams-hero__stat-num">{s.num}</span>
                <span className="teams-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
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
          {TEAMS.map((team, i) => (
            <TeamCard
              key={team.id}
              team={team}
              index={i}
              members={MEMBERS_BY_TEAM[team.id]}
              onClick={() => onSelectTeam(team.id)}
              visible={visible}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function TeamCard({ team, index, members, onClick, visible }) {
  const num = String(index + 1).padStart(2, '0');
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`team-tile reveal ${visible ? 'is-visible' : ''} ${hovered ? 'is-hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* glass shimmer layers */}
      <span className="team-tile__shine" />
      <span className="team-tile__highlight" />
      {/* red shutter that sweeps up on hover */}
      <span className="team-tile__shutter" />

      <div className="team-tile__top">
        <span className="team-tile__kicker">{team.code}</span>
      </div>

      <div className="team-tile__body">
        <h3 className="team-tile__name">{team.name}</h3>
        <p className="team-tile__tagline">{team.tagline}</p>
      </div>

      <div className="team-tile__stack">
        {team.stack.slice(0, 3).map((s) => (
          <span key={s} className="team-tile__chip">{s}</span>
        ))}
      </div>

      <div className="team-tile__foot">
        <span className="team-tile__count">{members.length} interns</span>
        <span className="team-tile__cta">
          <span className="team-tile__cta-icon">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </span>
      </div>
    </button>
  );
}

window.TeamsOverview = TeamsOverview;
