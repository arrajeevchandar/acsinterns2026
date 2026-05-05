import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TEAMS = [
  { name: 'AEM', fullName: 'Adobe Experience Manager', description: 'Building next-gen content management and digital asset solutions at scale.', color: '#E8302A' },
  { name: 'Workfront', fullName: 'Adobe Workfront', description: 'Streamlining enterprise work management and project collaboration.', color: '#FF6B35' },
  { name: 'Data', fullName: 'Data & Analytics', description: 'Harnessing data intelligence to power personalized customer experiences.', color: '#FFD23F' },
  { name: 'UI', fullName: 'User Interface', description: 'Crafting beautiful, accessible interfaces used by millions worldwide.', color: '#06D6A0' },
  { name: 'DACOE', fullName: 'Ops & Excellence', description: 'Driving operational excellence and innovation across Cloud Services.', color: '#118AB2' },
];

const TeamsPreview: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.08 });

  return (
    <section id="teams" ref={ref} style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
          color: '#E8302A', padding: '8px 20px',
          border: '1px solid rgba(232,48,42,0.2)', borderRadius: '50px',
          background: 'rgba(232,48,42,0.03)', marginBottom: '1.25rem',
        }}>Our Squads</span>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
          letterSpacing: '-0.04em', color: 'var(--text-primary)', margin: 0, lineHeight: 1,
        }}>Meet the Teams</h2>
        <p style={{
          fontSize: '1rem', fontWeight: 300, color: 'var(--text-secondary)',
          margin: '1.25rem auto 0', maxWidth: '500px', lineHeight: 1.7,
        }}>
          Five specialized squads, one unified mission to deliver world-class experiences.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {TEAMS.map((team, index) => (
          <div
            key={team.name}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2.5rem 1.75rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: `${index * 0.08}s`,
              position: 'relative' as const,
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-10px)';
              el.style.borderColor = `${team.color}33`;
              el.style.boxShadow = `0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px ${team.color}22`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = 'var(--border-color)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Top gradient accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, transparent, ${team.color}, transparent)`,
              opacity: 0.5,
            }} />

            {/* Inner glow on top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
              background: `linear-gradient(180deg, ${team.color}08, transparent)`,
              pointerEvents: 'none',
            }} />

            {/* Card number */}
            <div style={{
              fontSize: '0.6rem', fontWeight: 400, color: 'var(--text-muted)',
              letterSpacing: '0.1em', marginBottom: '1.25rem',
              position: 'relative' as const, zIndex: 2,
            }}>0{index + 1}</div>

            <div style={{
              fontSize: '1.6rem', fontWeight: 800, color: team.color,
              marginBottom: '0.25rem', letterSpacing: '-0.02em',
              position: 'relative' as const, zIndex: 2,
            }}>{team.name}</div>

            <div style={{
              fontSize: '0.65rem', fontWeight: 500, color: 'var(--text-muted)',
              marginBottom: '1rem', letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              position: 'relative' as const, zIndex: 2,
            }}>{team.fullName}</div>

            <p style={{
              fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7,
              margin: 0, position: 'relative' as const, zIndex: 2,
            }}>{team.description}</p>
          </div>
        ))}
      </div>

      {/* View All */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="#teams" style={{
          color: '#E8302A', textDecoration: 'none', fontWeight: 500,
          fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          transition: 'opacity 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '8px',
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        >
          View All Teams <span style={{ fontSize: '1.1rem' }}>→</span>
        </a>
      </div>
    </section>
  );
};

export default TeamsPreview;
