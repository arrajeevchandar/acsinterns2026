export type TeamId = 'ui' | 'data' | 'dacoe' | 'aem' | 'workfront' | 'content';

export interface Team {
  id: TeamId;
  code: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  lead: string;
  memberCount: number;
}

export interface Project {
  name: string;
  description?: string;
  url: string | null;
}

export interface Member {
  id: string;
  name: string;
  initials: string;
  photo?: string;
  photoPosition?: string;
  role: string;
  university: string;
  batch: string;
  skills: string[];
  project: Project;
  bio: string;
  mentor: string;
  github: string;
  linkedin: string;
  avatarHue: number;
}

export interface AvatarColor {
  bg: string;
  color: string;
}

export const TEAMS: Team[] = [
  {
    id: 'ui',
    code: 'UI',
    name: 'UI Engineering',
    tagline: 'Crafting interfaces, motion, and the pixels that shape experience.',
    description: 'The UI team owns the surfaces interns and stakeholders touch every day - design systems, dashboards, and the polish that makes products feel inevitable.',
    stack: ['React', 'TypeScript', 'Spectrum', 'Framer Motion'],
    lead: 'Priya Anand',
    memberCount: 4,
  },
  {
    id: 'data',
    code: 'DATA',
    name: 'Data',
    tagline: 'From raw signal to executive decision - pipelines that power insight.',
    description: 'Pipelines, warehouses, and the analytics layer that powers every other team. They turn the noisy into the navigable.',
    stack: ['Snowflake', 'Airflow', 'dbt', 'Python'],
    lead: 'Marcus Liang',
    memberCount: 4,
  },
  {
    id: 'dacoe',
    code: 'DACoE',
    name: 'DACoE',
    tagline: 'Digital Analytics Center of Excellence - measurement that matters.',
    description: 'Instrumentation, measurement strategy, and the governance that keeps every metric trustworthy across the org.',
    stack: ['Adobe Analytics', 'Launch', 'SQL', 'Tableau'],
    lead: 'Amelia Okafor',
    memberCount: 4,
  },
  {
    id: 'aem',
    code: 'AEM',
    name: 'AEM',
    tagline: 'Experience management at enterprise scale - authoring the web.',
    description: 'Authoring, delivery, and personalization on Adobe Experience Manager - the backbone of brand-facing content.',
    stack: ['AEM', 'Java', 'Sling', 'HTL'],
    lead: 'Devon Park',
    memberCount: 4,
  },
  {
    id: 'workfront',
    code: 'WF',
    name: 'Workfront',
    tagline: 'Where work meets workflow - operationalizing creative teams.',
    description: 'Operationalizing how teams plan, request, review, and ship - automating the unglamorous so creatives can stay creative.',
    stack: ['Workfront', 'Fusion', 'REST APIs', 'JavaScript'],
    lead: 'Sana Khalid',
    memberCount: 1,
  },
  {
    id: 'content',
    code: 'CTN',
    name: 'Content',
    tagline: 'Voice, narrative, and the words that ship with every product.',
    description: 'Editorial strategy, UX writing, and the long-form storytelling that gives every product its register.',
    stack: ['AEM', 'Java', 'Sling', 'HTL'],
    lead: 'Jordan Reyes',
    memberCount: 1,
  },
];

