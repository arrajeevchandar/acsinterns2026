import React from 'react';

const TEAMS = ['AEM', 'WORKFRONT', 'DATA', 'UI', 'DACOE'];

const MarqueeRow: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => {
  const content = TEAMS.map((team, i) => (
    <React.Fragment key={i}>
      <span style={{
        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
        opacity: 0.15,
        whiteSpace: 'nowrap' as const,
        transition: 'opacity 0.3s ease',
      }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.6'; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.15'; }}
      >
        {team}
      </span>
      <span style={{
        color: '#E8302A',
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        margin: '0 1.5rem',
        opacity: 0.4,
      }}>
        ◆
      </span>
    </React.Fragment>
  ));

  return (
    <div style={{
      display: 'flex',
      overflow: 'hidden',
      width: '100%',
      padding: '0.75rem 0',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        animation: reverse
          ? 'marqueeReverse 25s linear infinite'
          : 'marquee 25s linear infinite',
        whiteSpace: 'nowrap' as const,
      }}>
        {/* Duplicate for seamless loop */}
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
};

const Marquee: React.FC = () => {
  return (
    <section style={{
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 0',
      overflow: 'hidden',
      background: 'var(--bg-secondary)',
      transition: 'background 0.4s ease',
    }}>
      <MarqueeRow />
      <MarqueeRow reverse />
    </section>
  );
};

export default Marquee;
