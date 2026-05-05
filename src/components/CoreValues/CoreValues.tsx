import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './CoreValues.css';

const VALUES = ['Create', 'Collaborate', 'Own', 'Elevate'];

const CoreValues: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.12 });

  return (
    <section className="home-section home-section--soft" id="values" ref={ref}>
      <div className="home-wrap value-minimal">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Values</span>
          <h2 className="section-heading">Make it matter.</h2>
        </div>

        <div className={`value-minimal__grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {VALUES.map((value, index) => (
            <article className="value-minimal__tile" key={value}>
              <span>0{index + 1}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
