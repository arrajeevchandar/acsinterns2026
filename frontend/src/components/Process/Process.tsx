import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Process.css';

/* ─── Config ────────────────────────────────────────────────────── */
const START_DATE = new Date('2026-04-06');
const END_DATE   = new Date('2026-06-13');
const DAY_PX     = 42;
const CANVAS_H   = 560;
const diffDays = (a: Date, b: Date) =>
  Math.round((b.getTime() - a.getTime()) / 86400000);

const TOTAL_DAYS = diffDays(START_DATE, END_DATE);
const TOTAL_W    = TOTAL_DAYS * DAY_PX + 120;

/* ─── Timeline data ─────────────────────────────────────────────── */
const BAR_COLOR = '#EB1C24';
const DURATIONS = [
  { label: 'Onboarding & Orientation', opacity: 0.55, start: '2026-04-06', end: '2026-04-17', row: 0 },
  { label: 'Discovery & Team Match',   opacity: 0.40, start: '2026-04-18', end: '2026-05-01', row: 1 },
  { label: 'Build Sprint',             opacity: 0.90, start: '2026-05-02', end: '2026-05-22', row: 0 },
  { label: 'Polish & Integrate',       opacity: 0.65, start: '2026-05-23', end: '2026-06-05', row: 1 },
  { label: 'Demo & Showcase',          opacity: 0.75, start: '2026-06-06', end: '2026-06-13', row: 0 },
];

