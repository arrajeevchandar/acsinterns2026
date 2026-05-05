// Static data for the prototype. All inline; no API calls.

const TEAMS = [
  {
    slug: "ui",
    number: "01",
    name: "UI",
    tagline: "Frontend & design system contributors",
    mission:
      "Shipping the components, tokens, and patterns that make every Adobe DX surface feel like one product.",
    members: [
      {
        id: "ui-1",
        name: "Aarav Mehta",
        role: "UI Engineer Intern",
        university: "CHRIST (Deemed to be University)",
        program: "MCA Intern",
        avatar: 12,
        bio: "Aarav focuses on the design system primitives — buttons, fields, and motion tokens — used across DX surfaces. He cares about small details that make interfaces feel quiet.",
        project: {
          title: "Spectrum tokens for DX dashboards",
          summary:
            "Migrating legacy CSS to Spectrum design tokens across four internal dashboards.",
        },
        stack: ["React", "TypeScript", "Tailwind", "Spectrum"],
      },
      {
        id: "ui-2",
        name: "Ananya Krishnan",
        role: "Design Engineer Intern",
        university: "BITS Pilani",
        program: "B.E. Intern",
        avatar: 5,
        bio: "Ananya bridges design and code, building Figma-to-code pipelines and prototyping motion in production-ready components.",
        project: {
          title: "Motion library for DX",
          summary:
            "A small Framer Motion wrapper that codifies easing, durations, and stagger across product surfaces.",
        },
        stack: ["React", "Framer Motion", "Figma", "TypeScript"],
      },
      {
        id: "ui-3",
        name: "Rohan Banerjee",
        role: "UI Engineer Intern",
        university: "NIT Trichy",
        program: "B.Tech Intern",
        avatar: 13,
        bio: "Rohan works on accessibility — keyboard nav, focus management, and screen-reader fidelity for the shared component library.",
        project: {
          title: "A11y audit & remediation",
          summary:
            "Closing 80+ accessibility issues across the Workfront and AEM admin shells.",
        },
        stack: ["React", "ARIA", "Playwright", "axe-core"],
      },
      {
        id: "ui-4",
        name: "Sneha Reddy",
        role: "Frontend Intern",
        university: "IIIT Bangalore",
        program: "M.Tech Intern",
        avatar: 16,
        bio: "Sneha builds the editorial surfaces — marketing pages, changelog, internal newsroom — for DX. Type-first, image-second.",
        project: {
          title: "DX changelog redesign",
          summary:
            "A long-form changelog template that scales from one-line fixes to full case studies.",
        },
        stack: ["Next.js", "MDX", "Tailwind", "Vercel"],
      },
      {
        id: "ui-5",
        name: "Kabir Iyer",
        role: "UI Engineer Intern",
        university: "VIT Vellore",
        program: "B.Tech Intern",
        avatar: 33,
        bio: "Kabir prototypes the harder visual ideas — canvas-based editors, scroll-driven storytelling, custom layout primitives.",
        project: {
          title: "Canvas-based AEM block editor",
          summary:
            "A pan/zoom canvas for arranging AEM content blocks visually, with snap and align.",
        },
        stack: ["React", "Canvas", "Zustand", "Vite"],
      },
    ],
  },
  {
    slug: "data",
    number: "02",
    name: "Data",
    tagline: "Customer data, AEP schemas, telemetry",
    mission:
      "Turning event streams and customer profiles into the connective tissue every DX product builds on.",
    members: [
      {
        id: "data-1",
        name: "Ishaan Kapoor",
        role: "Data Engineering Intern",
        university: "BITS Pilani",
        program: "B.E. Intern",
        avatar: 11,
        bio: "Ishaan owns ingestion pipelines from product telemetry into Adobe Experience Platform.",
        project: {
          title: "Real-time CDP ingestion",
          summary:
            "Sub-second event delivery from product surfaces into AEP customer profiles.",
        },
        stack: ["Python", "Kafka", "AEP", "SQL"],
      },
      {
        id: "data-2",
        name: "Priya Nair",
        role: "Analytics Intern",
        university: "CHRIST (Deemed to be University)",
        program: "MCA Intern",
        avatar: 24,
        bio: "Priya designs the schemas and dashboards product teams use to understand intern-shipped features.",
        project: {
          title: "Adoption telemetry framework",
          summary:
            "A standard schema for tracking feature adoption across DX intern projects.",
        },
        stack: ["dbt", "BigQuery", "Looker", "SQL"],
      },
      {
        id: "data-3",
        name: "Vikram Joshi",
        role: "Data Science Intern",
        university: "IIIT Bangalore",
        program: "M.Tech Intern",
        avatar: 14,
        bio: "Vikram experiments with personalization models on top of AEP profiles.",
        project: {
          title: "Next-best-action recommender",
          summary:
            "A lightweight ranker that suggests the next workflow step inside Workfront.",
        },
        stack: ["Python", "PyTorch", "AEP", "Spark"],
      },
      {
        id: "data-4",
        name: "Meera Sundaram",
        role: "Data Engineering Intern",
        university: "NIT Trichy",
        program: "B.Tech Intern",
        avatar: 47,
        bio: "Meera builds the schema validation and contract layer between product teams and the data platform.",
        project: {
          title: "Schema contracts for DX events",
          summary:
            "A contract-test suite that fails CI when product teams ship breaking event changes.",
        },
        stack: ["Python", "Avro", "Pact", "GitHub Actions"],
      },
    ],
  },
  {
    slug: "dacoe",
    number: "03",
    name: "DACoE",
    tagline: "Digital Acceleration Center of Excellence",
    mission:
      "The internal consultancy — packaging best practices, playbooks, and reference implementations the whole org reuses.",
    members: [
      {
        id: "dacoe-1",
        name: "Arjun Pillai",
        role: "DA Strategy Intern",
        university: "BITS Pilani",
        program: "B.E. Intern",
        avatar: 8,
        bio: "Arjun authors the playbooks DX teams use when standing up new digital experiences.",
        project: {
          title: "Launch playbook v3",
          summary:
            "A revised launch checklist covering analytics, accessibility, and rollout gates.",
        },
        stack: ["Notion", "Figma", "Mermaid", "Airtable"],
      },
      {
        id: "dacoe-2",
        name: "Tara Bhat",
        role: "Solutions Intern",
        university: "VIT Vellore",
        program: "B.Tech Intern",
        avatar: 25,
        bio: "Tara prototypes reference implementations that other product teams fork as their starting point.",
        project: {
          title: "Headless commerce reference app",
          summary:
            "A fork-ready Next.js storefront wired to AEP, AEM, and Commerce APIs.",
        },
        stack: ["Next.js", "GraphQL", "AEM", "Commerce"],
      },
      {
        id: "dacoe-3",
        name: "Devansh Rao",
        role: "Solutions Intern",
        university: "NIT Trichy",
        program: "B.Tech Intern",
        avatar: 32,
        bio: "Devansh works on tooling — CLIs and templates — that compress the time from idea to first commit.",
        project: {
          title: "DX scaffolding CLI",
          summary:
            "A `npx create-dx-app` style CLI that scaffolds compliant DX experiences in one command.",
        },
        stack: ["Node", "TypeScript", "Plop", "Yargs"],
      },
      {
        id: "dacoe-4",
        name: "Lavanya Menon",
        role: "DA Research Intern",
        university: "IIIT Bangalore",
        program: "M.Tech Intern",
        avatar: 36,
        bio: "Lavanya runs internal research — surveying DX teams, distilling patterns, feeding the playbook.",
        project: {
          title: "DX team health survey",
          summary:
            "Quarterly research deliverable on tooling friction across DX engineering.",
        },
        stack: ["Dovetail", "Notion", "Looker", "Figma"],
      },
    ],
  },
  {
    slug: "aem",
    number: "04",
    name: "AEM",
    tagline: "Adobe Experience Manager builds",
    mission:
      "Building the components, templates, and authoring flows that power AEM sites and pages at enterprise scale.",
    members: [
      {
        id: "aem-1",
        name: "Nikhil Saxena",
        role: "AEM Developer Intern",
        university: "BITS Pilani",
        program: "B.E. Intern",
        avatar: 51,
        bio: "Nikhil ships AEM core components and authoring dialogs.",
        project: {
          title: "Editable container component",
          summary:
            "A flexible AEM container that authors can configure without developer intervention.",
        },
        stack: ["AEM", "Java", "Sling", "HTL"],
      },
      {
        id: "aem-2",
        name: "Aditi Sharma",
        role: "AEM Developer Intern",
        university: "CHRIST (Deemed to be University)",
        program: "MCA Intern",
        avatar: 9,
        bio: "Aditi works on AEM-as-a-Cloud-Service migrations and CI pipelines.",
        project: {
          title: "AEMaaCS pipeline templates",
          summary:
            "Reusable Cloud Manager pipelines that meet DX security and quality gates.",
        },
        stack: ["AEMaaCS", "Cloud Manager", "Jenkins", "Maven"],
      },
      {
        id: "aem-3",
        name: "Karan Desai",
        role: "AEM Developer Intern",
        university: "VIT Vellore",
        program: "B.Tech Intern",
        avatar: 60,
        bio: "Karan builds the editor experience — dialogs, drag-targets, and inline edits — for content authors.",
        project: {
          title: "Inline editing for hero blocks",
          summary:
            "Edit-in-place affordances for the most common AEM hero patterns.",
        },
        stack: ["AEM", "React", "Granite UI", "HTL"],
      },
      {
        id: "aem-4",
        name: "Diya Choudhury",
        role: "AEM Developer Intern",
        university: "NIT Trichy",
        program: "B.Tech Intern",
        avatar: 44,
        bio: "Diya works on performance — Core Web Vitals, edge caching, and image optimization for AEM sites.",
        project: {
          title: "CWV uplift across DX sites",
          summary:
            "A round of perf work targeting LCP and CLS across six AEM-powered DX properties.",
        },
        stack: ["AEM", "Lighthouse", "Cloudflare", "WebP"],
      },
    ],
  },
  {
    slug: "workfront",
    number: "05",
    name: "Workfront",
    tagline: "Project & workflow automation",
    mission:
      "Modeling the way DX teams plan, track, and ship — and removing the toil from every step.",
    members: [
      {
        id: "wf-1",
        name: "Aryan Gupta",
        role: "Workfront Developer Intern",
        university: "IIIT Bangalore",
        program: "M.Tech Intern",
        avatar: 53,
        bio: "Aryan builds Fusion automations that wire Workfront to the rest of the DX toolchain.",
        project: {
          title: "Brief-to-task automation",
          summary:
            "Auto-creates Workfront tasks from inbound creative briefs across three intake channels.",
        },
        stack: ["Workfront", "Fusion", "Node", "REST"],
      },
      {
        id: "wf-2",
        name: "Saanvi Kulkarni",
        role: "Workflow Intern",
        university: "BITS Pilani",
        program: "B.E. Intern",
        avatar: 49,
        bio: "Saanvi designs the templates and request queues that make Workfront usable for non-PMs.",
        project: {
          title: "Creative request templates",
          summary:
            "A small set of Workfront request queues sized for the most common creative asks.",
        },
        stack: ["Workfront", "Figma", "Notion", "Excel"],
      },
      {
        id: "wf-3",
        name: "Yash Pandey",
        role: "Workfront Developer Intern",
        university: "VIT Vellore",
        program: "B.Tech Intern",
        avatar: 65,
        bio: "Yash extends Workfront with custom forms and reports for DX leadership.",
        project: {
          title: "DX delivery dashboard",
          summary:
            "A leadership view that rolls up Workfront delivery health across DX programs.",
        },
        stack: ["Workfront", "TextMode", "SQL", "Looker"],
      },
      {
        id: "wf-4",
        name: "Ritika Verma",
        role: "Workflow Intern",
        university: "CHRIST (Deemed to be University)",
        program: "MCA Intern",
        avatar: 26,
        bio: "Ritika partners with PMs to translate broken processes into Workfront automations.",
        project: {
          title: "Onboarding automation",
          summary:
            "An end-to-end intern onboarding workflow that replaces three disconnected spreadsheets.",
        },
        stack: ["Workfront", "Fusion", "Slack", "DocuSign"],
      },
    ],
  },
  {
    slug: "content",
    number: "06",
    name: "Content",
    tagline: "Content strategy & GenStudio",
    mission:
      "Defining the editorial system — voice, structure, and reuse — that GenStudio and DX content surfaces share.",
    members: [
      {
        id: "ct-1",
        name: "Anushka Iyer",
        role: "Content Strategy Intern",
        university: "CHRIST (Deemed to be University)",
        program: "MCA Intern",
        avatar: 1,
        bio: "Anushka authors voice and tone guidelines that GenStudio prompts and DX surfaces both lean on.",
        project: {
          title: "DX voice & tone v2",
          summary:
            "An updated voice guide with model prompts that GenStudio inherits at generation time.",
        },
        stack: ["GenStudio", "Notion", "Figma", "GPT"],
      },
      {
        id: "ct-2",
        name: "Harsh Vardhan",
        role: "Content Engineer Intern",
        university: "BITS Pilani",
        program: "B.E. Intern",
        avatar: 18,
        bio: "Harsh builds the structured content models that turn one-source-of-truth into many surfaces.",
        project: {
          title: "Structured content schema",
          summary:
            "A content schema that lets a single article render as web, email, and in-product cards.",
        },
        stack: ["GenStudio", "Sanity", "GraphQL", "MDX"],
      },
      {
        id: "ct-3",
        name: "Tanvi Shah",
        role: "Content Designer Intern",
        university: "NIT Trichy",
        program: "B.Tech Intern",
        avatar: 38,
        bio: "Tanvi writes the in-product copy — empty states, errors, micro-interactions — for DX surfaces.",
        project: {
          title: "Empty-state library",
          summary:
            "A reusable set of empty-state messages tuned per surface and audience.",
        },
        stack: ["Figma", "GenStudio", "Notion", "Sketch"],
      },
      {
        id: "ct-4",
        name: "Manav Khanna",
        role: "Content Strategy Intern",
        university: "VIT Vellore",
        program: "B.Tech Intern",
        avatar: 56,
        bio: "Manav owns the content ops — taxonomies, workflows, and review cycles — for GenStudio outputs.",
        project: {
          title: "GenStudio review workflow",
          summary:
            "A lightweight approval flow for GenStudio outputs before they go live on DX surfaces.",
        },
        stack: ["GenStudio", "Workfront", "Notion", "Slack"],
      },
    ],
  },
];

// Helpers
const totalMembers = TEAMS.reduce((acc, t) => acc + t.members.length, 0);

const universityBreakdown = (members) => {
  const counts = {};
  members.forEach((m) => {
    counts[m.university] = (counts[m.university] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
};

const portraitUrl = (n) => `https://i.pravatar.cc/600?img=${n}`;

export { TEAMS, totalMembers, universityBreakdown, portraitUrl };
