// ═══════════════════════════════════════════════════════════════════════
//  SHARED SITE DATA — single source of truth for all layout variants.
//  Every /1 /2 /3 ... and /work/1 /work/2 ... page imports from here.
// ═══════════════════════════════════════════════════════════════════════

export type ArtworkKey =
  | 'bazaar'
  | 'namakura'
  | 'taqi'
  | 'mielot'
  | 'hunters'
  | 'radar'
  | 'jamieson'
  | 'bosch'
  | 'kaguya';

export interface Project {
  title: string;
  href: string;
  liveHref?: string;
  artwork: ArtworkKey;
  tags: string[];
  description: string;
  year?: string;
  status?: string;
  subtitle?: string;
  type?: string;
  details?: string[];
}

export interface FeaturedProject extends Project {
  subtitle: string;
  type: string;
  details: string[];
}

export const profile = {
  name: 'Ruchir Kalokhe',
  first: 'Ruchir',
  last: 'Kalokhe',
  role: 'Backend engineer leaning into AI research.',
  roleEmphasis: 'AI research.',
  tagline:
    'Building backend systems, ML infrastructure, and developer tooling — moving deeper into research while staying grounded in practical implementation.',
  quote:
    'I like building things that sit somewhere between ML, web engineering, and developer tooling.',
  bio: `Most of my learning has come from experimenting, shipping side projects, breaking systems, and working through the small deployment and product details until they feel right. I am now leaning more toward AI research while staying grounded in backend engineering, systems thinking, and practical implementation.`,
  email: 'ruchirkalokhe@gmail.com',
  github: 'https://github.com/ruxir-ig',
  linkedin: 'https://linkedin.com/in/ruchirkalokhe',
  location: 'Pune, India',
};

export const facts = [
  { label: 'Currently', value: 'Gen AI Intern @ In2peta' },
  { label: 'Education', value: 'B.E. in AI & Data Science' },
  { label: 'University', value: 'PES Modern College, Pune' },
  { label: 'Focus', value: 'AI Research · Backend · Systems' },
  { label: 'Location', value: 'Pune, India' },
  { label: 'Status', value: 'Open to opportunities' },
];

export const skills = [
  'Python', 'TypeScript', 'PyTorch', 'TensorFlow', 'Fastify', 'Docker',
  'PostgreSQL', 'Redis', 'Prisma', 'BullMQ', 'SGLang', 'Linux', 'Modal',
];

export const selectedWork: Project[] = [
  {
    title: 'mccia-tracelink',
    href: '/work',
    artwork: 'bazaar',
    featured: true,
    tags: ['TypeScript', 'Traceability', 'Graph flows'],
    description:
      'Supply-chain traceability platform for contaminated-batch propagation, incomplete records, and factory-floor workflows.',
  } as Project,
  {
    title: 'candis',
    href: '/work',
    artwork: 'namakura',
    tags: ['Python', 'Recruiting AI'],
    description:
      'Intelligent candidate discovery tooling for search, scoring, and shortlisting workflows.',
  },
  {
    title: 'auscult',
    href: '/work',
    artwork: 'taqi',
    tags: ['Python', 'Healthcare AI'],
    description:
      'Passive observability layer for healthcare AI agents, focused on monitoring rather than another chat surface.',
  },
];

export const featuredProject: FeaturedProject = {
  title: 'mccia-tracelink',
  subtitle: 'Supply-chain traceability platform',
  href: 'https://github.com/ruxir-ig/mccia-tracelink',
  liveHref: 'https://mccia-tracelink.onrender.com/',
  artwork: 'bazaar',
  tags: ['TypeScript', 'Traceability', 'Graph flows'],
  type: 'Full-stack platform',
  status: 'Active development',
  description:
    'Factory-floor supply-chain tracing for contaminated-batch propagation, incomplete records, and operational handoffs.',
  details: [
    'Factory-floor supply-chain tracing built from the current MCCIA TraceLink repository.',
    'Models contaminated-batch propagation, incomplete records, and operational handoffs across the chain.',
    'Uses a public-domain Indian bazaar procession reference to match the chain-of-custody and movement theme.',
  ],
};

