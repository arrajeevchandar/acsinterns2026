import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const PHASES = ['Onboard', 'Meet', 'Build', 'Celebrate'];

const Process: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.12 });
  const [active, setActive] = useState(1);

  return (
    <section ref={ref} className="home-section home-section--light">
      <div className="home-wrap phase">
        <div className={`phase__screen reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="phase__number">0{active + 1}</div>
          <div className="phase__word">{PHASES[active]}</div>
          <div className="phase__bars">
            {PHASES.map((phase, index) => (
              <button
                type="button"
                key={phase}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                aria-label={`Show ${phase}`}
              />
            ))}
          </div>
        </div>

        <div className={`phase__copy reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Flow</span>
          <h2 className="section-heading">Tap the timeline.</h2>
        </div>
      </div>
    </section>
  );
};

export default Process;
