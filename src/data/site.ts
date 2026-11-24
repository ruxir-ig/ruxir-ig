export const profile = {
  name: 'Ruchir Kalokhe',
  first: 'Ruchir',
  last: 'Kalokhe',
  role: 'making stuff with ai',
  tagline:
    'Building backend systems, ML infrastructure, and developer tooling while moving deeper into research.',
  email: 'ruchirkalokhe@gmail.com',
  github: 'https://github.com/ruxir-ig',
  linkedin: 'https://linkedin.com/in/ruchirkalokhe',
  location: 'Pune, India',
  resume: '/resume/ruchir-kalokhe.pdf',
};

export type ShaderKey =
  | 'idle'
  | 'hydrous'
  | 'assetflow'
  | 'auscult'
  | 'candis'
  | 'dealflow'
  | 'firefox'
  | 'musetalk'
  | 'tracelink'
  | 'sar'
  | 'other';

export interface Role {
  org: string;
  orgHref?: string;
  title: string;
  period: string;
  summary: string;
}

export const experience: Role[] = [
  {
    org: 'In2peta',
    orgHref: 'https://in2peta.com/',
    title: 'Gen AI Intern · Backend & ML',
    period: 'Dec 2025 — Oct 2026',
    summary:
      'Backend for a multi-provider GPU inference platform: Modal, Koyeb, and RunPod behind one runtime contract, usage-based billing with credit reservations, and Hugging Face models shipped to live endpoints without hand packaging. Since September, also building GrowthCrew, a lead-generation and outreach product spun out of the platform.',
  },
];

export type ProjectLinkType = 'github' | 'live' | 'pypi' | 'docs' | 'other';

export interface ProjectLinkItem {
  label: string;
  url: string;
  type?: ProjectLinkType;
  hint?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  liveHref?: string;
  pypiHref?: string;
  links?: ProjectLinkItem[];
  tags: string[];
  description: string;
  highlights: string[];
  year: string;
  featured?: boolean;
  shader: ShaderKey;
}

export function getProjectLinks(project: Project): ProjectLinkItem[] {
  if (project.links && project.links.length > 0) {
    return project.links;
  }
  const result: ProjectLinkItem[] = [];
  const seenUrls = new Set<string>();

  if (project.href) {
    result.push({
      label: 'GitHub',
      url: project.href,
      type: 'github',
      hint: 'Source code',
    });
    seenUrls.add(project.href.trim().toLowerCase());
  }
  if (project.liveHref && !seenUrls.has(project.liveHref.trim().toLowerCase())) {
    result.push({
      label: 'Live App',
      url: project.liveHref,
      type: 'live',
      hint: 'Live deployment',
    });
    seenUrls.add(project.liveHref.trim().toLowerCase());
  }
  if (project.pypiHref && !seenUrls.has(project.pypiHref.trim().toLowerCase())) {
    result.push({
      label: 'PyPI',
      url: project.pypiHref,
      type: 'pypi',
      hint: 'pip install',
    });
    seenUrls.add(project.pypiHref.trim().toLowerCase());
  }
  return result;
}

