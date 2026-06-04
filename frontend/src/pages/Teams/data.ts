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
    description:
      'The UI team owns the surfaces interns and stakeholders touch every day - design systems, dashboards, and the polish that makes products feel inevitable.',
    stack: ['React', 'TypeScript', 'Spectrum', 'Framer Motion'],
    lead: 'Priya Anand',
    memberCount: 8,
  },
  {
    id: 'data',
    code: 'DATA',
    name: 'Data',
    tagline: 'From raw signal to executive decision - pipelines that power insight.',
    description:
      'Pipelines, warehouses, and the analytics layer that powers every other team. They turn the noisy into the navigable.',
    stack: ['Snowflake', 'Airflow', 'dbt', 'Python'],
    lead: 'Marcus Liang',
    memberCount: 8,
  },
  {
    id: 'dacoe',
    code: 'DACoE',
    name: 'DACoE',
    tagline: 'Digital Analytics Center of Excellence - measurement that matters.',
    description:
      'Instrumentation, measurement strategy, and the governance that keeps every metric trustworthy across the org.',
    stack: ['Adobe Analytics', 'Launch', 'SQL', 'Tableau'],
    lead: 'Amelia Okafor',
    memberCount: 8,
  },
  {
    id: 'aem',
    code: 'AEM',
    name: 'AEM',
    tagline: 'Experience management at enterprise scale - authoring the web.',
    description:
      'Authoring, delivery, and personalization on Adobe Experience Manager - the backbone of brand-facing content.',
    stack: ['AEM', 'Java', 'Sling', 'HTL'],
    lead: 'Devon Park',
    memberCount: 8,
  },
  {
    id: 'workfront',
    code: 'WF',
    name: 'Workfront',
    tagline: 'Where work meets workflow - operationalizing creative teams.',
    description:
      'Operationalizing how teams plan, request, review, and ship - automating the unglamorous so creatives can stay creative.',
    stack: ['Workfront', 'Fusion', 'REST APIs', 'JavaScript'],
    lead: 'Sana Khalid',
    memberCount: 8,
  },
  {
    id: 'content',
    code: 'CTN',
    name: 'Content',
    tagline: 'Voice, narrative, and the words that ship with every product.',
    description:
      'Editorial strategy, UX writing, and the long-form storytelling that gives every product its register.',
    stack: ['Strategy', 'UX Writing', 'SEO', 'Editorial'],
    lead: 'Jordan Reyes',
    memberCount: 8,
  },
];

const FIRST_NAMES = [
  'Aarav', 'Maya', 'Liam', 'Zoe', 'Kenji', 'Aria', 'Theo', 'Nia',
  'Rohan', 'Eliana', 'Felix', 'Sana', 'Mateo', 'Iris', 'Kai', 'Noor',
  'Diego', 'Anika', 'Jonas', 'Priya', 'Soren', 'Lila', 'Ezra', 'Amara',
  'Tariq', 'Wren', 'Cyrus', 'Mira', 'Idris', 'Nova', 'Ronan', 'Yui',
  'Adrian', 'Hana', 'Lucas', 'Ines', 'Owen', 'Saira', 'Cole', 'Maeve',
];

const LAST_NAMES = [
  'Patel', 'Chen', 'Okafor', 'Singh', 'Nakamura', 'Rossi', 'Park', 'Kumar',
  'Silva', 'Khan', 'Tanaka', 'Muller', 'Costa', 'Reyes', 'Walsh', 'Anand',
  'Liang', 'Hassan', 'Brooks', 'Vargas', 'Iyer', 'Holm', 'Ferrari', 'Dubois',
  'Nguyen', 'Abebe', 'Sato', 'Becker', 'Davies', 'Romero',
];

const UNIVERSITIES = [
  'Stanford University', 'MIT', 'Carnegie Mellon', 'UC Berkeley', 'Georgia Tech',
  'University of Washington', 'BITS Pilani', 'IIT Bombay', 'ETH Zurich',
  'University of Toronto', 'NYU', 'UCLA', 'University of Michigan',
  'NTU Singapore', 'Cornell University', 'UT Austin',
];

