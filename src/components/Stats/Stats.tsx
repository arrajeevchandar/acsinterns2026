import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const STATS = [
  { value: 30, suffix: '+', label: 'Interns', sub: 'Profiles, teams, and stories' },
  { value: 5, suffix: '', label: 'Squads', sub: 'AEM, Workfront, Data, UI, DACOE' },
  { value: 15, suffix: '+', label: 'Builds', sub: 'Projects and prototypes' },
  { value: 1, suffix: '', label: 'Portal', sub: 'One home for the cohort' },
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
    <section ref={ref} className="home-section home-section--dark">
      <div className="home-wrap stats-cinema">
        {STATS.map((stat) => (
          <article className="stats-cinema__item reveal is-visible" key={stat.label}>
            <div className="stats-cinema__value">
              <AnimNum target={stat.value} vis={isVisible} suffix={stat.suffix} />
            </div>
            <div className="stats-cinema__label">{stat.label}</div>
            <div className="stats-cinema__sub">{stat.sub}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Stats;
