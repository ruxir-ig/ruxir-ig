// tsParticles Configuration
async function loadParticles() {
  const theme = document.documentElement.getAttribute("data-theme") || "dark";

  const themeColors = {
    light: { bg: "#ffffff", particles: "#0096cc" },
    dark: { bg: "#0d0d0d", particles: "#00d4ff" },
    gruvbox: { bg: "#282828", particles: "#fabd2f" },
  };

  const colors = themeColors[theme];

  await tsParticles.load({
    id: "tsparticles",
    options: {
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      background: {
        color: colors.bg,
      },
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: colors.particles,
        },
        shape: {
          type: "triangle",
        },
        opacity: {
          value: 0.25,
          random: true,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: 4,
          random: true,
        },
        links: {
          enable: true,
          distance: 150,
          color: colors.particles,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.4,
            },
          },
          push: {
            quantity: 3,
          },
        },
      },
      detectRetina: true,
    },
  });
}

// Parse markdown and generate website content
// async function loadContent() {
//   try {
//     const response = await fetch("resume/main.md");
//     const markdown = await response.text();

//     // Parse markdown into sections
//     const lines = markdown.split("\n");
//     const sections = [];
//     let currentSection = null;
//     let currentSubsection = null;
//     let nameSection = null;

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();

//       // Skip empty lines
//       if (!line) continue;

//       // H1 - Name
//       if (line.startsWith("# ")) {
//         nameSection = {
//           type: "name",
//           content: line.substring(2),
//           contactLine: null,
//         };
//         sections.push(nameSection);
//       }
//       // Capture contact line (comes right after name, before first section)
//       else if (
//         nameSection &&
//         !nameSection.contactLine &&
//         !currentSection &&
//         line.includes("@")
//       ) {
//         nameSection.contactLine = line;
//       }
//       // H2 - Major sections
//       else if (line.startsWith("## ")) {
//         currentSection = {
//           type: "section",
//           title: line.substring(3),
//           content: [],
//         };
//         sections.push(currentSection);
//         currentSubsection = null;
//       }
//       // H3 - Subsections
//       else if (line.startsWith("### ")) {
//         if (currentSection) {
//           currentSubsection = {
//             type: "subsection",
//             title: line.substring(4),
//             content: [],
//           };
//           currentSection.content.push(currentSubsection);
//         }
//       }
//       // Lists
//       else if (line.startsWith("- ") || line.startsWith("* ")) {
//         const item = line.substring(2);
//         if (currentSubsection) {
//           currentSubsection.content.push({ type: "list-item", content: item });
//         } else if (currentSection) {
//           currentSection.content.push({ type: "list-item", content: item });
//         }
//       }
//       // Regular content
//       else if (!line.startsWith("---")) {
//         if (currentSubsection) {
//           currentSubsection.content.push({ type: "text", content: line });
//         } else if (currentSection) {
//           currentSection.content.push({ type: "text", content: line });
//         }
//       }
//     }

//     renderContent(sections);
//   } catch (error) {
//     console.error("Error loading content:", error);
//     document.getElementById("content").innerHTML =
//       '<div class="container"><p>Error loading content. Please refresh.</p></div>';
//   }
// }

