# ACS Interns 2026 Portal

An Adobe ACS internship portal built to showcase interns, teams, projects, events, gallery moments, FAQs, and the overall internship experience.

The frontend is a React + TypeScript + Vite application with a cinematic Adobe-inspired UI, dark/light theme support, glassmorphism cards, routed pages, and interactive sections.

## Project Structure

```text
acsinterns2026/
  frontend/   React, TypeScript, Vite frontend
  backend/    Backend workspace, if used by future phases
```

## Getting Started

Run the backend from the `backend` folder:

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The backend app runs locally with Vite. 

Now open another terminal for frontend 

Run the frontend from the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

The app runs locally with Vite. Open the URL shown in the terminal, usually:

```text
http://localhost:3000
```


## Main Pages

- Home
- Teams
- Projects
- Gallery
- FAQs / assistant experience

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React

## Contribution Notes

- Keep page-level UI consistent with the existing red, black, white, and glassmorphism theme.
- Reuse existing components and theme variables before adding new styling systems.
- Run `npm run build` from `frontend` before raising or merging changes.
- Keep dependencies installed inside `frontend/node_modules`, not at the repo root.

## Team Credit

The portal includes a footer contributors modal with the internship team members and their photos.
