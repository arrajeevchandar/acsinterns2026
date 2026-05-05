import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const STATS = [
  { value: 30, suffix: '+', label: 'Interns' },
  { value: 5, suffix: '', label: 'Teams' },
  { value: 15, suffix: '+', label: 'Projects' },
  { value: 1, suffix: '', label: 'Vision' },
];

const AnimatedNumber: React.FC<{ target: number; isVisible: boolean; suffix: string }> = ({
  target,
  isVisible,
  suffix,
}) => {
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {current}{suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      style={{
        padding: '5rem 2rem',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(232,48,42,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap' as const,
        justifyContent: 'center',
        gap: '1rem',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            style={{
              flex: '1 1 200px',
              maxWidth: '250px',
              textAlign: 'center' as const,
              padding: '2rem 1.5rem',
              borderRight: index < STATS.length - 1 ? '1px solid var(--border-color)' : 'none',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease ${index * 0.15}s`,
            }}
          >
            <div style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              color: '#E8302A',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              <AnimatedNumber target={stat.value} isVisible={isVisible} suffix={stat.suffix} />
            </div>
            <div style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
