import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';

// ─── helpers ────────────────────────────────────────────────────────────────
function imgSrc(seed: string, w = 800, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

type ImageEntry = { name?: string; url: string; srcset?: string[]; aspect?: number };
type Manifest = Record<string, ImageEntry[]>;
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

// ─── burst grid positions ────────────────────────────────────────────────────
const W = 100 / 6;
const H = 100 / 4;
const COLS = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map(c => c * W);
const ROWS = [-1.5, -0.5, 0.5, 1.5].map(r => r * H);

const SEED_ORIGINS: Record<string, string> = {
  '1,2': 'bottom right',
  '1,3': 'bottom left',
  '2,2': 'top right',
  '2,3': 'top left',
};

const BATCHES: [number, number][] = [
  [1, 2], [1, 3], [2, 2], [2, 3],
  [1, 1], [1, 4], [2, 1], [2, 4], [0, 2], [0, 3],
  [0, 0], [0, 1], [0, 4], [0, 5], [3, 0], [3, 1], [3, 4], [3, 5],
  [1, 0], [1, 5], [2, 0], [2, 5], [3, 2], [3, 3],
];

interface BurstPos {
  x: number; y: number; w: number; h: number;
  batch: number; origin: string;
}

const BURST_POSITIONS: BurstPos[] = BATCHES.map(([r, c], idx) => {
  const batch = idx < 4 ? 0 : idx < 10 ? 1 : idx < 18 ? 2 : 3;
  return {
    x: COLS[c], y: ROWS[r], w: W, h: H, batch,
    origin: batch === 0 ? (SEED_ORIGINS[`${r},${c}`] ?? 'center center') : 'center center',
  };
});

// ─── wall layouts ────────────────────────────────────────────────────────────
interface CardLayout { x: number; y: number; w: number; h: number; }

const LAYOUTS: Record<string, CardLayout[]> = {
  events: [
    { x: 4,  y: 8,  w: 28, h: 38 },
    { x: 34, y: 4,  w: 32, h: 30 },
    { x: 68, y: 10, w: 28, h: 34 },
    { x: 4,  y: 50, w: 22, h: 40 },
    { x: 28, y: 38, w: 22, h: 28 },
    { x: 52, y: 38, w: 18, h: 26 },
    { x: 72, y: 48, w: 24, h: 36 },
    { x: 28, y: 70, w: 22, h: 22 },
    { x: 52, y: 68, w: 18, h: 24 },
  ],
  lunch: [
    { x: 2,  y: 4,  w: 22, h: 26 },
    { x: 26, y: 4,  w: 22, h: 26 },
    { x: 2,  y: 32, w: 22, h: 30 },
    { x: 26, y: 32, w: 22, h: 30 },
    { x: 2,  y: 64, w: 22, h: 30 },
    { x: 26, y: 64, w: 22, h: 30 },
    { x: 52, y: 4,  w: 46, h: 60 },
    { x: 52, y: 66, w: 22, h: 28 },
    { x: 76, y: 66, w: 22, h: 28 },
  ],
  conferences: [
    { x: 6,  y: 6,  w: 30, h: 22 },
    { x: 38, y: 4,  w: 24, h: 30 },
    { x: 64, y: 8,  w: 30, h: 24 },
    { x: 4,  y: 30, w: 22, h: 32 },
    { x: 28, y: 36, w: 28, h: 28 },
    { x: 58, y: 34, w: 18, h: 30 },
    { x: 78, y: 34, w: 18, h: 38 },
    { x: 18, y: 64, w: 30, h: 30 },
    { x: 50, y: 66, w: 26, h: 28 },
  ],
  workshops: [
    { x: 2,  y: 4,  w: 18, h: 40 },
    { x: 22, y: 8,  w: 18, h: 30 },
    { x: 42, y: 4,  w: 18, h: 44 },
    { x: 62, y: 6,  w: 16, h: 36 },
    { x: 80, y: 4,  w: 18, h: 40 },
    { x: 2,  y: 48, w: 22, h: 46 },
    { x: 26, y: 42, w: 30, h: 52 },
    { x: 58, y: 48, w: 20, h: 46 },
    { x: 80, y: 48, w: 18, h: 46 },
  ],
  bts: [
    { x: 2,  y: 4,  w: 50, h: 60 },
    { x: 54, y: 4,  w: 22, h: 28 },
    { x: 78, y: 4,  w: 20, h: 28 },
    { x: 54, y: 34, w: 30, h: 30 },
    { x: 86, y: 34, w: 12, h: 30 },
    { x: 2,  y: 66, w: 24, h: 28 },
    { x: 28, y: 66, w: 24, h: 28 },
    { x: 54, y: 66, w: 22, h: 28 },
    { x: 78, y: 66, w: 20, h: 28 },
  ],
};

interface WallConfig {
  id: string; bg: string; heading: string;
  layoutKey: string; seedPrefix: string;
}

const WALLS: WallConfig[] = [
  { id: 'events',      bg: 'dark',  heading: 'Events',            layoutKey: 'events',      seedPrefix: 'ev' },
  { id: 'lunch',       bg: 'paper', heading: 'Team Lunch',        layoutKey: 'lunch',       seedPrefix: 'lu' },
  { id: 'conferences', bg: 'red',   heading: 'Conferences',       layoutKey: 'conferences', seedPrefix: 'cf' },
  { id: 'workshops',   bg: 'dark',  heading: 'Workshops',         layoutKey: 'workshops',   seedPrefix: 'wk' },
  { id: 'bts',         bg: 'paper', heading: 'Behind the Scenes', layoutKey: 'bts',         seedPrefix: 'bt' },
];

type SectionRef = HTMLElement | null;
type CardRef = HTMLElement | null;
type GalleryRefs = {
  sections: SectionRef[];
  burstCards: CardRef[];
  wallCards: Record<string, CardRef[]>;
};

// ─── scroll driver ───────────────────────────────────────────────────────────
function runScrollDriver(page: HTMLElement, refs: GalleryRefs) {
  let raf: number | null = null;

  function update() {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const sections = refs.sections.filter((section): section is HTMLElement => Boolean(section));

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - vh;
      const scrolled = clamp(-rect.top, 0, total);
      const p = total > 0 ? scrolled / total : 0;

      // Heading: fade + lift out
      const headOut = clamp((p - 0.06) / 0.18);
      const heading = sec.querySelector('.heading') as HTMLElement | null;
      if (heading) {
        heading.style.opacity = (1 - headOut).toFixed(3);
        heading.style.transform = `translateY(${(-headOut * 60).toFixed(2)}px) scale(${(1 - headOut * 0.08).toFixed(3)})`;
      }

      if (sec.dataset.kind === 'gallery') {
        const overlay = document.querySelector<HTMLElement>('.burst-overlay');
        const burstP = clamp((p - 0.08) / 0.70);
        const exitP = clamp((p - 0.90) / 0.10);
        const overlayOp = 1 - exitP;
        if (overlay) {
          overlay.style.opacity = overlayOp.toFixed(3);
          overlay.style.visibility = overlayOp > 0.01 ? 'visible' : 'hidden';
        }
        const batchWindow = 0.25;
        const burst = sec.querySelector<HTMLElement>('.burst');
        if (burst) {
          // Keep the burst mathematically centered in the viewport exactly
          // as in the original reference (no navbar compensation).
          const dotOp = clamp(1 - (burstP - 0.85) / 0.10);
          const dotS = lerp(0.6, 1.2, clamp(burstP * 4));
          burst.style.setProperty('--dot-op', dotOp.toFixed(3));
          burst.style.setProperty('--dot-s', dotS.toFixed(3));
          burst.style.transform = 'translate(-50%, -50%)';
        }

        const cards = refs.burstCards.filter((card): card is HTMLElement => Boolean(card));
        cards.forEach(card => {
          const fx = parseFloat(card.dataset.fx ?? '0');
          const fy = parseFloat(card.dataset.fy ?? '0');
          const batch = parseInt(card.dataset.batch ?? '0', 10);
          const start = batch * batchWindow;
          const end = start + batchWindow + 0.05;
          const localT = clamp((burstP - start) / (end - start));
          const e = easeOutCubic(localT);

          const tx = e * (fx / 100) * vw;
          const ty = e * (fy / 100) * vh;
          const cs = batch === 0 ? e : lerp(0.4, 1, e);
          const op = clamp(localT * 4) * overlayOp;

          card.style.setProperty('--tx', tx.toFixed(2) + 'px');
          card.style.setProperty('--ty', ty.toFixed(2) + 'px');
          card.style.setProperty('--cs', cs.toFixed(3));
          card.style.setProperty('--op', op.toFixed(3));
        });

      } else if (sec.dataset.kind === 'wall') {
        // Cards slide + fade into position
        const wallId = sec.dataset.id ?? '';
        const cards = (refs.wallCards[wallId] ?? []).filter((card): card is HTMLElement => Boolean(card));
        const wallGrid = sec.querySelector<HTMLElement>('.wall-grid');
        const gridRect = wallGrid?.getBoundingClientRect();
        cards.forEach(card => {
          const delay = parseFloat(card.dataset.delay ?? '0');
          const appearT = clamp((p - 0.08 - delay * 0.25) / 0.65);
          // Keep cards near center for the first third, then spread outward.
          const motionT = clamp((appearT - 0.55) / 0.45);
          const e = easeOutCubic(motionT);
          const op = clamp(appearT * 1.6);
          card.style.opacity = op.toFixed(3);
          if (gridRect) {
            const left = parseFloat(card.style.left || '0');
            const top = parseFloat(card.style.top || '0');
            const width = parseFloat(card.style.width || '0');
            const height = parseFloat(card.style.height || '0');
            const targetCx = (left / 100 + width / 200) * gridRect.width;
            const targetCy = (top / 100 + height / 200) * gridRect.height;
            const tx = (1 - e) * (gridRect.width / 2 - targetCx);
            const ty = (1 - e) * (gridRect.height / 2 - targetCy);
            card.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${lerp(0.9, 1, e).toFixed(3)})`;
          }

          const stripeT = clamp((p - 0.55 - delay * 0.2) / 0.25);
          const stripe = card.querySelector<HTMLElement>('.stripe');
          if (stripe) stripe.style.transform = `scaleX(${stripeT.toFixed(3)})`;
        });

        // Subtle whole-grid zoom
        if (wallGrid) {
          const z = lerp(1, 1.04, clamp((p - 0.3) / 0.6));
          wallGrid.style.transform = `scale(${z.toFixed(3)})`;
          wallGrid.style.transformOrigin = 'center center';
        }
      }
    });
    raf = null;
  }

  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // Preload images for a section when it approaches the viewport so the
  // collage appears loaded when the user scrolls to it.
  const preloadObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const sec = en.target as HTMLElement;
      const imgs = Array.from(sec.querySelectorAll<HTMLImageElement>('img'));
      imgs.forEach(img => {
        // hint browser to prioritize loading
        try { img.loading = 'eager'; } catch (e) {}
        if (!img.complete) {
          const tmp = new Image(); tmp.src = img.src;
        }
      });
    });
  }, { root: null, rootMargin: '100% 0px' });
  // observe all sections (gallery + walls)
  Array.from(page.querySelectorAll<HTMLElement>('.section')).forEach(s => preloadObserver.observe(s));
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (raf) cancelAnimationFrame(raf);
  };
}

// ─── component ───────────────────────────────────────────────────────────────
const Gallery: React.FC = () => {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const pageRef = useRef<HTMLElement>(null);
  const refs = useRef<GalleryRefs>({ sections: [], burstCards: [], wallCards: {} });

  const burstOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current || !burstOverlayRef.current) return;
    // Populate refs from DOM to guarantee ordering and avoid missing nodes
    refs.current.sections = Array.from(pageRef.current!.querySelectorAll<HTMLElement>('.section'));
    refs.current.burstCards = Array.from(burstOverlayRef.current!.querySelectorAll<HTMLElement>('.burst .card'));
    refs.current.wallCards = {};
    WALLS.forEach(w => {
      refs.current.wallCards[w.id] = Array.from(pageRef.current!.querySelectorAll<HTMLElement>(`.section[data-id="${w.id}"] .wall-card`));
    });

    return runScrollDriver(pageRef.current!, refs.current);
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch('/images/manifest.json')
      .then(r => { if (!r.ok) throw new Error('manifest fetch failed'); return r.json(); })
      .then((m: Manifest) => { if (mounted) setManifest(m); })
      .catch(() => { /* ignore, will fallback to picsum seeds */ });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {/* ── Burst overlay (fixed, outside scroll context) ──────── */}
      <div className="burst-overlay" ref={burstOverlayRef}>
        <div className="burst">
          {BURST_POSITIONS.map((pos, i) => {
            const galleryArr = manifest?.gallery ?? [];
            const imgEntry: ImageEntry | null = galleryArr[i] ?? null;
            const seed = `gal-${i}`;
            const src = imgEntry ? imgEntry.url : imgSrc(seed, 800, 600);
            const srcset = imgEntry && imgEntry.srcset ? imgEntry.srcset.join(', ') : undefined;
            return (
            <div
              key={i}
              className="card"
              style={{
                '--w': `${pos.w}vw`,
                '--h': `${pos.h}vh`,
                transformOrigin: pos.origin,
                zIndex: 20 - pos.batch * 5,
              } as React.CSSProperties}
              data-fx={pos.x}
              data-fy={pos.y}
              data-batch={pos.batch}
            >
              <img loading="lazy" src={src} srcSet={srcset} alt="" />
            </div>
         )})}
          <span className="dot" aria-hidden="true" />
        </div>
      </div>

      <main className="gallery-page" ref={pageRef}>

        {/* ── Burst gallery ────────────────────────────────────── */}
        <section
          className="section gallery"
          data-bg="paper"
          data-kind="gallery"
          ref={el => { refs.current.sections[0] = el; }}
        >
          <div className="sticky">
            <div className="heading">
              <h2><span className="accent">Gallery</span></h2>
            </div>
            <div className="gallery-stage">
              {/* burst is now rendered as fixed overlay above */}
            </div>
          </div>
        </section>

        {/* ── Wall sections ─────────────────────────────────────── */}
        {WALLS.map(wall => (
          <section
            key={wall.id}
            className="section wall"
            data-bg={wall.bg}
            data-kind="wall"
            data-id={wall.id}
            ref={el => { refs.current.sections[WALLS.findIndex(w => w.id === wall.id) + 1] = el; }}
          >
            <div className="sticky">
              <div className="heading">
                <h2><span className="accent">{wall.heading}</span></h2>
              </div>
              <div className="wall-stage">
                <div className="wall-grid">
                  {LAYOUTS[wall.layoutKey].map((c, i) => {
                    const dir = i % 4;
                    const offX = [-25, 25, 0, 0][dir];
                    const offY = [0, 0, -20, 20][dir];
                    return (
                      <div
                        key={i}
                        className="wall-card"
                        ref={el => {
                          if (!refs.current.wallCards[wall.id]) refs.current.wallCards[wall.id] = [];
                          refs.current.wallCards[wall.id][i] = el;
                        }}
                        style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%` }}
                        data-offx={offX}
                        data-offy={offY}
                        data-delay={(i * 0.06).toFixed(3)}
                      >
                        {
                          (() => {
                            const folderKey = wall.id === 'lunch' ? 'lunch' : wall.id; // manifest folders use 'lunch' for team lunch
                            const arr = manifest?.[folderKey] ?? [];
                            const entry = arr[i] ?? null;
                            const seed = `${wall.seedPrefix}-${i}`;
                            const src = entry ? entry.url : imgSrc(seed, 800, 600);
                            const srcset = entry && entry.srcset ? entry.srcset.join(', ') : undefined;
                            return <img loading="lazy" src={src} srcSet={srcset} alt="" />;
                          })()
                        }
                        <span className="stripe" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default Gallery;
