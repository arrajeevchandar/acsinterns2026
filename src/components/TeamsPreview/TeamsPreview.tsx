import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TEAMS = [
  {
    name: 'AEM',
    fullName: 'Adobe Experience Manager',
    description: 'Building the next generation of content management and digital asset solutions.',
    color: '#E8302A',
  },
  {
    name: 'Workfront',
    fullName: 'Adobe Workfront',
    description: 'Streamlining work management and project collaboration at enterprise scale.',
    color: '#FF6B35',
  },
  {
    name: 'Data',
    fullName: 'Data & Analytics',
    description: 'Harnessing data intelligence to power personalized customer experiences.',
    color: '#FFD23F',
  },
  {
    name: 'UI',
    fullName: 'User Interface',
    description: 'Crafting beautiful, accessible interfaces that delight millions of users.',
    color: '#06D6A0',
  },
  {
    name: 'DACOE',
    fullName: 'DACOE',
    description: 'Driving operational excellence and innovation across Adobe Cloud Services.',
    color: '#118AB2',
  },
];

const TeamsPreview: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="teams"
      ref={ref}
      style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: '#E8302A',
          marginBottom: '1rem',
          padding: '6px 16px',
          border: '1px solid rgba(232,48,42,0.3)',
          borderRadius: '50px',
        }}>
          Our Squads
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          Meet the Teams
        </h2>
        <div style={{
          width: '60px',
          height: '3px',
          background: '#E8302A',
          margin: '1.5rem auto 0',
          borderRadius: '2px',
        }} />
      </div>

      {/* Teams Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
      }}>
        {TEAMS.map((team, index) => (
          <div
            key={team.name}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: `${index * 0.1}s`,
              position: 'relative' as const,
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-8px)';
              el.style.borderColor = team.color;
              el.style.boxShadow = `0 20px 60px ${team.color}22, 0 0 0 1px ${team.color}33`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = 'var(--border-color)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Accent bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: team.color,
              opacity: 0.6,
            }} />

            <div style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: team.color,
              marginBottom: '0.25rem',
              letterSpacing: '-0.02em',
            }}>
              {team.name}
            </div>

            <div style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
            }}>
              {team.fullName}
            </div>

            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {team.description}
            </p>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <a
          href="#teams"
          style={{
            color: '#E8302A',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            letterSpacing: '0.02em',
            transition: 'opacity 0.3s ease',
            borderBottom: '2px solid transparent',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.borderBottomColor = '#E8302A';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.borderBottomColor = 'transparent';
          }}
        >
          View All Teams →
        </a>
      </div>
    </section>
  );
};

export default TeamsPreview;
