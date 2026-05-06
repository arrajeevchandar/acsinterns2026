# Adobe ACS Interns 2026 Portal

A high-performance, interactive portal for the Adobe Consulting Services (ACS) Internship Program, built with React and Vite.

## 🚀 Features

- **Blazing Fast**: Migrated from CRA to **Vite** for near-instant dev starts and optimized production builds.
- **Modern UI/UX**: Premium liquid-glass aesthetic with dark/light mode support.
- **Zenith AI Assistant**: An integrated AI Intern Mentor available via the FAQs to answer program questions based on 5 years of internship data.

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **Python**: v3.11+ (for Zenith AI backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arrajeevchandar/acsinterns2026.git
   cd acsinterns2026
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up the Zenith AI Backend:
   Follow the instructions in the `zenith-ai-portal/backend` directory to set up your `.env` with a Groq API key and start the server on port 8000.

### Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode at [http://localhost:5173](http://localhost:5173).
- `npm run build`: Compiles the app for production into the `dist` folder.
- `npm run preview`: Locally previews the production build.

## 🧠 Zenith AI Mentor

Zenith is a specialized AI agent designed to help new interns navigate life at Adobe ACS Bengaluru. It provides:
- First-week survival tips
- Insights into previous award-winning projects
- Guidance on official Adobe policies (benefits, insurance, etc.)
- Mentorship and team explorations

To access Zenith, click on the **FAQs** link in the navigation bar.

## 💅 Design System

The project uses a custom design system defined in `src/index.css` featuring:
- **Liquid Glass**: Advanced backdrop blurs and mesh gradients.
- **Responsive Animations**: Framer Motion powered transitions and micro-interactions.
- **Adobe Branding**: Integrated Adobe logo and brand-safe color palettes.
