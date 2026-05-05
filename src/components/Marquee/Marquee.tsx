import React, { useEffect, useMemo, useRef, useState } from 'react';

const FILTERS = ['All', 'Onboarding', 'Food', 'Runathon', 'Team', 'Demo'];

const MOMENTS = [
  { title: 'Day One', tag: 'Onboarding', img: 'team-collab.png' },
  { title: 'Team Lunch', tag: 'Food', img: 'hero-bg.png' },
  { title: 'Runathon', tag: 'Runathon', img: 'innovation.png' },
  { title: 'Squad Sync', tag: 'Team', img: 'team-collab.png' },
  { title: 'Demo Room', tag: 'Demo', img: 'innovation.png' },
  { title: 'Campus Walk', tag: 'Onboarding', img: 'hero-bg.png' },
];

const Marquee: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const moments = useMemo(
    () => MOMENTS.filter((moment) => filter === 'All' || moment.tag === filter),
    [filter],
  );

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const strip = stripRef.current;
      if (!section || !viewport || !strip) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const current = Math.min(Math.max(-rect.top, 0), travel);
      const nextProgress = current / travel;
      const maxOffset = Math.max(0, strip.scrollWidth - viewport.clientWidth);

      setProgress(nextProgress);
      setOffset(maxOffset * nextProgress);
      setActive(Math.min(moments.length - 1, Math.round(nextProgress * (moments.length - 1))));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [moments.length]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="moments moments--scroll"
      style={{ height: `${Math.max(180, moments.length * 44)}vh` }}
    >
      <div className="moments__sticky">
        <div className="moments__top">
          <div>
            <span className="section-kicker">Moments</span>
            <h2 className="moments__title">Scroll the summer.</h2>
          </div>

          <div className="moments__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>

        <div className="moments__filters" role="tablist" aria-label="Moment filters">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? 'is-active' : ''}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="moments__viewport" ref={viewportRef}>
          <div
            className="moments__strip"
            ref={stripRef}
            style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
          >
            {moments.map((moment, index) => (
              <article
                className={`moment-card ${active === index ? 'is-active' : ''}`}
                key={`${moment.tag}-${moment.title}`}
              >
                <img src={`${process.env.PUBLIC_URL}/images/${moment.img}`} alt={moment.title} />
                <div>
                  <span>{moment.tag}</span>
                  <strong>{moment.title}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
