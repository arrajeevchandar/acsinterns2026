import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollProgress.css';

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'gallery', label: 'Moments' },
  { id: 'values', label: 'Values' },
  { id: 'about', label: 'People' },
  { id: 'timeline', label: 'Journey' },
  { id: 'teams', label: 'Teams' },
];

const ScrollProgress: React.FC = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('hero');
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

  if (!isHome) return null;

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
