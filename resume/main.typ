// Ruchir Kalokhe resume
// Build: typst compile main.typ main.pdf

#let ink = rgb("#111111")
#let soft = rgb("#4a4a4a")
#let rule-color = rgb("#c8c8c8")

#set document(
  title: "Ruchir Kalokhe's Resume",
  author: "Ruchir Kalokhe",
  keywords: ("software engineer", "machine learning engineer", "backend", "ML infrastructure"),
)

#set page(paper: "us-letter", margin: (x: 0.55in, y: 0.42in))
#set text(
  font: "Libertinus Serif",
  size: 10pt,
  fill: ink,
  lang: "en",
  top-edge: 0.7em,
  bottom-edge: -0.15em,
)
#set par(justify: false, leading: 0.2em, spacing: 0.45em)
#show link: set text(fill: ink)

#let project-link(url, name) = link(
  url,
  underline(stroke: 0.45pt + soft, offset: 1.4pt, text(weight: "bold", name)),
)

#let section(title) = {
  v(5pt)
  block(
    below: 4.5pt,
    stack(
      spacing: 2.5pt,
      text(size: 8.8pt, weight: "bold", tracking: 0.09em, upper(title)),
      line(length: 100%, stroke: 0.5pt + rule-color),
    ),
  )
}

// Manual bullets: native list spacing inverts wrap vs item gaps.
#let points(..items) = {
  let bodies = items.pos()
  stack(
    spacing: 6pt,
    ..bodies.map(body => grid(
      columns: (9pt, 1fr),
      column-gutter: 0pt,
      text(fill: soft)[•],
      par(leading: 0.15em, body),
    )),
  )
}

// Role / project header: bold label on the left, dates flush right.
#let heading-row(left-body, right-body) = block(
  below: 2.5pt,
  grid(
    columns: (1fr, auto),
    align: (left, right),
    left-body,
    text(size: 9.5pt, fill: soft, right-body),
  ),
)

// ── Header ────────────────────────────────────────────────────────────
#align(center)[
  #text(size: 22pt, tracking: 0.02em, weight: "semibold")[Ruchir Kalokhe]

  #v(4pt)

  #text(size: 9.8pt, fill: soft)[
    Pune, India #sym.dot.c
    +91 85306 62440 #sym.dot.c
    #link("mailto:ruchirkalokhe@gmail.com")[ruchirkalokhe\@gmail.com] #sym.dot.c
    #link("https://ruchir.dev")[ruchir.dev] #sym.dot.c
    #link("https://github.com/ruxir-ig")[github.com/ruxir-ig] #sym.dot.c
    #link("https://linkedin.com/in/ruchirkalokhe")[linkedin.com/in/ruchirkalokhe]
  ]
]

#v(3pt)

Engineer working across backend systems and ML infrastructure: multi-provider GPU inference, model
serving, retrieval and ranking, and the billing, security, and reliability layers that keep them in
production. Comfortable owning a feature from runtime container to API to evaluation harness.

// ── Experience ────────────────────────────────────────────────────────
#section("Experience")

#heading-row(
  [*Gen AI Intern, Backend and ML* #h(4pt) #text(fill: soft)[|] #h(4pt) In2peta Services Pvt. Ltd.],
  [Remote #sym.dot.c Dec 2025 – Present],
)
#block(below: 3pt, text(size: 9.2pt, fill: soft)[TypeScript, Fastify, PostgreSQL, Prisma, PgBoss, Docker])

#points(
  [Built the GPU platform backend in *TypeScript* and *Fastify*, enabling multi-provider inference across
   Modal, Koyeb, and RunPod with unified runtime contracts, PgBoss job orchestration on PostgreSQL,
   provider routing, live endpoint resolution, and failover so long-running jobs keep serving when a
   provider drops.],
  [Automated Hugging Face model deployment (Dockerfiles, handlers, build workers, Prisma catalog)
   so models go from registry to a live endpoint without manual packaging.],
  [Integrated *LTX-2 and LTX-2.3 Distilled* video-generation runtimes with custom handlers, image
   conditioning, and duration controls up to 60 seconds across Modal, Koyeb, and Docker.],
  [Implemented usage-based billing and credit reservations across token, character, second, and image
   modalities, with Razorpay payments, invoicing, and idempotent Prisma/PostgreSQL workflows that block
   overspend before inference runs.],
  [Hardened Fastify APIs with scoped keys, plan-aware access control, webhook verification,
   authenticated uploads, and SSRF/private-URL blocking; patched LiteLLM for Fireworks cached-token
   pricing with regression coverage.],
  [Owned model lifecycle from catalog registration through container build, provider deploy, live
   invocation, and usage accounting; diagnosed production failures across API, runtime, and inference.],
)

// ── Projects ──────────────────────────────────────────────────────────
#section("Projects")

