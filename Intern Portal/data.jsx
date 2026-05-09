// Team & member data for the Intern Portal (v3 — matching ACS codebase)

const TEAMS = [
  {
    id: "ui",
    code: "UI",
    name: "UI Engineering",
    tagline: "Crafting interfaces, motion, and the pixels that shape experience.",
    description: "The UI team owns the surfaces interns and stakeholders touch every day — design systems, dashboards, and the polish that makes products feel inevitable.",
    stack: ["React", "TypeScript", "Spectrum", "Framer Motion"],
    lead: "Priya Anand",
    memberCount: 8,
  },
  {
    id: "data",
    code: "DATA",
    name: "Data",
    tagline: "From raw signal to executive decision — pipelines that power insight.",
    description: "Pipelines, warehouses, and the analytics layer that powers every other team. They turn the noisy into the navigable.",
    stack: ["Snowflake", "Airflow", "dbt", "Python"],
    lead: "Marcus Liang",
    memberCount: 8,
  },
  {
    id: "dacoe",
    code: "DACoE",
    name: "DACoE",
    tagline: "Digital Analytics Center of Excellence — measurement that matters.",
    description: "Instrumentation, measurement strategy, and the governance that keeps every metric trustworthy across the org.",
    stack: ["Adobe Analytics", "Launch", "SQL", "Tableau"],
    lead: "Amelia Okafor",
    memberCount: 8,
  },
  {
    id: "aem",
    code: "AEM",
    name: "AEM",
    tagline: "Experience management at enterprise scale — authoring the web.",
    description: "Authoring, delivery, and personalization on Adobe Experience Manager — the backbone of brand-facing content.",
    stack: ["AEM", "Java", "Sling", "HTL"],
    lead: "Devon Park",
    memberCount: 8,
  },
  {
    id: "workfront",
    code: "WF",
    name: "Workfront",
    tagline: "Where work meets workflow — operationalizing creative teams.",
    description: "Operationalizing how teams plan, request, review, and ship — automating the unglamorous so creatives can stay creative.",
    stack: ["Workfront", "Fusion", "REST APIs", "JavaScript"],
    lead: "Sana Khalid",
    memberCount: 8,
  },
  {
    id: "content",
    code: "CTN",
    name: "Content",
    tagline: "Voice, narrative, and the words that ship with every product.",
    description: "Editorial strategy, UX writing, and the long-form storytelling that gives every product its register.",
    stack: ["Strategy", "UX Writing", "SEO", "Editorial"],
    lead: "Jordan Reyes",
    memberCount: 8,
  },
];

const FIRST_NAMES = [
  "Aarav","Maya","Liam","Zoë","Kenji","Aria","Theo","Nia",
  "Rohan","Eliana","Felix","Sana","Mateo","Iris","Kai","Noor",
  "Diego","Anika","Jonas","Priya","Soren","Lila","Ezra","Amara",
  "Tariq","Wren","Cyrus","Mira","Idris","Nova","Ronan","Yui",
  "Adrian","Hana","Lucas","Ines","Owen","Saira","Cole","Maeve",
];
const LAST_NAMES = [
  "Patel","Chen","Okafor","Singh","Nakamura","Rossi","Park","Kumar",
  "Silva","Khan","Tanaka","Müller","Costa","Reyes","Walsh","Anand",
  "Liang","Hassan","Brooks","Vargas","Iyer","Holm","Ferrari","Dubois",
  "Nguyen","Abebe","Sato","Becker","Davies","Romero",
];
const UNIVERSITIES = [
  "Stanford University","MIT","Carnegie Mellon","UC Berkeley","Georgia Tech",
  "University of Washington","BITS Pilani","IIT Bombay","ETH Zürich",
  "University of Toronto","NYU","UCLA","University of Michigan","NTU Singapore",
  "Cornell University","UT Austin",
];
const BATCHES = ["Summer 2025","Fall 2025","Spring 2026","Summer 2026"];

