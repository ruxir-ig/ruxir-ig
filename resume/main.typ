#set par(
  justify: false,
  leading: 0.66em
)

#import "@preview/simple-technical-resume:0.1.0": *

#let name = "Ruchir Kalokhe"
#let phone = "+91 85306 62440"
#let email = "ruchirkalokhe@gmail.com"
#let github = "ruxir-ig"
#let linkedin = "ruchirkalokhe"
#let personal-site = "ruchir.dev"

#show: resume.with(
  top-margin: 0.36in,
  bottom-margin: 0.36in,
  left-margin: 0.55in,
  right-margin: 0.55in,
  font: "Libertinus Serif",
  font-size: 10pt,
  personal-info-font-size: 9pt,
  author-position: center,
  personal-info-position: center,
  author-name: name,
  phone: phone,
  email: email,
  website: personal-site,
  linkedin-user-id: linkedin,
  github-username: github
)

#set list(spacing: 0.26em)
#set heading(numbering: none)

#show heading: it => {
  v(0.42em)
  set text(size: 10.8pt, weight: "bold")
  it
  v(0.06em)
}

#custom-title("About", spacing-between: 0.08em)[
  I like building things that sit somewhere between ML, web engineering, and developer tooling. Most of my learning has come from experimenting, shipping side projects, breaking systems, and working through the small deployment and product details until they feel right.
]

#custom-title("Experience", spacing-between: 0.08em)[
  #grid(
    columns: (70%, 30%),
    align(left)[*In2peta Services Pvt. Ltd.* \
      Gen AI Intern, Backend & ML Infrastructure],
    align(right)[*Remote* \ Dec 2025 -- May 2026],
  )
  #v(-0.15em)
  #[
    - Built backend and inference infrastructure for IN2PETA's GPU model platform using TypeScript, Fastify, PostgreSQL, Redis, Prisma, BullMQ, and Docker
    - Implemented job orchestration, model lifecycle flows, runtime packaging, API workflows, and model-serving paths for hosted AI workloads
    - Worked across CI/CD, Docker builds, runtime configuration, environment handling, and Modal/Koyeb deployment flows
    - Debugged production deployment issues across API, runtime, catalog, and inference layers with attention to observability and operational reliability
    - Added and reviewed guardrails for billing safety, idempotency, rate limiting, access control, and deployment-safe operational behavior
  ]
]

#custom-title("Projects", spacing-between: 0.08em)[
  #project-heading("TraceLink — Supply Chain Traceability Platform")[
    - Evolved a hackathon prototype into an actively iterated platform with CI, deployment fixes, runtime configuration, notifications/history handling, and frontend/backend integration
    - Implemented contaminated-batch tracing with BFS graph propagation, entropy-based anomaly detection, and probabilistic imputation for incomplete records
    - Continued improving deployment migration, operational reliability, offline-first workflows, and UX for factory shop-floor use
  ]

  #project-heading("MuseTalk API")[
    - Built a REST API for real-time talking-head video generation with MuseTalk, including model orchestration and deployment support
    - Improved inference throughput by 1.8x by optimizing the GFPGAN enhancement pipeline
    - Worked through runtime dependencies, inference paths, and serving concerns around a GPU-heavy media pipeline
    - GitHub: https://github.com/ruxir-ig/MuseTalk-API
  ]

  #project-heading("SAR Image Colorization (Smart India Hackathon 2024)")[
    - Built a GAN-based PyTorch model to colorize grayscale SAR satellite imagery into RGB
    - Implemented encoder-decoder experiments for terrain reconstruction from low-context satellite imagery
    - Reached Top 25 during internal SIH selections
    - GitHub: https://github.com/ruxir-ig/SAR-Image-Colorization
  ]

  #project-heading("Open Source & Linux Tooling")[
    - Maintain *nitch-git* on the Arch User Repository after adopting the abandoned package
    - Contributed to tooling projects including *ascii-view* and backend utilities
    - Work in Linux-first environments with attention to packaging, CLI ergonomics, and reproducible development workflows
  ]
]

#custom-title("Skills", spacing-between: 0.08em)[
  - *Languages & Frameworks:* Python, TypeScript, JavaScript, Fastify, Node.js, TensorFlow, PyTorch
  - *ML & Systems:* Model Serving, GPU Inference, SGLang, GANs, Async Systems, REST APIs
  - *Infrastructure:* Docker, CI/CD, PostgreSQL, Redis, Prisma, BullMQ, Modal, Linux
]

#custom-title("Education", spacing-between: 0.08em)[
  #grid(
    columns: (70%, 30%),
    align(left)[*PES Modern College of Engineering (Savitribai Phule Pune University)* \
      B.E. in Artificial Intelligence and Data Science],
    align(right)[*Pune, India* \
      Aug 2023 -- Jun 2027],
  )
]

#custom-title("Activities", spacing-between: 0.08em)[
  - Organizer and contributor at Google Developer Group on Campus PES MCOE hackathons and technical events
  - Participated in AI and systems hackathons including MCCIA AI Hackathon 2026
  - Build and maintain practical side projects across ML infrastructure, backend systems, Linux tooling, and web workflows
]
