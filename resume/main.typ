#import "@preview/simple-technical-resume:0.1.0": *

#let name = "Ruchir Kalokhe"
#let phone = "+91 85306 62440"
#let email = "ruchirkalokhe@gmail.com"
#let github = "ruxir-ig"
#let linkedin = "ruchirkalokhe"
#let personal-site = "ruchir.dev"

#show: resume.with(
  top-margin: 0.45in,
  personal-info-font-size: 9.2pt,
  author-position: center,
  personal-info-position: center,
  author-name: name,
  phone: phone,
  email: email,
  website: personal-site,
  linkedin-user-id: linkedin,
  github-username: github
)

#custom-title("Career Objective")[
  Backend and ML infrastructure engineer with experience building production AI systems—GPU compute orchestration, async inference pipelines, and deep learning model integration. Interested in applied AI research and early-stage engineering.
]

#custom-title("Education")[
  #education-heading(
    "PES Modern College of Engineering (Savitribai Phule Pune University)", "Pune, India",
    "Bachelors of Engineering", "Artificial Intelligence and Data Science",
    datetime(year: 2023, month: 8, day: 20),
    datetime(year: 2027, month: 6, day: 1)
  )[

  ]
]

#custom-title("Experience")[
  #experience-heading(
    "In2peta Services Private Limited", "Remote",
    "Backend & ML Infrastructure Engineer Intern",
    datetime(year: 2025, month: 12, day: 1),
    datetime(year: 9999, month: 1, day: 1)
  )[
    - Built a cloud GPU compute platform supporting multi-provider orchestration across Modal, RunPod, and Koyeb with dynamic provider routing and failover
    - Designed async ML inference pipeline using BullMQ and Redis; implemented prediction polling, webhook delivery, and full job lifecycle management
    - Integrated video generation models (text-to-video, lip-sync) with GFPGAN post-processing into production REST APIs via Docker-based deployments
    - Implemented Stripe-based usage billing with Prisma ORM and PostgreSQL; built credit validation middleware across all prediction endpoints
    - Conducted security audit identifying and remediating 15+ vulnerabilities including JWT storage issues, missing rate limits, and webhook authentication flaws
  ]
]

#custom-title("Projects")[
  #project-heading("Silent Failure Detector - OpenEnv Round 1 Bootcamp (2026)")[
    - OpenEnv-compliant RL environment for training agents to detect confidently wrong AI outputs (hallucination detection)
    - Programmatic reward signal with deterministic graders—no LLM-judge dependency; three difficulty tiers (easy/medium/hard)
    - GitHub: https://github.com/ruxir-ig/silent-failure-detector
  ]

  #project-heading("MuseTalk API - Real-Time Lip Synchronization")[
    - REST API wrapper for MuseTalk: real-time high-quality lip synchronization using latent space inpainting
    - Deep learning pipeline for audio-visual sync with GFPGAN face enhancement; built with Python and Docker
    - GitHub: https://github.com/ruxir-ig/MuseTalk-API
  ]

  #project-heading("MineX - Smart India Hackathon 2025 (Top 25)")[
    - AI-driven LCA tool for sustainability analysis in metallurgy using AutoML and predictive modeling
    - Developed ML pipeline with data modeling workflows; shortlisted Top 25 in internal SIH 2025
    - Website: https://circular-metal-lab.vercel.app/
  ]

  #project-heading("Info Extractor - AI Document Data Extractor (2025)")[
    - Streamlit web app using Google Gemini 2.5 Flash to extract structured data from PDF documents into Excel
    - Splits education, work experience into separate structured fields; deployed at https://infoextractor.streamlit.app/
    - GitHub: https://github.com/ruxir-ig/info-extractor
  ]

  #project-heading("Surefy - Event Management System")[
    - RESTful API with Express.js, TypeScript, PostgreSQL, and Bun for event management
    - Implemented transaction-based concurrency control to prevent overbooking
    - GitHub: https://github.com/ruxir-ig/surefy-assignment
  ]

  #project-heading("SAR Image Colorization - Smart India Hackathon 2024 (Top 25)")[
    - PyTorch and GAN-based model to colorize grayscale SAR images into RGB representations; 78% accuracy
    - GitHub: https://github.com/ruxir-ig/SAR-Image-Colorization
  ]

  #project-heading("VERBALIZE Lip-Reader")[
    - Deep learning for silent speech recognition through lip movement analysis using TensorFlow; 92% accuracy
    - GitHub: https://github.com/ruxir-ig/VERBALIZE_Lip-Reader
  ]

  #project-heading("Quantum Key Distribution (QKD) Simulator")[
    - Dual implementation: TypeScript/Next.js and Python/Streamlit for BB84 protocol simulation
    - GitHub: https://github.com/ruxir-ig/QKD_sim | https://github.com/ruxir-ig/qkd-sim-py
  ]
]

#custom-title("Certifications")[
  - *Python 3.4.3, JavaScript, Java* - Spoken Tutorial, IIT Bombay - Certificates of Completion of Training
]

#custom-title("Accomplishments")[
  - *Smart India Hackathon* - Top 25 in internal SIH 2025 (MineX) and internal SIH 2024 (SAR Colorization)
  - *HackRx Hackathon* - Mentored team ranked Top 236th | *GeeksVishwa (VIIT)* - Ranked 23rd
  - *Open Source* - Contributed to ascii-view (373+ stars), gitget-backend, and multiple GitHub projects
]
