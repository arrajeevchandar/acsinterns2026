import React, { useEffect, useRef, useState, useCallback } from 'react';

const MOMENTS = [
  { title: 'Day One', tag: 'Onboarding', img: 'gallery/Copy of 0C97642B-E9FD-41E4-9D72-6658BEF0CB6C.JPG' },
  { title: 'Team Lunch', tag: 'Food', img: 'gallery/Copy of 545F3177-202D-4C3D-82FB-9D2BC8FAC8B0.JPG' },
  { title: 'Runathon', tag: 'Runathon', img: 'gallery/IMG-20260609-WA0029(1).jpg' },
  { title: 'Squad Sync', tag: 'Team', img: 'events/generated/C1Y03258 (1)-800.webp' },
  { title: 'Demo Room', tag: 'Demo', img: 'events/generated/Media (1)-1200.webp' },
  { title: 'Campus Walk', tag: 'Onboarding', img: 'events/generated/Media (2)-800.webp' },
];

// Continuous auto-scroll speed (px per animation frame).
const AUTO_SPEED = 0.6;

// Render: [clones of end] + [real cards] + [clones of start]
const CLONE_COUNT = 3;
const CLONES_START = MOMENTS.slice(-CLONE_COUNT);  // last N cards cloned at front
const CLONES_END   = MOMENTS.slice(0, CLONE_COUNT); // first N cards cloned at back
const ALL_CARDS    = [...CLONES_START, ...MOMENTS, ...CLONES_END];

const Marquee: React.FC = () => {
  // `active` is the ALL_CARDS index of the card currently in the middle.
  const [active, setActive] = useState(CLONE_COUNT);
  const [progress, setProgress] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

  // On mount, jump to the real first card (skip the cloned start cards)
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const jumpTo = () => {
      const cardWidth = viewport.scrollWidth / ALL_CARDS.length;
      viewport.scrollLeft = cardWidth * CLONE_COUNT;
    };
    requestAnimationFrame(jumpTo);
  }, []);

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || isJumping.current) return;

    const cardWidth = viewport.scrollWidth / ALL_CARDS.length;
    const realStart = cardWidth * CLONE_COUNT;
    const realEnd   = cardWidth * (CLONE_COUNT + MOMENTS.length);
    const scrolled  = viewport.scrollLeft;

    // Silent jump: if we've scrolled into the clones, teleport to the real equivalent
    if (scrolled < cardWidth * 0.5) {
      isJumping.current = true;
      viewport.scrollLeft = realEnd - cardWidth;
      isJumping.current = false;
    } else if (scrolled >= realEnd - cardWidth * 0.5) {
      isJumping.current = true;
      viewport.scrollLeft = realStart;
      isJumping.current = false;
    }

    // Focus the card whose region contains the viewport's horizontal center.
    // This flips the moment the next card crosses the middle.
    const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
    const centerIndex = Math.floor(centerX / cardWidth);
    setActive(centerIndex);

    // Progress across the real cards
    const posInReal = viewport.scrollLeft - realStart;
    setProgress(Math.max(0, Math.min(1, posInReal / (cardWidth * (MOMENTS.length - 1)))));
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Self-scroll: continuously advance the carousel (no manual mouse scrolling).
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const viewport = viewportRef.current;
      if (viewport) viewport.scrollLeft += AUTO_SPEED;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="gallery" className="moments moments--scroll">
      <div className="moments__sticky">
        <div className="moments__top">
          <div>
            <span className="section-kicker">Moments</span>
            <h2 className="moments__title">Inside the cohort.</h2>
          </div>
        </div>

        <div
          className="moments__viewport"
          ref={viewportRef}
          style={{ overflowX: 'hidden', overflowY: 'hidden' }}
        >
          <div className="moments__strip">
            {ALL_CARDS.map((moment, index) => (
              <article
                className={`moment-card ${active === index ? 'is-active' : ''}`}
                key={`card-${index}`}
                aria-hidden={index < CLONE_COUNT || index >= CLONE_COUNT + MOMENTS.length}
              >
                <img src={encodeURI(`${import.meta.env.BASE_URL}images/${moment.img}`)} alt={moment.title} />
              </article>
            ))}
          </div>
        </div>

        {/* Progress bar beneath the photos */}
        <div className="moments__progress moments__progress--bottom" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
