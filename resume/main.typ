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
  AI/ML engineer passionate about exploring emerging technologies—from deep learning and quantum computing to modern web frameworks—driven to build innovative solutions for real-world challenges.
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

#custom-title("Core Strengths")[
  - *AI/ML Engineering:* Developed GANs for SAR colorization (78% accuracy) and deep learning models with TensorFlow; experienced with PyTorch, AutoML, and predictive modeling.
  - *Full-Stack Development:* Built production systems with Express.js, TypeScript, PostgreSQL; proficient in React, Next.js, Vue.js, and modern web frameworks.
  - *Problem-Solving & Adaptability:* Rapid learner of emerging tech (Streamlit, LangChain, RAG, Groq); implemented quantum cryptography (BB84) and concurrency control.
  - *Technical Leadership:* Led architecture design for RAG 2.0; mentored hackathon teams (Top 45, Top 25); coordinate cross-functional development.
  - *Domain Expertise:* Deep Learning, Quantum Computing (Qiskit), RESTful APIs, Database Design, Git
]

#custom-title("Projects")[
  #project-heading("MineX (Ongoing) - Smart India Hackathon 2025")[
    - AI-driven LCA tool for sustainability analysis in metallurgy using AutoML and predictive modeling
    - Developed ML pipeline with data modeling workflows; shortlisted (Top 25) in internal SIH 2025
    - Website: https://circular-metal-lab.vercel.app/
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
  - *Smart India Hackathon 2025* - MineX project (Top 25) | *Smart India Hackathon 2024* - SAR Colorization (Top 25)
  - *HackRx Hackathon* - Mentored team ranked Top 236th | *GeeksVishwa (VIIT)* - Ranked 23rd
  - *Open Source* - Contributed to ascii-view (137+ stars), gitget-backend, and multiple GitHub projects
]
