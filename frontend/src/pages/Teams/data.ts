export type TeamId = 'ui' | 'data' | 'dacoe' | 'cjm' | 'workfront' | 'content' | 'sbc';

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
    name: 'User Interface',
    tagline: 'Crafting interfaces, motion, and the pixels that shape experience.',
    description: 'The UI team owns the surfaces interns and stakeholders touch every day - design systems, dashboards, and the polish that makes products feel inevitable.',
    stack: ['React', 'TypeScript', 'Spectrum', 'Framer Motion'],
    lead: 'Santosh Naik',
    memberCount: 4,
  },
  {
    id: 'data',
    code: 'DATA',
    name: 'Data',
    tagline: 'From raw signal to executive decision - pipelines that power insight.',
    description: 'Pipelines, warehouses, and the analytics layer that powers every other team. They turn the noisy into the navigable.',
    stack: ['Snowflake', 'Airflow', 'dbt', 'Python'],
    lead: 'Surya Kothapalli',
    memberCount: 4,
  },
  {
    id: 'dacoe',
    code: 'DACOE',
    name: 'Digital Accelerator Center of Excellence',
    tagline: 'Digital Analytics Center of Excellence - measurement that matters.',
    description: 'Instrumentation, measurement strategy, and the governance that keeps every metric trustworthy across the org.',
    stack: ['Adobe Analytics', 'Launch', 'SQL', 'Tableau'],
    lead: 'Narendra Gorla',
    memberCount: 4,
  },
  {
    id: 'content',
    code: 'CONTENT',
    name: 'Content',
    tagline: 'Voice, narrative, and the words that ship with every product.',
    description: 'Editorial strategy, UX writing, and the long-form storytelling that gives every product its register.',
    stack: ['AEM', 'Java', 'Sling', 'HTL'],
    lead: 'Shirish Halapeth', // sourced from the "AEM" practice row
    memberCount: 4,
  },
  {
    id: 'workfront',
    code: 'WORKFRONT',
    name: 'Adobe Workfront',
    tagline: 'Where work meets workflow - operationalizing creative teams.',
    description: 'Operationalizing how teams plan, request, review, and ship - automating the unglamorous so creatives can stay creative.',
    stack: ['Workfront', 'Fusion', 'REST APIs', 'JavaScript'],
    lead: 'Narendra Gorla',
    memberCount: 1,
  },
  {
    id: 'cjm',
    code: 'CJM',
    name: 'Customer Journey Management',
    tagline: 'Designing seamless experiences from discovery to delivery.',
    description: 'Strategic planning and execution of customer journeys across touchpoints and channels.',
    stack: ['JavaScript', 'React', 'Node.js'],
    lead: 'Surya Kothapalli',
    memberCount: 3,
  },
  {
    id: 'sbc',
    code: 'SBC',
    name: 'Strategy and Business Consulting',
    tagline: 'Helping users find what they need, when they need it.',
    description: 'Building and optimizing search experiences, recommendation systems, and discovery mechanisms.',
    stack: ['Elasticsearch', 'Python', 'React', 'Node.js'],
    lead: 'Punya Sekhar',
    memberCount: 2,
  }
];


