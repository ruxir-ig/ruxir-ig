#import "@preview/simple-technical-resume:0.1.0": *

#let name = "Ruchir Kalokhe"
#let phone = "+91 85306 62440"
#let email = "ruchirkalokhe@gmail.com"
#let github = "ruxir-ig"
#let linkedin = "ruchirkalokhe"
#let personal-site = "ruxir-ig.github.io"

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

#custom-title("Education")[
  #education-heading(
    "PES Modern College of Engineering (PES MCOE)", "Pune, India",
    "Bacheclors of Engineering", "Artificial Intelligence and Data Science",
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



#custom-title("Projects")[
  #project-heading("Quantum Key Distribution (QKD) Simulator")[
    - Developed two variants: A TypeScript implementation using Next.js for web-based BB84 protocol simulation, focusing on cryptographic security in web environments
    - Next.js based: https://github.com/ruxir-ig/QKD_sim
    - Python implementation using Streamlit and IBM Qiskit library to model secure communication protocols
    - Qiskit based: https://github.com/ruxir-ig/qkd-sim-py
  ]
  #project-heading("VERBALIZE Lip-Reader")[
    - Built a deep learning model with TensorFlow for lip reading from video inputs, enabling silent speech recognition
    - https://github.com/ruxir-ig/VERBALIZE_Lip-Reader
  ]
  #project-heading("Fresh Blog (Collaborator)")[
    - Co-created and contributed to a blog showcasing technical write-ups and project documentation focused on AI, ML, and software engineering
    - https://github.com/aryamaddel/frsh
  ]
  #project-heading("GitGet Backend (Collaborator)")[
    - Contributed to a TypeScript-based backend for a Git repository management tool, enhancing API functionalities
    - https://github.com/NevroHelios/gitget-backend
  ]
  #project-heading("SAR Image Colorization - Smart India Hackathon 2024 project")[
    - Implemented a deep learning model using PyTorch and GANs to colorize grayscale Synthetic Aperture Radar (SAR) images into realistic RGB representations via encoder-decoder architecture
    - Trained on paired SAR and optical datasets with features like custom generator, CUDA support, and TensorBoard visualization
  ]

  #project-heading("RAG 2.0 (Collaborator) - Ranked in top 200 at Hackrx Hackathon")[
    - Contributed to a Retrieval Augmented Generation (RAG) system with Gradio for intelligent document analysis and natural language querying
    - Features include multi-format document support (PDF, DOCX, etc.), semantic search with FAISS/ChromaDB, and context-aware answers using LangChain and OpenAI/Hugging Face models
    - https://github.com/KrishnaNaicker/RAG-2.0
  ]
  #project-heading("MineX (Collaborator)")[
    - Currently developing an innovative project for Smart India Hackathon 2025
    - Problem Statement: Al-Driven Life Cycle Assessment (LCA) Tool for Advancing Circulanty and Sustainability in Metallurgy and Mining
    - https://github.com/PurveshMali/MineX
  ]
]

#custom-title("Skills")[
  - *Soft Skills:* Communication, Collaboration, Problem-solving, Adaptability, Time Management
  - *Programming Languages:* Python, C++, JavaScript, TypeScript, React
  - *Frameworks & Tools:* PyTorch, TensorFlow, Qiskit, Jupyter Notebook, zsh, Oh My Posh, Streamlit, Next.js, Gradio, LangChain
  - *Domains:* AI/ML, Quantum Computing, Deep Learning, Data Science, Web Development
]
