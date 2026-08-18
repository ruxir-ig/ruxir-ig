import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project, ProjectLinkItem } from '../data/site';
import { getProjectLinks } from '../data/site';
import { cn } from '../lib/utils';
import './ProjectsList.css';

interface ProjectsListProps {
  projects: Project[];
}

interface PopoverState {
  projectId: string;
  x: number;
  y: number;
}

function formatSegmentLabel(link: ProjectLinkItem): string {
  const type = link.type;
  if (type === 'live') return 'Live';
  if (type === 'pypi') return 'PyPi';
  if (type === 'github') return 'source';
  if (type === 'docs') return 'docs';

  const lower = link.label.toLowerCase();
  if (lower.includes('live') || lower.includes('app') || lower.includes('demo')) return 'Live';
  if (lower.includes('pypi') || lower.includes('pip')) return 'PyPi';
  if (lower.includes('git') || lower.includes('source') || lower.includes('repo')) return 'source';
  if (lower.includes('doc')) return 'docs';
  return link.label.toLowerCase();
}

function sortProjectLinks(links: ProjectLinkItem[]): ProjectLinkItem[] {
  // Sort so secondary destinations (Live, PyPi, docs) are on the left, and source is on the right: [ Live | source ] or [ PyPi | source ]
  return [...links].sort((a, b) => {
    const aIsSource = a.type === 'github' || a.label.toLowerCase().includes('git') || a.label.toLowerCase().includes('source');
    const bIsSource = b.type === 'github' || b.label.toLowerCase().includes('git') || b.label.toLowerCase().includes('source');
    if (aIsSource && !bIsSource) return 1;
    if (!aIsSource && bIsSource) return -1;
    return 0;
  });
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Close floating popover on click outside, scroll, resize, or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('.floating-segmented-pill')) {
        setPopover(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setPopover(null);
      }
    }

    function handleScrollOrResize() {
      setPopover(null);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  const handleRowClick = useCallback((project: Project, e: React.MouseEvent<HTMLElement>) => {
    const links = getProjectLinks(project);
    if (links.length <= 1) {
      // Single source link: open directly
      const targetUrl = links[0]?.url || project.href;
      if (targetUrl) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    // Multi-destination link: spawn floating pill directly above click position
    e.preventDefault();
    e.stopPropagation();

    const clickX = e.clientX;
    const clickY = e.clientY;

    // Toggle if clicking the same project nearby, otherwise set new position
    setPopover((prev) => {
      if (prev?.projectId === project.id) {
        return null;
      }
      return {
        projectId: project.id,
        x: clickX,
        y: clickY,
      };
    });
  }, []);

  const handleRowKeyDown = useCallback((project: Project, e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const links = getProjectLinks(project);
      if (links.length <= 1) {
        const targetUrl = links[0]?.url || project.href;
        if (targetUrl) {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
        return;
      }

      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setPopover((prev) => {
        if (prev?.projectId === project.id) return null;
        return {
          projectId: project.id,
          x: rect.left + rect.width * 0.25,
          y: rect.top + rect.height * 0.5,
        };
      });
    }
  }, []);

  const activeProject = popover ? projects.find((p) => p.id === popover.projectId) : null;
  const activeLinks = activeProject ? sortProjectLinks(getProjectLinks(activeProject)) : [];

  return (
    <div className="work-list" ref={listRef}>
      {projects.map((project) => {
        const links = getProjectLinks(project);
        const hasMultiple = links.length > 1;
        const isActive = popover?.projectId === project.id;
        const singleUrl = !hasMultiple ? (links[0]?.url ?? project.href) : undefined;

        return (
          <div
            key={project.id}
            className={cn(
              'work-item-wrapper',
              isActive && 'is-active'
            )}
            data-shader={project.shader}
          >
            {hasMultiple ? (
              <div
                className="work-item work-item--interactive pressable"
                onClick={(e) => handleRowClick(project, e)}
                onKeyDown={(e) => handleRowKeyDown(project, e)}
                tabIndex={0}
                role="button"
                aria-haspopup="true"
                aria-expanded={isActive}
                aria-label={`Open choices for ${project.title}`}
                data-shader={project.shader}
              >
                <span className="work-item__title">{project.title}</span>
                <span className="work-item__desc">{project.subtitle}</span>
              </div>
            ) : (
              <a
                className="work-item pressable"
                href={singleUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-shader={project.shader}
              >
                <span className="work-item__title">{project.title}</span>
                <span className="work-item__desc">{project.subtitle}</span>
              </a>
            )}
          </div>
        );
      })}

      {/* Floating pill popup positioned directly above the cursor click position */}
      <AnimatePresence>
        {popover && activeProject && (
          <motion.div
            key={popover.projectId}
            className="floating-segmented-pill"
            style={{
              left: Math.max(90, Math.min(typeof window !== 'undefined' ? window.innerWidth - 90 : 300, popover.x)),
              top: popover.y,
            }}
            initial={{ opacity: 0, y: 0, scale: 0.88, x: '-50%' }}
            animate={{ opacity: 1, y: -14, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: -4, scale: 0.92, x: '-50%' }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-shader={activeProject.shader}
          >
            <div className="segmented-pill" data-shader={activeProject.shader}>
              {activeLinks.map((link, idx) => (
                <div key={link.url} className="segmented-pill__segment">
                  {idx > 0 && (
                    <span className="segmented-pill__divider" aria-hidden="true" />
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="segmented-pill__link"
                    data-shader={activeProject.shader}
                    onClick={() => setPopover(null)}
                  >
                    {formatSegmentLabel(link)}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
