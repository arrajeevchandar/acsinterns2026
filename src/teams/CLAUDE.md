# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

No test runner or linter is configured.

## Architecture

This is an **Adobe DX "Meet the Teams"** single-page app — a static internship portal prototype converted from a CDN-based prototype to a Vite + ES module build.

**Stack:** React 18, Vite 5, Tailwind CSS 3, plain JSX (no TypeScript).

### Navigation model

There is no router. `App.jsx` holds all view state with `useState`:
- `view` — `"teams"` | `"team"`
- `selectedTeamSlug` — which team is being viewed
- `selectedMemberId` — which member modal is open

Navigation functions (`goHome`, `openTeam`, `openMember`, `closeMember`) are passed as props to children.

### Data layer

All data is static, defined in `src/data.jsx`: 6 teams, 25 members. Helper exports include `totalMembers`, `universityBreakdown`, and `portraitUrl` (currently uses `https://i.pravatar.cc/600?img=N` placeholders — swap `portraitUrl` in `data.jsx` for real assets).

### Styling

- Tailwind utility classes for layout/spacing/color
- Custom theme in `tailwind.config.js`: colors `ink`, `elevated`, `muted`, `divider`, `adobe`; font families `display` (Inter Tight) and `sans` (Inter) loaded via Google Fonts in `index.html`
- Custom CSS in `src/index.css`: animations (`.reveal`, `.team-card`, `.portrait-img`, `.name-underline`, `.modal-in`), scrollbar styles, and `prefers-reduced-motion` overrides

### Key components

| File | Purpose |
|---|---|
| `App.jsx` | Root — view state + modal state |
| `TeamsOverview.jsx` | Hero, 6-team card grid, marquees, footer |
| `TeamDetail.jsx` | Per-team page: big number, mission, member portraits |
| `MemberModal.jsx` | Profile overlay (Esc / backdrop to close) |
| `Reveal.jsx` | `IntersectionObserver` fade-up animation wrapper |
| `Marquee.jsx` | Looping ticker (duplicates items, `-50%` translate) |
| `Nav.jsx` | Top nav with `mix-blend-difference` |
| `icons.jsx` | Inline SVG icon components (lucide-style) |