const EVENTS = [
  { title: 'Welcome Day',       date: '2026-04-06', detail: 'Kickoff session, team introductions and Adobe tools setup.', icon: '⚡' },
  { title: 'Mentor Reveal',     date: '2026-04-14', detail: 'Meet your assigned mentor and map out your project goals.', icon: '🤝' },
  { title: 'First Prototype',   date: '2026-04-28', detail: 'Present rough screens and first API integrations.',          icon: '✏️' },
  { title: 'Mid-point Review',  date: '2026-05-08', detail: 'Progress check with leadership. Celebrate wins, refine scope.', icon: '📊' },
  { title: 'UX Polish Sprint',  date: '2026-05-18', detail: 'Accessibility audit, performance tweaks and design review.', icon: '✨' },
  { title: 'Final Integration', date: '2026-05-30', detail: 'End-to-end testing and stakeholder walkthroughs.',           icon: '🔗' },
  { title: 'Demo Day 🏆',       date: '2026-06-10', detail: 'Final showcase to ACS leadership. Celebrate!',              icon: '🏆' },
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
  const floorY = H * 0.60;
  const viewportCenterX = scrollX + W / 2;
  const vanishX = Math.round(viewportCenterX / colSpacing) * colSpacing - scrollX;

  ctx.lineWidth = 1;
  const firstCol = Math.floor(scrollX / colSpacing) * colSpacing;
  for (let wx = firstCol; wx <= firstCol + W + colSpacing; wx += colSpacing) {
    const sx = wx - scrollX;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.moveTo(sx, 8); ctx.lineTo(sx, floorY); ctx.stroke();
  }
  for (let wx = firstCol; wx <= firstCol + W + colSpacing; wx += colSpacing) {
    const sx = wx - scrollX;
    const bottomX = sx + (sx - vanishX) * 0.6;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.moveTo(sx, floorY); ctx.lineTo(bottomX, H); ctx.stroke();
  }
  for (let i = 1; i <= 8; i++) {
    const t = i / 8;
    const y = floorY + (H - floorY) * (t * t);
    ctx.strokeStyle = `rgba(255,255,255,${0.02 + t * 0.045})`;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath(); ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();
};

/* ─── Layout constants ──────────────────────────────────────────── */
const BAR_HEIGHT  = 26;
const BAR_GAP     = 8;
const BAR_ROW_H   = BAR_HEIGHT + BAR_GAP;
// Bars sit at the very bottom of the canvas
const BAR_BOTTOM  = CANVAS_H - 12;           // bottom edge of last bar row
const BAR_ROW_TOP = BAR_BOTTOM - BAR_ROW_H * 2 + BAR_GAP; // top of row 0

// Connector line sits in the middle area
const CONNECTOR_Y = 260;
const CARD_H      = 148;
const CARD_GAP    = 24;

/* ─── Component ─────────────────────────────────────────────────── */
const Process: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.08 });
  const scrollRef  = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const [scrollX, setScrollX]     = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const [hoveredDate, setHoveredDate] = useState('');
  const isDragging = useRef(false);
  const dragStart  = useRef({ x: 0, scroll: 0 });

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
    setViewportW(scrollRef.current?.clientWidth ?? 0);
    redrawGrid(sx);
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
    setTimeout(() => redrawGrid(0), 100);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll, redrawGrid]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      redrawGrid(scrollRef.current?.scrollLeft ?? 0);
      setViewportW(scrollRef.current?.clientWidth ?? 0);
    });
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [redrawGrid]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); el.scrollLeft += e.deltaY + e.deltaX; };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

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

  /* ── Event panel positions ──────────────────────────────────────
     Alternate: even index → card ABOVE connector line
                odd index  → card BELOW connector line
  ─────────────────────────────────────────────────────────────── */
  const eventLayout = EVENTS.map((ev, i) => {
    const cx = dateToX(ev.date);
    const isAbove = i % 2 === 0;
    const cardTop = isAbove
      ? CONNECTOR_Y - CARD_GAP - CARD_H
      : CONNECTOR_Y + CARD_GAP;
    const arrowTipY = isAbove ? cardTop + CARD_H : cardTop; // where stem meets card
    return { cx, isAbove, cardTop, arrowTipY };
  });

  // Polyline: dots sit on CONNECTOR_Y at each event cx
  const polylinePoints = eventLayout.map(p => `${p.cx},${CONNECTOR_Y}`).join(' ');

  return (
    <section id="timeline" ref={ref} className={`tl-section ${isVisible ? 'tl-section--visible' : ''}`}>

      <div className="tl-header">
        <span className="tl-kicker">10-Week Journey</span>
        <h2 className="tl-heading">Internship arc.</h2>
        <p className="tl-subhead">Drag or scroll &nbsp;·&nbsp; Click events to expand</p>
      </div>

      <div className="tl-container">
        <div
          className="tl-canvas-wrap"
          ref={scrollRef}
          onMouseDown={onMouseDown}
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          <div className="tl-inner" style={{ width: TOTAL_W, height: CANVAS_H }}>

            {/* Grid canvas */}
            <canvas
              ref={canvasRef}
              className="tl-grid-canvas"
              style={{ position: 'sticky', left: 0, top: 0, width: '100%', height: CANVAS_H, display: 'block', zIndex: 1 }}
            />

            {/* Ruler */}
            <div className="tl-ruler" style={{ width: TOTAL_W }}>
              {months.map((m, i) => (
                <div key={i} className="tl-ruler-month" style={{ left: m.x }}>{m.label}</div>
              ))}
              <div className="tl-ruler-days">
                {days.filter(d => d.isEvent).map((d, i) => (
                  <div key={i} className="tl-ruler-day tl-ruler-day--event" style={{ left: d.x }}>
                    {d.label}<span className="tl-ruler-tick" />
                  </div>
                ))}
              </div>
            </div>

            {/* Ghost date */}
            {hoveredDate && (
              <div className="tl-ghost-date" style={{ left: scrollX + viewportW / 2 }}>
                {hoveredDate}
              </div>
            )}

            {/* ── SVG: duration bars + connector line + stems ───── */}
            <svg
              className="tl-path-svg"
              style={{ width: TOTAL_W, height: CANVAS_H, position: 'absolute', top: 0, left: 0, zIndex: 6, pointerEvents: 'none' }}
            >
              <defs>
                {DURATIONS.map((dur, i) => (
                  <linearGradient key={i} id={`dg${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor={BAR_COLOR} stopOpacity={dur.opacity} />
                    <stop offset="100%" stopColor={BAR_COLOR} stopOpacity={dur.opacity * 0.55} />
                  </linearGradient>
                ))}
                {/* Glow filter for connector line */}
                <filter id="glow" x="-20%" y="-200%" width="140%" height="500%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Duration bars — bottom zone, monotone red */}
              {DURATIONS.map((dur, i) => {
                const x1   = dateToX(dur.start);
                const x2   = dateToX(dur.end);
                const barW = Math.max(x2 - x1, 6);
                // row 0 on top, row 1 below it
                const y    = BAR_ROW_TOP + dur.row * BAR_ROW_H;
                const maxChars = Math.floor((barW - 24) / 6.8);
                const label = maxChars > 4
                  ? (dur.label.length > maxChars ? dur.label.slice(0, maxChars - 1) + '…' : dur.label)
                  : '';
                return (
                  <g key={i}>
                    {/* Track */}
                    <rect x={x1} y={y} width={barW} height={BAR_HEIGHT} rx={3}
                      fill={BAR_COLOR} fillOpacity={0.06}
                      stroke={BAR_COLOR} strokeOpacity={dur.opacity * 0.35} strokeWidth={1} />
                    {/* Fill */}
                    <rect x={x1} y={y} width={barW} height={BAR_HEIGHT} rx={3}
                      fill={`url(#dg${i})`} />
                    {/* Left accent stripe */}
                    <rect x={x1} y={y} width={4} height={BAR_HEIGHT} rx={2}
                      fill={BAR_COLOR} fillOpacity={Math.min(dur.opacity + 0.1, 1)} />
                    {/* Label */}
                    {label && (
                      <text
                        x={x1 + 12} y={y + BAR_HEIGHT / 2}
                        dominantBaseline="middle"
                        fontSize="9.5" fontWeight="700" fontFamily="inherit"
                        fill="rgba(255,255,255,0.85)"
                      >
                        {label}
                      </text>
                    )}
                    {/* End date */}
                    {barW > 50 && (
                      <text
                        x={x2 - 8} y={y + BAR_HEIGHT / 2}
                        dominantBaseline="middle" textAnchor="end"
                        fontSize="7.5" fontWeight="600" fontFamily="inherit"
                        fill="rgba(255,255,255,0.38)"
                      >
                        {new Date(dur.end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* ── Connector polyline ───────────────────────────── */}
              {/* Glow */}
              <polyline
                points={polylinePoints}
                fill="none" stroke="#EB1C24" strokeWidth={6} strokeOpacity={0.15}
                strokeLinejoin="round" filter="url(#glow)"
              />
              {/* Main line */}
              <polyline
                points={polylinePoints}
                fill="none" stroke="#EB1C24" strokeWidth={1.5} strokeOpacity={0.65}
                strokeLinejoin="round"
              />

              {/* Dashed stems from connector line to each card arrow tip */}
              {eventLayout.map((p, i) => (
                <line key={i}
                  x1={p.cx} y1={CONNECTOR_Y}
                  x2={p.cx} y2={p.arrowTipY}
                  stroke="#EB1C24" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="3 3"
                />
              ))}

              {/* Dots on the polyline */}
              {eventLayout.map((p, i) => (
                <g key={i}>
                  <circle cx={p.cx} cy={CONNECTOR_Y} r={6}  fill="#111" stroke="#EB1C24" strokeWidth={2} />
                  <circle cx={p.cx} cy={CONNECTOR_Y} r={2.5} fill="#EB1C24" />
                </g>
              ))}
            </svg>

            {/* Event panels */}
            {EVENTS.map((ev, i) => {
              const { cx, isAbove, cardTop } = eventLayout[i];
              const dateStr = new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
              return (
                <div
                  key={i}
                  className="tl-event-panel"
                  style={{
                    left: Math.max(cx, 110),
                    top: cardTop,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="tl-event-sidebar"><span>EVENT</span></div>
                  <div className="tl-event-body">
                    <strong>{ev.title}</strong>
                    <em>{dateStr}</em>
                    <div className="tl-event-divider" />
                    <p>{ev.detail}</p>
                  </div>
                  {/* Arrow points toward connector line */}
                  <div className={`tl-event-arrow ${isAbove ? 'tl-event-arrow--down' : 'tl-event-arrow--up'}`} />
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