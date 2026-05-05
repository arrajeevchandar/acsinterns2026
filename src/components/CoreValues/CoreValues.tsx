import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './CoreValues.css';

const VALUES = [
  {
    icon: '💡',
    title: 'Innovation',
    description: 'Pushing boundaries and exploring new frontiers in technology to shape tomorrow\'s digital experiences.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Working across teams, sharing knowledge, and building on each other\'s strengths to create something greater.',
  },
  {
    icon: '🎯',
    title: 'Excellence',
    description: 'Striving for the highest quality in everything we create — from code architecture to pixel-perfect design.',
  },
  {
    icon: '🌍',
    title: 'Impact',
    description: 'Creating meaningful solutions that make a real difference for millions of users across the globe.',
  },
];

const CoreValues: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="values" id="values" ref={ref}>
      <div className="values__header">
        <span className="values__label">What Drives Us</span>
        <h2 className="values__title">Core Values</h2>
        <p className="values__subtitle">
          The principles that guide every line of code, every design decision,
          and every collaboration at ACS.
        </p>
      </div>

      <div className="values__grid">
        {VALUES.map((value, index) => (
          <div
            key={value.title}
            className={`values__card ${isVisible ? 'values__card--visible' : ''}`}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <span className="values__card-num">0{index + 1}</span>
            <span className="values__card-icon">{value.icon}</span>
            <h3 className="values__card-title">{value.title}</h3>
            <p className="values__card-desc">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