const BATCHES = ['Summer 2025', 'Fall 2025', 'Spring 2026', 'Summer 2026'];

const ROLES_BY_TEAM: Record<TeamId, string[]> = {
  ui: ['Frontend Intern', 'Design Engineer Intern', 'UX Engineer Intern', 'Motion Intern'],
  data: ['Data Engineer Intern', 'Analytics Intern', 'ML Intern', 'Data Science Intern'],
  dacoe: ['Analytics Intern', 'Measurement Intern', 'Insights Intern', 'Reporting Intern'],
  aem: ['AEM Developer Intern', 'Backend Intern', 'Platform Intern', 'Integration Intern'],
  workfront: ['Workfront Intern', 'Automation Intern', 'Solutions Intern', 'Ops Intern'],
  content: ['Content Strategy Intern', 'UX Writer Intern', 'Editorial Intern', 'Localization Intern'],
};

const SKILLS_BY_TEAM: Record<TeamId, string[][]> = {
  ui: [
    ['React', 'TypeScript', 'CSS'],
    ['Figma', 'Storybook', 'React'],
    ['Three.js', 'WebGL', 'GLSL'],
    ['Framer', 'Lottie', 'AE'],
  ],
  data: [
    ['Python', 'Spark', 'Airflow'],
    ['SQL', 'dbt', 'Snowflake'],
    ['PyTorch', 'MLflow', 'Pandas'],
    ['R', 'Tableau', 'Python'],
  ],
  dacoe: [
    ['Adobe Analytics', 'SQL'],
    ['Launch', 'JavaScript'],
    ['Power BI', 'DAX'],
    ['Excel', 'Looker'],
  ],
  aem: [
    ['Java', 'Sling', 'HTL'],
    ['AEM', 'OSGi', 'JCR'],
    ['Maven', 'Jenkins', 'AEM'],
    ['GraphQL', 'Java', 'AEM'],
  ],
  workfront: [
    ['Workfront Fusion', 'JS'],
    ['REST APIs', 'Node'],
    ['Workfront', 'SQL'],
    ['Automation', 'Zapier'],
  ],
  content: [
    ['UX Writing', 'Figma'],
    ['SEO', 'Strategy'],
    ['Editorial', 'CMS'],
    ['Localization', 'i18n'],
  ],
};

const PROJECTS_BY_TEAM: Record<TeamId, Project[]> = {
  ui: [
    { name: 'Spectrum Tokens v3', url: '#' },
    { name: 'Dashboard Redesign', url: '#' },
    { name: 'Component Migration', url: '#' },
    { name: 'Marketing Site Refresh', url: '#' },
  ],
  data: [
    { name: 'Unified Event Pipeline', url: '#' },
    { name: 'Cohort Modeling v2', url: '#' },
    { name: 'Real-time Lakehouse', url: '#' },
    { name: 'Anomaly Detection', url: '#' },
  ],
  dacoe: [
    { name: 'Funnel Instrumentation', url: '#' },
    { name: 'Attribution Model', url: '#' },
    { name: 'Executive Reporting', url: '#' },
    { name: 'Tag Governance', url: '#' },
  ],
  aem: [
    { name: 'Headless Migration', url: '#' },
    { name: 'Personalization Engine', url: '#' },
    { name: 'Asset Pipeline', url: '#' },
    { name: 'Multi-site Templates', url: '#' },
  ],
  workfront: [
    { name: 'Request Intake Automation', url: '#' },
    { name: 'Approval Routing v2', url: '#' },
    { name: 'Capacity Dashboard', url: '#' },
    { name: 'Fusion Connectors', url: '#' },
  ],
  content: [
    { name: 'Voice & Tone Guide', url: '#' },
    { name: 'Onboarding Copy Audit', url: '#' },
    { name: 'Help Center Rewrite', url: '#' },
    { name: 'Localization Playbook', url: '#' },
  ],
};

const DACOE_MEMBERS: Member[] = [
  {
    id: 'dacoe-shambhavi-sinha',
    name: 'Shambhavi Sinha',
    bio:
      'I am a Computer Science postgraduate student at Christ University with a strong interest in AI, software development, and UI/UX design. I enjoy building practical and user-focused solutions, working on innovative research projects, and exploring new ideas in technology and design. Along with academics and development, I also enjoy creative activities like singing, learning musical instruments, and reading, which help me stay curious and balanced outside of work.',
    photo: '/images/contributors/shambhavi-sinha.jpeg',
    photoPosition: 'center',
    project: {
      name: 'Retail Insight Orchestrator',
      description:
        "This project is a retail insight orchestration layer built on top of Customer Journey Analytics (via CJA MCP). It takes a business question in natural language, understands the retail intent, maps it to the right metrics and dimensions, and generates a structured analysis workflow instead of making the user manually figure out what to ask.",
      url: null,
    },
    github: 'https://github.com/sinha4',
    linkedin: 'https://www.linkedin.com/in/shambhavi-sinha-28509324a',
    skills: ['Python', 'AEP'],
    initials: 'SS',
    role: 'DACoE Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'DACoE Team',
    avatarHue: 0,
  },
  {
    id: 'dacoe-yanish-rai',
    name: 'Yanish Rai',
    bio:
      'MCA intern at Adobe, Bengaluru, working with Adobe Experience Platform (AEP) and the Adobe Experience Cloud ecosystem. Currently pursuing MCA at CHRIST (Deemed to be University), Bangalore. Passionate about full-stack development, data engineering, and building scalable platforms.',
    photo: '/images/contributors/yanish-rai.jpg',
    photoPosition: 'center',
    project: {
      name: 'Agent Evaluation Harness',
      description:
        'Given (a) an AEP dataset and (b) a set of business use cases, automatically generates a tiered prompt suite for the Data Insights Agent, executes those prompts against the live agent in AEP, computes the ground-truth answer directly from the underlying data, scores the agent\'s responses against ground truth, and produces a reliability report with failure mode analysis.',
      url: null,
    },
    github: 'https://github.com/GeekyYanish',
    linkedin: 'https://linkedin.com.in/yanish_rai',
    skills: ['Python', 'React'],
    initials: 'YR',
    role: 'DACoE Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'DACoE Team',
    avatarHue: 0,
  },
];

const UI_MEMBERS: Member[] = [
  {
    id: 'ui-achindra-sharma',
    name: 'Achindra Sharma',
    bio:
      "My default mode is figuring out how to make things less frustrating to use. I value clean execution, straightforward communication, and good aesthetics. Outside of work, I spend my time going down random rabbit holes.",
    photo: '/images/contributors/achindra-sharma.jpg',
    photoPosition: 'center',
    project: {
      name: 'Nirmit',
      description:
        'Nirmit is a culturally-aware design partner that bridges the gap between expensive professional firms and local contractors for Indian homeowners. By understanding the nuances of Indian domestic life, it transforms a simple conversation into personalized, 3D room visions that users can refine through natural dialogue. The experience provides instant cost clarity and a detailed execution plan, making high-quality, custom home design accessible and achievable.',
      url: null,
    },
    github: 'https://github.com/Achindra2003',
    linkedin: 'https://www.linkedin.com/in/achindrasharma',
    skills: ['React', 'Typescript', 'Python', 'Design'],
    initials: 'AS',
    role: 'UI Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'UI Team',
    avatarHue: 0,
  },
  {
    id: 'ui-daniel-paul',
    name: 'Daniel Paul',
    bio:
      "Spends life between Neovim buffers, high-fidelity DACs. Rust is deprecated. Optimized for machine speed; unoptimized for small talk.",
    photo: '/images/contributors/daniel-paul.jpg',
    photoPosition: 'center',
    project: {
      name: 'FinPath - AI Financial Planner',
      description:
        'FinPath is a personal finance app that helps users track their income and expenses, set and allocate financial goals with auto-generated month-by-month plans, simulate debt payoff using avalanche or snowball strategies, visualize cash flow , monitor their financial health with a composite score, explore what-if scenarios, and chat with an AI assistant named Penny for financial insights.',
      url: null,
    },
    github: 'https://github.com/K1NGS1LVER',
    linkedin: 'https://www.linkedin.com/in/daniel-paul-dev/',
    skills: ['React', 'Typescript', 'C++', 'C', 'Node.js', 'Express.js'],
    initials: 'DP',
    role: 'UI Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'UI Team',
    avatarHue: 0,
  },
  {
    id: 'ui-shreeya-bajpai',
    name: 'Shreeya Bajpai',
    bio:
      "I am a fast learner who loves converting ideas into reality with all resources at hand. Beyond tech, I'm an avid reader, language enthusiast, and enjoy debates.",
    photo: '/images/contributors/shreeya-bajpai.jpg',
    photoPosition: 'center',
    project: {
      name: 'Lume Corp',
      description:
        'An AI-integrated corporate event planning platform designed for an immersive experience of the planning flow, with 2D setup visualiser.',
      url: null,
    },
    github: 'https://github.com/Shrxxya',
    linkedin: 'https://in.linkedin.com/in/shreeya-bajpai',
    skills: ['React', 'Vite', 'Javascript'],
    initials: 'SB',
    role: 'UI Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'UI Team',
    avatarHue: 0,
  },
];

