// tsParticles Configuration
async function loadParticles() {
  await tsParticles.load({
    id: "tsparticles",
    options: {
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      background: {
        color: "#0d0d0d",
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
          value: "#00d4ff",
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
          color: "#00d4ff",
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
async function loadContent() {
  try {
    const response = await fetch("resume/main.md");
    const markdown = await response.text();

    // Parse markdown into sections
    const lines = markdown.split("\n");
    const sections = [];
    let currentSection = null;
    let currentSubsection = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines
      if (!line) continue;

      // H1 - Name
      if (line.startsWith("# ")) {
        sections.push({
          type: "name",
          content: line.substring(2),
        });
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

    renderContent(sections);
  } catch (error) {
    console.error("Error loading content:", error);
    document.getElementById("content").innerHTML =
      '<div class="container"><p>Error loading content. Please refresh.</p></div>';
  }
}

function renderContent(sections) {
  const main = document.getElementById("content");
  main.innerHTML = "";

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
      heroContent.appendChild(signature);

      // Add name
      const h1 = document.createElement("h1");
      h1.textContent = section.content;
      heroContent.appendChild(h1);

      // Find contact info (usually in next section or inline)
      const nextSection = sections[index + 1];
      if (nextSection && nextSection.type === "section") {
        const contactLine = nextSection.content.find(
          (c) => c.type === "text" && c.content.includes("@"),
        );
        if (contactLine) {
          const subtitle = document.createElement("p");
          subtitle.className = "subtitle";
          subtitle.textContent = "AI/ML Engineer & Full-Stack Developer";
          heroContent.appendChild(subtitle);

          // Find Career Objective
          const objectiveSection = sections.find(
            (s) => s.title === "Career Objective",
          );
          if (objectiveSection) {
            const bio = document.createElement("p");
            bio.className = "bio";
            bio.textContent = objectiveSection.content
              .map((c) => c.content)
              .join(" ");
            heroContent.appendChild(bio);
          }

          // Add links
          const links = document.createElement("div");
          links.className = "links";

          const contactText = contactLine.content;
          const githubMatch = contactText.match(/\[GitHub\]\((.*?)\)/);
          const linkedinMatch = contactText.match(/\[LinkedIn\]\((.*?)\)/);
          const emailMatch = contactText.match(
            /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
          );

          if (githubMatch) {
            const a = document.createElement("a");
            a.href = githubMatch[1];
            a.target = "_blank";
            a.textContent = "GitHub";
            links.appendChild(a);
          }

          if (linkedinMatch) {
            const a = document.createElement("a");
            a.href = linkedinMatch[1];
            a.target = "_blank";
            a.textContent = "LinkedIn";
            links.appendChild(a);
          }

          if (emailMatch) {
            const a = document.createElement("a");
            a.href = `mailto:${emailMatch[1]}`;
            a.textContent = "Email";
            links.appendChild(a);
          }

          const resume = document.createElement("a");
          resume.href = "resume/main.pdf";
          resume.target = "_blank";
          resume.className = "resume-btn";
          resume.textContent = "Resume";
          links.appendChild(resume);

          heroContent.appendChild(links);
        }
      }

      container.appendChild(heroContent);
      hero.appendChild(container);
      main.appendChild(hero);
    } else if (
      section.type === "section" &&
      section.title !== "Career Objective"
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
        section.title === "Certifications" ||
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
  // GitHub links
  text = text.replace(
    /GitHub: (https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank">View Project</a>',
  );
  return text;
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  if (typeof tsParticles !== "undefined") {
    loadParticles().catch(console.error);
  }

  loadContent();
});
