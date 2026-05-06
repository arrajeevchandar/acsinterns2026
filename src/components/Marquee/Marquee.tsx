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
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const displayOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const releaseRef = useRef<'up' | 'down' | null>(null);
  const releaseCooldownUntilRef = useRef(0);
  const lockedScrollYRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const strip = stripRef.current;
      if (!viewport || !strip) return;
      const nextMax = Math.max(0, strip.scrollWidth - viewport.clientWidth);
      setMaxOffset(nextMax);
      targetOffsetRef.current = Math.min(targetOffsetRef.current, nextMax);
      displayOffsetRef.current = Math.min(displayOffsetRef.current, nextMax);
      setOffset(displayOffsetRef.current);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const syncDisplay = (nextOffset: number) => {
      const nextProgress = maxOffset > 0 ? nextOffset / maxOffset : 0;
      setOffset(nextOffset);
      setProgress(nextProgress);
      setActive(Math.min(MOMENTS.length - 1, Math.round(nextProgress * (MOMENTS.length - 1))));
    };

    const animate = () => {
      const current = displayOffsetRef.current;
      const target = targetOffsetRef.current;
      const diff = target - current;
      const next = Math.abs(diff) < 0.35 ? target : current + diff * 0.22;

      displayOffsetRef.current = next;
      syncDisplay(next);

      if (next !== target) {
        rafRef.current = window.requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
        const section = sectionRef.current;
        if (section && releaseRef.current) {
          const direction = releaseRef.current;
          releaseRef.current = null;
          lockedScrollYRef.current = null;
          releaseCooldownUntilRef.current = performance.now() + 650;
          window.scrollBy({ top: direction === 'down' ? 180 : -180, behavior: 'smooth' });
        }
      }
    };

    const startAnimation = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(animate);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section || maxOffset <= 0) return;
      if (performance.now() < releaseCooldownUntilRef.current) return;

      const rect = section.getBoundingClientRect();
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;
      const sectionIsPinned = rect.top <= 48 && rect.bottom >= window.innerHeight - 48;
      const enteringFromBelow = scrollingUp && rect.top < window.innerHeight && rect.bottom > window.innerHeight;
      const inSectionBand = sectionIsPinned || enteringFromBelow;
      const needsDownLock = scrollingDown && inSectionBand && (
        targetOffsetRef.current < maxOffset || displayOffsetRef.current < maxOffset - 1
      );
      const needsUpLock = scrollingUp && inSectionBand && (
        targetOffsetRef.current > 0 || displayOffsetRef.current > 1
      );

      if (!needsDownLock && !needsUpLock) return;

      event.preventDefault();
      if (lockedScrollYRef.current === null) {
        lockedScrollYRef.current = window.scrollY;
      }
      const wheelDelta = Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY) * 1.05, 120);
      const nextTarget = Math.min(
        maxOffset,
        Math.max(0, targetOffsetRef.current + wheelDelta),
      );
      targetOffsetRef.current = nextTarget;
      releaseRef.current = nextTarget >= maxOffset && scrollingDown ? 'down' : nextTarget <= 0 && scrollingUp ? 'up' : null;
      startAnimation();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [maxOffset]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="moments moments--scroll"
    >
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
                <img src={`/images/${moment.img}`} alt={moment.title} />
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
