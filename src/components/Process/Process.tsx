import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const STEPS = [
  {
    title: 'Onboarding',
    desc: 'First-week essentials, team context, tool setup, buddy systems, and everything interns need to start strong.',
  },
  {
    title: 'Team Deep Dive',
    desc: 'Each intern maps into a squad, learns the product surface, and understands the customer problems behind the work.',
  },
  {
    title: 'Build Window',
    desc: 'Projects move from concept to shipped demos with mentor feedback, design reviews, and weekly progress stories.',
  },
  {
    title: 'Showcase',
    desc: 'The portal turns the final stretch into a gallery of outcomes, lessons, profiles, links, and mentor testimony.',
  },
];

const Process: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.12 });

  return (
    <section ref={ref} className="home-section home-section--band">
      <div className="home-wrap journey">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Program Flow</span>
          <h2 className="section-heading">The summer needs a timeline with momentum.</h2>
          <p className="section-copy">
            The portal should feel alive through every phase, from first-day
            orientation to the final project showcase.
          </p>
        </div>

        <div className={`journey__track ${isVisible ? 'is-visible' : ''}`}>
          {STEPS.map((step, index) => (
            <article
              className="journey__step"
              key={step.title}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="journey__num">0{index + 1}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
