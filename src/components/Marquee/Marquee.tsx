import React, { useEffect, useRef, useState } from 'react';

const MOMENTS = [
  { title: 'Day One', tag: 'Onboarding', img: 'team-collab.png' },
  { title: 'Team Lunch', tag: 'Food', img: 'hero-bg.png' },
  { title: 'Runathon', tag: 'Runathon', img: 'innovation.png' },
  { title: 'Squad Sync', tag: 'Team', img: 'team-collab.png' },
  { title: 'Demo Room', tag: 'Demo', img: 'innovation.png' },
  { title: 'Campus Walk', tag: 'Onboarding', img: 'hero-bg.png' },
];

const Marquee: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const strip = stripRef.current;
      if (!viewport || !strip) return;
      const nextMax = Math.max(0, strip.scrollWidth - viewport.clientWidth);
      setMaxOffset(nextMax);
      setOffset((current) => Math.min(current, nextMax));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const nextProgress = maxOffset > 0 ? offset / maxOffset : 0;
    setProgress(nextProgress);
    setActive(Math.min(MOMENTS.length - 1, Math.round(nextProgress * (MOMENTS.length - 1))));
  }, [offset, maxOffset]);

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (maxOffset <= 0) return;

    const direction = event.deltaY;
    const atStart = offset <= 0;
    const atEnd = offset >= maxOffset;

    if ((direction < 0 && atStart) || (direction > 0 && atEnd)) return;

    event.preventDefault();
    setOffset((current) => Math.min(maxOffset, Math.max(0, current + direction)));
  };

  return (
    <section
      id="gallery"
      className="moments moments--scroll"
      onWheel={handleWheel}
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

        <div className="moments__viewport" ref={viewportRef}>
          <div
            className="moments__strip"
            ref={stripRef}
            style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
          >
            {MOMENTS.map((moment, index) => (
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
