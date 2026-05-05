import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const MODES = [
  { title: 'People', meta: '30+ interns', cue: 'profiles' },
  { title: 'Teams', meta: '5 squads', cue: 'directory' },
  { title: 'Moments', meta: 'gallery', cue: 'filters' },
  { title: 'FAQs', meta: 'quick help', cue: 'answers' },
];

const About: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.14 });
  const [active, setActive] = useState(0);
  const selected = MODES[active];

  return (
    <section id="about" ref={ref} className="home-section home-section--soft">
      <div className="home-wrap hub">
        <div className={`hub__intro reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Portal</span>
          <h2 className="section-heading">Less text. More motion.</h2>
        </div>

        <div className={`hub__stage reveal ${isVisible ? 'is-visible' : ''}`}>
          <img src={`${process.env.PUBLIC_URL}/images/team-collab.png`} alt="ACS interns collaborating" />
          <div className="hub__glass">
            <span>{selected.meta}</span>
            <strong>{selected.title}</strong>
            <small>{selected.cue}</small>
          </div>
        </div>

        <div className={`hub__tabs reveal ${isVisible ? 'is-visible' : ''}`} role="tablist" aria-label="Portal sections">
          {MODES.map((mode, index) => (
            <button
              type="button"
              key={mode.title}
              className={`hub__tab ${active === index ? 'is-active' : ''}`}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              {mode.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