export const projects: Project[] = [
  {
    title: 'candis',
    href: 'https://github.com/ruxir-ig/candis',
    artwork: 'namakura',
    tags: ['Python', 'Recruiting AI'],
    description:
      'Intelligent candidate discovery tooling for search, scoring, and shortlisting workflows.',
    year: '2026',
    status: 'Shipped',
    subtitle: 'Intelligent candidate discovery tooling',
    type: 'AI tooling',
    details: [
      'Search, scoring, and shortlisting workflows built around candidate discovery.',
      'Python tooling focused on the recruiting-AI loop end to end.',
    ],
  },
  {
    title: 'auscult',
    href: 'https://github.com/ruxir-ig/auscult',
    artwork: 'taqi',
    tags: ['Python', 'Healthcare AI', 'Observability'],
    description:
      'Passive observability layer for healthcare AI agents, shaped around monitoring rather than chat UI.',
    year: '2026',
    status: 'Research',
    subtitle: 'Observability layer for healthcare AI agents',
    type: 'Observability · Research',
    details: [
      'A passive observability layer for healthcare AI agents.',
      'Shaped around monitoring rather than another chat surface.',
    ],
  },
  {
    title: 'personal-memory-engine',
    href: 'https://github.com/ruxir-ig/personal-memory-engine',
    artwork: 'mielot',
    tags: ['TypeScript', 'Memory', 'Local-first'],
    description:
      'A local-first memory engine for capturing, structuring, and revisiting personal context.',
    year: '2026',
    status: 'Active',
    subtitle: 'Local-first memory engine',
    type: 'Local-first tooling',
    details: [
      'Captures, structures, and revisits personal context.',
      'Local-first design implemented in TypeScript.',
    ],
  },
  {
    title: 'nitch',
    href: 'https://github.com/ruxir-ig/nitch',
    artwork: 'hunters',
    tags: ['Nim', 'Linux', 'System fetch'],
    description: 'Incredibly fast system-fetch tooling in Nim, maintained for Linux-first workflows.',
    year: '2025',
    status: 'Maintained',
    subtitle: 'Fast system-fetch tooling',
    type: 'CLI · Linux tooling',
    details: [
      'An incredibly fast system fetch written in Nim.',
      'Maintained for Linux-first workflows.',
    ],
  },
  {
    title: 'SAR Image Colorization',
    href: 'https://github.com/ruxir-ig/SAR-Image-Colorization',
    artwork: 'radar',
    tags: ['PyTorch', 'GANs', 'Remote sensing'],
    description:
      'GAN-based SAR image colorization that turns grayscale radar imagery into RGB terrain reconstructions.',
    year: '2025',
    status: 'Research',
    subtitle: 'GAN-based SAR image colorization',
    type: 'Computer vision · Research',
    details: [
      'Turns grayscale radar imagery into RGB terrain reconstructions.',
      'GAN-based approach in PyTorch over remote-sensing input.',
    ],
  },
  {
    title: 'QKD_sim',
    href: 'https://github.com/ruxir-ig/QKD_sim',
    liveHref: 'https://qkd-sim.vercel.app',
    artwork: 'jamieson',
    tags: ['TypeScript', 'Quantum', 'BB84'],
    description:
      'A browser simulator for the BB84 quantum key distribution protocol, with a deployed interactive build.',
    year: '2025',
    status: 'Live',
    subtitle: 'BB84 quantum key distribution simulator',
    type: 'Simulation · Web',
    details: [
      'A browser simulator for the BB84 quantum key distribution protocol.',
      'Deployed as an interactive, shareable build.',
    ],
  },
  {
    title: 'MuseTalk API',
    href: 'https://github.com/ruxir-ig/MuseTalk-API',
    artwork: 'kaguya',
    tags: ['Python', 'GPU inference', 'Lip sync'],
    description:
      'REST API wrapper around MuseTalk for real-time talking-head generation and inference experiments.',
    year: '2025',
    status: 'Experiment',
    subtitle: 'REST API for MuseTalk inference',
    type: 'GPU inference · API',
    details: [
      'A REST API wrapper around MuseTalk for talking-head generation.',
      'Real-time inference experiments on GPU.',
    ],
  },
  {
    title: 'clawrrency',
    href: 'https://github.com/ruxir-ig/clawrrency',
    artwork: 'bosch',
    tags: ['TypeScript', 'AI agents', 'Currency'],
    description:
      'A cooperative digital currency system for AI bots, exploring agent incentives and exchange.',
    year: '2025',
    status: 'Prototype',
    subtitle: 'Cooperative currency for AI agents',
    type: 'Agents · Experiment',
    details: [
      'A cooperative digital currency system built for AI bots.',
      'Explores agent incentives and exchange between bots.',
    ],
  },
];

