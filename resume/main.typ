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
  AI/ML engineer passionate about exploring emerging technologies—from deep learning and reinforcement learning to quantum computing and modern web frameworks—driven to build innovative solutions for real-world challenges.
]

#custom-title("Education")[
  #education-heading(
    "PES Modern College of Engineering (Savitribai Phule Pune University)", "Pune, India",
    "Bachelors of Engineering", "Artificial Intelligence and Data Science",
    datetime(year: 2023, month: 8, day: 20),
    datetime(year: 2027, month: 6,  day: 1)
  )[

  ]
  #education-heading(
    "Hutchings High School & Junior College", "Pune, India",
    "High School Diploma", "Graduation Year: 2021",
    datetime(year: 2008, month: 9, day: 1),
    datetime(year: 2021, month: 5, day: 1)
  )[
    - Percentage: 84%
  ]
]

#custom-title("Experience")[
  #experience-heading(
    "In2peta Services Private Limited", "Remote",
    "Machine Learning Intern",
    datetime(year: 2025, month: 12, day: 1),
    datetime(year: 9999, month: 1, day: 1)
  )[
    - Working on ML model development and experimentation as part of a remote internship
    - Applying deep learning techniques in a production-adjacent environment
  ]
]

#custom-title("Core Strengths")[
  - *AI/ML Engineering:* Developed GANs for SAR colorization (78% accuracy) and deep learning models with TensorFlow; experienced with PyTorch, AutoML, and predictive modeling.
  - *Full-Stack Development:* Built production systems with Express.js, TypeScript, PostgreSQL; proficient in React, Next.js, Vue.js, and modern web frameworks.
  - *Problem-Solving & Adaptability:* Rapid learner of emerging tech (Streamlit, LangChain, RAG, Groq, RL environments); implemented quantum cryptography (BB84) and concurrency control.
  - *Technical Leadership:* Led architecture design for RAG 2.0; mentored hackathon teams (Top 45, Top 25); coordinate cross-functional development.
  - *Domain Expertise:* Deep Learning, Reinforcement Learning, Quantum Computing (Qiskit), RESTful APIs, Database Design, Git
]

#custom-title("Projects")[
  #project-heading("Silent Failure Detector - OpenEnv Round 1 Bootcamp (2026)")[
    - OpenEnv-compliant RL environment for training agents to detect confidently wrong AI outputs (hallucination detection)
    - Programmatic reward signal with deterministic graders—no LLM-judge dependency; three difficulty tiers (easy/medium/hard)
    - GitHub: https://github.com/ruxir-ig/silent-failure-detector
  ]

  #project-heading("MineX (Ongoing) - Smart India Hackathon 2025")[
    - AI-driven LCA tool for sustainability analysis in metallurgy using AutoML and predictive modeling
    - Developed ML pipeline with data modeling workflows; shortlisted (Top 25) in internal SIH 2025
    - Website: https://circular-metal-lab.vercel.app/
  ]

  #project-heading("Info Extractor - AI Document Data Extractor (2025)")[
    - Streamlit web app that uses Google Gemini 2.5 Flash to extract structured data from PDF documents into Excel
    - Splits education, work experience into separate fields; deployed at https://infoextractor.streamlit.app/
    - GitHub: https://github.com/ruxir-ig/info-extractor
  ]

  #project-heading("MuseTalk API - Real-Time Lip Synchronization")[
    - REST API wrapper for MuseTalk: real-time high-quality lip synchronization using latent space inpainting
    - Deep learning pipeline for audio-visual sync; built with Python
    - GitHub: https://github.com/ruxir-ig/MuseTalk-API
  ]
  
  #project-heading("Surefy - Event Management System")[
    - RESTful API with Express.js, TypeScript, PostgreSQL, and Bun for event management
    - Implemented transaction-based concurrency control to prevent overbooking
    - GitHub: https://github.com/ruxir-ig/surefy-assignment
  ]
  
  #project-heading("SAR Image Colorization - Smart India Hackathon 2024")[
    - PyTorch and GAN-based model to colorize grayscale SAR images into RGB representations
    - Top 25 in internal SIH 2024; 78% accuracy | GitHub: https://github.com/ruxir-ig/SAR-Image-Colorization
  ]

  #project-heading("VERBALIZE Lip-Reader")[
    - Deep learning for silent speech recognition through lip movement analysis using TensorFlow
    - 92% accuracy | GitHub: https://github.com/ruxir-ig/VERBALIZE_Lip-Reader
  ]

  #project-heading("Quantum Key Distribution (QKD) Simulator")[
    - Dual implementation: TypeScript/Next.js and Python/Streamlit for BB84 protocol simulation
    - GitHub: https://github.com/ruxir-ig/QKD_sim | https://github.com/ruxir-ig/qkd-sim-py
  ]
]

#custom-title("Certifications")[
  - *Full Stack Open 2024* - University of Helsinki (In Progress) - React, Node.js, GraphQL, TypeScript
  - *Python 3.4.3, JavaScript, Java* - Spoken Tutorial, IIT Bombay - Certificates of Completion of Training
]

#custom-title("Accomplishments")[
  - *Smart India Hackathon* - Top 25 in internal SIH 2025 (MineX) and internal SIH 2024 (SAR Colorization)
  - *HackRx Hackathon* - Mentored team ranked Top 236th | *GeeksVishwa (VIIT)* - Ranked 23rd
  - *Open Source* - Contributed to ascii-view (373+ stars), gitget-backend, and multiple GitHub projects
]
