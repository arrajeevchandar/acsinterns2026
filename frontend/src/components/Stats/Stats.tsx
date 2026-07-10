import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const STATS = [
  { value: 35, suffix: '', label: 'Interns' },
  { value: 7, suffix: '', label: 'Teams' },
  { value: 3, suffix: '', label: 'Views' },
  { value: 1, suffix: '', label: 'Portal' },
];

const AnimNum: React.FC<{ target: number; vis: boolean; suffix: string }> = ({ target, vis, suffix }) => {
  const [cur, setCur] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!vis || done.current) return undefined;

    done.current = true;
    const steps = Math.max(target * 3, 28);
    const inc = target / steps;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      setCur(Math.min(Math.round(inc * step), target));
      if (step >= steps) window.clearInterval(timer);
    }, 1500 / steps);

    return () => window.clearInterval(timer);
  }, [vis, target]);

  return <>{cur}{suffix}</>;
};

const Stats: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="home-section home-section--soft">
      <div className="home-wrap stats-cinema">
        {STATS.map((stat) => (
          <article className="stats-cinema__item reveal is-visible" key={stat.label}>
            <div className="stats-cinema__value">
              <AnimNum target={stat.value} vis={isVisible} suffix={stat.suffix} />
            </div>
            <div className="stats-cinema__label">{stat.label}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Stats;
