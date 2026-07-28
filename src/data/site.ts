export const profile = {
  name: 'Ruchir Kalokhe',
  first: 'Ruchir',
  last: 'Kalokhe',
  role: 'Backend engineer leaning into AI research.',
  tagline:
    'Building backend systems, ML infrastructure, and developer tooling while moving deeper into research.',
  bio: 'Love AI — building with it, and building it.',
  email: 'ruchirkalokhe@gmail.com',
  github: 'https://github.com/ruxir-ig',
  linkedin: 'https://linkedin.com/in/ruchirkalokhe',
  location: 'Pune, India',
  resume: '/resume/ruchir-kalokhe.pdf',
};

export type ShaderKey = 'idle' | 'auscult' | 'candis' | 'musetalk' | 'tracelink' | 'sar' | 'other';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  liveHref?: string;
  tags: string[];
  description: string;
  highlights: string[];
  year: string;
  featured?: boolean;
  shader: ShaderKey;
}

export const projects: Project[] = [
  {
    id: 'auscult',
    title: 'Auscult',
    subtitle: 'Privacy-preserving observability for healthcare AI agents',
    href: 'https://github.com/ruxir-ig/auscult',
    tags: ['Python', 'Presidio', 'spaCy'],
    description:
      'Agent runs stay auditable without retaining raw PHI. Prompts, tool calls, outputs, and errors are sanitized before database write.',
    highlights: [
      'Fail-closed capture so sanitizer failures never persist unsanitized text',
      'SDK wrappers and LangChain callbacks without changing the core call path',
      'PHI eval harness under CI with replay, export, and purge',
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

