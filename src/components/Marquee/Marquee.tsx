import React from 'react';

const ITEMS = ['AEM', 'WORKFRONT', 'DATA', 'UI', 'DACOE', 'INNOVATION', 'COLLABORATION', 'EXCELLENCE'];

const MarqueeRow: React.FC<{ reverse?: boolean; speed?: number }> = ({ reverse = false, speed = 25 }) => {
  const content = ITEMS.map((item, i) => (
    <React.Fragment key={i}>
      <span style={{
        fontSize: 'clamp(2rem, 5vw, 4.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: 'var(--text-primary)',
        opacity: 0.06,
        whiteSpace: 'nowrap' as const,
        transition: 'opacity 0.5s ease',
        cursor: 'default',
        userSelect: 'none' as const,
      }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.opacity = '0.25';
          (e.target as HTMLElement).style.color = '#E8302A';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.opacity = '0.06';
          (e.target as HTMLElement).style.color = 'var(--text-primary)';
        }}
      >
        {item}
      </span>
      <span style={{
        color: '#E8302A',
        fontSize: 'clamp(0.5rem, 1vw, 0.8rem)',
        margin: '0 clamp(1rem, 3vw, 2.5rem)',
        opacity: 0.3,
      }}>
        ◆
      </span>
    </React.Fragment>
  ));

  return (
    <div style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite`,
        whiteSpace: 'nowrap' as const,
      }}>
        {content}{content}{content}{content}
      </div>
    </div>
  );
};

const Marquee: React.FC = () => {
  return (
    <section style={{
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '2rem 0',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
      transition: 'background 0.5s ease',
    }}>
      <MarqueeRow speed={35} />
      <div style={{ height: '0.75rem' }} />
      <MarqueeRow reverse speed={30} />
    </section>
  );
};

export default Marquee;
