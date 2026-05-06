import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TEAMS, portraitUrl } from './data';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import MemberModal from './MemberModal';
import './TeamDetail.css';

function MemberCard({ member, index, hoveredId, onHover, onLeave, onOpen }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.08 });
  const isHovered = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isHovered;
  const num = String(index + 1).padStart(2, '0');

  return (
    <button
      ref={ref}
      className={`member-card glass reveal ${isVisible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
      style={{ '--reveal-index': index }}
      onClick={() => onOpen(member)}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={onLeave}
      aria-label={`View ${member.name}'s profile`}
    >
      <div className="member-card__redbar" aria-hidden="true" />
      <div className="member-card__shine" aria-hidden="true" />

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
        {(member.stack || []).slice(0, 2).map((s) => (
          <span key={s} className="member-card__chip">{s}</span>
        ))}
      </div>

      <div className="member-card__foot">
        <span className="member-card__uni">{member.university}</span>
        <span className="member-card__arrow" aria-hidden="true">→</span>
      </div>
    </button>
  );
}

export default function TeamDetail() {
  const { slug } = useParams();
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMemberId, setHoveredMemberId] = useState(null);

  const teamIndex = TEAMS.findIndex((t) => t.slug === slug);
  const team = TEAMS[teamIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
