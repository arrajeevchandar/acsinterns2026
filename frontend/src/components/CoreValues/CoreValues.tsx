import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import './CoreValues.css';

const VALUES = [
  { title: 'Create the future.', cue: "Build what's next" },
  { title: 'Own the outcome.', cue: 'Real accountability' },
  { title: 'Raise the bar.', cue: 'Always higher' },
  { title: 'Be genuine.', cue: 'Authenticity first' },
];

const CoreValues: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const current = Math.min(Math.max(-rect.top, 0), travel);
      const nextProgress = current / travel;

      setActive(Math.min(VALUES.length - 1, Math.floor(nextProgress * VALUES.length)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section
      id="values"
      ref={sectionRef}
      className="values-scroll"
      style={{ height: `${VALUES.length * 78}vh` }}
    >
      <div className="values-scroll__sticky">
        <div className="values-scroll__intro">
          <span className="section-kicker">Core Values</span>
          <h2>What we practice.</h2>
        </div>

        <div className="values-scroll__stage">
          <div
            className="values-scroll__orb"
            style={{ '--value-progress': `${((active + 1) / VALUES.length) * 100}%` } as CSSProperties}
          >
            <i aria-hidden="true" />
            <span key={active}>0{active + 1}</span>
          </div>

          <div className="values-scroll__word">
            <span>{VALUES[active].cue}</span>
            <strong key={VALUES[active].title}>{VALUES[active].title}</strong>
          </div>

          <div className="values-scroll__stack">
            {VALUES.map((value, index) => (
              <button
                type="button"
                key={value.title}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Show ${value.title}`}
              >
                <span>0{index + 1}</span>
                {value.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;