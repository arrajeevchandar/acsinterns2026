import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Process.css';

/* ─── Config ────────────────────────────────────────────────────── */
const START_DATE = new Date('2026-04-06');
const END_DATE   = new Date('2026-06-13');
const DAY_PX     = 42;
const RULER_H    = 64;
const CANVAS_H   = 560;
const BAR_H      = 26;
const FLOOR_Y    = CANVAS_H * 0.62; // where wall meets floor

const diffDays = (a: Date, b: Date) =>
  Math.round((b.getTime() - a.getTime()) / 86400000);

const TOTAL_DAYS = diffDays(START_DATE, END_DATE);
const TOTAL_W    = TOTAL_DAYS * DAY_PX + 120;

/* ─── Timeline data ─────────────────────────────────────────────── */
const DURATIONS = [
  { label: 'Onboarding & Orientation', color: '#6C8EF5', start: '2026-04-06', end: '2026-04-17', row: 0 },
  { label: 'Discovery & Team Match',   color: '#F5A623', start: '2026-04-18', end: '2026-05-01', row: 1 },
  { label: 'Build Sprint',             color: '#EB1C24', start: '2026-05-02', end: '2026-05-22', row: 0 },
  { label: 'Polish & Integrate',       color: '#E91E8C', start: '2026-05-23', end: '2026-06-05', row: 1 },
  { label: 'Demo & Showcase',          color: '#2ECC71', start: '2026-06-06', end: '2026-06-13', row: 0 },
];

const EVENTS = [
  { title: 'Welcome Day',       date: '2026-04-06', detail: 'Kickoff session, team introductions and Adobe tools setup.', icon: '⚡', row: 0 },
  { title: 'Mentor Reveal',     date: '2026-04-14', detail: 'Meet your assigned mentor and map out your project goals.', icon: '🤝', row: 0 },
  { title: 'First Prototype',   date: '2026-04-28', detail: 'Present rough screens and first API integrations.',          icon: '✏️', row: 0 },
  { title: 'Mid-point Review',  date: '2026-05-08', detail: 'Progress check with leadership. Celebrate wins, refine scope.', icon: '📊', row: 0 },
  { title: 'UX Polish Sprint',  date: '2026-05-18', detail: 'Accessibility audit, performance tweaks and design review.', icon: '✨', row: 0 },
  { title: 'Final Integration', date: '2026-05-30', detail: 'End-to-end testing and stakeholder walkthroughs.',           icon: '🔗', row: 0 },
  { title: 'Demo Day 🏆',       date: '2026-06-10', detail: 'Final showcase to ACS leadership. Celebrate!',              icon: '🏆', row: 0 },
];

/* ─── Helpers ───────────────────────────────────────────────────── */
const dateToX = (d: string) => diffDays(START_DATE, new Date(d)) * DAY_PX + 60;

const EVENT_DATES = new Set(EVENTS.map(e => e.date));

const buildRuler = () => {
  const months: { label: string; x: number }[] = [];
  const days: { label: string; x: number; isEvent: boolean }[] = [];
  let d = new Date(START_DATE);
  let lastMonth = '';
  while (d <= END_DATE) {
    const x = diffDays(START_DATE, d) * DAY_PX + 60;
    const month = d.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (month !== lastMonth) { months.push({ label: month, x }); lastMonth = month; }
    const dateStr = d.toISOString().split('T')[0];
    const isEvent = EVENT_DATES.has(dateStr);
    days.push({ label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), x, isEvent });
    d = new Date(d.getTime() + 86400000);
  }
  return { months, days };
};
const { months, days } = buildRuler();

