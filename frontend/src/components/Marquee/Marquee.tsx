import React, { useEffect, useRef, useState, useCallback } from 'react';

const MOMENTS = [
  { title: 'Day One', tag: 'Onboarding', img: 'team-collab.png' },
  { title: 'Team Lunch', tag: 'Food', img: 'hero-bg.png' },
  { title: 'Runathon', tag: 'Runathon', img: 'innovation.png' },
  { title: 'Squad Sync', tag: 'Team', img: 'team-collab.png' },
  { title: 'Demo Room', tag: 'Demo', img: 'innovation.png' },
  { title: 'Campus Walk', tag: 'Onboarding', img: 'hero-bg.png' },
];

const CARD_SCROLL = 380;

// Render: [clones of end] + [real cards] + [clones of start]
const CLONE_COUNT = 3;
const CLONES_START = MOMENTS.slice(-CLONE_COUNT);  // last N cards cloned at front
const CLONES_END   = MOMENTS.slice(0, CLONE_COUNT); // first N cards cloned at back
const ALL_CARDS    = [...CLONES_START, ...MOMENTS, ...CLONES_END];

const Marquee: React.FC = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

  // On mount, jump to the real first card (skip the cloned start cards)
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    // Each card is ~CARD_SCROLL wide; jump past the CLONE_COUNT clones silently
    const jumpTo = () => {
      const cardWidth = viewport.scrollWidth / ALL_CARDS.length;
      viewport.scrollLeft = cardWidth * CLONE_COUNT;
    };
    // Wait for layout
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
      // Scrolled to cloned-start zone — jump to real end
      isJumping.current = true;
      viewport.scrollLeft = realEnd - cardWidth;
      isJumping.current = false;
    } else if (scrolled >= realEnd - cardWidth * 0.5) {
      // Scrolled to cloned-end zone — jump to real start
      isJumping.current = true;
      viewport.scrollLeft = realStart;
      isJumping.current = false;
    }

    // Update active index based on position within real cards
    const posInReal = viewport.scrollLeft - realStart;
    const rawIndex  = Math.round(posInReal / cardWidth);
    const clampedIndex = Math.max(0, Math.min(MOMENTS.length - 1, rawIndex));
    setActive(clampedIndex);
    setProgress(clampedIndex / (MOMENTS.length - 1));
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Wheel hijack when hovered — no edge blocking since it's infinite
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleWheel = (e: WheelEvent) => {
      if (!isHovered) return;
      e.preventDefault();
      viewport.scrollLeft += e.deltaY;
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isHovered]);

  const scrollBy = (dir: 'left' | 'right') => {
    viewportRef.current?.scrollBy({ left: dir === 'right' ? CARD_SCROLL : -CARD_SCROLL, behavior: 'smooth' });
  };

  return (
    <section id="gallery" className="moments moments--scroll">
      <div className="moments__sticky">
        <div className="moments__top">
          <div>
            <span className="section-kicker">Moments</span>
            <h2 className="moments__title">Inside the cohort.</h2>
          </div>

          <div className="moments__controls">
            <div className="moments__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
            <div className="moments__arrows">
              <button className="moments__arrow" onClick={() => scrollBy('left')} aria-label="Previous">←</button>
              <button className="moments__arrow" onClick={() => scrollBy('right')} aria-label="Next">→</button>
            </div>
          </div>
        </div>

        <div
          className="moments__viewport"
          ref={viewportRef}
          style={{ overflowX: 'auto', overflowY: 'hidden', cursor: 'grab' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={(e) => {
            const el = viewportRef.current;
            if (!el) return;
            el.style.cursor = 'grabbing';
            const startX = e.pageX - el.offsetLeft;
            const startScroll = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX);
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
            {ALL_CARDS.map((moment, index) => (
              <article
                className={`moment-card ${active === (index - CLONE_COUNT + MOMENTS.length) % MOMENTS.length ? 'is-active' : ''}`}
                key={`card-${index}`}
                aria-hidden={index < CLONE_COUNT || index >= CLONE_COUNT + MOMENTS.length}
              >
                <img src={`${import.meta.env.BASE_URL}images/${moment.img}`} alt={moment.title} />
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
