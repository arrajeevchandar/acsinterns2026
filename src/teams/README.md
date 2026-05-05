# Adobe DX · Meet the Teams

Production implementation of the `intern-new` design handoff from Claude Design.

## Stack

- **Vite 5** — dev server & bundler
- **React 18**
- **Tailwind CSS 3** — utility classes + custom config (`tailwind.config.js`)
- **Plain JSX** — matches the prototype; no TypeScript

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
.
├── index.html              Vite entry; loads Inter + Inter Tight from Google Fonts
├── tailwind.config.js      Custom colors (ink, elevated, muted, divider, adobe) + display font
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx            React 18 entry
    ├── App.jsx             Top-level view state (teams | team) + modal
    ├── index.css           @tailwind directives + all custom CSS (animations, .reveal, .team-card hover, .portrait-img, .name-underline, .modal-in, scrollbar, reduced-motion)
    ├── data.jsx            Static team + member data; helpers (totalMembers, universityBreakdown, portraitUrl)
    ├── icons.jsx           Inline SVG icons (lucide-style)
    ├── Reveal.jsx          IntersectionObserver fade-up wrapper
    ├── Marquee.jsx         Looping ticker (duplicates items, -50% translate animation)
    ├── Nav.jsx             Top nav with mix-blend-difference
    ├── TeamsOverview.jsx   Hero, 6-team card grid, marquees, footer
    ├── TeamDetail.jsx      Per-team page: big number, mission, member portraits
    └── MemberModal.jsx     Profile overlay (Esc / backdrop to close)
```

## What changed vs the prototype

The prototype loaded React, ReactDOM, Babel-standalone, and lucide via CDN, then attached components to `window`. This version uses standard ES module imports and Vite's build pipeline. Behavior, layout, typography, and animations are unchanged.

Two small things worth noting:

- **Bug fix in `MemberModal.jsx`:** The prototype had `detail="/in/" + member.name...` which is invalid JSX (string concatenation outside braces). Wrapped in `{}` so it renders.
- The `LinkRow` component accepts an `icon` prop but doesn't render it — that's how the prototype was written, and I preserved it.

Portrait images come from `https://i.pravatar.cc/600?img=N` per the prototype. Swap `portraitUrl` in `src/data.jsx` to use real assets when available.