export const projects: Project[] = [
  {
    id: 'hydrous',
    title: 'Hydrous',
    subtitle: 'Agent memory that keeps time: what was true then, not just now',
    href: 'https://github.com/ruxir-ig/hydrous',
    tags: ['Python', 'TypeScript', 'MCP'],
    description:
      'Bi-temporal, versioned memory for agents. Superseded facts close their validity interval instead of being overwritten, so retrieval can answer point-in-time questions. Built for Hack with Hydra.',
    highlights: [
      'As-of retrieval, quality-gated extraction, and feedback-loop prevention',
      'Local SQLite, HydraDB OSS graph, or HydraDB cloud behind one interface',
      'Python and TypeScript SDKs, HTTP server, MCP, and a LongMemEval harness',
    ],
    year: '2026',
    featured: true,
    shader: 'hydrous',
  },
  {
    id: 'assetflow',
    title: 'AssetFlow',
    subtitle: 'Enterprise asset and resource management for the Odoo Hackathon',
    href: 'https://github.com/ruxir-ig/AssetFlow',
    tags: ['React', 'Express', 'PostgreSQL'],
    description:
      'Tracks physical assets, shared-resource bookings, maintenance approvals, and audit cycles through role-based workflows.',
    highlights: [
      'Blocks double-allocation and overlapping bookings in the service layer',
      'Approval-driven maintenance, transfers, and audit consequences',
      'React and Express monorepo backed by PostgreSQL and Prisma',
    ],
    year: '2026',
    featured: true,
    shader: 'assetflow',
  },
  {
    id: 'auscult',
    title: 'Auscult',
    subtitle: 'Privacy-preserving observability for healthcare AI agents',
    href: 'https://github.com/ruxir-ig/auscult',
    pypiHref: 'https://pypi.org/project/auscult/',
    tags: ['Python', 'Presidio', 'spaCy'],
    description:
      'Agent runs stay auditable without retaining raw PHI. Prompts, tool calls, outputs, and errors are sanitized before database write, and a guard masks PHI in files and tool results before the agent ever reads them.',
    highlights: [
      'Fail-closed capture so sanitizer failures never persist unsanitized text',
      'OpenAI, Anthropic, LangChain/LangGraph, and Codex CLI capture without changing the call path',
      'PHI eval harness under CI with replay, compare, export, and purge',
    ],
    year: '2026',
    featured: true,
    shader: 'auscult',
  },
  {
    id: 'candis',
    title: 'Candis',
    subtitle: 'LLM candidate discovery and ranking over 100K profiles',
    href: 'https://github.com/ruxir-ig/candis',
    tags: ['Python', 'NumPy', 'Embeddings'],
    description:
      'Ranks top candidates from 100K profiles in ~13s on CPU via honeypot filters, structured fit scoring, and evidence-guided expansion.',
    highlights: [
      '15 injected weak profiles entered top-100 under keyword matching; 0 under Candis',
      'Pairwise LLM audit at 83.7% win rate; hand-qrel NDCG@10 0.93+',
      'Prompt-injection audit with 0 effect on final ranking',
    ],
    year: '2026',
    featured: true,
    shader: 'candis',
  },
  {
    id: 'tracelink',
    title: 'TraceLink',
    subtitle: 'Manufacturing supply-chain traceability',
    href: 'https://github.com/ruxir-ig/mccia-tracelink',
    liveHref: 'https://mccia-tracelink.onrender.com/',
    tags: ['FastAPI', 'React', 'Docker'],
    description:
      'Factory-floor platform for intake → batches → QC → dispatch → complaints, with forward/reverse tracing and blast-radius analysis.',
    highlights: [
      'Ingests 40k+ rows in seconds with SHA-256 duplicate detection',
      'Blast-radius and financial-exposure analysis in milliseconds',
      'Live on Render with CI and Firebase-authenticated dashboards',
    ],
    year: '2026',
    featured: true,
    shader: 'tracelink',
  },
  {
    id: 'dealflow',
    title: 'DealFlow360',
    subtitle: 'B2B quote-to-cash on one PostgreSQL database — team build',
    href: 'https://github.com/orion-catchers/dealflow',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    description:
      'Catalog → quote → approval → customer portal → fulfillment → billing, where policy decides which approvals a quote needs and customers accept exactly one current revision.',
    highlights: [
      'Auth hardening: atomic reset-token claims, login rate limits, session purge, admin audit',
      'Role-based capability scoping across navigation, routes, setup, and catalog',
      'Fixed price-rule and variant-pricing resolution in the quotation engine',
    ],
    year: '2026',
    shader: 'dealflow',
  },
  {
    id: 'codex-firefox',
    title: 'Codex for Firefox',
    subtitle: 'Contributed for Linux support in Codex for Firefox and Zen',
    href: 'https://github.com/SunkenInTime/codex-computer-use-firefox-zen/pull/16',
    links: [
      {
        label: 'Add-on',
        url: 'https://addons.mozilla.org/firefox/addon/codex-computer-use-for-zen/',
        type: 'other',
        hint: 'Firefox Add-ons',
      },
      {
        label: 'PR',
        url: 'https://github.com/SunkenInTime/codex-computer-use-firefox-zen/pull/16',
        type: 'other',
        hint: 'Merged pull request',
      },
    ],
    tags: ['TypeScript', 'Linux', 'Open source'],
    description:
      'Added Linux x64 native-bridge packaging and host discovery to an open-source port of OpenAI’s Codex browser extension, with install rollback and a best-effort Zen manifest.',
    highlights: [
      'Linux x64 native-messaging bridge packaging and host discovery',
      'Install rollback that restores prior state on failure',
    ],
    year: '2026',
    shader: 'firefox',
  },
  {
    id: 'musetalk',
    title: 'MuseTalk API',
    subtitle: 'GPU inference for real-time lip synchronization',
    href: 'https://github.com/ruxir-ig/MuseTalk-API',
    tags: ['FastAPI', 'CUDA', 'Docker'],
    description:
      'Turned a research video model into a production GPU FastAPI service with health checks, chunked downloads, and deployable containers.',
    highlights: [
      'Cut GFPGAN enhancement time by ~1.8× on RTX 4060',
      'Fixed OpenMMLab/MMPose and Docker build-isolation failures',
      'Image-driven inference with production health endpoints',
    ],
    year: '2025',
    shader: 'musetalk',
  },
  {
    id: 'sar',
    title: 'SAR Colorization',
    subtitle: 'GAN-based SAR-to-RGB reconstruction',
    href: 'https://github.com/ruxir-ig/SAR-Image-Colorization',
    tags: ['PyTorch', 'GANs'],
    description:
      'Turns grayscale radar imagery into RGB terrain reconstructions. Top 25 internal SIH for the research track.',
    highlights: [
      'PyTorch GAN pipeline over remote-sensing input',
      'Focused on terrain reconstruction fidelity',
    ],
    year: '2025',
    shader: 'sar',
  },
  {
    id: 'nitch',
    title: 'nitch',
    subtitle: 'Fast system-fetch for Linux — maintainer',
    href: 'https://github.com/ruxir-ig/nitch',
    tags: ['Nim', 'Linux'],
    description:
      'Incredibly fast system-fetch tooling in Nim. I maintain it for Linux-first workflows, focused on speed and clarity.',
    highlights: ['Maintainer; focused on speed and clarity'],
    year: '2025',
    shader: 'other',
  },
];

export interface Thought {
  title: string;
  date: string;
  excerpt: string;
  href?: string;
}

export const thoughts: Thought[] = [
  {
    title: 'Fail-closed observability',
    date: '2026',
    excerpt:
      'If your sanitizer fails, the write should fail with it. Healthcare AI traces are only useful when the safety path is as reliable as the happy path.',
  },
  {
    title: 'Ranking without keyword stuffing',
    date: '2026',
    excerpt:
      'Keyword stuffing still wins naive retrieval. Structured fit scoring and evidence-guided expansion change what “top candidate” actually means.',
  },
  {
    title: 'Research models as services',
    date: '2025',
    excerpt:
      'The interesting work is rarely the model alone. Health checks, packaging, and cutting redundant detection often matter more than another parameter tweak.',
  },
];
