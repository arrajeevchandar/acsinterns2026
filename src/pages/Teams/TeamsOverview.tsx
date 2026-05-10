<<<<<<< HEAD
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TEAMS, totalMembers, universityBreakdown, type Team } from './data';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './TeamsOverview.css';

const allMembers = TEAMS.flatMap((t) => t.members);
const uniCount = universityBreakdown(allMembers).length;

interface TeamCardProps {
  team: Team;
  index: number;
  hoveredId: string | null;
  onHover: (slug: string) => void;
  onLeave: () => void;
}

function TeamCard({ team, index, hoveredId, onHover, onLeave }: TeamCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const { ref: revealRef, isVisible } = useIntersectionObserver<HTMLAnchorElement>({ threshold: 0.08 });

  const setRefs = (node: HTMLAnchorElement | null) => {
    cardRef.current = node;
    (revealRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${y * -4}deg`);
      el.style.setProperty('--ry', `${x * 4}deg`);
      el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    };
    const onML = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onML);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onML);
    };
  }, []);

  const isHovered = hoveredId === team.slug;
  const isDimmed = hoveredId !== null && !isHovered;
  const code = team.slug.toUpperCase().slice(0, 2);

  const stackChips = useMemo(() => {
    const counts: Record<string, number> = {};
    team.members.forEach((m) => m.stack.forEach((s) => { counts[s] = (counts[s] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s]) => s);
  }, [team.members]);

  return (
    <Link
      to={`/teams/${team.slug}`}
      ref={setRefs}
      className={`team-card glass reveal ${isVisible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
      style={{ '--reveal-index': index } as React.CSSProperties}
      onMouseEnter={() => onHover(team.slug)}
      onMouseLeave={onLeave}
    >
      <div className="team-card__redwash" aria-hidden="true" />
      <div className="team-card__shine" aria-hidden="true" />
      <div className="team-card__noise" aria-hidden="true" />

      <div className="team-card__top">
        <span className="team-card__num">{team.number}</span>
        <span className="team-card__code">{code}</span>
      </div>

      <span className="team-card__bignum" aria-hidden="true">{team.number}</span>

      <div className="team-card__glyph" aria-hidden="true">
        <span className="team-card__glyph-square" />
        <span className="team-card__glyph-line" />
        <span className="team-card__glyph-dot" />
      </div>

      <div className="team-card__body">
        <h2 className="team-card__name">{team.name}</h2>
        <p className="team-card__tagline">{team.tagline}</p>
      </div>

      <div className="team-card__foot">
        <div className="team-card__stack">
          {stackChips.map((s) => (
            <span key={s} className="team-card__chip">{s}</span>
          ))}
        </div>
        <div className="team-card__meta">
          <div className="team-card__avatars">
            {team.members.slice(0, 4).map((m, j) => {
              const initials = m.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
              return (
                <span key={m.id} className="team-card__mini-avatar" style={{ zIndex: 4 - j }}>
                  {initials}
                </span>
              );
            })}
          </div>
          <span className="team-card__count">{team.members.length} members</span>
        </div>
      </div>

      <span className="team-card__cta" aria-hidden="true">
        <span>Meet the team</span>
        <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
          <path d="M5 11h12M12 6l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
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
        <div key={label} className="teams-overview__stat" style={{ '--reveal-index': i } as React.CSSProperties}>
          <span className="teams-overview__stat-value">{value}</span>
          <span className="teams-overview__stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function TeamsOverview() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
          <div className="teams-overview__grid" onMouseLeave={() => setHoveredId(null)}>
            {TEAMS.map((team, i) => (
              <TeamCard
                key={team.slug}
                team={team}
                index={i}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onLeave={() => setHoveredId(null)}
              />
=======
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
>>>>>>> main
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
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
=======
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
      style={{ transitionDelay: `${index * 80}ms` }}
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
>>>>>>> main
  );
}