/* Draw the 3D perspective grid on canvas */
const drawGrid = (canvas: HTMLCanvasElement, scrollX: number) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const colSpacing = 42;
  const floorY  = H * 0.60;
  // Vanishing point tracks the viewport center in scroll space
  const viewportCenterX = scrollX + W / 2;
  // Snap vanishX to nearest column so it always aligns with a wall line
  const vanishX = Math.round(viewportCenterX / colSpacing) * colSpacing - scrollX;

  // --- Vertical wall lines ---
  ctx.lineWidth = 1;
  // Start from nearest column behind scroll offset
  const firstCol = Math.floor(scrollX / colSpacing) * colSpacing;
  for (let wx = firstCol; wx <= firstCol + W + colSpacing; wx += colSpacing) {
    const sx = wx - scrollX; // screen x
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.moveTo(sx, 8);
    ctx.lineTo(sx, floorY);
    ctx.stroke();
  }

  // --- Floor lines: from each wall base, fan relative to vanishX ---
  for (let wx = firstCol; wx <= firstCol + W + colSpacing; wx += colSpacing) {
    const sx = wx - scrollX;
    const distFromVanish = sx - vanishX;
    const bottomX = sx + distFromVanish * 0.6;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, floorY);
    ctx.lineTo(bottomX, H);
    ctx.stroke();
  }

  // --- Horizontal floor lines ---
  const numHLines = 8;
  for (let i = 1; i <= numHLines; i++) {
    const t = i / numHLines;
    const y = floorY + (H - floorY) * (t * t);
    ctx.strokeStyle = `rgba(255,255,255,${0.02 + t * 0.045})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // --- Horizon line ---
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(W, floorY);
  ctx.stroke();
};

/* ─── Component ─────────────────────────────────────────────────── */
const Process: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.08 });
  const scrollRef  = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  
  const [scrollX, setScrollX]         = useState(0);
  const [hoveredDate, setHoveredDate] = useState('');
  const isDragging = useRef(false);
  const dragStart  = useRef({ x: 0, scroll: 0 });

  // Redraw grid on scroll
  const redrawGrid = useCallback((sx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = CANVAS_H;
    drawGrid(canvas, sx);
  }, []);

  const handleScroll = useCallback(() => {
    const sx = scrollRef.current?.scrollLeft ?? 0;
    setScrollX(sx);
    redrawGrid(sx);
    // update hovered date based on center of viewport
    const centerX = sx + (scrollRef.current?.clientWidth ?? 0) / 2;
    const dayIdx  = Math.round((centerX - 60) / DAY_PX);
    if (dayIdx >= 0 && dayIdx <= TOTAL_DAYS) {
      const d = new Date(START_DATE.getTime() + dayIdx * 86400000);
      setHoveredDate(d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
    }
  }, [redrawGrid]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    // initial draw
    setTimeout(() => redrawGrid(0), 100);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll, redrawGrid]);

  // Resize observer
  useEffect(() => {
    const ro = new ResizeObserver(() => redrawGrid(scrollRef.current?.scrollLeft ?? 0));
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [redrawGrid]);

  // Wheel → horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.pageX, scroll: scrollRef.current?.scrollLeft ?? 0 };
  };
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      scrollRef.current.scrollLeft = dragStart.current.scroll - (e.pageX - dragStart.current.x);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  // Path points
  return (
    <section id="timeline" ref={ref} className={`tl-section ${isVisible ? 'tl-section--visible' : ''}`}>

      {/* Header */}
      <div className="tl-header">
        <span className="tl-kicker">10-Week Journey</span>
        <h2 className="tl-heading">Internship arc.</h2>
        <p className="tl-subhead">Drag or scroll &nbsp;·&nbsp; Click events to expand</p>
      </div>



      {/* Scrollable canvas */}
      <div className="tl-container">
      <div
        className="tl-canvas-wrap"
        ref={scrollRef}
        onMouseDown={onMouseDown}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
      >
        <div className="tl-inner" style={{ width: TOTAL_W, height: CANVAS_H }}>

          {/* Grid canvas — full viewport width, redrawn on scroll */}
          <canvas
            ref={canvasRef}
            className="tl-grid-canvas"
            style={{ position: 'sticky', left: 0, top: 0, width: '100%', height: CANVAS_H, display: 'block', zIndex: 1 }}
          />

          {/* Ruler — pinned to bottom */}
          <div className="tl-ruler" style={{ width: TOTAL_W }}>
            {months.map((m, i) => (
              <div key={i} className="tl-ruler-month" style={{ left: m.x }}>{m.label}</div>
            ))}
            <div className="tl-ruler-days">
              {days.filter(d => d.isEvent).map((d, i) => (
                <div key={i} className="tl-ruler-day tl-ruler-day--event" style={{ left: d.x }}>
                  {d.label}
                  <span className="tl-ruler-tick" />
                </div>
              ))}
            </div>
          </div>

          {/* Big centered date ghost text */}
          {hoveredDate && (
            <div className="tl-ghost-date" style={{ left: scrollX + (scrollRef.current?.clientWidth ?? 0) / 2 }}>
              {hoveredDate}
            </div>
          )}

          {/* Event panels — ChronoFlo style */}
          {EVENTS.map((ev, i) => {
            const dateStr = new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            const FLOOR_BOTTOM = CANVAS_H - 100; // sit above duration text + ruler
            return (
              <div
                key={i}
                className='tl-event-panel'
                style={{ left: Math.max(dateToX(ev.date), 105), top: FLOOR_BOTTOM - 160, transform: 'translateX(-50%)' }}
              >
                <div className="tl-event-sidebar">
                  <span>EVENT</span>
                </div>
                <div className="tl-event-body">
                  <strong>{ev.title}</strong>
                  <em>{dateStr}</em>
                  <div className="tl-event-divider" />
                  <p>{ev.detail}</p>
                </div>
                <div className='tl-event-arrow tl-event-arrow--down' />
              </div>
            );
          })}

          {/* Duration text — ChronoFlo style */}
          {DURATIONS.map((dur, i) => {
            const x    = dateToX(dur.start);
            const xEnd = dateToX(dur.end);
            const yBase = CANVAS_H - 90;
            const y    = yBase + dur.row * 24;
            const startStr = new Date(dur.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            const endStr   = new Date(dur.end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            return (
              <div key={i} className="tl-dur" style={{ left: x, top: y }}>
                <span className="tl-dur-range">{startStr} – {endStr}</span>
                <span className="tl-dur-label">{dur.label}</span>
              </div>
            );
          })}

        </div>
      </div>
      </div>
    </section>
  );
};

export default Process;