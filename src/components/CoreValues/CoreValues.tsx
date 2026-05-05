import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './CoreValues.css';

const VALUES = [
  {
    icon: '💡',
    title: 'Innovation',
    description: 'Pushing boundaries and exploring new frontiers in technology to shape the future of digital experiences.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Working together across teams, sharing knowledge, and building on each other\'s strengths to achieve more.',
  },
  {
    icon: '🎯',
    title: 'Excellence',
    description: 'Striving for the highest quality in everything we create — from code to design to user experience.',
  },
  {
    icon: '🌍',
    title: 'Impact',
    description: 'Creating meaningful solutions that make a real difference for millions of users around the world.',
  },
];

const CoreValues: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="core-values" id="values" ref={ref}>
      <div className="core-values__header">
        <span className="core-values__label">What Drives Us</span>
        <h2 className="core-values__title">Our Core Values</h2>
        <div className="core-values__accent-line" />
      </div>

      <div className="core-values__grid">
        {VALUES.map((value, index) => (
          <div
            key={value.title}
            className={`core-values__card ${isVisible ? 'core-values__card--visible' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <span className="core-values__card-icon">{value.icon}</span>
            <h3 className="core-values__card-title">{value.title}</h3>
            <p className="core-values__card-desc">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
