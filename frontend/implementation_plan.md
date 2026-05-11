# Adobe ACS Interns 2026 Portal — Phase 1: Splash Screen + Home Page

## Overview

Build a cinematic **Adobe logo splash screen** with a 3D animation transition, followed by a **premium dark-themed home page** for the ACS Interns 2026 portal. Inspired by [thecirclecompany.co](https://thecirclecompany.co/) — dark, bold, animated, and editorial.

**Tech Stack**: React 19 + TypeScript + **TailwindCSS v4**  
**Color Palette**: Adobe Red (`#E8302A`), Black (`#1B1B1B` / `#0D0D0D`), White (`#FAFAFA`), accent grays  
**Typography**: [Adobe Clean](https://fonts.adobe.com/) fallback to `Inter` from Google Fonts (weights 300, 400, 500, 600, 700, 800)  
**Theme**: Dark/Light toggle (dark default)

---

## Decisions (Resolved)

| Question | Decision |
|---|---|
| TailwindCSS version | **v4** — uses CSS-first config via `@theme` in `index.css`, no `tailwind.config.js` needed |
| Adobe logo | **Recreate** a clean triangular Adobe "A" SVG in-house (red/white) |
| Dark/Light theme | **Include toggle in Phase 1** — dark is default, light theme via CSS custom properties |
| Core Values | **Placeholder** values (Innovation, Collaboration, Excellence, Impact) |
| Hero tagline | **Generic**: *"Where Innovation Meets Opportunity"* |

> [!WARNING]
> **No routing library yet**: This phase only builds the home page. Future phases will need `react-router-dom` for Teams, Gallery, Projects, FAQs pages. Nav links are anchors/scroll-to for now.

---

## Proposed Changes

### 1. Setup & Configuration

#### [MODIFY] [package.json](file:///c:/Users/rajeevc/Desktop/acsinterns2026/package.json)
- Add `tailwindcss` v4 as a dependency (v4 is CSS-first, no JS config file needed)
- Add `@tailwindcss/postcss` as dev dependency (PostCSS integration for CRA)
- Add `@fontsource/inter` for the Inter font

> [!NOTE]
> **TailwindCSS v4 differences**: No `tailwind.config.js` — all theme customization happens via `@theme` blocks inside CSS. No `content` array needed (v4 auto-detects). PostCSS plugin is `@tailwindcss/postcss` instead of `tailwindcss`.

#### [NEW] postcss.config.js
```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  }
}
```

> [!IMPORTANT]
> No `tailwind.config.js` needed. Theme tokens, custom colors, animations, and fonts are all defined via `@theme` in `index.css`.

#### [MODIFY] [index.html](file:///c:/Users/rajeevc/Desktop/acsinterns2026/public/index.html)
- Update `<title>` to "ACS Interns 2026 | Adobe"
- Add meta description for SEO
- Add Google Fonts preconnect + Inter font link
- Set `<body>` background to `#0D0D0D`

---

### 2. Design System & Global Styles

#### [MODIFY] [index.css](file:///c:/Users/rajeevc/Desktop/acsinterns2026/src/index.css)

Complete rewrite with **TailwindCSS v4 CSS-first config**:

```css
@import "tailwindcss";

/* === TAILWIND V4 THEME (replaces tailwind.config.js) === */
@theme {
  /* --- Color Tokens --- */
  --color-adobe-red: #E8302A;
  --color-adobe-red-dark: #C41E1E;
  --color-adobe-red-light: #FF4D47;
  --color-dark-primary: #0D0D0D;
  --color-dark-secondary: #1B1B1B;
  --color-dark-card: #1E1E1E;
  --color-dark-border: #2A2A2A;
  --color-gray-text: #A0A0A0;
  /* Light theme overrides */
  --color-light-primary: #FAFAFA;
  --color-light-secondary: #F0F0F0;
  --color-light-card: #FFFFFF;
  --color-light-border: #E0E0E0;
  --color-light-text: #333333;

  /* --- Font --- */
  --font-sans: 'Inter', system-ui, sans-serif;

  /* --- Custom Animations --- */
  --animate-logo-draw: logoDraw 2s ease-in-out forwards;
  --animate-logo-fill: logoFill 0.8s ease-in-out 1.8s forwards;
  --animate-logo-glow: logoGlow 1.5s ease-in-out 2.2s forwards;
  --animate-logo-scale: logoScale 0.6s ease-in-out 3s forwards;
  --animate-splash-exit: splashExit 0.8s ease-in-out 3.4s forwards;
  --animate-text-reveal: textReveal 0.6s ease-out 2.6s forwards;
  --animate-fade-up: fadeUp 0.8s ease-out forwards;
  --animate-fade-in: fadeIn 0.6s ease-out forwards;
  --animate-slide-in-left: slideInLeft 0.8s ease-out forwards;
  --animate-slide-in-right: slideInRight 0.8s ease-out forwards;
  --animate-float: float 6s ease-in-out infinite;
  --animate-pulse-glow: pulseGlow 3s ease-in-out infinite;
  --animate-marquee: marquee 30s linear infinite;
}

/* === DARK/LIGHT THEME SYSTEM === */
/* Dark is default. Light theme activated by [data-theme="light"] on <html> */
:root {
  --bg-primary: var(--color-dark-primary);
  --bg-secondary: var(--color-dark-secondary);
  --bg-card: var(--color-dark-card);
  --border-color: var(--color-dark-border);
  --text-primary: #FFFFFF;
  --text-secondary: var(--color-gray-text);
}
[data-theme="light"] {
  --bg-primary: var(--color-light-primary);
  --bg-secondary: var(--color-light-secondary);
  --bg-card: var(--color-light-card);
  --border-color: var(--color-light-border);
  --text-primary: #1B1B1B;
  --text-secondary: var(--color-light-text);
}

/* === Base Resets === */
@layer base {
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-sans);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  ::selection { background: var(--color-adobe-red); color: white; }
}

/* === @keyframes (all animations) === */
/* logoDraw, logoFill, logoGlow, logoScale, splashExit, textReveal */
/* fadeUp, fadeIn, slideInLeft, slideInRight, float, pulseGlow, marquee */
/* (Full keyframe definitions implemented in component CSS + here) */

/* === Custom Scrollbar === */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-adobe-red); }
```

---

### 3. Splash Screen Component

#### [NEW] src/components/SplashScreen/SplashScreen.tsx

**Behavior**:
1. Full-screen black overlay (`position: fixed, z-50, inset-0`)
2. Adobe "A" triangle logo rendered as **inline SVG** with stroke-dasharray/dashoffset animation — the logo "draws" itself in white/red strokes over ~2 seconds
3. After the draw completes, the SVG fill transitions to Adobe Red with a glow effect
4. Text "ADOBE" fades up below the logo (letter-spaced, light weight)
5. Logo scales down, entire splash screen slides up and fades out
6. Component calls `onComplete()` callback and unmounts
7. Total duration: **~4 seconds**

**Props interface**:
```ts
interface SplashScreenProps {
  onComplete: () => void;
}
```

**State**: `isExiting: boolean` — triggers exit animation class, then calls onComplete after animationend.

**Key implementation details**:
- The Adobe "A" logo is an SVG `<path>` representing the triangular A shape
- Uses CSS `stroke-dasharray` + `stroke-dashoffset` for the draw-on effect
- Particle/sparkle effect: 8–12 small circles (`<div>`) with randomized positions, animated with `float` + varying delays
- Background has subtle radial gradient from dark-red center (`rgba(232,48,42,0.05)`) outward to black
- After all animations play, fires `onAnimationEnd` on the wrapper → calls `onComplete`

#### [NEW] src/components/SplashScreen/SplashScreen.css
- All splash-specific animation keyframes defined here
- Particle positioning and animation delays
- Responsive sizing (logo: `w-32 h-32` on mobile → `w-48 h-48` on desktop)

---

### 4. Navbar Component

#### [NEW] src/components/Navbar/Navbar.tsx

**Design** (inspired by thecirclecompany.co):
- Fixed top, full-width, transparent background → blurs to `backdrop-blur-xl bg-dark-primary/80` on scroll
- Left: Adobe logo icon (small, recreated triangular "A" SVG, red) + "ACS Interns 2026" text
- Center/Right: Nav links — Home, Gallery, Projects, Teams, FAQs
- Far right: **Theme toggle button** (moon/sun icon) — toggles `data-theme` attribute on `<html>` between `"dark"` and `"light"`
- Mobile: Hamburger menu → full-screen overlay nav with staggered link animations

**Props interface**:
```ts
interface NavbarProps {
  activeSection?: string;
}
```

**State**: `isScrolled` (scroll listener, triggers bg blur), `isMobileMenuOpen`

**Scroll-aware**: Uses `IntersectionObserver` or scroll listener to highlight active nav link based on current section in viewport.

#### [NEW] src/components/Navbar/Navbar.css
- Mobile menu animation (slide-in from right)
- Nav link hover effects: red underline slides in from left
- Glassmorphism backdrop styles

---

### 5. Hero Section Component

#### [NEW] src/components/Hero/Hero.tsx

**Design** (editorial, cinematic, like thecirclecompany.co hero):
- Full viewport height (`min-h-screen`)
- Large bold headline: **"ACS Interns 2026"** — massive typography (`text-6xl md:text-8xl lg:text-9xl`), font-weight 800
- Subtitle underneath: *"Where Innovation Meets Opportunity"* — lighter weight, gray-text
- Animated text reveal: each word fades up with stagger delay using `fade-up` + `animation-delay`
- Decorative: Subtle grid/dot pattern overlay at low opacity
- Decorative: A large, semi-transparent Adobe "A" watermark in the background, slowly rotating
- CTA button: "Explore Teams" — red pill button with `pulse-glow` animation on hover
- Scroll indicator at bottom: animated chevron bouncing down

**Scroll-triggered elements**: Use `IntersectionObserver` to trigger `fade-up` class when elements enter viewport.

#### [NEW] src/components/Hero/Hero.css
- Staggered text animation delays
- Grid/dot pattern background via CSS `radial-gradient` repeating
- Watermark rotation animation
- CTA hover state with scale + glow

---

### 6. Marquee/Ticker Section

#### [NEW] src/components/Marquee/Marquee.tsx

**Design**: Horizontal auto-scrolling text strip (like thecirclecompany.co)
- Sits between Hero and Core Values sections
- Repeating text: "AEM • WORKFRONT • DATA • UI • DACOE •" in large bold caps
- Separator dots in Adobe Red
- Two rows scrolling in opposite directions for visual depth
- Slight border-top and border-bottom in `dark-border`

---

### 7. Core Values Section

#### [NEW] src/components/CoreValues/CoreValues.tsx

**Design**:
- Section heading: "Our Core Values" — large, with a red accent line
- Grid of 4–6 value cards (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Each card: dark glass card (`bg-dark-card/50 backdrop-blur border border-dark-border rounded-2xl`)
  - Icon (SVG) with red accent
  - Value title (bold, white)
  - Description (gray-text, light)
  - Hover: card lifts (`-translate-y-2`), border becomes `adobe-red`, subtle red glow
- Cards animate in with `fade-up` + stagger on scroll intersection

**Values data** (placeholder — user to confirm):
```ts
const coreValues = [
  { icon: "💡", title: "Innovation", description: "Pushing boundaries..." },
  { icon: "🤝", title: "Collaboration", description: "Stronger together..." },
  { icon: "🎯", title: "Excellence", description: "Quality in everything..." },
  { icon: "🌍", title: "Impact", description: "Making a difference..." },
];
```

#### [NEW] src/components/CoreValues/CoreValues.css

---

### 8. Stats/Highlights Section

#### [NEW] src/components/Stats/Stats.tsx

**Design**: A horizontal row of key stats with animated counting
- "X+ Interns", "Y Teams", "Z Projects", "1 Vision"
- Numbers animate/count up when they enter viewport
- Separated by vertical red lines
- Full-width dark section with subtle radial gradient background

---

### 9. Teams Preview Section

#### [NEW] src/components/TeamsPreview/TeamsPreview.tsx

**Design**: Horizontal scrolling cards or grid showing team names
- Each team card: team name (AEM, Workfront, Data, UI, DACOE) + brief one-liner
- Hover: card expands slightly, shows team accent color/icon
- "View All Teams →" link at end
- Cards have glassmorphism effect

---

### 10. Footer Component

#### [NEW] src/components/Footer/Footer.tsx

**Design** (dark, editorial):
- Large "ACS INTERNS 2026" text in massive semi-transparent type (watermark style)
- Three columns: Quick Links, Teams, Connect
- Bottom bar: "© 2026 Adobe. All rights reserved." + small Adobe logo
- Red accent line at the top of footer
- Subtle grid background pattern

#### [NEW] src/components/Footer/Footer.css

---

### 11. Shared Utilities

#### [NEW] src/hooks/useIntersectionObserver.ts
Custom hook to detect when elements enter viewport, triggers CSS animation classes.

```ts
function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): boolean // returns isVisible
```

#### [NEW] src/hooks/useScrollPosition.ts
Custom hook returning current scroll Y position (for navbar bg transition).

#### [NEW] src/assets/adobe-logo.svg
Recreated Adobe triangular "A" logo as clean inline SVG. The design:
- Triangular "A" shape — a wide triangle with a triangular notch cut from the center-bottom
- SVG `viewBox="0 0 100 100"`, single `<path>` element
- Default fill: `#E8302A` (Adobe Red)
- Stroke-friendly: path has clean edges so `stroke-dasharray`/`stroke-dashoffset` animation works for the splash screen draw-on effect
- Exported as both a `.svg` file and a React component (`AdobeLogo.tsx`) for flexibility

#### [NEW] src/components/AdobeLogo/AdobeLogo.tsx
Reusable React component wrapping the SVG, with props:
```ts
interface AdobeLogoProps {
  size?: number;       // width/height in px (default 48)
  color?: string;      // fill color (default 'currentColor')
  className?: string;  // additional CSS classes
  animated?: boolean;  // if true, applies stroke-draw animation classes
}
```

#### [NEW] src/hooks/useTheme.ts
Custom hook for dark/light theme toggle:
```ts
function useTheme(): {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
```
- Reads/writes `data-theme` attribute on `<html>`
- Persists preference in `localStorage`
- Defaults to `'dark'`

---

### 12. App Assembly

#### [MODIFY] [App.tsx](file:///c:/Users/rajeevc/Desktop/acsinterns2026/src/App.tsx)

Complete rewrite:

```tsx
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Small delay before revealing content with animations
    setTimeout(() => setContentReady(true), 100);
  };

  return (
    <div className="App bg-dark-primary min-h-screen">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && (
        <>
          <Navbar />
          <main>
            <Hero contentReady={contentReady} />
            <Marquee />
            <CoreValues />
            <Stats />
            <TeamsPreview />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
```

#### [DELETE] [App.css](file:///c:/Users/rajeevc/Desktop/acsinterns2026/src/App.css)
Remove default CRA styles — replaced by Tailwind + component CSS files.

---

## File Tree (Final State)

```
src/
├── assets/
│   └── adobe-logo.svg
├── components/
│   ├── AdobeLogo/
│   │   └── AdobeLogo.tsx          ← Reusable SVG logo component
│   ├── SplashScreen/
│   │   ├── SplashScreen.tsx
│   │   └── SplashScreen.css
│   ├── Navbar/
│   │   ├── Navbar.tsx             ← Includes theme toggle button
│   │   └── Navbar.css
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   └── Hero.css
│   ├── Marquee/
│   │   └── Marquee.tsx
│   ├── CoreValues/
│   │   ├── CoreValues.tsx
│   │   └── CoreValues.css
│   ├── Stats/
│   │   └── Stats.tsx
│   ├── TeamsPreview/
│   │   └── TeamsPreview.tsx
│   └── Footer/
│       ├── Footer.tsx
│       └── Footer.css
├── hooks/
│   ├── useIntersectionObserver.ts
│   ├── useScrollPosition.ts
│   └── useTheme.ts                ← Dark/light toggle + localStorage
├── App.tsx
├── index.css                       ← TailwindCSS v4 @theme config + theme vars
├── index.tsx
├── react-app-env.d.ts
├── reportWebVitals.ts
└── setupTests.ts
postcss.config.js                    ← Uses @tailwindcss/postcss (v4)
(NO tailwind.config.js needed)
```

---

## Verification Plan

### Automated Tests
1. `npm start` — verify dev server starts without errors
2. `npm run build` — verify production build succeeds (no TS errors)

### Manual / Browser Verification
1. **Splash Screen**: Verify logo draws on, fills red, glows, text appears, exits smoothly (~4s)
2. **Home Page**: After splash, verify all sections render — Hero, Marquee, Core Values, Stats, Teams, Footer
3. **Scroll Animations**: Scroll down and verify elements fade/slide in on intersection
4. **Navbar**: Verify blur-on-scroll, active section highlighting, mobile hamburger menu
5. **Responsiveness**: Test at 375px (mobile), 768px (tablet), 1440px (desktop)
6. **Performance**: Verify no jank during splash animation (check for hardware-accelerated transforms)

### Browser Test Script
- Navigate to `http://localhost:3000`
- Wait for splash animation to complete
- Scroll through entire page capturing screenshots at each section
- Resize viewport to mobile and verify responsive layout
