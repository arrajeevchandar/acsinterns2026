import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TEAMS, totalMembers, universityBreakdown } from './data';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './TeamsOverview.css';

const allMembers = TEAMS.flatMap((t) => t.members);
const uniCount = universityBreakdown(allMembers).length;

function TeamCard({ team, index }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.08 });
  return (
    <Link
      to={`/teams/${team.slug}`}
      ref={ref}
      className={`teams-overview__card glass reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ '--reveal-index': index }}
    >
      <div className="teams-overview__card-head">
        <span className="teams-overview__card-num">{team.number}</span>
        <span className="teams-overview__card-count">{team.members.length} members</span>
      </div>
      <h2 className="teams-overview__card-name">{team.name}</h2>
      <p className="teams-overview__card-tagline">{team.tagline}</p>
      <span className="teams-overview__card-cta">
        View team <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

function StatsStrip() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div ref={ref} className={`teams-overview__stats reveal ${isVisible ? 'is-visible' : ''}`}>
      {[
        { value: totalMembers, label: 'Interns' },
        { value: TEAMS.length, label: 'Teams' },
        { value: uniCount, label: 'Universities' },
      ].map(({ value, label }, i) => (
        <div key={label} className="teams-overview__stat" style={{ '--reveal-index': i }}>
          <span className="teams-overview__stat-value">{value}</span>
          <span className="teams-overview__stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function TeamsOverview() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const teamNames = TEAMS.map((t) => t.name);

  return (
    <main className="teams-overview">
      {/* Hero */}
      <section className="home-section teams-overview__hero">
        <div className="home-wrap">
          <p className="section-kicker">
            <span className="section-kicker__dot" />
            Cohort 2026
          </p>
          <h1 className="section-heading teams-overview__heading">
            Meet the<br />teams.
          </h1>
          <p className="section-copy">
            {TEAMS.length} teams. {totalMembers} interns. One cohort building across Adobe DX.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="home-section home-section--band teams-overview__stats-section">
        <div className="home-wrap">
          <StatsStrip />
        </div>
      </section>

      {/* Team cards grid */}
      <section className="home-section teams-overview__grid-section">
        <div className="home-wrap">
          <div className="teams-overview__grid">
            {TEAMS.map((team, i) => (
              <TeamCard key={team.slug} team={team} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="teams-overview__ticker" aria-hidden="true">
        <div className="teams-overview__ticker-track">
          {[...teamNames, ...teamNames, ...teamNames].map((name, i) => (
            <span key={i} className="teams-overview__ticker-item">
              {name} <span className="teams-overview__ticker-dot">•</span>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