async function loadContent() {
  try {
    // Load main resume content
    const response = await fetch("resume/main.md");
    const markdown = await response.text();

    // Load Philosophy section from README
    const readmeResponse = await fetch("README.md");
    const readmeMarkdown = await readmeResponse.text();

    // Parse markdown into sections
    const lines = markdown.split("\n");
    const sections = [];
    let currentSection = null;
    let currentSubsection = null;
    let nameSection = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines
      if (!line) continue;

      // H1 - Name
      if (line.startsWith("# ")) {
        nameSection = {
          type: "name",
          content: line.substring(2),
          contactLine: null,
        };
        sections.push(nameSection);
      }
      // Capture contact line (comes right after name, before first section)
      else if (
        nameSection &&
        !nameSection.contactLine &&
        !currentSection &&
        line.includes("@")
      ) {
        nameSection.contactLine = line;
      }
      // H2 - Major sections
      else if (line.startsWith("## ")) {
        currentSection = {
          type: "section",
          title: line.substring(3),
          content: [],
        };
        sections.push(currentSection);
        currentSubsection = null;
      }
      // H3 - Subsections
      else if (line.startsWith("### ")) {
        if (currentSection) {
          currentSubsection = {
            type: "subsection",
            title: line.substring(4),
            content: [],
          };
          currentSection.content.push(currentSubsection);
        }
      }
      // Lists
      else if (line.startsWith("- ") || line.startsWith("* ")) {
        const item = line.substring(2);
        if (currentSubsection) {
          currentSubsection.content.push({ type: "list-item", content: item });
        } else if (currentSection) {
          currentSection.content.push({ type: "list-item", content: item });
        }
      }
      // Regular content
      else if (!line.startsWith("---")) {
        if (currentSubsection) {
          currentSubsection.content.push({ type: "text", content: line });
        } else if (currentSection) {
          currentSection.content.push({ type: "text", content: line });
        }
      }
    }

    // Parse Philosophy section from README
    const readmeLines = readmeMarkdown.split("\n");
    let inPhilosophy = false;
    let philosophySection = {
      type: "section",
      title: "Philosophy",
      content: [],
    };

    for (let i = 0; i < readmeLines.length; i++) {
      const line = readmeLines[i].trim();

      // Start capturing when we find Philosophy section
      if (line.startsWith("### Philosophy")) {
        inPhilosophy = true;
        continue;
      }

      // Stop when we hit another section or horizontal rule after philosophy content
      if (inPhilosophy && (line.startsWith("###") || line.startsWith("##"))) {
        break;
      }

      // Capture philosophy content
      if (inPhilosophy && line && !line.startsWith("---")) {
        philosophySection.content.push({ type: "text", content: line });
      }
    }

    // Add philosophy section if it has content
    if (philosophySection.content.length > 0) {
      sections.push(philosophySection);
    }

    renderContent(sections);
  } catch (error) {
    console.error("Error loading content:", error);
    document.getElementById("content").innerHTML =
      '<div class="container"><p>Error loading content. Please refresh.</p></div>';
  }
}

function reorderSections(sections) {
  // Extract name section
  const nameSection = sections.find((s) => s.type === "name");

  // Extract all other sections
  const otherSections = sections.filter((s) => s.type === "section");

  // Define desired order
  const order = [
    "Experience",
    "Projects",
    "Accomplishments",
    "Education",
    "Philosophy",
  ];

  // Sort sections based on order array
  const sortedSections = [];
  order.forEach((title) => {
    const section = otherSections.find((s) => s.title === title);
    if (section) {
      sortedSections.push(section);
    }
  });

  // Add any sections not in the order array
  otherSections.forEach((section) => {
    if (!order.includes(section.title)) {
      sortedSections.push(section);
    }
  });

  // Return with name section first
  return nameSection ? [nameSection, ...sortedSections] : sortedSections;
}