#heading-row(
  [#project-link("https://github.com/ruxir-ig/auscult", "Auscult") #h(4pt) #text(fill: soft)[|] #h(4pt) #text(fill: soft)[Privacy-preserving observability for healthcare AI agents]],
  [Python, Presidio, spaCy],
)

#points(
  [Made agent runs auditable without retaining raw PHI: prompts, tool calls, outputs, and errors are
   sanitized with Presidio/spaCy and deterministic Faker replacements *before* database write.],
  [Fail-closed capture so sanitizer or queue failures never silently persist unsanitized text; JSON-safe
   redaction, background writes, replay/export/purge, Alembic migrations, and a PHI eval harness under CI.],
  [Shipped SDK wrappers and LangChain callbacks so apps get traces without changing their core call
   path, plus a CLI for inspecting and comparing sanitized runs.],
)

#v(3pt)

#heading-row(
  [#project-link("https://github.com/ruxir-ig/candis", "Candis") #h(4pt) #text(fill: soft)[|] #h(4pt) #text(fill: soft)[LLM candidate discovery and ranking over 100K profiles]],
  [Python, NumPy, embeddings, evals],
)

#points(
  [Ranked top candidates from *100K profiles* in *~13 s* on CPU (NumPy path) via honeypot filters,
   structured fit scoring, availability weighting, cached LLM reranking, and evidence-guided expansion.],
  [Beat keyword stuffing: *15* injected weak profiles entered the top-100 under keyword matching,
   *0* under Candis; pairwise LLM audit *83.7% win rate*, hand-qrel NDCG\@10 *0.93+*, prompt-injection
   audit with *0* effect on final ranking.],
)

#v(3pt)

#heading-row(
  [#project-link("https://github.com/ruxir-ig/MuseTalk-API", "MuseTalk API") #h(4pt) #text(fill: soft)[|] #h(4pt) #text(fill: soft)[GPU inference service for real-time lip synchronization]],
  [FastAPI, Docker, CUDA],
)

#points(
  [Turned a research video model into a production GPU FastAPI service with Docker deploy, health checks,
   model setup, image-driven inference, and chunked downloads for large outputs.],
  [Cut GFPGAN enhancement time by *~1.8#sym.times* (e.g. *25–28 min → ~15 min* on RTX 4060) by removing
   redundant face detection; fixed OpenMMLab/MMPose and Docker build-isolation failures.],
)

#v(3pt)

#heading-row(
  [#project-link("https://github.com/ruxir-ig/mccia-tracelink", "TraceLink") #h(4pt) #text(fill: soft)[|] #h(4pt) #text(fill: soft)[Manufacturing supply-chain traceability platform]],
  [FastAPI, React, Docker],
)

#points(
  [Shipped a live factory-floor platform (Render + CI) for intake → batches → QC → dispatch → complaints,
   with forward/reverse tracing and blast-radius / financial-exposure analysis in milliseconds.],
  [Ingests *40k+ rows in seconds* via batch inserts and SHA-256 duplicate detection; operator UX for
   searchable traces, notification history, and Firebase-authenticated dashboards.],
)

#v(2.5pt)
#text(size: 9pt, fill: soft)[
  More: #link("https://github.com/ruxir-ig/SAR-Image-Colorization")[SAR Colorization],
  #link("https://github.com/Harsh-4210/Team-Artemis-")[AssetFlow] #sym.dot.c
  #link("https://github.com/ruxir-ig")[github.com/ruxir-ig]
]

// ── Skills ────────────────────────────────────────────────────────────
#section("Technical Skills")

#points(
  [*Languages* #h(4pt) Python, TypeScript, SQL, C],
  [*Machine Learning* #h(4pt) PyTorch, TensorFlow, Hugging Face, Diffusers, CUDA, scikit-learn, Presidio, spaCy],
  [*Backend* #h(4pt) FastAPI, Fastify, Node.js, REST APIs, PgBoss, asynchronous workers, SDK design],
  [*Infrastructure* #h(4pt) Docker, PostgreSQL, Prisma, Modal, RunPod, Koyeb, GitHub Actions, Linux],
)

// ── Education ─────────────────────────────────────────────────────────
#section("Education")

#heading-row(
  [*B.E., Artificial Intelligence and Data Science* #h(4pt) #text(fill: soft)[|] #h(4pt) Savitribai Phule Pune University · PES MCOE],
  [Pune, India #sym.dot.c Aug 2023 – Jun 2027],
)

#points(
  [*Open source & research* #h(4pt) Contributed 24-bit truecolor to _ascii-view_ (C); *maintainer* of
   _nitch_; GAN SAR-to-RGB colorization in PyTorch (top 25 internal SIH); BB84 QKD simulator.],
  [*Community* #h(4pt) Member of Google Developer Group on Campus (AIML) - organised IMACE 2026
   hackathon and events, and served on the judging jury.],
)
