/**
 * ProjectsPage.tsx — ACS Interns 2026 Projects Page
 *
 * Usage (Next.js App Router):
 *   Place this file at app/projects/page.tsx
 *   Add the Google Fonts link to app/layout.tsx:
 *     <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap" rel="stylesheet"/>
 *   Import the CSS in the same file or in a layout:
 *     import './projects.css';
 *
 * Usage (Vite / CRA):
 *   import './projects.css';
 *   Place <ProjectsPage /> anywhere in your routing.
 */

'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FC,
  type KeyboardEvent,
} from 'react';
import './projects.css';
import { TEAMS, AVATAR_COLORS } from './data';
import type { Project, Team } from './types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(teamIndex: number, projectIndex: number) {
  return AVATAR_COLORS[(teamIndex + projectIndex) % AVATAR_COLORS.length];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  teamIndex: number;
  projectIndex: number;
  onClick: (project: Project, teamIndex: number, projectIndex: number) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  teamIndex,
  projectIndex,
  onClick,
}) => {
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
      <span className="project-card__arrow" aria-hidden="true">↗</span>
      <span className="project-card__tag">{project.tag}</span>
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

// ─────────────────────────────────────────────────────────────────────────────

interface TeamSectionProps {
  team: Team;
  teamIndex: number;
  onProjectClick: (
    project: Project,
    teamIndex: number,
    projectIndex: number
  ) => void;
}

const TeamSection = React.forwardRef<HTMLElement, TeamSectionProps>(
  ({ team, teamIndex, onProjectClick }, ref) => (
  <section ref={ref} className="team-section" id={team.id} aria-labelledby={`${team.id}-heading`}>
    <div className="team-card">
      <div className="team-card__header">
        <div>
          <p className="team-card__label">{team.label}</p>
          <h2 className="team-card__name" id={`${team.id}-heading`}>
            {team.navLabel}
          </h2>
        </div>
        <span className="team-card__count" aria-hidden="true">
          {team.number}
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

// ─────────────────────────────────────────────────────────────────────────────

interface ModalProps {
  project: Project | null;
  teamIndex: number;
  projectIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({
  project,
  teamIndex,
  projectIndex,
  isOpen,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap: focus close button when modal opens
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!project) return null;

  const av = getAvatarColor(teamIndex, projectIndex);

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        {/* Hero */}
        <div className="modal__hero">
          <button
            ref={closeButtonRef}
            className="modal__close"
            aria-label="Close project details"
            onClick={onClose}
          >
            ✕
          </button>
          <p className="modal__team-tag">{project.tag}</p>
          <h2 className="modal__title" id="modal-title">{project.name}</h2>
        </div>

        {/* Body */}
        <div className="modal__body">
          {/* Meta grid */}
          <div className="modal__meta-grid">
            {(
              [
                ['Status', project.status],
                ['Timeline', project.timeline],
                ['Tech Stack', project.stack],
                ['Impact', project.impact],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label} className="modal__meta-item">
                <p className="modal__meta-label">{label}</p>
                <p className="modal__meta-val">{value}</p>
              </div>
            ))}
          </div>

          <div className="modal__divider" />

          {/* Description */}
          <p className="modal__section-title">Overview</p>
          <p className="modal__desc">{project.desc}</p>

          {/* Tags */}
          <div className="modal__tags" role="list" aria-label="Tech tags">
            {project.tags.map((tag) => (
              <span key={tag} className="modal__tag" role="listitem">
                {tag}
              </span>
            ))}
          </div>

          <div className="modal__divider" />

          {/* Author */}
          <p className="modal__section-title">Author</p>
          <div className="modal__author-row">
            <div
              className="modal__avatar"
              style={{ background: av.bg, color: av.color }}
              aria-hidden="true"
            >
              {getInitials(project.author)}
            </div>
            <div>
              <p className="modal__author-name">{project.author}</p>
              <p className="modal__author-role">{project.role}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="modal__footer">
            <button className="btn-primary">View Full Project →</button>
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

interface ModalState {
  project: Project | null;
  teamIndex: number;
  projectIndex: number;
}

const ProjectsPage: FC = () => {
  const [activeTeam, setActiveTeam] = useState<string>(TEAMS[0].id);
  const [modal, setModal] = useState<ModalState>({
    project: null,
    teamIndex: 0,
    projectIndex: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const teamNavRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // ── Active team tracking on scroll ──
  useEffect(() => {
    const handleScroll = () => {
      const offset = 160;
      let current = TEAMS[0].id;
      sectionsRef.current.forEach((section) => {
        if (section && window.scrollY + offset >= section.offsetTop) {
          current = section.id;
        }
      });
      setActiveTeam(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Navigate to team section ──
  const scrollToTeam = useCallback((teamId: string) => {
    setActiveTeam(teamId);
    const el = document.getElementById(teamId);
    if (!el) return;
    const offset = 64 + 52 + 20; // nav + team-nav + gap
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  // ── Modal handlers ──
  const openModal = useCallback(
    (project: Project, teamIndex: number, projectIndex: number) => {
      setModal({ project, teamIndex, projectIndex });
      setIsModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // ── Total project count ──
  const totalProjects = TEAMS.reduce((acc, t) => acc + t.projects.length, 0);
  const totalInterns = 48;

  return (
    <>
      {/* Google Fonts — add to <head> in your layout instead if possible */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap');`}</style>

      {/* ── Navbar ── */}
      <nav className="nav" aria-label="Main navigation">
        <div className="nav__brand">
          <div className="nav__logo" aria-hidden="true" />
          <span className="nav__title">ACS Interns 2026</span>
        </div>
        <ul className="nav__links">
          {['Home', 'Gallery', 'Teams', 'Projects', 'FAQs'].map((item) => (
            <li key={item}>
              <a
                href={item === 'Projects' ? '#' : `/${item.toLowerCase()}`}
                className={item === 'Projects' ? 'active' : ''}
                aria-current={item === 'Projects' ? 'page' : undefined}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav__theme-toggle" role="group" aria-label="Theme">
          <span>Light</span>
          <span className="active">Dark</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__geo" aria-hidden="true">
          <span className="hero__geo-1" />
          <span className="hero__geo-2" />
          <span className="hero__geo-3" />
        </div>

        <p className="hero__eyebrow fade-up">Adobe Cloud Services</p>
        <h1 className="hero__heading fade-up fade-up-1">
          Our<br /><em>Work</em><br />Projects
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
            <p className="hero__stat-num">{totalInterns}</p>
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
        <nav
          ref={teamNavRef}
          className="team-nav"
          aria-label="Jump to team section"
        >
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
            // Attach section ref for scroll tracking
            ref={(el) => {
              if (el) sectionsRef.current[ti] = el;
            }}
          />
        ))}
      </main>

      {/* ── Project Modal ── */}
      <Modal
        project={modal.project}
        teamIndex={modal.teamIndex}
        projectIndex={modal.projectIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProjectsPage;