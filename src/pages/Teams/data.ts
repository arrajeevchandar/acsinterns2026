<<<<<<< HEAD
export interface Project {
  title: string;
  summary: string;
=======
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
>>>>>>> main
  url: string;
}

export interface Member {
  id: string;
  name: string;
<<<<<<< HEAD
  role: string;
  university: string;
  program: string;
  avatar: number;
  github: string;
  linkedin: string;
  bio: string;
  project: Project;
  stack: string[];
}

export interface Team {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  mission: string;
  members: Member[];
=======
  initials: string;
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
>>>>>>> main
}

export const TEAMS: Team[] = [
  {
<<<<<<< HEAD
    slug: 'ui',
    number: '01',
    name: 'UI',
    tagline: 'Frontend & design system contributors',
    mission:
      'Shipping the components, tokens, and patterns that make every Adobe DX surface feel like one product.',
    members: [
      {
        id: 'ui-1',
        name: 'Aarav Mehta',
        role: 'UI Engineer Intern',
        university: 'CHRIST (Deemed to be University)',
        program: 'MCA Intern',
        avatar: 12,
        github: 'https://github.com/aaravmehta',
        linkedin: 'https://linkedin.com/in/aaravmehta',
        bio: 'Aarav focuses on the design system primitives — buttons, fields, and motion tokens — used across DX surfaces. He cares about small details that make interfaces feel quiet.',
        project: {
          title: 'Spectrum tokens for DX dashboards',
          summary: 'Migrating legacy CSS to Spectrum design tokens across four internal dashboards.',
          url: 'https://github.com/aaravmehta/spectrum-dx-tokens',
        },
        stack: ['React', 'TypeScript', 'Tailwind', 'Spectrum'],
      },
      {
        id: 'ui-2',
        name: 'Ananya Krishnan',
        role: 'Design Engineer Intern',
        university: 'BITS Pilani',
        program: 'B.E. Intern',
        avatar: 5,
        github: 'https://github.com/ananyakrishnan',
        linkedin: 'https://linkedin.com/in/ananyakrishnan',
        bio: 'Ananya bridges design and code, building Figma-to-code pipelines and prototyping motion in production-ready components.',
        project: {
          title: 'Motion library for DX',
          summary: 'A small Framer Motion wrapper that codifies easing, durations, and stagger across product surfaces.',
          url: 'https://github.com/ananyakrishnan/dx-motion',
        },
        stack: ['React', 'Framer Motion', 'Figma', 'TypeScript'],
      },
      {
        id: 'ui-3',
        name: 'Rohan Banerjee',
        role: 'UI Engineer Intern',
        university: 'NIT Trichy',
        program: 'B.Tech Intern',
        avatar: 13,
        github: 'https://github.com/rohanbanerjee',
        linkedin: 'https://linkedin.com/in/rohanbanerjee',
        bio: 'Rohan works on accessibility — keyboard nav, focus management, and screen-reader fidelity for the shared component library.',
        project: {
          title: 'A11y audit & remediation',
          summary: 'Closing 80+ accessibility issues across the Workfront and AEM admin shells.',
          url: 'https://github.com/rohanbanerjee/a11y-audit',
        },
        stack: ['React', 'ARIA', 'Playwright', 'axe-core'],
      },
      {
        id: 'ui-4',
        name: 'Sneha Reddy',
        role: 'Frontend Intern',
        university: 'IIIT Bangalore',
        program: 'M.Tech Intern',
        avatar: 16,
        github: 'https://github.com/snehareddy',
        linkedin: 'https://linkedin.com/in/snehareddy',
        bio: 'Sneha builds the editorial surfaces — marketing pages, changelog, internal newsroom — for DX. Type-first, image-second.',
        project: {
          title: 'DX changelog redesign',
          summary: 'A long-form changelog template that scales from one-line fixes to full case studies.',
          url: 'https://github.com/snehareddy/dx-changelog',
        },
        stack: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
      },
      {
        id: 'ui-5',
        name: 'Kabir Iyer',
        role: 'UI Engineer Intern',
        university: 'VIT Vellore',
        program: 'B.Tech Intern',
        avatar: 33,
        github: 'https://github.com/kabiriyer',
        linkedin: 'https://linkedin.com/in/kabiriyer',
        bio: 'Kabir prototypes the harder visual ideas — canvas-based editors, scroll-driven storytelling, custom layout primitives.',
        project: {
          title: 'Canvas-based AEM block editor',
          summary: 'A pan/zoom canvas for arranging AEM content blocks visually, with snap and align.',
          url: 'https://github.com/kabiriyer/aem-canvas-editor',
        },
        stack: ['React', 'Canvas', 'Zustand', 'Vite'],
      },
    ],
  },
  {
    slug: 'data',
    number: '02',
    name: 'Data',
    tagline: 'Customer data, AEP schemas, telemetry',
    mission:
      'Turning event streams and customer profiles into the connective tissue every DX product builds on.',
    members: [
      {
        id: 'data-1',
        name: 'Ishaan Kapoor',
        role: 'Data Engineering Intern',
        university: 'BITS Pilani',
        program: 'B.E. Intern',
        avatar: 11,
        github: 'https://github.com/ishaankapoor',
        linkedin: 'https://linkedin.com/in/ishaankapoor',
        bio: 'Ishaan owns ingestion pipelines from product telemetry into Adobe Experience Platform.',
        project: {
          title: 'Real-time CDP ingestion',
          summary: 'Sub-second event delivery from product surfaces into AEP customer profiles.',
          url: 'https://github.com/ishaankapoor/cdp-ingestion',
        },
        stack: ['Python', 'Kafka', 'AEP', 'SQL'],
      },
      {
        id: 'data-2',
        name: 'Priya Nair',
        role: 'Analytics Intern',
        university: 'CHRIST (Deemed to be University)',
        program: 'MCA Intern',
        avatar: 24,
        github: 'https://github.com/priyanair',
        linkedin: 'https://linkedin.com/in/priyanair',
        bio: 'Priya designs the schemas and dashboards product teams use to understand intern-shipped features.',
        project: {
          title: 'Adoption telemetry framework',
          summary: 'A standard schema for tracking feature adoption across DX intern projects.',
          url: 'https://github.com/priyanair/telemetry-framework',
        },
        stack: ['dbt', 'BigQuery', 'Looker', 'SQL'],
      },
      {
        id: 'data-3',
        name: 'Vikram Joshi',
        role: 'Data Science Intern',
        university: 'IIIT Bangalore',
        program: 'M.Tech Intern',
        avatar: 14,
        github: 'https://github.com/vikramjoshi',
        linkedin: 'https://linkedin.com/in/vikramjoshi',
        bio: 'Vikram experiments with personalization models on top of AEP profiles.',
        project: {
          title: 'Next-best-action recommender',
          summary: 'A lightweight ranker that suggests the next workflow step inside Workfront.',
          url: 'https://github.com/vikramjoshi/nba-recommender',
        },
        stack: ['Python', 'PyTorch', 'AEP', 'Spark'],
      },
      {
        id: 'data-4',
        name: 'Meera Sundaram',
        role: 'Data Engineering Intern',
        university: 'NIT Trichy',
        program: 'B.Tech Intern',
        avatar: 47,
        github: 'https://github.com/meerasundaram',
        linkedin: 'https://linkedin.com/in/meerasundaram',
        bio: 'Meera builds the schema validation and contract layer between product teams and the data platform.',
        project: {
          title: 'Schema contracts for DX events',
          summary: 'A contract-test suite that fails CI when product teams ship breaking event changes.',
          url: 'https://github.com/meerasundaram/dx-schema-contracts',
        },
        stack: ['Python', 'Avro', 'Pact', 'GitHub Actions'],
      },
    ],
  },
  {
    slug: 'dacoe',
    number: '03',
    name: 'DACoE',
    tagline: 'Digital Acceleration Center of Excellence',
    mission:
      'The internal consultancy — packaging best practices, playbooks, and reference implementations the whole org reuses.',
    members: [
      {
        id: 'dacoe-1',
        name: 'Arjun Pillai',
        role: 'DA Strategy Intern',
        university: 'BITS Pilani',
        program: 'B.E. Intern',
        avatar: 8,
        github: 'https://github.com/arjunpillai',
        linkedin: 'https://linkedin.com/in/arjunpillai',
        bio: 'Arjun authors the playbooks DX teams use when standing up new digital experiences.',
        project: {
          title: 'Launch playbook v3',
          summary: 'A revised launch checklist covering analytics, accessibility, and rollout gates.',
          url: 'https://github.com/arjunpillai/dx-launch-playbook',
        },
        stack: ['Notion', 'Figma', 'Mermaid', 'Airtable'],
      },
      {
        id: 'dacoe-2',
        name: 'Tara Bhat',
        role: 'Solutions Intern',
        university: 'VIT Vellore',
        program: 'B.Tech Intern',
        avatar: 25,
        github: 'https://github.com/tarabhat',
        linkedin: 'https://linkedin.com/in/tarabhat',
        bio: 'Tara prototypes reference implementations that other product teams fork as their starting point.',
        project: {
          title: 'Headless commerce reference app',
          summary: 'A fork-ready Next.js storefront wired to AEP, AEM, and Commerce APIs.',
          url: 'https://github.com/tarabhat/headless-commerce-ref',
        },
        stack: ['Next.js', 'GraphQL', 'AEM', 'Commerce'],
      },
      {
        id: 'dacoe-3',
        name: 'Devansh Rao',
        role: 'Solutions Intern',
        university: 'NIT Trichy',
        program: 'B.Tech Intern',
        avatar: 32,
        github: 'https://github.com/devanshrao',
        linkedin: 'https://linkedin.com/in/devanshrao',
        bio: 'Devansh works on tooling — CLIs and templates — that compress the time from idea to first commit.',
        project: {
          title: 'DX scaffolding CLI',
          summary: 'A `npx create-dx-app` style CLI that scaffolds compliant DX experiences in one command.',
          url: 'https://github.com/devanshrao/create-dx-app',
        },
        stack: ['Node', 'TypeScript', 'Plop', 'Yargs'],
      },
      {
        id: 'dacoe-4',
        name: 'Lavanya Menon',
        role: 'DA Research Intern',
        university: 'IIIT Bangalore',
        program: 'M.Tech Intern',
        avatar: 36,
        github: 'https://github.com/lavanyamenon',
        linkedin: 'https://linkedin.com/in/lavanyamenon',
        bio: 'Lavanya runs internal research — surveying DX teams, distilling patterns, feeding the playbook.',
        project: {
          title: 'DX team health survey',
          summary: 'Quarterly research deliverable on tooling friction across DX engineering.',
          url: 'https://github.com/lavanyamenon/dx-health-survey',
        },
        stack: ['Dovetail', 'Notion', 'Looker', 'Figma'],
      },
    ],
  },
  {
    slug: 'aem',
    number: '04',
    name: 'AEM',
    tagline: 'Adobe Experience Manager builds',
    mission:
      'Building the components, templates, and authoring flows that power AEM sites and pages at enterprise scale.',
    members: [
      {
        id: 'aem-1',
        name: 'Nikhil Saxena',
        role: 'AEM Developer Intern',
        university: 'BITS Pilani',
        program: 'B.E. Intern',
        avatar: 51,
        github: 'https://github.com/nikhilsaxena',
        linkedin: 'https://linkedin.com/in/nikhilsaxena',
        bio: 'Nikhil ships AEM core components and authoring dialogs.',
        project: {
          title: 'Editable container component',
          summary: 'A flexible AEM container that authors can configure without developer intervention.',
          url: 'https://github.com/nikhilsaxena/aem-editable-container',
        },
        stack: ['AEM', 'Java', 'Sling', 'HTL'],
      },
      {
        id: 'aem-2',
        name: 'Aditi Sharma',
        role: 'AEM Developer Intern',
        university: 'CHRIST (Deemed to be University)',
        program: 'MCA Intern',
        avatar: 9,
        github: 'https://github.com/aditisharma',
        linkedin: 'https://linkedin.com/in/aditisharma',
        bio: 'Aditi works on AEM-as-a-Cloud-Service migrations and CI pipelines.',
        project: {
          title: 'AEMaaCS pipeline templates',
          summary: 'Reusable Cloud Manager pipelines that meet DX security and quality gates.',
          url: 'https://github.com/aditisharma/aemaacs-pipelines',
        },
        stack: ['AEMaaCS', 'Cloud Manager', 'Jenkins', 'Maven'],
      },
      {
        id: 'aem-3',
        name: 'Karan Desai',
        role: 'AEM Developer Intern',
        university: 'VIT Vellore',
        program: 'B.Tech Intern',
        avatar: 60,
        github: 'https://github.com/karandesai',
        linkedin: 'https://linkedin.com/in/karandesai',
        bio: 'Karan builds the editor experience — dialogs, drag-targets, and inline edits — for content authors.',
        project: {
          title: 'Inline editing for hero blocks',
          summary: 'Edit-in-place affordances for the most common AEM hero patterns.',
          url: 'https://github.com/karandesai/aem-inline-edit',
        },
        stack: ['AEM', 'React', 'Granite UI', 'HTL'],
      },
      {
        id: 'aem-4',
        name: 'Diya Choudhury',
        role: 'AEM Developer Intern',
        university: 'NIT Trichy',
        program: 'B.Tech Intern',
        avatar: 44,
        github: 'https://github.com/diyachoudhury',
        linkedin: 'https://linkedin.com/in/diyachoudhury',
        bio: 'Diya works on performance — Core Web Vitals, edge caching, and image optimization for AEM sites.',
        project: {
          title: 'CWV uplift across DX sites',
          summary: 'A round of perf work targeting LCP and CLS across six AEM-powered DX properties.',
          url: 'https://github.com/diyachoudhury/cwv-uplift',
        },
        stack: ['AEM', 'Lighthouse', 'Cloudflare', 'WebP'],
      },
    ],
  },
  {
    slug: 'workfront',
    number: '05',
    name: 'Workfront',
    tagline: 'Project & workflow automation',
    mission:
      'Modeling the way DX teams plan, track, and ship — and removing the toil from every step.',
    members: [
      {
        id: 'wf-1',
        name: 'Aryan Gupta',
        role: 'Workfront Developer Intern',
        university: 'IIIT Bangalore',
        program: 'M.Tech Intern',
        avatar: 53,
        github: 'https://github.com/aryangupta',
        linkedin: 'https://linkedin.com/in/aryangupta',
        bio: 'Aryan builds Fusion automations that wire Workfront to the rest of the DX toolchain.',
        project: {
          title: 'Brief-to-task automation',
          summary: 'Auto-creates Workfront tasks from inbound creative briefs across three intake channels.',
          url: 'https://github.com/aryangupta/wf-brief-automation',
        },
        stack: ['Workfront', 'Fusion', 'Node', 'REST'],
      },
      {
        id: 'wf-2',
        name: 'Saanvi Kulkarni',
        role: 'Workflow Intern',
        university: 'BITS Pilani',
        program: 'B.E. Intern',
        avatar: 49,
        github: 'https://github.com/saanvikulkarni',
        linkedin: 'https://linkedin.com/in/saanvikulkarni',
        bio: 'Saanvi designs the templates and request queues that make Workfront usable for non-PMs.',
        project: {
          title: 'Creative request templates',
          summary: 'A small set of Workfront request queues sized for the most common creative asks.',
          url: 'https://github.com/saanvikulkarni/wf-request-templates',
        },
        stack: ['Workfront', 'Figma', 'Notion', 'Excel'],
      },
      {
        id: 'wf-3',
        name: 'Yash Pandey',
        role: 'Workfront Developer Intern',
        university: 'VIT Vellore',
        program: 'B.Tech Intern',
        avatar: 65,
        github: 'https://github.com/yashpandey',
        linkedin: 'https://linkedin.com/in/yashpandey',
        bio: 'Yash extends Workfront with custom forms and reports for DX leadership.',
        project: {
          title: 'DX delivery dashboard',
          summary: 'A leadership view that rolls up Workfront delivery health across DX programs.',
          url: 'https://github.com/yashpandey/dx-delivery-dashboard',
        },
        stack: ['Workfront', 'TextMode', 'SQL', 'Looker'],
      },
      {
        id: 'wf-4',
        name: 'Ritika Verma',
        role: 'Workflow Intern',
        university: 'CHRIST (Deemed to be University)',
        program: 'MCA Intern',
        avatar: 26,
        github: 'https://github.com/ritikaverma',
        linkedin: 'https://linkedin.com/in/ritikaverma',
        bio: 'Ritika partners with PMs to translate broken processes into Workfront automations.',
        project: {
          title: 'Onboarding automation',
          summary: 'An end-to-end intern onboarding workflow that replaces three disconnected spreadsheets.',
          url: 'https://github.com/ritikaverma/wf-onboarding',
        },
        stack: ['Workfront', 'Fusion', 'Slack', 'DocuSign'],
      },
    ],
  },
  {
    slug: 'content',
    number: '06',
    name: 'Content',
    tagline: 'Content strategy & GenStudio',
    mission:
      'Defining the editorial system — voice, structure, and reuse — that GenStudio and DX content surfaces share.',
    members: [
      {
        id: 'ct-1',
        name: 'Anushka Iyer',
        role: 'Content Strategy Intern',
        university: 'CHRIST (Deemed to be University)',
        program: 'MCA Intern',
        avatar: 1,
        github: 'https://github.com/anushkaiyer',
        linkedin: 'https://linkedin.com/in/anushkaiyer',
        bio: 'Anushka authors voice and tone guidelines that GenStudio prompts and DX surfaces both lean on.',
        project: {
          title: 'DX voice & tone v2',
          summary: 'An updated voice guide with model prompts that GenStudio inherits at generation time.',
          url: 'https://github.com/anushkaiyer/dx-voice-tone',
        },
        stack: ['GenStudio', 'Notion', 'Figma', 'GPT'],
      },
      {
        id: 'ct-2',
        name: 'Harsh Vardhan',
        role: 'Content Engineer Intern',
        university: 'BITS Pilani',
        program: 'B.E. Intern',
        avatar: 18,
        github: 'https://github.com/harshvardhan',
        linkedin: 'https://linkedin.com/in/harshvardhan',
        bio: 'Harsh builds the structured content models that turn one-source-of-truth into many surfaces.',
        project: {
          title: 'Structured content schema',
          summary: 'A content schema that lets a single article render as web, email, and in-product cards.',
          url: 'https://github.com/harshvardhan/structured-content-schema',
        },
        stack: ['GenStudio', 'Sanity', 'GraphQL', 'MDX'],
      },
      {
        id: 'ct-3',
        name: 'Tanvi Shah',
        role: 'Content Designer Intern',
        university: 'NIT Trichy',
        program: 'B.Tech Intern',
        avatar: 38,
        github: 'https://github.com/tanvishah',
        linkedin: 'https://linkedin.com/in/tanvishah',
        bio: 'Tanvi writes the in-product copy — empty states, errors, micro-interactions — for DX surfaces.',
        project: {
          title: 'Empty-state library',
          summary: 'A reusable set of empty-state messages tuned per surface and audience.',
          url: 'https://github.com/tanvishah/empty-state-library',
        },
        stack: ['Figma', 'GenStudio', 'Notion', 'Sketch'],
      },
      {
        id: 'ct-4',
        name: 'Manav Khanna',
        role: 'Content Strategy Intern',
        university: 'VIT Vellore',
        program: 'B.Tech Intern',
        avatar: 56,
        github: 'https://github.com/manavkhanna',
        linkedin: 'https://linkedin.com/in/manavkhanna',
        bio: 'Manav owns the content ops — taxonomies, workflows, and review cycles — for GenStudio outputs.',
        project: {
          title: 'GenStudio review workflow',
          summary: 'A lightweight approval flow for GenStudio outputs before they go live on DX surfaces.',
          url: 'https://github.com/manavkhanna/genstudio-review-flow',
        },
        stack: ['GenStudio', 'Workfront', 'Notion', 'Slack'],
      },
    ],
  },
];

export const totalMembers = TEAMS.reduce((acc, t) => acc + t.members.length, 0);

export const universityBreakdown = (members: Member[]): [string, number][] => {
  const counts: Record<string, number> = {};
  members.forEach((m) => {
    counts[m.university] = (counts[m.university] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
};

export const portraitUrl = (n: number): string => `https://i.pravatar.cc/600?img=${n}`;
=======
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
  ui: generateMembers('ui', 8, 11),
  data: generateMembers('data', 8, 22),
  dacoe: generateMembers('dacoe', 8, 33),
  aem: generateMembers('aem', 8, 44),
  workfront: generateMembers('workfront', 8, 55),
  content: generateMembers('content', 8, 66),
};

export const AVATAR_COLORS: AvatarColor[] = [
  { bg: 'rgba(235, 28, 36, 0.15)', color: '#EB1C24' },
  { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' },
  { bg: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' },
  { bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' },
  { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
  { bg: 'rgba(236, 72, 153, 0.15)', color: '#EC4899' },
];
>>>>>>> main