const AEM_MEMBERS: Member[] = [];

const CONTENT_MEMBERS: Member[] = [
  {
    id: 'content-ar-rajeev-chandar',
    name: 'A R Rajeev Chandar',
    bio:
      'I’m a tech enthusiast who loves building cool web apps, exploring AI, and turning ideas into real projects. I enjoy learning new technologies, solving problems, and collaborating with people who are passionate about innovation.',
    photo: '/images/contributors/ar-rajeev-chandar.jpg',
    photoPosition: 'center',
    project: {
      name: 'Adokicks',
      description:
        'AdoKicks is a modern e-commerce footwear platform built using Adobe Experience Manager and Edge Delivery Services principles to deliver a fast, scalable, and seamless shopping experience.',
      url: null,
    },
    github: 'https://github.com/rajeevc-adobe/AdoKicks',
    linkedin:
      'https://www.linkedin.com/in/a-r-rajeev-chandar-442141264?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    skills: ['EDS', 'HTML', 'CSS', 'JS'],
    initials: 'AR',
    role: 'Content Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'Content Team',
    avatarHue: 0,
  },
  {
    id: 'content-sudeepa-santhanam',
    name: 'Sudeepa Santhanam',
    bio:
      'Heyy, I’m Sudeepa! I enjoy building interactive web projects and exploring new technologies along the way. I’m particularly interested in full stack development, frontend design, and creating user experiences that are both functional and visually engaging. I like experimenting with creative ideas, improving designs, and learning through hands-on projects. Outside of tech, I enjoy reading books, dancing, cooking, and listening to music. I’m someone who enjoys collaborating with people, communicating ideas clearly, and taking initiative whenever needed. I’d describe myself as creative, adaptable, confident, and always curious to learn something new :D',
    photo: '/images/contributors/sudeepa-santhanam.jpeg',
    photoPosition: 'center',
    project: {
      name: 'Global Translation Pipeline',
      description:
        'Automated localization pipeline for Adobe marketing content, supporting 26 languages with human-in-the-loop review for high-sensitivity strings.',
      url: null,
    },
    github: 'https://github.com/sudeeepaa',
    linkedin: 'https://linkedin.com/in/sudeepasanthanam',
    skills: ['Frontend', 'React', 'Full Stack', 'Design'],
    initials: 'SS',
    role: 'Content Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'Content Team',
    avatarHue: 0,
  },
];

