import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './CoreValues.css';

const VALUES = [
  {
    title: 'Create',
    description: 'Move from idea to prototype quickly, with craft and curiosity in every iteration.',
  },
  {
    title: 'Collaborate',
    description: 'Share context openly across AEM, Workfront, Data, UI, DACOE, mentors, and peers.',
  },
  {
    title: 'Own',
    description: 'Treat every project as real work, with clear decisions, polish, testing, and follow-through.',
  },
  {
    title: 'Elevate',
    description: 'Make the cohort better through documentation, demos, feedback, and everyday generosity.',
  },
];

const CoreValues: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.12 });

  return (
    <section className="home-section home-section--dark" id="values" ref={ref}>
      <div className="home-wrap values-cinema">
        <aside className={`values-cinema__statement reveal ${isVisible ? 'is-visible' : ''}`}>
          <span>Core values</span>
          <strong>Make it matter</strong>
        </aside>

        <div className={`values-cinema__grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {VALUES.map((value, index) => (
            <article className="value-tile" key={value.title}>
              <div className="value-tile__top">
                <span>0{index + 1}</span>
                <span>ACS</span>
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
