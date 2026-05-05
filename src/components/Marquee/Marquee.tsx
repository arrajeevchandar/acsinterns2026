import React from 'react';

const ITEMS = ['AEM', 'WORKFRONT', 'DATA', 'UI', 'DACOE', 'INNOVATION', 'COLLABORATION', 'EXCELLENCE'];

const MarqueeRow: React.FC<{ reverse?: boolean; speed?: number }> = ({ reverse = false, speed = 35 }) => {
  const content = ITEMS.map((item, i) => (
    <React.Fragment key={i}>
      <span style={{
        fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 700,
        letterSpacing: '-0.03em', color: 'var(--text-1)', opacity: 0.05,
        whiteSpace: 'nowrap' as const, transition: 'opacity 0.4s ease',
        cursor: 'default', userSelect: 'none' as const,
      }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.2'; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.05'; }}
      >{item}</span>
      <span style={{ color: 'var(--red)', fontSize: '0.4rem', margin: '0 clamp(1rem, 3vw, 2.5rem)', opacity: 0.2 }}>|</span>
    </React.Fragment>
  ));
  return (
    <div style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite`, whiteSpace: 'nowrap' as const }}>
        {content}{content}{content}{content}
      </div>
    </div>
  );
};

const Marquee: React.FC = () => (
  <section id="gallery" style={{
    borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
    padding: '1.5rem 0', overflow: 'hidden', background: '#050505',
    transition: 'background 0.6s ease',
  }}>
    <MarqueeRow speed={40} />
    <div style={{ height: '0.5rem' }} />
    <MarqueeRow reverse speed={35} />
  </section>
);

export default Marquee;