const DATA_MEMBERS: Member[] = [
  {
    id: 'data-anamaya-saraogi',
    name: 'Anamaya Saraogi',
    bio:
      'I’m an MCA student passionate about Python, Data Science and AI/ML. I enjoy reading and public speaking. I like turning ideas into practical projects while continuously improving my skills and creativity along the way.',
    photo: '/images/contributors/anamaya-saraogi.jpg',
    photoPosition: 'center',
    project: {
      name: 'AEP QueryGen',
      description:
        'Built a utility tool leveraging LLM and RAG to automate segment validation on Adobe Experience Platform, significantly reducing manual effort.',
      url: null,
    },
    github: 'https://github.com/AnamayaSaraogi',
    linkedin: 'https://www.linkedin.com/in/anamaya-saraogi-904b0924b/',
    skills: ['Python', 'Data Science', 'AI/ML', 'React', 'FastAPI'],
    initials: 'AS',
    role: 'Data Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'Data Team',
    avatarHue: 0,
  },
  {
    id: 'data-kanika-jain',
    name: 'Kanika Jain',
    bio:
      'Hi! I am Kanika Jain. I am a passionate learner and like exploring new technologies and domains. I have a strong interest in data analysis and I enjoy working on projects that combine problem-solving, data analysis and intuitive user experiences. Beyond Technology, I like sketching and reading novels that allows me to improve my attention to detail and explore different perspectives.',
    photo: '/images/contributors/kanika-jain.jpeg',
    photoPosition: 'center',
    project: {
      name: 'AEP QueryGen',
      description:
        'Built a utility tool leveraging LLM and RAG to automate segment validation on Adobe Experience Platform, significantly reducing manual effort.',
      url: null,
    },
    github: 'https://github.com/Kanika244/PQL_SQL2',
    linkedin: 'https://www.linkedin.com/in/kanika-jain-31b916284/',
    skills: ['React', 'FastAPI', 'Data Analysis', 'Problem Solving'],
    initials: 'KJ',
    role: 'Data Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'Data Team',
    avatarHue: 0,
  },
];

const WORKFRONT_MEMBERS: Member[] = [
  {
    id: 'workfront-namratha-r',
    name: 'Namratha R',
    bio:
      "I am a passionate and goal-oriented individual with strong leadership, communication, and problem-solving skills. I thrive in challenging environments and focus on achieving shared goals. Skilled in Full-Stack Web Development, I enjoy building responsive and user-friendly web applications. I am also actively involved in volunteering and leading events, which has strengthened my teamwork, organizational, and coordination abilities.",
    photo: '/images/contributors/namratha-r.jpeg',
    photoPosition: 'center',
    project: {
      name: 'Audit Automation',
      description:
        'Developed an AI-powered Audit Automation solution to automate audit assessments, gap identification, risk analysis, escalation tracking, action item generation, and project RAG reporting. The platform transforms audit conversations into structured deliverables, findings, recommendations, and executive dashboard insights for governance and portfolio visibility.',
      url: null,
    },
    github: 'https://github.com/namrathar18',
    linkedin: 'https://www.linkedin.com/in/namratharp18',
    skills: [
      'Workfront Core',
      'Workfront Fusion',
      'Claude (LLM)',
      'Webhooks',
      'JSON Processing',
      'Prompt Engineering',
      'Reporting and Canvas Dashboard',
    ],
    initials: 'NR',
    role: 'Workfront Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'Workfront Team',
    avatarHue: 0,
  },
  {
    id: 'workfront-sachin-d',
    name: 'Sachin D',
    bio:
      'Hi, I’m Sachin someone who enjoys turning ideas into meaningful experiences through technology. Outside of tech, boxing has taught me discipline, focus, and consistency. From AI-powered applications and scalable web platforms to IoT and cloud-driven solutions, I enjoy building technology with purpose and exploring how innovation, technology, and business come together to create impactful products and real-world value.',
    photo: '/images/contributors/sachin-d.png',
    photoPosition: 'center',
    project: {
      name: 'IntelliMatch AI',
      description:
        'A hybrid agentic system for intelligent project allocation and workforce decisions, that brings decision intelligence to project allocation, enabling structured, explainable, and data-driven staffing decisions.',
      url: null,
    },
    github: 'https://github.com/SachinD-Sketch',
    linkedin: 'https://www.linkedin.com/in/sachin-dev-152624269',
    skills: [
      'Ollama',
      'Mistral',
      'SBERT',
      'Python FastAPI',
      'Workfront Core',
      'Workfront Fusion',
    ],
    initials: 'SD',
    role: 'Workfront Intern',
    university: 'Christ (Deemed to be University)',
    batch: 'Summer 2026',
    mentor: 'Workfront Team',
    avatarHue: 0,
  },
];

