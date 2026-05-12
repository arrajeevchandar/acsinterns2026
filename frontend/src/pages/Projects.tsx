'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FC,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import './projects.css';
import { TEAMS, AVATAR_COLORS } from '../components/projects/data';
import type { Project, Team } from '../components/projects/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase();
}

function getAvatarColor(teamIndex: number, projectIndex: number) {
  return AVATAR_COLORS[(teamIndex + projectIndex) % AVATAR_COLORS.length];
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  teamIndex: number;
  projectIndex: number;
  onClick: (project: Project, teamIndex: number, projectIndex: number) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, teamIndex, projectIndex, onClick }) => {
  const av = getAvatarColor(teamIndex, projectIndex);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(project, teamIndex, projectIndex);
    }
  };

  return (
    <div
      className="project-card"
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.name} by ${project.author}`}
      onClick={() => onClick(project, teamIndex, projectIndex)}
      onKeyDown={handleKeyDown}
    >
      <p className="project-card__name">{project.name}</p>
      <div className="project-card__author">
        <div
          className="project-card__avatar"
          style={{ background: av.bg, color: av.color }}
          aria-hidden="true"
        >
          {getInitials(project.author)}
        </div>
        <span className="project-card__author-name">{project.author}</span>
      </div>
    </div>
  );
};

// ─── Team Section ─────────────────────────────────────────────────────────────

interface TeamSectionProps {
  team: Team;
  teamIndex: number;
  onProjectClick: (project: Project, teamIndex: number, projectIndex: number) => void;
}

const TeamSection = React.forwardRef<HTMLElement, TeamSectionProps>(
  ({ team, teamIndex, onProjectClick }, ref) => (
    <section
      ref={ref}
      className="team-section"
      id={team.id}
      aria-labelledby={`${team.id}-heading`}
    >
      <div className="team-card">
        <div className="team-card__header">
          <div>
            <h2 className="team-card__name" id={`${team.id}-heading`}>
              Team {team.navLabel}
            </h2>
          </div>
          <span className="team-card__count" aria-hidden="true">
            {team.number} Projects
          </span>
        </div>
        <div className="project-grid" role="list">
          {team.projects.map((project, pi) => (
            <div key={project.id} role="listitem">
              <ProjectCard
                project={project}
                teamIndex={teamIndex}
                projectIndex={pi}
                onClick={onProjectClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
);
TeamSection.displayName = 'TeamSection';

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  project: Project | null;
  teamIndex: number;
  projectIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ project, teamIndex, projectIndex, isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus close button on open
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Scroll lock — matches reference pattern
  useEffect(() => {
    if (isOpen) document.body.classList.add('modal-open');
    else        document.body.classList.remove('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  // Don't render to DOM at all when closed (re-mount triggers animation fresh)
  if (!isOpen || !project) return null;

  const av = getAvatarColor(teamIndex, projectIndex);

  const panel = (
    <div
      className="project-modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="project-modal">
        {/* ── Top accent line ── */}
        <div className="project-modal__accent-line" aria-hidden="true" />

        {/* ── Header ── */}
        <div className="project-modal__hero">
          <button
            ref={closeButtonRef}
            className="project-modal__close"
            aria-label="Close project details"
            onClick={onClose}
            type="button"
          >
            <span aria-hidden="true">✕</span>
          </button>
          <p className="project-modal__team-tag">{project.tag}</p>
          <h2 className="project-modal__title" id="modal-title">{project.name}</h2>
        </div>

        {/* ── Body ── */}
        <div className="project-modal__body">

          {/* Meta chips: Timeline + Stack */}
          <div className="project-modal__meta-grid">
            {(['Timeline', 'Tech Stack'] as const).map((label) => (
              <div key={label} className="project-modal__meta-item">
                <p className="project-modal__meta-label">{label}</p>
                <p className="project-modal__meta-val">
                  {label === 'Timeline' ? project.timeline : project.stack}
                </p>
              </div>
            ))}
          </div>

          <div className="project-modal__divider" />

          {/* Overview */}
          <p className="project-modal__section-title">Overview</p>
          <p className="project-modal__desc">{project.desc}</p>

          <div className="project-modal__divider" />

          {/* Intern */}
          <p className="project-modal__section-title">Intern</p>
          <div className="project-modal__author-row">
            <div
              className="project-modal__avatar"
              style={{ background: av.bg, color: av.color }}
              aria-hidden="true"
            >
              {getInitials(project.author)}
            </div>
            <div>
              <p className="project-modal__author-name">{project.author}</p>
              <p className="project-modal__author-role">{project.role}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="project-modal__footer">
            <button className="btn-primary">View Full Project →</button>
            <button className="btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render into <body> so it floats above everything
  return createPortal(panel, document.body);
};

// ─── Main Page ────────────────────────────────────────────────────────────────

interface ModalState {
  project: Project | null;
  teamIndex: number;
  projectIndex: number;
}

const ProjectsPage: FC = () => {
  const [activeTeam, setActiveTeam]   = useState<string>(TEAMS[0].id);
  const [modal, setModal]             = useState<ModalState>({ project: null, teamIndex: 0, projectIndex: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionsRef    = useRef<HTMLElement[]>([]);
  const teamNavRef     = useRef<HTMLElement>(null);

  // ── Active team highlight on scroll ───────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const offset = 160;
      let current  = TEAMS[0].id;
      sectionsRef.current.forEach((s) => {
        if (s && window.scrollY + offset >= s.offsetTop) current = s.id;
      });
      setActiveTeam(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Team nav scroll ────────────────────────────────────────────────────────
  const scrollToTeam = useCallback((teamId: string) => {
    setActiveTeam(teamId);
    const el = document.getElementById(teamId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (64 + 52 + 20);
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  // ── Modal handlers ─────────────────────────────────────────────────────────
  const openModal  = useCallback((p: Project, ti: number, pi: number) => {
    setModal({ project: p, teamIndex: ti, projectIndex: pi });
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const totalProjects = TEAMS.reduce((acc, t) => acc + t.projects.length, 0);

  return (
    <section id="projects">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap');`}</style>

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__geo" aria-hidden="true">
          <span className="hero__geo-1" />
          <span className="hero__geo-2" />
          <span className="hero__geo-3" />
        </div>

        <h1 className="hero__heading fade-up fade-up-1">
          <em>Capstone</em><br />Projects
        </h1>
        <p className="hero__sub fade-up fade-up-2">
          Summer 2026 intern projects across every team. Ideas turned into impact.
        </p>
        <div className="hero__stats fade-up fade-up-3" aria-label="Portal statistics">
          <div>
            <p className="hero__stat-num">{totalProjects}</p>
            <p className="hero__stat-label">Projects</p>
          </div>
          <div>
            <p className="hero__stat-num">{TEAMS.length}</p>
            <p className="hero__stat-label">Teams</p>
          </div>
          <div>
            <p className="hero__stat-num">32</p>
            <p className="hero__stat-label">Interns</p>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <div className="hero__scroll-dots">
            <span className="active" /><span /><span /><span />
          </div>
        </div>
      </header>

      {/* ── Sticky Team Nav ── */}
      <div className="team-nav-wrapper">
        <nav ref={teamNavRef} className="team-nav" aria-label="Jump to team section">
          {TEAMS.map((team) => (
            <button
              key={team.id}
              className={`team-nav__btn${activeTeam === team.id ? ' active' : ''}`}
              aria-current={activeTeam === team.id ? 'true' : undefined}
              onClick={() => scrollToTeam(team.id)}
            >
              {team.navLabel}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Project Sections ── */}
      <main className="projects-wrapper" id="main-content">
        {TEAMS.map((team, ti) => (
          <TeamSection
            key={team.id}
            team={team}
            teamIndex={ti}
            onProjectClick={openModal}
            ref={(el) => { if (el) sectionsRef.current[ti] = el; }}
          />
        ))}
      </main>

      {/* ── Modal ── */}
      <Modal
        project={modal.project}
        teamIndex={modal.teamIndex}
        projectIndex={modal.projectIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default ProjectsPage;