const ROLES_BY_TEAM = {
  ui: ["Frontend Intern","Design Engineer Intern","UX Engineer Intern","Motion Intern"],
  data: ["Data Engineer Intern","Analytics Intern","ML Intern","Data Science Intern"],
  dacoe: ["Analytics Intern","Measurement Intern","Insights Intern","Reporting Intern"],
  aem: ["AEM Developer Intern","Backend Intern","Platform Intern","Integration Intern"],
  workfront: ["Workfront Intern","Automation Intern","Solutions Intern","Ops Intern"],
  content: ["Content Strategy Intern","UX Writer Intern","Editorial Intern","Localization Intern"],
};
const SKILLS_BY_TEAM = {
  ui: [["React","TypeScript","CSS"],["Figma","Storybook","React"],["Three.js","WebGL","GLSL"],["Framer","Lottie","AE"]],
  data: [["Python","Spark","Airflow"],["SQL","dbt","Snowflake"],["PyTorch","MLflow","Pandas"],["R","Tableau","Python"]],
  dacoe: [["Adobe Analytics","SQL"],["Launch","JavaScript"],["Power BI","DAX"],["Excel","Looker"]],
  aem: [["Java","Sling","HTL"],["AEM","OSGi","JCR"],["Maven","Jenkins","AEM"],["GraphQL","Java","AEM"]],
  workfront: [["Workfront Fusion","JS"],["REST APIs","Node"],["Workfront","SQL"],["Automation","Zapier"]],
  content: [["UX Writing","Figma"],["SEO","Strategy"],["Editorial","CMS"],["Localization","i18n"]],
};
const PROJECTS_BY_TEAM = {
  ui: [{name:"Spectrum Tokens v3",url:"#"},{name:"Dashboard Redesign",url:"#"},{name:"Component Migration",url:"#"},{name:"Marketing Site Refresh",url:"#"}],
  data: [{name:"Unified Event Pipeline",url:"#"},{name:"Cohort Modeling v2",url:"#"},{name:"Real-time Lakehouse",url:"#"},{name:"Anomaly Detection",url:"#"}],
  dacoe: [{name:"Funnel Instrumentation",url:"#"},{name:"Attribution Model",url:"#"},{name:"Executive Reporting",url:"#"},{name:"Tag Governance",url:"#"}],
  aem: [{name:"Headless Migration",url:"#"},{name:"Personalization Engine",url:"#"},{name:"Asset Pipeline",url:"#"},{name:"Multi-site Templates",url:"#"}],
  workfront: [{name:"Request Intake Automation",url:"#"},{name:"Approval Routing v2",url:"#"},{name:"Capacity Dashboard",url:"#"},{name:"Fusion Connectors",url:"#"}],
  content: [{name:"Voice & Tone Guide",url:"#"},{name:"Onboarding Copy Audit",url:"#"},{name:"Help Center Rewrite",url:"#"},{name:"Localization Playbook",url:"#"}],
};
const BIOS = [
  "Spends weekends rebuilding mechanical keyboards and arguing about kerning. Believes good software has good rhythm.",
  "Came to Adobe through a research project on perceptual color spaces. Currently obsessed with making dashboards readable in three glances or fewer.",
  "Former architecture student. Treats every component like a load-bearing wall — measured, intentional, hard to break.",
  "Reads release notes for fun. Writes them better than most people write essays.",
  "Trail runner, type nerd, and the unofficial team historian. Owns more Pantone books than is reasonable.",
  "Picked up code through making mods for indie games. Now applies the same patience to enterprise tooling.",
  "Bilingual product thinker who translates ambiguity into roadmaps. Fluent in spreadsheet.",
  "Cares deeply about documentation. Has strong, well-formed opinions about empty states.",
  "Studies jazz piano on the side and applies the same improvisation to debugging at 4pm on Fridays.",
  "Once shipped a side project that hit the front page of Hacker News. Still gets nervous before standups.",
  "Comes from a journalism background. Brings the discipline of editing to every PR review.",
  "Makes ceramics on weekends. Believes in slow craft and tight feedback loops.",
];

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
function pick(arr, rnd) { return arr[Math.floor(rnd() * arr.length)]; }

function generateMembers(teamId, count, seed) {
  const rnd = seededRandom(seed);
  const used = new Set();
  const out = [];
  let i = 0;
  while (out.length < count && i < count * 10) {
    i++;
    const first = pick(FIRST_NAMES, rnd);
    const last = pick(LAST_NAMES, rnd);
    const full = `${first} ${last}`;
    if (used.has(full)) continue;
    used.add(full);
    const handle = `${first.toLowerCase()}${last.toLowerCase()}`;
    out.push({
      id: `${teamId}-${out.length}`,
      name: full,
      initials: (first[0] + last[0]).toUpperCase(),
      role: pick(ROLES_BY_TEAM[teamId], rnd),
      university: pick(UNIVERSITIES, rnd),
      batch: pick(BATCHES, rnd),
      skills: pick(SKILLS_BY_TEAM[teamId], rnd),
      project: pick(PROJECTS_BY_TEAM[teamId], rnd),
      bio: pick(BIOS, rnd),
      mentor: pick(FIRST_NAMES, rnd) + " " + pick(LAST_NAMES, rnd),
      github: `https://github.com/${handle}`,
      linkedin: `https://linkedin.com/in/${handle}`,
      avatarHue: Math.floor(rnd() * 360),
    });
  }
  return out;
}

const MEMBERS_BY_TEAM = {
  ui: generateMembers("ui", 8, 11),
  data: generateMembers("data", 8, 22),
  dacoe: generateMembers("dacoe", 8, 33),
  aem: generateMembers("aem", 8, 44),
  workfront: generateMembers("workfront", 8, 55),
  content: generateMembers("content", 8, 66),
};

const AVATAR_COLORS = [
  { bg: 'rgba(235, 28, 36, 0.15)', color: '#EB1C24' },
  { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' },
  { bg: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' },
  { bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' },
  { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
  { bg: 'rgba(236, 72, 153, 0.15)', color: '#EC4899' },
];

window.TEAMS = TEAMS;
window.MEMBERS_BY_TEAM = MEMBERS_BY_TEAM;
window.AVATAR_COLORS = AVATAR_COLORS;
