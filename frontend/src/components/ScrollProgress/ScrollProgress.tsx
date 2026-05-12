import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'gallery', label: 'Moments' },
  { id: 'values', label: 'Values' },
  { id: 'about', label: 'Explore' },
  { id: 'timeline', label: 'Journey' },
];

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      const marker = window.scrollY + window.innerHeight * 0.38;
      const current = SECTIONS.reduce((match, section) => {
        const element = document.getElementById(section.id);
        if (!element) return match;
        return element.offsetTop <= marker ? section.id : match;
      }, 'hero');
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const jumpTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const valuesSection = document.getElementById('values');

    // If navigating past the values section, jump instantly past it first
    // then smooth scroll to destination — avoids getting trapped in sticky scroll
    if (valuesSection) {
      const valuesTop = valuesSection.offsetTop;
      const valuesBottom = valuesTop + valuesSection.offsetHeight;
      const currentY = window.scrollY;
      const crossingValues =
        (currentY < valuesBottom && targetTop > valuesBottom) ||
        (currentY > valuesBottom && targetTop < valuesTop);

      if (crossingValues) {
        // Instantly skip past values, then smooth scroll to target
        const skipTo = targetTop > valuesBottom ? valuesBottom + 1 : valuesTop - 1;
        window.scrollTo({ top: skipTo, behavior: 'instant' });
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return;
      }
    }

    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="scroll-rail" aria-label="Page progress">
      <span className="scroll-rail__bar">
        <span style={{ transform: `scaleY(${progress})` }} />
      </span>
      {SECTIONS.map((section) => (
        <button
          type="button"
          key={section.id}
          className={active === section.id ? 'is-active' : ''}
          onClick={() => jumpTo(section.id)}
          aria-label={`Scroll to ${section.label}`}
        >
          <span>{section.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default ScrollProgress;