function renderContent(sections) {
  const main = document.getElementById("content");
  main.innerHTML = "";

  // Reorder sections for better presentation
  sections = reorderSections(sections);

  sections.forEach((section, index) => {
    if (section.type === "name") {
      // Hero section
      const hero = document.createElement("section");
      hero.className = "hero";

      const container = document.createElement("div");
      container.className = "container";

      const heroContent = document.createElement("div");
      heroContent.className = "hero-content";

      // Add signature
      const signature = document.createElement("img");
      signature.src = "assets/Ruchir Kalokhe-signature.svg";
      signature.alt = section.content;
      signature.className = "signature";

      const signatureLink = document.createElement("a");
      signatureLink.href = "https://signature.cnrad.dev/";
      signatureLink.target = "_blank";
      signatureLink.rel = "noopener noreferrer";
      signatureLink.title = "Visit signature.cnrad.dev";
      signatureLink.appendChild(signature);
      heroContent.appendChild(signatureLink);

      // Add name
      const h1 = document.createElement("h1");
      h1.textContent = section.content;
      heroContent.appendChild(h1);

      // Add interests tags
      const interests = document.createElement("div");
      interests.className = "interests";
      interests.innerHTML = `
        <span>Deep Learning</span>
        <span>·</span>
        <span>Full-Stack Development</span>
        <span>·</span>
        <span>Computer Vision</span>
        <span>·</span>
        <span>Generative AI</span>
      `;
      heroContent.appendChild(interests);

      // Get contact info from section
      const contactLine = section.contactLine;
      if (contactLine) {
        const subtitle = document.createElement("p");
        subtitle.className = "subtitle";
        subtitle.textContent = "AI/ML Engineer & Full-Stack Developer";
        heroContent.appendChild(subtitle);

        // Add social links with icons
        const socialLinks = document.createElement("div");
        socialLinks.className = "social-links";

        const githubMatch = contactLine.match(/\[GitHub\]\((.*?)\)/);
        const linkedinMatch = contactLine.match(/\[LinkedIn\]\((.*?)\)/);
        const emailMatch = contactLine.match(
          /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
        );

        // Email
        if (emailMatch) {
          const a = document.createElement("a");
          a.href = `mailto:${emailMatch[1]}`;
          a.className = "social-link";
          a.title = "Email";
          a.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          `;
          socialLinks.appendChild(a);
        }

        // GitHub
        if (githubMatch) {
          const a = document.createElement("a");
          a.href = githubMatch[1];
          a.target = "_blank";
          a.className = "social-link";
          a.title = "GitHub";
          a.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          `;
          socialLinks.appendChild(a);
        }

        // LinkedIn
        if (linkedinMatch) {
          const a = document.createElement("a");
          a.href = linkedinMatch[1];
          a.target = "_blank";
          a.className = "social-link";
          a.title = "LinkedIn";
          a.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          `;
          socialLinks.appendChild(a);
        }

        // Twitter/X
        const twitter = document.createElement("a");
        twitter.href = "https://x.com/ruchirkalokhe";
        twitter.target = "_blank";
        twitter.className = "social-link";
        twitter.title = "Twitter/X";
        twitter.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
          </svg>
        `;
        socialLinks.appendChild(twitter);

        heroContent.appendChild(socialLinks);

        // Add resume download button
        const resumeBtn = document.createElement("a");
        resumeBtn.href = "resume/main.pdf";
        resumeBtn.target = "_blank";
        resumeBtn.className = "resume-btn";
        resumeBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
          <span>Resume</span>
        `;
        heroContent.appendChild(resumeBtn);
      }

      container.appendChild(heroContent);
      hero.appendChild(container);
      main.appendChild(hero);
    } else if (
      section.type === "section" &&
      section.title !== "Career Objective" &&
      section.title !== "Core Strengths" &&
      section.title !== "Certifications"
    ) {
      // Regular sections
      const sectionEl = document.createElement("section");
      sectionEl.className = section.title.toLowerCase().replace(/\s+/g, "-");

      const container = document.createElement("div");
      container.className = "container";

      const h2 = document.createElement("h2");
      h2.textContent = section.title;
      container.appendChild(h2);

      // Check if this is a project-like section
      const hasSubsections = section.content.some(
        (c) => c.type === "subsection",
      );

      if (section.title === "Projects" && hasSubsections) {
        const grid = document.createElement("div");
        grid.className = "project-grid";

        section.content
          .filter((c) => c.type === "subsection")
          .forEach((subsection) => {
            const card = document.createElement("div");
            card.className = "project-card";

            const h3 = document.createElement("h3");
            h3.textContent = subsection.title;
            card.appendChild(h3);

            subsection.content.forEach((item) => {
              if (item.type === "list-item") {
                const p = document.createElement("p");
                p.innerHTML = parseMarkdownInline(item.content);
                card.appendChild(p);
              }
            });

            grid.appendChild(card);
          });

        container.appendChild(grid);
      } else if (section.title === "Education" && hasSubsections) {
        section.content
          .filter((c) => c.type === "subsection")
          .forEach((subsection) => {
            const item = document.createElement("div");
            item.className = "education-item";

            const h3 = document.createElement("h3");
            h3.textContent = subsection.title;
            item.appendChild(h3);

            subsection.content.forEach((content) => {
              if (content.type === "text") {
                const p = document.createElement("p");
                if (content.content.startsWith("**")) {
                  p.className = "meta";
                } else if (content.content.startsWith("*")) {
                  p.className = "institution";
                }
                p.innerHTML = parseMarkdownInline(content.content);
                item.appendChild(p);
              } else if (content.type === "list-item") {
                const p = document.createElement("p");
                p.className = "meta";
                p.innerHTML = parseMarkdownInline(content.content);
                item.appendChild(p);
              }
            });

            container.appendChild(item);
          });
      } else if (
        section.title === "Core Strengths" ||
        section.title === "Accomplishments"
      ) {
        const ul = document.createElement("ul");
        ul.className = section.title.toLowerCase().replace(/\s+/g, "-");

        section.content
          .filter((c) => c.type === "list-item")
          .forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = parseMarkdownInline(item.content);
            ul.appendChild(li);
          });

        container.appendChild(ul);
      } else if (section.title === "Philosophy") {
        // Render philosophy section with quotes
        const philosophyContainer = document.createElement("div");
        philosophyContainer.className = "philosophy-container";

        section.content
          .filter((c) => c.type === "text")
          .forEach((item) => {
            const quote = document.createElement("blockquote");
            quote.className = "philosophy-quote";
            quote.textContent = item.content;
            philosophyContainer.appendChild(quote);
          });

        container.appendChild(philosophyContainer);
      } else if (hasSubsections) {
        // Generic subsection handling (like Experience)
        section.content
          .filter((c) => c.type === "subsection")
          .forEach((subsection) => {
            const item = document.createElement("div");
            item.className = "experience-item";

            const h3 = document.createElement("h3");
            h3.textContent = subsection.title;
            item.appendChild(h3);

            subsection.content.forEach((content) => {
              if (content.type === "text") {
                const p = document.createElement("p");
                p.className = "meta";
                p.innerHTML = parseMarkdownInline(content.content);
                item.appendChild(p);
              } else if (content.type === "list-item") {
                const p = document.createElement("p");
                p.innerHTML = parseMarkdownInline(content.content);
                item.appendChild(p);
              }
            });

            container.appendChild(item);
          });
      }

      sectionEl.appendChild(container);
      main.appendChild(sectionEl);
    }
  });
}

function parseMarkdownInline(text) {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank">$1</a>',
  );
  // GitHub links - handle multiple URLs separated by pipes
  text = text.replace(/GitHub:\s*([^\n]+)/g, (match, urls) => {
    // Split by pipe and trim whitespace
    const urlList = urls.split("|").map((url) => url.trim());
    // Create a link for each URL
    return urlList
      .map((url) => `<a href="${url}" target="_blank">View Project</a>`)
      .join(" | ");
  });
  return text;
}

// Theme Management
function getSystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    return "light";
  }
  return "dark";
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme || getSystemTheme();
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update active button
  document.querySelectorAll(".theme-option").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.theme === theme) {
      btn.classList.add("active");
    }
  });

  // If switching away from gruvbox to light, go through dark first
  const gruvboxBtn = document.querySelector('[data-theme="gruvbox"]');
  if (theme === "light" && gruvboxBtn) {
    // Gruvbox will hide automatically via CSS
  }

  // Reload particles with new theme
  if (typeof tsParticles !== "undefined") {
    loadParticles().catch(console.error);
  }
}

function createThemeSwitcher() {
  const switcher = document.createElement("div");
  switcher.className = "theme-switcher";

  switcher.innerHTML = `
    <div class="theme-slider">
      <button class="theme-option" data-theme="light">Light</button>
      <button class="theme-option" data-theme="dark">Dark</button>
      <button class="theme-option" data-theme="gruvbox">Gruvbox</button>
    </div>
  `;

  document.body.appendChild(switcher);

  // Add click handlers
  switcher.querySelectorAll(".theme-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
    });
  });

  // Update active state
  const currentTheme = localStorage.getItem("theme") || getSystemTheme();
  setTheme(currentTheme);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  createThemeSwitcher();

  if (typeof tsParticles !== "undefined") {
    loadParticles().catch(console.error);
  }

  loadContent();
});
