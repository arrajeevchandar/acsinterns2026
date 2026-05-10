<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TEAMS, portraitUrl, type Member, type Team } from './data';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import MemberModal from './MemberModal';
import './TeamDetail.css';
=======
import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { AVATAR_COLORS, MEMBERS_BY_TEAM, TEAMS, type Member, type TeamId } from './data';

interface TeamDetailProps {
  teamId: TeamId;
  onBack: () => void;
  onSelectMember: (member: Member) => void;
}

export default function TeamDetail({ teamId, onBack, onSelectMember }: TeamDetailProps) {
  const team = TEAMS.find((item) => item.id === teamId);
  const members = MEMBERS_BY_TEAM[teamId] ?? [];
  const teamIndex = TEAMS.findIndex((item) => item.id === teamId);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), 60);
    return () => window.clearTimeout(timeout);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return members;

    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(normalized) ||
        member.role.toLowerCase().includes(normalized) ||
        member.skills.some((skill) => skill.toLowerCase().includes(normalized)) ||
        member.university.toLowerCase().includes(normalized),
    );
  }, [query, members]);

  if (!team) {
    return (
      <div className="detail-page">
        <button className="detail-back" onClick={onBack} type="button">
          <span className="detail-back__arrow">←</span>
          <span>All teams</span>
        </button>
        <div className="no-results">
          <p>Team not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={onBack} type="button">
        <span className="detail-back__arrow">←</span>
        <span>All teams</span>
      </button>

      <header className={`detail-hero reveal ${visible ? 'is-visible' : ''}`}>
        <div className="detail-hero__mesh" />
        <div className="detail-hero__top">
          <span className="section-kicker">Team</span>
        </div>

        <div className="detail-hero__main">
          <div className="detail-hero__text">
            <h1 className="detail-hero__title">{team.name}</h1>
            <p className="detail-hero__tagline">{team.tagline}</p>
            <p className="detail-hero__desc">{team.description}</p>
          </div>

          <div className="detail-hero__meta liquid-glass-card">
            <div className="detail-meta-row">
              <span className="detail-meta-label">Lead</span>
              <span className="detail-meta-value">{team.lead}</span>
            </div>
            <div className="detail-meta-row">
              <span className="detail-meta-label">Members</span>
              <span className="detail-meta-value">{String(members.length).padStart(2, '0')}</span>
            </div>
            <div className="detail-meta-row">
              <span className="detail-meta-label">Stack</span>
              <span className="detail-meta-value">{team.stack.join(' · ')}</span>
            </div>
            <div className="detail-meta-row">
              <span className="detail-meta-label">Cohort</span>
              <span className="detail-meta-value">Summer 2026</span>
            </div>
          </div>
        </div>
      </header>

      <div className="roster-bar">
        <div className="roster-bar__left">
          <span className="section-kicker">Roster</span>
          <span className="roster-bar__count">{filtered.length}</span>
          {filtered.length !== members.length ? (
            <span className="roster-bar__of">/ {members.length}</span>
          ) : null}
        </div>
        <div className="roster-search liquid-glass-card">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search name, role, skill..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button className="roster-search__clear" onClick={() => setQuery('')} type="button">×</button>
          ) : null}
        </div>
      </div>

      <div className="members-grid">
        {filtered.map((member, index) => (
          <MemberCard
            key={member.id}
            member={member}
            index={index}
            teamIndex={teamIndex}
            onClick={() => onSelectMember(member)}
            visible={visible}
          />
        ))}
        {filtered.length === 0 ? (
          <div className="no-results">
            <p>No matches for &quot;<strong>{query}</strong>&quot;</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
>>>>>>> main

interface MemberCardProps {
  member: Member;
  index: number;
<<<<<<< HEAD
  hoveredId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
  onOpen: (member: Member) => void;
}

function MemberCard({ member, index, hoveredId, onHover, onLeave, onOpen }: MemberCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLButtonElement>({ threshold: 0.08 });
  const isHovered = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isHovered;
  const num = String(index + 1).padStart(2, '0');

  return (
    <button
      ref={ref}
      className={`member-card glass reveal ${isVisible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
      style={{ '--reveal-index': index } as React.CSSProperties}
      onClick={() => onOpen(member)}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={onLeave}
      aria-label={`View ${member.name}'s profile`}
=======
  teamIndex: number;
  onClick: () => void;
  visible: boolean;
}

function MemberCard({ member, index, teamIndex, onClick, visible }: MemberCardProps) {
  const avatarColor = AVATAR_COLORS[(teamIndex + index) % AVATAR_COLORS.length];
  const parts = member.id.split('-');
  const idNum = Number.parseInt(parts[1] ?? '1', 10);
  const avatarId = teamIndex * 10 + idNum + 1;
  const avatarUrl = `https://i.pravatar.cc/600?img=${avatarId}`;

  return (
    <button
      className={`member-card reveal ${visible ? 'is-visible' : ''}`}
      style={{
        transitionDelay: `${index * 40}ms`,
        '--avatar-bg': avatarColor.bg,
        '--avatar-color': avatarColor.color,
      } as CSSProperties}
      onClick={onClick}
      aria-label={`View ${member.name}'s profile`}
      type="button"
>>>>>>> main
    >
      <div className="member-card__redbar" aria-hidden="true" />
      <div className="member-card__shine" aria-hidden="true" />

<<<<<<< HEAD
      <div className="member-card__top">
        <div className="member-card__portrait-wrap">
          <img
            src={portraitUrl(member.avatar)}
            alt={member.name}
            className="member-card__portrait"
          />
        </div>
        <span className="member-card__num" aria-hidden="true">{num}</span>
      </div>

      <div className="member-card__info">
        <p className="member-card__name">{member.name}</p>
        <p className="member-card__role">{member.role}</p>
      </div>

      <div className="member-card__skills">
        {member.stack.slice(0, 2).map((s) => (
          <span key={s} className="member-card__chip">{s}</span>
        ))}
      </div>

      <div className="member-card__foot">
        <span className="member-card__uni">{member.university}</span>
        <span className="member-card__arrow" aria-hidden="true">→</span>
=======
      <div className="member-card__hero">
        <img
          src={avatarUrl}
          alt={member.name}
          className="member-card__hero-portrait"
        />
      </div>

      <div className="member-card__body">
        <div className="member-card__info">
          <p className="member-card__name">{member.name}</p>
          <p className="member-card__role">{member.role}</p>
        </div>

        <div className="member-card__skills">
          {member.skills.slice(0, 2).map((skill) => (
            <span key={skill} className="member-card__chip">{skill}</span>
          ))}
        </div>

        <div className="member-card__foot">
          <span className="member-card__uni">{member.university}</span>
          <span className="member-card__arrow" aria-hidden="true">→</span>
        </div>
>>>>>>> main
      </div>
    </button>
  );
}
<<<<<<< HEAD

export default function TeamDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const teamIndex = TEAMS.findIndex((t) => t.slug === slug);
  const team: Team | undefined = TEAMS[teamIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!team) return <Navigate to="/teams" replace />;

  const prevTeam = teamIndex > 0 ? TEAMS[teamIndex - 1] : null;
  const nextTeam = teamIndex < TEAMS.length - 1 ? TEAMS[teamIndex + 1] : null;

  return (
    <main className="team-detail">
      {/* Back link */}
      <div className="home-wrap team-detail__back-row">
        <Link to="/teams" className="team-detail__back">
          <span aria-hidden="true">←</span> All teams
        </Link>
      </div>

      {/* Header */}
      <section className="team-detail__header home-section">
        <div className="home-wrap">
          <p className="team-detail__number">{team.number}</p>
          <h1 className="team-detail__name">{team.name}</h1>
          <p className="team-detail__tagline">{team.tagline}</p>
          <p className="team-detail__mission">{team.mission}</p>
          <p className="team-detail__count">
            <span>{team.members.length}</span> members
          </p>
        </div>
      </section>

      {/* Members */}
      <section className="team-detail__members home-section">
        <div className="home-wrap">
          <p className="section-kicker">
            <span className="section-kicker__dot" />
            The people
          </p>
          <div className="team-detail__grid" onMouseLeave={() => setHoveredMemberId(null)}>
            {team.members.map((member, i) => (
              <MemberCard
                key={member.id}
                member={member}
                index={i}
                hoveredId={hoveredMemberId}
                onHover={setHoveredMemberId}
                onLeave={() => setHoveredMemberId(null)}
                onOpen={setSelectedMember}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Prev / next pager */}
      <section className="team-detail__pager home-section home-section--band">
        <div className="home-wrap team-detail__pager-inner">
          {prevTeam ? (
            <Link to={`/teams/${prevTeam.slug}`} className="team-detail__pager-link">
              <span className="team-detail__pager-dir">← Previous</span>
              <span className="team-detail__pager-name">{prevTeam.name}</span>
            </Link>
          ) : <span />}
          {nextTeam ? (
            <Link to={`/teams/${nextTeam.slug}`} className="team-detail__pager-link team-detail__pager-link--right">
              <span className="team-detail__pager-dir">Next →</span>
              <span className="team-detail__pager-name">{nextTeam.name}</span>
            </Link>
          ) : <span />}
        </div>
      </section>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          team={team}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </main>
  );
}
=======
>>>>>>> main