const BIOS = [
  'Spends weekends rebuilding mechanical keyboards and arguing about kerning. Believes good software has good rhythm.',
  'Came to Adobe through a research project on perceptual color spaces. Currently obsessed with making dashboards readable in three glances or fewer.',
  'Former architecture student. Treats every component like a load-bearing wall - measured, intentional, hard to break.',
  'Reads release notes for fun. Writes them better than most people write essays.',
  'Trail runner, type nerd, and the unofficial team historian. Owns more Pantone books than is reasonable.',
  'Picked up code through making mods for indie games. Now applies the same patience to enterprise tooling.',
  'Bilingual product thinker who translates ambiguity into roadmaps. Fluent in spreadsheet.',
  'Cares deeply about documentation. Has strong, well-formed opinions about empty states.',
  'Studies jazz piano on the side and applies the same improvisation to debugging at 4pm on Fridays.',
  'Once shipped a side project that hit the front page of Hacker News. Still gets nervous before standups.',
  'Comes from a journalism background. Brings the discipline of editing to every PR review.',
  'Makes ceramics on weekends. Believes in slow craft and tight feedback loops.',
];

function seededRandom(seed: number) {
  let currentSeed = seed;
  return () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
}

function pick<T>(items: T[], rnd: () => number): T {
  return items[Math.floor(rnd() * items.length)];
}

function generateMembers(teamId: TeamId, count: number, seed: number): Member[] {
  const rnd = seededRandom(seed);
  const used = new Set<string>();
  const members: Member[] = [];
  let attempts = 0;

  while (members.length < count && attempts < count * 10) {
    attempts += 1;
    const first = pick(FIRST_NAMES, rnd);
    const last = pick(LAST_NAMES, rnd);
    const full = `${first} ${last}`;

    if (used.has(full)) continue;

    used.add(full);
    const handle = `${first.toLowerCase()}${last.toLowerCase()}`;
    members.push({
      id: `${teamId}-${members.length}`,
      name: full,
      initials: `${first[0]}${last[0]}`.toUpperCase(),
      role: pick(ROLES_BY_TEAM[teamId], rnd),
      university: pick(UNIVERSITIES, rnd),
      batch: pick(BATCHES, rnd),
      skills: pick(SKILLS_BY_TEAM[teamId], rnd),
      project: pick(PROJECTS_BY_TEAM[teamId], rnd),
      bio: pick(BIOS, rnd),
      mentor: `${pick(FIRST_NAMES, rnd)} ${pick(LAST_NAMES, rnd)}`,
      github: `https://github.com/${handle}`,
      linkedin: `https://linkedin.com/in/${handle}`,
      avatarHue: Math.floor(rnd() * 360),
    });
  }

  return members;
}

export const MEMBERS_BY_TEAM: Record<TeamId, Member[]> = {
  ui: [
    ...UI_MEMBERS,
    ...generateMembers('ui', 5, 11),
  ],
  data: [
    ...DATA_MEMBERS,
    ...generateMembers('data', 6, 22),
  ],
  dacoe: [
    ...DACOE_MEMBERS,
    ...generateMembers('dacoe', 6, 33),
  ],
  aem: [
    ...AEM_MEMBERS,
    ...generateMembers('aem', 6, 44),
  ],
  workfront: [
    ...WORKFRONT_MEMBERS,
    ...generateMembers('workfront', 6, 55),
  ],
  content: [
    ...CONTENT_MEMBERS,
    ...generateMembers('content', 8, 66),
  ],
};

export const AVATAR_COLORS: AvatarColor[] = [
  { bg: 'rgba(235, 28, 36, 0.15)', color: '#EB1C24' },
  { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' },
  { bg: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' },
  { bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' },
  { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
  { bg: 'rgba(236, 72, 153, 0.15)', color: '#EC4899' },
];
