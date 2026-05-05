import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const PHASES = [
  { title: 'Orient', cue: 'Day 01', label: 'Badge, laptop, first hello' },
  { title: 'Match', cue: 'Week 01', label: 'Team, mentor, project lane' },
  { title: 'Build', cue: 'Sprint', label: 'Real work, reviews, shipping' },
  { title: 'Demo', cue: 'Finale', label: 'Showcase and celebration' },
];

const Process: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.12 });
  const [active, setActive] = useState(1);

  return (
    <section id="timeline" ref={ref} className="home-section home-section--light">
      <div className="home-wrap phase">
        <div className={`phase__screen reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="phase__head">
            <div className="phase__number">0{active + 1}</div>
            <div className="phase__cue">{PHASES[active].cue}</div>
          </div>
          <div>
            <div className="phase__word">{PHASES[active].title}</div>
            <div className="phase__label">{PHASES[active].label}</div>
          </div>
          <div className="phase__bars">
            {PHASES.map((phase, index) => (
              <button
                type="button"
                key={phase.title}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                aria-label={`Show ${phase.title}`}
              >
                <span>{phase.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={`phase__copy reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Flow</span>
          <h2 className="section-heading">Internship journey.</h2>
        </div>
      </div>
    </section>
  );
};

export default Process;
