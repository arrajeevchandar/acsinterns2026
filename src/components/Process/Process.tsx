import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const WEEKS = [
  { week: 'Week 1', title: 'Orientation', detail: 'Welcome, setup, Adobe tools, ACS intro.' },
  { week: 'Week 2', title: 'Team Match', detail: 'Meet mentors, choose lanes, understand team goals.' },
  { week: 'Week 3', title: 'Discovery', detail: 'Explore codebases, product context, user journeys.' },
  { week: 'Week 4', title: 'Prototype', detail: 'First screens, first APIs, first reviews.' },
  { week: 'Week 5', title: 'Build Sprint', detail: 'Feature work, pairing, design feedback.' },
  { week: 'Week 6', title: 'Midpoint', detail: 'Progress check, mentor feedback, scope cleanup.' },
  { week: 'Week 7', title: 'Polish', detail: 'UX details, performance, accessibility, tests.' },
  { week: 'Week 8', title: 'Integrate', detail: 'Connect the pieces and prepare walkthroughs.' },
  { week: 'Week 9', title: 'Demo Prep', detail: 'Storyline, slides, project links, dry runs.' },
  { week: 'Week 10', title: 'Showcase', detail: 'Final demo, team celebration, memories captured.' },
];

const Process: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.12 });
  const [active, setActive] = useState(0);
  const selected = WEEKS[active];

  return (
    <section id="timeline" ref={ref} className="home-section home-section--light">
      <div className="home-wrap week-journey">
        <div className={`week-journey__intro reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Journey</span>
          <h2 className="section-heading">10 weeks at ACS.</h2>
        </div>

        <div className={`week-journey__board reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="week-journey__detail">
            <span>{selected.week}</span>
            <strong>{selected.title}</strong>
            <p>{selected.detail}</p>
          </div>

          <div className="week-journey__rail" aria-label="Internship weekly journey">
            {WEEKS.map((item, index) => (
              <button
                type="button"
                key={item.week}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                aria-label={`${item.week}: ${item.title}`}
              >
                <span />
                <small>{index + 1}</small>
                <em>{item.title}</em>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
