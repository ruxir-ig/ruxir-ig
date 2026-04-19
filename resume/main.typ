#import "@preview/simple-technical-resume:0.1.0": *

#set text(size: 9pt)

#let name = "Ruchir Kalokhe"
#let phone = "+91 85306 62440"
#let email = "ruchirkalokhe@gmail.com"
#let github = "ruxir-ig"
#let linkedin = "ruchirkalokhe"
#let personal-site = "ruchir.dev"

#show: resume.with(
  top-margin: 0.3in,
  personal-info-font-size: 8.8pt,
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
  AI/ML and full-stack engineer building GPU orchestration and async inference systems. Interested in applied AI, infrastructure, and product engineering.
]

#custom-title("Experience")[
  #work-heading(
    "Generative AI Intern",
    "In2peta Services Private Limited", "Remote",
    datetime(year: 2025, month: 12, day: 1),
    datetime(year: 2026, month: 5, day: 31)
  )[
    - Built a cloud GPU compute platform supporting multi-provider orchestration across Modal, RunPod, and Koyeb with dynamic provider routing and failover
    - Designed async ML inference pipeline using BullMQ and Redis; implemented prediction polling, webhook delivery, and full job lifecycle management
    - Integrated video generation models (text-to-video, lip-sync) with GFPGAN post-processing into production REST APIs via Docker-based deployments
    - Implemented Stripe-based usage billing with Prisma ORM and PostgreSQL, and conducted a security audit that remediated 15+ vulnerabilities
  ]
]

#custom-title("Leadership & Activities")[
  #project-heading("IMACE 2026 - Management Team Member, GDSC PESMCOE")[
    - Managed, organized, and judged hackathon events for IMACE 2026
    - Coordinated GQuiz Up, Pitch and Innovate, and Poster Presentation events
    - Supported AI/ML community programs and an open innovation hackathon for PES Modern College of Engineering
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
    - Deep learning pipeline for audio-visual sync with GFPGAN face enhancement, built with Python and Docker
    - GitHub: https://github.com/ruxir-ig/MuseTalk-API
  ]

  #project-heading("SAR Image Colorization - Smart India Hackathon 2024 (Top 25)")[
    - PyTorch and GAN-based model to colorize grayscale SAR images into RGB representations; 78% accuracy
    - GitHub: https://github.com/ruxir-ig/SAR-Image-Colorization
  ]
]

#custom-title("Certifications")[
  - *Python 3.4.3, JavaScript, Java* certificates from Spoken Tutorial, IIT Bombay
]

#custom-title("Accomplishments")[
  - *Smart India Hackathon* - Top 25 in internal SIH 2024 (SAR Colorization); *HackRx* mentoring and *GeeksVishwa* ranked 23rd
  - *Open Source* - Contributed to ascii-view, nitch and filed a public t3code issue
]

#custom-title("Education")[
  #education-heading(
    "PES Modern College of Engineering (Savitribai Phule Pune University)", "Pune, India",
    "Bachelors of Engineering", "Artificial Intelligence and Data Science",
    datetime(year: 2023, month: 8, day: 20),
    datetime(year: 2027, month: 6, day: 1)
  )[

  ]

  #education-heading(
    "Hutchings High School & Junior College", "Pune, India",
    "High School Diploma", "CISCE 10th Board Exam",
    datetime(year: 2008, month: 6, day: 1),
    datetime(year: 2021, month: 5, day: 1)
  )[
    - Grade: 84%
  ]
]
