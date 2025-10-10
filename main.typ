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

#custom-title("Career Objective")[
  Aspiring AI/ML engineer passionate about deep learning and quantum computing, seeking opportunities to build innovative solutions for real-world challenges.
]

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
  #project-heading("MineX (Collaborator) - Smart India Hackathon 2025")[
    - Developing AI-driven Life Cycle Assessment (LCA) tool for advancing circularity and sustainability in metallurgy and mining
    - https://github.com/PurveshMali/MineX
  ]
  
  #project-heading("SAR Image Colorization - Smart India Hackathon 2024")[
    - Implemented PyTorch and GAN-based model to colorize grayscale SAR images into realistic RGB representations
    - Trained on paired SAR-optical datasets with custom generator, CUDA support, and TensorBoard visualization
    - https://github.com/ruxir-ig/SAR-Image-Colorization
  ]

  #project-heading("VERBALIZE Lip-Reader")[
    - Built deep learning model with TensorFlow for lip reading from video inputs, enabling silent speech recognition
    - https://github.com/ruxir-ig/VERBALIZE_Lip-Reader
  ]

  #project-heading("Quantum Key Distribution (QKD) Simulator")[
    - Developed TypeScript/Next.js implementation for web-based BB84 protocol simulation focusing on cryptographic security (https://github.com/ruxir-ig/QKD_sim)
    - Python implementation using Streamlit and IBM Qiskit to model secure quantum communication protocols (https://github.com/ruxir-ig/qkd-sim-py)
  ]

  #project-heading("GitGet Backend (Collaborator)")[
    - Contributed to TypeScript-based backend for Git repository management tool, enhancing API functionalities
    - https://github.com/NevroHelios/gitget-backend
  ]

  #project-heading("Fresh Blog (Collaborator)")[
    - Co-created technical blog showcasing AI, ML, and software engineering write-ups and project documentation
    - https://github.com/aryamaddel/frsh
  ]
]

#custom-title("Extra Curricular Activities & Accomplishments")[
  - *Smart India Hackathon 2025* - Participant developing MineX project
  - *Smart India Hackathon 2024* - Developed SAR Image Colorization solution
  - *HackRx Hackathon* - Mentored team project ranked Top 200
  - *Open Source Contributor* - Active collaborator on multiple GitHub projects
]

#custom-title("Skills")[
  - *Soft Skills:* Communication, Collaboration, Problem-solving, Adaptability, Time Management
  - *Programming Languages:* Python, C++, JavaScript, TypeScript, React
  - *Frameworks & Tools:* PyTorch, TensorFlow, Qiskit, Jupyter Notebook, zsh, Oh My Posh, Streamlit, Next.js, Gradio, LangChain
  - *Domains:* AI/ML, Quantum Computing, Deep Learning, Data Science, Web Development
]