export const MEMBERS_BY_TEAM: Record<TeamId, Member[]> = {
  "ui": [
    {
      "id": "ui-danielpaul",
      "name": "Daniel Paul",
      "initials": "DP",
      "role": "UI Intern",
      "university": "Christ University",
      "batch": "Summer 2026",
      "skills": [
        "React",
        "typescript",
        "python",
        "fastapi",
        "supabase",
        "langgraph"
      ],
      "project": {
        "name": "Finpath",
        "description": "Finpath - AI goal driven financial planner which gives contextual goal plans and breakdowns according to your context, you can mange your debt, taxes, goals, future net work simulation and prediction and included with a end-to-end custom built langgraph agent Penny AI",
        "url": "https://finpathuiuxdesign-rsbi.vercel.app/"
      },
      "bio": "Intern on the UI team specializing in React, typescript, python , fastapi, supabase, langgraph.",
      "mentor": "Atul Bansal",
      "github": "https://github.com/K1NGS1LVER",
      "linkedin": "https://www.linkedin.com/in/daniel-paul-dev/",
      "avatarHue": 115
    },
    {
      "id": "ui-achindrasharma",
      "name": "Achindra Sharma",
      "initials": "AS",
      "role": "UI Intern",
      "university": "Christ University",
      "batch": "Summer 2026",
      "skills": [
        "React Typescript",
        "Python FastAPI",
        "Langgraph"
      ],
      "project": {
        "name": "Nirmit",
        "description": "It is an interactive interior design platform which is AI powered and provides you the quotation of the room's cost aswell",
        "url": "nirmit-project.vercel.app"
      },
      "bio": "Intern on the UI team specializing in React Typescript, Python FastAPI, Langgraph.",
      "mentor": "Atul Bansal",
      "github": "https://github.com/Achindra2003",
      "linkedin": "https://linkedin.com/in/achindrasharma",
      "avatarHue": 138
    },
    {
      "id": "ui-shreeyabajpai",
      "name": "Shreeya Bajpai",
      "initials": "SB",
      "role": "UI Practice Intern",
      "university": "Christ University, Bangalore",
      "batch": "Summer 2026",
      "skills": [
        "React",
        "NextJs",
        "Tailwind CSS",
        "MapLibre",
        "dnd-kit",
        "Zustand"
      ],
      "project": {
        "name": "Lume Corp - An immersive corporate event planning app",
        "description": "The UI project is an immersive corporate event planning app. The project - 'Lume Corp', serves as a complete digital event management solution, with options to: design venue layouts, choose menus and vendors, optimize costs, review plans visually, generate collateral, and deliver production-ready output with AI and map-enabled intelligence.",
        "url": "https://adobe-my.sharepoint.com/:p:/p/shreeyab/IQBY68a8_KEqTbnjUwTt0QBYAR6KiuC8PByMZLEG8R4PMDA?e=AXwYpH"
      },
      "bio": "Intern on the UI Practice team specializing in React, NextJs, Tailwind CSS, MapLibre, dnd-kit, Zustand.",
      "mentor": "Mr. Atul Bansal",
      "github": "https://github.com/Shrxxya",
      "linkedin": "https://www.linkedin.com/in/shreeya-bajpai",
      "avatarHue": 161
    },
    {
      "id": "ui-awanimaheshvaidya",
      "name": "Awani Mahesh Vaidya",
      "initials": "AV",
      "role": "Customer Journey Management Intern",
      "university": "IIIT Guwahati",
      "batch": "Summer 2026",
      "skills": [
        "Node/TS backend",
        "Playwright automation",
        "React frontend",
        "SQLite",
        "Prisma persist (per memory). LLM-powered validation pipeline (Azure OpenAI/OpenAI/Ollama configurable)."
      ],
      "project": {
        "name": "AJO QA Validator Engine",
        "description": "AJO QA Validator :\u00a0 QA automation tool for Adobe Journey Optimizer (AJO). Auth via browser session, pull journey defs, validate 'em against BRD/TSD specs, drive live test-mode sims in AJO canvas.",
        "url": "https://github.com/gigeorge_adobe/autoTestBot-X"
      },
      "bio": "Intern on the Customer Journey Management team specializing in Node/TS backend + Playwright automation, React frontend, SQLite+Prisma persist (per memory). LLM-powered validation pipeline (Azure OpenAI/OpenAI/Ollama configurable)..",
      "mentor": "Gayathri Mutakekar",
      "github": "https://www.github.com/awanivaidya",
      "linkedin": "https://www.linkedin.com/in/awani-vaidya-117936282?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      "avatarHue": 276
    }
  ],
  "data": [
    {
      "id": "data-rhitambhuiya",
      "name": "Rhitam Bhuiya",
      "initials": "RB",
      "role": "DATA Intern",
      "university": "National Institute of Technology Karnataka",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Coworker Case Study",
        "description": null,
        "url": null
      },
      "bio": "Intern on the DATA team specializing in software engineering.",
      "mentor": "Gnanesh Poojappa",
      "github": "",
      "linkedin": "https://www.linkedin.com/in/rhibhu/",
      "avatarHue": 207
    },
    {
      "id": "data-avinashchaturvedi",
      "name": "Avinash Chaturvedi",
      "initials": "AC",
      "role": "CJM Intern",
      "university": "Maulana Azad National Institute of Technology, Bhopal",
      "batch": "Summer 2026",
      "skills": [
        "SQLite",
        "Prisma",
        "Node",
        "Express",
        "React",
        "Next.js",
        "Playwright",
        "Tailwind"
      ],
      "project": {
        "name": "Email Regression Test Platform, AJO QA Validator",
        "description": "1. Email Regression Platform : internal QA tool. Validates email rendering/content stays stable across releases: same input \u2192 same output.\n\nFlow: Suite \u2192 Test \u2192 Baseline Case \u2192 Baseline Version. Runs execute payload, fetch inbox, compare vs baseline (visual/DOM/style/a11y), score severity, human reviews and approves/promotes.\n\nStack: Next.js+TS+Tailwind+shadcn frontend, Node/Express/TS backend, Postgres+Prisma. Big files (EML, screenshots, diffs) stored outside DB.\n\n2. AJO QA Validator :  QA automation tool for Adobe Journey Optimizer (AJO). Auth via browser session, pull journey defs, validate 'em against BRD/TSD specs, drive live test-mode sims in AJO canvas.\n\nStack: Node/TS backend + Playwright automation, React frontend, SQLite+Prisma persist (per memory). LLM-powered validation pipeline (Azure OpenAI/OpenAI/Ollama configurable).",
        "url": "https://github.com/gigeorge_adobe/autoTestBot-X"
      },
      "bio": "Intern on the CJM team specializing in SQLite, Prisma, Node, Express, React, Next.js, Playwright, Tailwind.",
      "mentor": "Gayatri Mutakekar, Subhayan Bhattacharya",
      "github": "https://github.com/avinashchaturvedi2002",
      "linkedin": "https://www.linkedin.com/in/avinash-chaturvedi/",
      "avatarHue": 230
    },
    {
      "id": "data-anushreeagrawal",
      "name": "Anushree Agrawal",
      "initials": "AA",
      "role": "Data Intern",
      "university": "SRM Institute of Science and Technology",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "ATLAS AI- QA Automator Enhancement",
        "description": null,
        "url": null
      },
      "bio": "Intern on the Data team specializing in software engineering.",
      "mentor": "Ritesh Gupta",
      "github": "https://github.com/AnushreeAgrawal25",
      "linkedin": "https://www.linkedin.com/in/anushree-agrawal-ba4873287",
      "avatarHue": 253
    },
    {
      "id": "data-dipitmadan",
      "name": "Dipit Madan",
      "initials": "DM",
      "role": "CJM Intern",
      "university": "Vellore Of Institute Of Technology",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Adobe Intern Project",
        "description": null,
        "url": null
      },
      "bio": "Intern on the CJM team specializing in software engineering.",
      "mentor": "Adobe Mentor",
      "github": "",
      "linkedin": "https://in.linkedin.com/in/dipit-madan",
      "avatarHue": 345
    }
  ],
  "dacoe": [
    {
      "id": "dacoe-anshkumar",
      "name": "Ansh Kumar",
      "initials": "AK",
      "role": "SBC Intern",
      "university": "IMT Ghaziabad",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Connecting the digital journey for Changi Airport Group",
        "description": "Built a persona-driven personalization strategy with use cases that unifies Changi Airport's fragmented digital touchpoints using one customer profile, activated through Adobe's stack.",
        "url": null
      },
      "bio": "Intern on the SBC team specializing in software engineering.",
      "mentor": "Aishwarya Lakshmi",
      "github": "",
      "linkedin": "https://linkedin.com/in/ansh3603",
      "avatarHue": 23
    },
    {
      "id": "dacoe-manoshiraha",
      "name": "Manoshi Raha",
      "initials": "MR",
      "role": "SBC Intern",
      "university": "IMT Ghaziabad",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Resume Screening Assistant",
        "description": null,
        "url": "https://adobe-my.sharepoint.com/:p:/r/personal/abhinavkumar_adobe_com/Documents/Microsoft%20Teams%20Chat%20Files/Adobe_SBC_Resume_Agent_Deck%20(1).pptx?d=we3ab2f4551384f1b92877c9a0960a73a&csf=1&web=1&e=toJUcV"
      },
      "bio": "Intern on the SBC team specializing in software engineering.",
      "mentor": "Lakshman Hariharan",
      "github": "",
      "linkedin": "https://www.linkedin.com/in/manoshiraha19/",
      "avatarHue": 46
    },
    {
      "id": "dacoe-shambhavisinha",
      "name": "Shambhavi Sinha",
      "initials": "SS",
      "role": "DACoE Intern",
      "university": "CHRIST (Deemed-to-be University)",
      "batch": "Summer 2026",
      "skills": [
        "Streamlit",
        "Python",
        "API (Sonnet 4.5)",
        "SQLite",
        "Playwright"
      ],
      "project": {
        "name": "Insight Forge",
        "description": "Insight Forge is an automated weekly intelligence layer built for the DACoE portal. It connects to Adobe DIA to pull the latest engagement data, compares it against the previous week, parses the output, and generates recommendation-ready insights \u2014 all packaged into a polished briefing that's ready to consume and share. What used to require manual prompting, interpretation, and report-writing every week is now fully automated, giving DACoE leads their time back while ensuring insights are consistent, accessible, and actionable.",
        "url": "https://adobe-my.sharepoint.com/:p:/p/shamsinha/IQDM2pbHw4dATaTHnuxWXy47AQ-nlceHPlhJCbeEl-EpsDE?e=CfVa70"
      },
      "bio": "Intern on the DACoE team specializing in Streamlit, Python, API (Sonnet 4.5), SQLite, Playwright.",
      "mentor": "Ravi Raman Puthiyavalappil",
      "github": "https://github.com/sinha4",
      "linkedin": "https://www.linkedin.com/in/shambhavi-sinha-28509324a",
      "avatarHue": 69
    },
    {
      "id": "dacoe-yanishrai",
      "name": "Yanish Rai",
      "initials": "YR",
      "role": "DACoE Intern",
      "university": "CHRIST (Deemed to be University)",
      "batch": "Summer 2026",
      "skills": [
        "Python",
        "Playwright",
        "Claude",
        "Streamlit"
      ],
      "project": {
        "name": "Eval Harness",
        "description": "Analytics Agent Evaluation Harness is an automated benchmarking framework built to evaluate Adobe's Data Insights Agent (DIA). The core problem it solves: DIA's failures during prompt testing were opaque, the agent would silently fail or return vague error responses with no actionable information about why.",
        "url": "https://adobe-my.sharepoint.com/:p:/p/yanishr/IQAXuRVmHUJWR4BZRSOhihq5AXjqCVG-nbpgWwRUmsoMf7U?e=Y4fmRa"
      },
      "bio": "Intern on the DACoE team specializing in Python, Playwright, Claude, Streamlit.",
      "mentor": "Ravi Raman Puthiyavalappil",
      "github": "https://github.com/GeekyYanish",
      "linkedin": "https://www.linkedin.com/in/yanishrai",
      "avatarHue": 92
    }
  ],
  "aem": [
    {
      "id": "aem-shrutigupta",
      "name": "shruti gupta",
      "initials": "SG",
      "role": "aem Intern",
      "university": "nitk",
      "batch": "Summer 2026",
      "skills": [
        "Vanilla Js"
      ],
      "project": {
        "name": "HackVerse",
        "description": "A Hackathon website built in vanilla js and replicated in eds",
        "url": "hackathon-lilac-chi.vercel.app"
      },
      "bio": "Intern on the aem team specializing in Vanilla Js.",
      "mentor": "Ankitha R",
      "github": "https://github.com/Shruti-1622",
      "linkedin": "https://www.linkedin.com/in/shruti-gupta-6a057a20a/",
      "avatarHue": 184
    },
    {
      "id": "aem-poojabhatia",
      "name": "Pooja Bhatia",
      "initials": "PB",
      "role": "AEM Intern",
      "university": "Maulana Azad National Institute of Technology, Bhopal",
      "batch": "Summer 2026",
      "skills": [
        "HTML",
        "CSS",
        "JAVASCRIPT"
      ],
      "project": {
        "name": "RE:WEAR",
        "description": "RE: WEAR \u2014 a thrift and vintage fashion marketplace, originally built in plain HTML, CSS and JavaScript \u2014 and migrated the entire site onto Adobe Edge Delivery Services.",
        "url": "https://github.com/PoojaBhatia16/Eds"
      },
      "bio": "Intern on the AEM team specializing in HTML, CSS, JAVASCRIPT.",
      "mentor": "Ankitha R.",
      "github": "https://github.com/PoojaBhatia16",
      "linkedin": "https://www.linkedin.com/in/pooja-bhatia-396466318/",
      "avatarHue": 299
    },
    {
      "id": "aem-radhagoyal",
      "name": "Radha Goyal",
      "initials": "RG",
      "role": "AEM Intern",
      "university": "Maulana Azad National Institute of Technology, Bhopal",
      "batch": "Summer 2026",
      "skills": [
        "AEM"
      ],
      "project": {
        "name": "Craftora",
        "description": null,
        "url": "https://github.com/goelradha12/craftora-eds"
      },
      "bio": "Intern on the AEM team specializing in AEM.",
      "mentor": "Asha Aravind",
      "github": "https://github.com/goelradha12/",
      "linkedin": "https://www.linkedin.com/in/goyalradha123/",
      "avatarHue": 322
    },
    {
      "id": "aem-evelynjessica",
      "name": "Evelyn Jessica",
      "initials": "EJ",
      "role": "AEM Intern",
      "university": "SRM University",
      "batch": "Summer 2026",
      "skills": [
        "JS",
        "CSS",
        "EDS"
      ],
      "project": {
        "name": "Vaultora",
        "description": "Vaultora is an ultra-premium, sustainable live auction terminal engineered to revolutionize the alternative asset marketplace. Built on high-speed product verification systems, the platform bridges the gap between conscious high-caliber collectors and authenticated premium commodities. Vaultora explicitly focuses on exceptionally preserved luxury niches across four core investment verticals: fine timepieces, heritage jewelry, classic art, and elite electronics.  To eliminate systemic marketplace vulnerabilities and counterfeit trading, Vaultora mandates an exhaustive, multi-layered provenance validation framework. This system incorporates stringent physical auditing, historical chain-of-custody verification, and secure multi-currency escrow processing. Active lots enter time-locked bidding countdown floors equipped with automated proxy network bidding mechanics. By giving secondary lifecycles to masterfully engineered legacy artifacts and high-end capital assets, Vaultora establishes a transparent, zero-risk, and eco-friendly transaction ecosystem designed for the modern elite collector.",
        "url": null
      },
      "bio": "Intern on the AEM team specializing in JS, CSS , EDS.",
      "mentor": "Ankita R",
      "github": "https://github.com/EvelynJessica45",
      "linkedin": "https://www.linkedin.com/in/evelyn-jessica-9a066a231/",
      "avatarHue": 31
    }
  ],
  "workfront": [
    {
      "id": "workfront-mihiragupta",
      "name": "Mihira Gupta",
      "initials": "MG",
      "role": "Workfront Intern",
      "university": "Punjab Engineering College",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Fusion MCP server",
        "description": "",
        "url": null
      },
      "bio": "Intern on the Workfront team specializing in software engineering.",
      "mentor": "Sai Dhruv Kumar",
      "github": "https://github.com/mihira4/",
      "linkedin": "https://www.linkedin.com/in/mihiragupta",
      "avatarHue": 8
    }
  ],
  "content": [
    {
      "id": "content-vanshitatripathi",
      "name": "Vanshita Tripathi",
      "initials": "VT",
      "role": "Content Intern",
      "university": "NIT  Karnataka",
      "batch": "Summer 2026",
      "skills": [
        "HTML",
        "CSS",
        "JS",
        "EDS"
      ],
      "project": {
        "name": "SkillHire",
        "description": "SkillHire is a two-sided freelance marketplace built on Adobe Edge Delivery Services. Clients post projects, browse freelancers, and send hire invites. Freelancers apply to projects, counter offers, and manage proposals \u2014 all via a localStorage-powered dashboard. Features include role-based auth, paywall upgrades, profile setup, and a full hire-to-acceptance workflow.",
        "url": "https://github.com/Horizon2553/skill-eds"
      },
      "bio": "Intern on the Content team specializing in HTML , CSS, JS, EDS.",
      "mentor": "Ankitha R.",
      "github": "https://github.com/Vanshii2",
      "linkedin": "https://www.linkedin.com/in/vanshita53",
      "avatarHue": 0
    }
  ]
};

export const AVATAR_COLORS: AvatarColor[] = [
  { bg: 'rgba(235, 28, 36, 0.15)', color: '#EB1C24' },
  { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' },
  { bg: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' },
  { bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' },
  { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
  { bg: 'rgba(236, 72, 153, 0.15)', color: '#EC4899' },
];