export const MEMBERS_BY_TEAM: Record<TeamId, Member[]> = {
  "ui": [
    {
      "id": "ui-danielpaul",
      "name": "Daniel Paul",
      "initials": "DP",
      "photo": "/images/Individuals/daniel-paul.jpg",
      "role": "UI Intern",
      "university": "Christ University",
      "batch": "Summer 2026",
      "skills": ["React", "typescript", "python", "fastapi", "supabase", "langgraph"],
      "project": {
        "name": "Finpath",
        "description": "Finpath - AI goal driven financial planner which gives contextual goal plans and breakdowns according to your context, you can mange your debt, taxes, goals, future net work simulation and prediction and included with a end-to-end custom built langgraph agent Penny AI",
        "url": "https://finpathuiuxdesign-rsbi.vercel.app/"
      },
      "bio": "Intern on the UI team specializing in React, typescript, python, fastapi, supabase, langgraph.",
      "mentor": "Atul Bansal",
      "github": "https://github.com/K1NGS1LVER",
      "linkedin": "https://www.linkedin.com/in/daniel-paul-dev/",
      "avatarHue": 115
    },
    {
      "id": "ui-achindrasharma",
      "name": "Achindra Sharma",
      "initials": "AS",
      "photo": "/images/Individuals/achindra-sharma.jpg",
      "role": "UI Intern",
      "university": "Christ University",
      "batch": "Summer 2026",
      "skills": ["React Typescript", "Python FastAPI", "Langgraph"],
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
      "photo": "/images/Individuals/shreeya-bajpai.jpg",
      "role": "UI Intern",
      "university": "Christ University, Bangalore",
      "batch": "Summer 2026",
      "skills": ["React", "NextJs", "Tailwind CSS", "MapLibre", "dnd-kit", "Zustand"],
      "project": {
        "name": "Lume Corp",
        "description": "Lume Corp is an immersive corporate event planning app. It serves as a complete digital event management solution, with options to design venue layouts, choose menus and vendors, optimize costs, review plans visually, generate collateral, and deliver production-ready output with AI and map-enabled intelligence.",
        "url": "https://adobe-my.sharepoint.com/:p:/p/shreeyab/IQBY68a8_KEqTbnjUwTt0QBYAR6KiuC8PByMZLEG8R4PMDA?e=AXwYpH"
      },
      "bio": "Intern on the UI team specializing in React, NextJs, Tailwind CSS, MapLibre, dnd-kit, Zustand.",
      "mentor": "Atul Bansal",
      "github": "https://github.com/Shrxxya",
      "linkedin": "https://www.linkedin.com/in/shreeya-bajpai",
      "avatarHue": 160
    },
    {
      "id": "ui-tejascs",
      "name": "Tejas CS",
      "initials": "TC",
      "photo": "/images/Individuals/Tejas.jpg",
      "role": "UI Intern",
      "university": "National Institute of Technology, Karnataka",
      "batch": "Summer 2026",
      "skills": ["Next JS", "SQLite", "Groq"],
      "project": {
        "name": "Lattice",
        "description": "",
        "url": "https://github.com/Tejas-117/Lattice-project"
      },
      "bio": "Intern on the UI team, working on Lattice.",
      "mentor": "Atul Bansal",
      "github": "https://github.com/Tejas-117",
      "linkedin": "https://www.linkedin.com/in/tejas-cs",
      "avatarHue": 185
    }
  ],
  "content": [
    {
      "id": "content-vanshitatripathi",
      "name": "Vanshita Tripathi",
      "initials": "VT",
      "photo": "/images/Individuals/vanshitha.jpeg",
      "role": "Content Intern",
      "university": "NIT Karnataka",
      "batch": "Summer 2026",
      "skills": ["HTML", "CSS", "JS", "EDS"],
      "project": {
        "name": "SkillHire",
        "description": "SkillHire is a two-sided freelance marketplace built on Adobe Edge Delivery Services. Clients post projects, browse freelancers, and send hire invites. Freelancers apply to projects, counter offers, and manage proposals — all via a localStorage-powered dashboard. Features include role-based auth, paywall upgrades, profile setup, and a full hire-to-acceptance workflow.",
        "url": "https://github.com/Horizon2553/skill-eds"
      },
      "bio": "Intern on the Content team specializing in HTML, CSS, JS, EDS.",
      "mentor": "Ankitha R.",
      "github": "https://github.com/Vanshii2",
      "linkedin": "https://www.linkedin.com/in/vanshita53",
      "avatarHue": 185
    },
    {
      "id": "content-shrutigupta",
      "name": "Shruti Gupta",
      "initials": "SG",
      "photo": "/images/Individuals/Shruti.jpeg",
      "role": "Content Intern",
      "university": "NITK",
      "batch": "Summer 2026",
      "skills": ["Vanilla JS"],
      "project": {
        "name": "HackVerse",
        "description": "A Hackathon website built in vanilla js and replicated in EDS.",
        "url": "https://hackathon-lilac-chi.vercel.app"
      },
      "bio": "Intern on the Content team specializing in Vanilla JS.",
      "mentor": "Ankitha R",
      "github": "https://github.com/Shruti-1622",
      "linkedin": "https://www.linkedin.com/in/shruti-gupta-6a057a20a/",
      "avatarHue": 210
    },
    {
      "id": "content-poojabhatia",
      "name": "Pooja Bhatia",
      "initials": "PB",
      "photo": "/images/Individuals/pooja.jpeg",
      "role": "Content Intern",
      "university": "Maulana Azad National Institute of Technology, Bhopal",
      "batch": "Summer 2026",
      "skills": ["HTML", "CSS", "JavaScript"],
      "project": {
        "name": "RE:WEAR",
        "description": "RE:WEAR — a thrift and vintage fashion marketplace, originally built in plain HTML, CSS and JavaScript — and migrated the entire site onto Adobe Edge Delivery Services.",
        "url": "https://github.com/PoojaBhatia16/Eds"
      },
      "bio": "Intern on the Content team specializing in HTML, CSS, JavaScript.",
      "mentor": "Ankitha R.",
      "github": "https://github.com/PoojaBhatia16",
      "linkedin": "https://www.linkedin.com/in/pooja-bhatia-396466318/",
      "avatarHue": 235
    },
    {
      "id": "content-radhagoyal",
      "name": "Radha Goyal",
      "initials": "RG",
      "photo": "/images/Individuals/radha.jpg",
      "role": "Content Intern",
      "university": "Maulana Azad National Institute of Technology, Bhopal",
      "batch": "Summer 2026",
      "skills": ["AEM"],
      "project": {
        "name": "Craftora",
        "description": "An e-commerce platform where users can customise their product, preview it and buy. Used Adobe's EDS and da.live for content authoring.",
        "url": "https://github.com/goelradha12/craftora-eds"
      },
      "bio": "Intern on the Content team specializing in AEM.",
      "mentor": "Asha Aravind",
      "github": "https://github.com/goelradha12/",
      "linkedin": "https://www.linkedin.com/in/goyalradha123/",
      "avatarHue": 260
    },
    {
      "id": "content-gadesinadheerajreddy",
      "name": "Gadesina Dheeraj Reddy",
      "initials": "GD",
      "photo": "/images/Individuals/dheeraj.jpeg",
      "role": "Content Intern",
      "university": "Vellore Institute of Technology, Vellore",
      "batch": "Summer 2026",
      "skills": ["HTML", "CSS", "JavaScript", "da.live"],
      "project": {
        "name": "HerbAtlas",
        "description": "Developed HerbAtlas, a responsive medicinal herb e-commerce website with search, filters, cart, and checkout. Migrated the application to Adobe Edge Delivery Services (EDS) using 19 reusable content blocks and da.live. Improved Lighthouse scores to 98–100 Performance, 97–100 Accessibility, and 97–100 Best Practices.",
        "url": "https://github.com/DHEERAJREDDY-12/herbatlas-eds"
      },
      "bio": "Intern on the Content team specializing in HTML, CSS, JavaScript, da.live.",
      "mentor": "Asha Aravind",
      "github": "https://github.com/DHEERAJREDDY-12",
      "linkedin": "https://www.linkedin.com/in/gadesina-dheeraj-reddy-080b07320",
      "avatarHue": 285
    },
    {
      "id": "content-evelynjessica",
      "name": "Evelyn Jessica",
      "initials": "EJ",
      "photo": "/images/Individuals/default_girl.png",
      "role": "Content Intern",
      "university": "SRM University",
      "batch": "Summer 2026",
      "skills": ["JS", "CSS", "EDS"],
      "project": {
        "name": "Vaultora",
        "description": "Vaultora is an ultra-premium, sustainable live auction terminal for the alternative asset marketplace, bridging conscious collectors with authenticated luxury commodities across fine timepieces, heritage jewelry, classic art, and elite electronics — backed by a multi-layered provenance validation framework and secure multi-currency escrow processing.",
        "url": ""
      },
      "bio": "Intern on the Content team specializing in JS, CSS, EDS.",
      "mentor": "Ankita R",
      "github": "https://github.com/EvelynJessica45",
      "linkedin": "https://www.linkedin.com/in/evelyn-jessica-9a066a231/",
      "avatarHue": 310
    }
  ],
  "data": [
    {
      "id": "data-rhitambhuiya",
      "name": "Rhitam Bhuiya",
      "initials": "RB",
      "photo": "/images/Individuals/Rhitam.jpeg",
      "role": "Data Intern",
      "university": "National Institute of Technology Karnataka",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Coworker Case Study",
        "description": "",
        "url": ""
      },
      "bio": "Intern on the Data team, working on the Coworker Case Study.",
      "mentor": "Gnanesh Poojappa",
      "github": "",
      "linkedin": "https://www.linkedin.com/in/rhibhu/",
      "avatarHue": 330
    },
    {
      "id": "data-anushreeagrawal",
      "name": "Anushree Agrawal",
      "initials": "AA",
      "photo": "/images/Individuals/Anushree.jpeg",
      "role": "Data Intern",
      "university": "SRM Institute of Science and Technology",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "ATLAS AI - QA Automator Enhancement",
        "description": "",
        "url": ""
      },
      "bio": "Intern on the Data team, working on ATLAS AI - QA Automator Enhancement.",
      "mentor": "Ritesh Gupta",
      "github": "https://github.com/AnushreeAgrawal25",
      "linkedin": "https://www.linkedin.com/in/anushree-agrawal-ba4873287",
      "avatarHue": 350
    },
    {
      "id": "data-yashbhatt",
      "name": "Yash Bhatt",
      "initials": "YB",
      "photo": "/images/Individuals/Yash.jpeg",
      "role": "Data Intern",
      "university": "Maulana Azad National Institute of Technology Bhopal",
      "batch": "Summer 2026",
      "skills": ["ReactJs", "Supabase", "Ollama"],
      "project": {
        "name": "Gandalf - AEP Learning Companion",
        "description": "Interactive Learning Agent for Enablement and Cross Learning across Experience Platform and ACS Technologies.",
        "url": ""
      },
      "bio": "Intern on the Data team, working on Gandalf - AEP Learning Companion.",
      "mentor": "Anup Thomas",
      "github": "https://github.com/yashbhatt4133/",
      "linkedin": "https://in.linkedin.com/in/yashbhatt4133",
      "avatarHue": 20
    },
    {
      "id": "data-vishalsharma",
      "name": "Vishal Sharma",
      "initials": "VS",
      "photo": "/images/Individuals/vishal.jpeg",
      "role": "Data Intern",
      "university": "National Institute of Technology Karnataka",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "",
        "description": "",
        "url": ""
      },
      "bio": "Intern on the Data team.",
      "mentor": "Frederick Richard",
      "github": "",
      "linkedin": "https://www.linkedin.com/in/vishal-sharma114",
      "avatarHue": 55
    },
    {
      "id": "data-ruddhidar",
      "name": "Ruddhida R",
      "initials": "RR",
      "photo": "/images/Individuals/Ruddhida.jpeg",
      "role": "Data Intern",
      "university": "SRM University",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Atlas AI QA Automator",
        "description": "",
        "url": ""
      },
      "bio": "Intern on the Data team, working on Atlas AI QA Automator.",
      "mentor": "Ritesh Gupta",
      "github": "",
      "linkedin": "https://linkedin.com/in/ruddhida",
      "avatarHue": 95
    },
    {
      "id": "data-stutimishra",
      "name": "Stuti Mishra",
      "initials": "SM",
      "photo": "/images/Individuals/Stuti.jpeg",
      "role": "Data Intern",
      "university": "Siksha O Anusandhan, Bhubaneswar",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Artemis",
        "description": "",
        "url": ""
      },
      "bio": "Intern on the Data team, working on Artemis.",
      "mentor": "Anup Thomas",
      "github": "",
      "linkedin": "https://linkedin.com/in/stuti86",
      "avatarHue": 130
    },
    {
      "id": "data-shashanksgodavari",
      "name": "Shashank S Godavari",
      "initials": "SG",
      "photo": "/images/Individuals/default_boy.png",
      "role": "Data Intern",
      "university": "IIIT Kancheepuram",
      "batch": "Summer 2026",
      "skills": ["Python", "HTML + Jinja2", "JavaScript"],
      "project": {
        "name": "Adobe Cassandra (AEP Surveillance and Governance Agent)",
        "description": "An AI-powered AEP monitoring agent that runs daily, detects issues across six surveillance pillars (Observability, Catalog, Policy, Audit, Segmentation, Dataflow), and sends a plain-English digest via Slack.",
        "url": "https://github.com/Shashank-Adobe/Palantr"
      },
      "bio": "Intern on the Data team, working on Adobe Cassandra (AEP Surveillance and Governance Agent).",
      "mentor": "Anup Thomas",
      "github": "https://github.com/Shashank-Adobe",
      "linkedin": "https://in.linkedin.com/in/shashank-s-godavari-25b14a202",
      "avatarHue": 165
    }
  ],
  "dacoe": [
    {
      "id": "dacoe-shambhavisinha",
      "name": "Shambhavi Sinha",
      "initials": "SS",
      "photo": "/images/Individuals/shambhavi-sinha.jpeg",
      "role": "DACoE Intern",
      "university": "CHRIST (Deemed-to-be University)",
      "batch": "Summer 2026",
      "skills": ["Streamlit", "Python", "API (Sonnet 4.5)", "SQLite", "Playwright"],
      "project": {
        "name": "Insight Forge",
        "description": "Insight Forge is an automated weekly intelligence layer built for the DACoE portal. It connects to Adobe DIA to pull the latest engagement data, compares it against the previous week, parses the output, and generates recommendation-ready insights — all packaged into a polished briefing that's ready to consume and share, giving DACoE leads their time back while ensuring insights are consistent, accessible, and actionable.",
        "url": "https://adobe-my.sharepoint.com/:p:/p/shamsinha/IQDM2pbHw4dATaTHnuxWXy47AQ-nlceHPlhJCbeEl-EpsDE?e=CfVa70"
      },
      "bio": "Intern on the DACoE team specializing in Streamlit, Python, API (Sonnet 4.5), SQLite, Playwright.",
      "mentor": "Ravi Raman Puthiyavalappil",
      "github": "https://github.com/sinha4",
      "linkedin": "https://www.linkedin.com/in/shambhavi-sinha-28509324a",
      "avatarHue": 170
    },
    {
      "id": "dacoe-yanishrai",
      "name": "Yanish Rai",
      "initials": "YR",
      "photo": "/images/Individuals/yanish-rai.jpg",
      "role": "DACoE Intern",
      "university": "CHRIST (Deemed to be University)",
      "batch": "Summer 2026",
      "skills": ["Python", "Playwright", "Claude", "Streamlit"],
      "project": {
        "name": "Eval Harness",
        "description": "Analytics Agent Evaluation Harness is an automated benchmarking framework built to evaluate Adobe's Data Insights Agent (DIA), solving the problem of opaque failures during prompt testing where the agent would silently fail or return vague error responses.",
        "url": "https://adobe-my.sharepoint.com/:p:/p/yanishr/IQAXuRVmHUJWR4BZRSOhihq5AXjqCVG-nbpgWwRUmsoMf7U?e=Y4fmRa"
      },
      "bio": "Intern on the DACoE team specializing in Python, Playwright, Claude, Streamlit.",
      "mentor": "Ravi Raman Puthiyavalappil",
      "github": "https://github.com/GeekyYanish",
      "linkedin": "https://www.linkedin.com/in/yanishrai",
      "avatarHue": 200
    }
  ],
  "cjm": [
    {
      "id": "cjm-avinashchaturvedi",
      "name": "Avinash Chaturvedi",
      "initials": "AC",
      "photo": "/images/Individuals/Avinash.jpeg",
      "role": "CJM Intern",
      "university": "Maulana Azad National Institute of Technology, Bhopal",
      "batch": "Summer 2026",
      "skills": ["SQLite", "Prisma", "Node", "Express", "React", "Next.js", "Playwright", "Tailwind"],
      "project": {
        "name": "Email Regression Test Platform & AJO QA Validator",
        "description": "Email Regression Platform is an internal QA tool validating that email rendering/content stays stable across releases via a Suite → Test → Baseline Case → Baseline Version flow, comparing runs against baselines (visual/DOM/style/a11y) with human review. AJO QA Validator is a QA automation tool for Adobe Journey Optimizer that authenticates via browser session, pulls journey definitions, validates them against BRD/TSD specs, and drives live test-mode simulations in the AJO canvas, backed by an LLM-powered validation pipeline.",
        "url": "https://github.com/gigeorge_adobe/autoTestBot-X"
      },
      "bio": "Intern on the CJM team specializing in SQLite, Prisma, Node, Express, React, Next.js, Playwright, Tailwind.",
      "mentor": "Gayatri Mutakekar, Subhayan Bhattacharya",
      "github": "https://github.com/avinashchaturvedi2002",
      "linkedin": "https://www.linkedin.com/in/avinash-chaturvedi/",
      "avatarHue": 225
    },
    {
      "id": "cjm-awanimaheshvaidya",
      "name": "Awani Mahesh Vaidya",
      "initials": "AV",
      "photo": "/images/Individuals/Awani.jpeg",
      "role": "CJM Intern",
      "university": "IIIT Guwahati",
      "batch": "Summer 2026",
      "skills": ["Node.js", "TypeScript", "Playwright", "React", "SQLite", "Prisma", "Azure OpenAI"],
      "project": {
        "name": "AJO QA Validator Engine",
        "description": "AJO QA Validator is a QA automation tool for Adobe Journey Optimizer (AJO). It authenticates via browser session, pulls journey definitions, validates them against BRD/TSD specs, and drives live test-mode simulations in the AJO canvas, powered by an LLM-based validation pipeline (Azure OpenAI/OpenAI/Ollama configurable).",
        "url": "https://github.com/gigeorge_adobe/autoTestBot-X"
      },
      "bio": "Intern on the CJM team specializing in Node.js, TypeScript, Playwright, React, SQLite, Prisma, Azure OpenAI.",
      "mentor": "Gayathri Mutakekar",
      "github": "https://github.com/awanivaidya",
      "linkedin": "https://www.linkedin.com/in/awani-vaidya-117936282",
      "avatarHue": 250
    },
    {
      "id": "cjm-dipitmadan",
      "name": "Dipit Madan",
      "initials": "DM",
      "photo": "/images/Individuals/default_boy.png",
      "role": "CJM Intern",
      "university": "Vellore Institute of Technology",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "",
        "description": "",
        "url": ""
      },
      "bio": "Intern on the CJM team.",
      "mentor": "",
      "github": "",
      "linkedin": "https://in.linkedin.com/in/dipit-madan",
      "avatarHue": 300
    }
  ],
  "workfront": [
    {
      "id": "workfront-mihiragupta",
      "name": "Mihira Gupta",
      "initials": "MG",
      "photo": "/images/Individuals/Mihira.jpeg",
      "role": "Workfront Intern",
      "university": "Punjab Engineering College",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Fusion MCP Server",
        "description": "",
        "url": ""
      },
      "bio": "Intern on the Workfront team, working on the Fusion MCP Server.",
      "mentor": "Sai Dhruv Kumar",
      "github": "https://github.com/mihira4/",
      "linkedin": "https://www.linkedin.com/in/mihiragupta",
      "avatarHue": 10
    }
  ],
  "sbc": [
    {
      "id": "sbc-anshkumar",
      "name": "Ansh Kumar",
      "initials": "AK",
      "photo": "/images/Individuals/default_boy.png",
      "role": "SBC Intern",
      "university": "IMT Ghaziabad",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Connecting the Digital Journey for Changi Airport Group",
        "description": "Built a persona-driven personalization strategy with use cases that unifies Changi Airport's fragmented digital touchpoints using one customer profile, activated through Adobe's stack.",
        "url": ""
      },
      "bio": "Intern on the SBC team, working on Connecting the Digital Journey for Changi Airport Group.",
      "mentor": "Aishwarya Lakshmi",
      "github": "",
      "linkedin": "https://linkedin.com/in/ansh3603",
      "avatarHue": 45
    },
    {
      "id": "sbc-manoshiraha",
      "name": "Manoshi Raha",
      "initials": "MR",
      "photo": "/images/Individuals/default_girl.png",
      "role": "SBC Intern",
      "university": "IMT Ghaziabad",
      "batch": "Summer 2026",
      "skills": [],
      "project": {
        "name": "Resume Screening Assistant",
        "description": "",
        "url": "https://adobe-my.sharepoint.com/:p:/r/personal/abhinavkumar_adobe_com/Documents/Microsoft%20Teams%20Chat%20Files/Adobe_SBC_Resume_Agent_Deck%20(1).pptx"
      },
      "bio": "Intern on the SBC team, working on the Resume Screening Assistant.",
      "mentor": "Lakshman Hariharan",
      "github": "",
      "linkedin": "https://www.linkedin.com/in/manoshiraha19/",
      "avatarHue": 80
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