export const experience = {
  company: 'In2peta Services Pvt. Ltd.',
  role: 'Gen AI Intern — Backend & ML Infrastructure',
  range: 'Dec 2025 — May 2026',
  location: 'Remote',
  bullets: [
    'Built backend and inference infrastructure for the GPU model platform using TypeScript, Fastify, PostgreSQL, Redis, Prisma, BullMQ, and Docker',
    'Implemented job orchestration, model lifecycle flows, runtime packaging, API workflows, and model-serving paths',
    'Worked across Docker builds, runtime configuration, and Modal/Koyeb deployment flows',
    'Debugged production deployment issues across API, runtime, catalog, and inference layers',
    'Added guardrails for billing safety, idempotency, rate limiting, and access control',
  ],
  tags: ['TypeScript', 'Fastify', 'PostgreSQL', 'Redis', 'Docker', 'BullMQ'],
};

export const education = {
  school: 'PES Modern College of Engineering',
  university: 'Savitribai Phule Pune University',
  degree: 'B.E. in Artificial Intelligence & Data Science',
  date: 'Aug 2023 — Jun 2027 · Pune, India',
};

export const activities = [
  'Organizer & contributor at Google Developer Group on Campus PES MCOE — hackathons and technical events',
  'Participated in AI and systems hackathons including MCCIA AI Hackathon 2026',
  'Build and maintain side projects across ML infrastructure, backend systems, Linux tooling, and web workflows',
];

// Catalog of every variant — used by the /layouts gallery index.
export const landingVariants = [
  { id: '1', path: '/1', name: 'Asymmetric Editorial', vibe: 'On-brand · bold', blurb: 'Magazine cover. Oversized name hard-left, facts in a right rail, work as horizontal rows.' },
  { id: '2', path: '/2', name: 'Bento Dashboard', vibe: 'On-brand · modern', blurb: 'Modular bento grid — name, status, skills, and work as cells of varying size.' },
  { id: '3', path: '/3', name: 'Swiss + Lunchbox', vibe: 'Chosen direction', blurb: 'Restrained single column with deep detail, ending in a bento lunchbox that zooms open into an organized project grid.' },
  { id: '4', path: '/4', name: 'Full-bleed Cinematic', vibe: 'Radical · maximalist', blurb: 'Film-title hero filling the viewport, oversized imagery, magazine scroll.' },
];

export const workVariants = [
  { id: '1', path: '/work/1', name: 'Index / List', vibe: 'Radical · developer-led', blurb: 'Dense rows — index, title, tags, year. Hover reveals detail. No imagery.' },
  { id: '2', path: '/work/2', name: 'Bento Showcase', vibe: 'On-brand · modern', blurb: 'Mixed-size cards, featured large, others varying. Artwork-led.' },
  { id: '3', path: '/work/3', name: 'Gallery Masonry', vibe: 'On-brand · image-forward', blurb: 'Masonry columns of artwork, minimal text, lightbox-feel hover.' },
  { id: '4', path: '/work/4', name: 'Case Study', vibe: 'On-brand · narrative', blurb: 'One hero featured project narrated at length, then a compact grid.' },
];
