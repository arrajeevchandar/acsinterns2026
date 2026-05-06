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
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if (maxScroll <= 0) return;
      const scrolled = viewport.scrollLeft;
      const nextProgress = scrolled / maxScroll;
      setProgress(nextProgress);
      setActive(Math.min(MOMENTS.length - 1, Math.round(nextProgress * (MOMENTS.length - 1))));
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="gallery" className="moments moments--scroll">
      <div className="moments__sticky">
        <div className="moments__top">
          <div>
            <span className="section-kicker">Moments</span>
            <h2 className="moments__title">Inside the cohort.</h2>
          </div>

          <div className="moments__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>

        <div
          className="moments__viewport"
          ref={viewportRef}
          style={{ overflowX: 'auto', overflowY: 'hidden', cursor: 'grab' }}
          onMouseDown={(e) => {
            const el = viewportRef.current;
            if (!el) return;
            el.style.cursor = 'grabbing';
            const startX = e.pageX - el.offsetLeft;
            const startScroll = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              const x = ev.pageX - el.offsetLeft;
              el.scrollLeft = startScroll - (x - startX);
            };
            const onUp = () => {
              el.style.cursor = 'grab';
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }}
        >
          <div className="moments__strip">
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