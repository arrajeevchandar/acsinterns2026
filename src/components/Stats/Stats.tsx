import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const STATS = [
  { value: 30, suffix: '+', label: 'Interns', sublabel: 'Building the future' },
  { value: 5, suffix: '', label: 'Teams', sublabel: 'Cross-functional squads' },
  { value: 15, suffix: '+', label: 'Projects', sublabel: 'Shipped this summer' },
  { value: 1, suffix: '', label: 'Vision', sublabel: 'One unified mission' },
];

const AnimatedNumber: React.FC<{ target: number; isVisible: boolean; suffix: string }> = ({
  target, isVisible, suffix,
}) => {
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1800;
    const steps = Math.max(target * 3, 30);
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{current}{suffix}</span>;
};

const Stats: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} style={{
      padding: '6rem 2rem',
      background: 'var(--bg-secondary)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.5s ease',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(232,48,42,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {STATS.map((stat, index) => (
          <div key={stat.label} style={{
            textAlign: 'center' as const,
            padding: '2.5rem 2rem',
            borderRight: index < STATS.length - 1 ? '1px solid var(--border-color)' : 'none',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
          }}>
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 800,
              color: '#E8302A',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              <AnimatedNumber target={stat.value} isVisible={isVisible} suffix={stat.suffix} />
            </div>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              marginBottom: '0.35rem',
            }}>
              {stat.label}
            </div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 300,
              color: 'var(--text-muted)',
              letterSpacing: '0.03em',
            }}>
              {stat.sublabel}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
