/**
 * Vesper Portfolio - JavaScript
 * Matches React concept with vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initControlDrawer();
    initAnalogueToggles();
    initTerminalGlow();
    initSmoothScroll();
    initScrollSpy();
    initHeaderShadow();
});

/**
 * Control Drawer - Hidden sidebar with tactile handle
 * Matches the React concept's hidden control drawer
 */
function initControlDrawer() {
    const drawer = document.getElementById('controlDrawer');
    const handle = document.getElementById('drawerHandle');
    
    if (!drawer || !handle) return;
    
    // Start closed
    drawer.classList.add('closed');
    
    handle.addEventListener('click', () => {
        drawer.classList.toggle('closed');
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !drawer.classList.contains('closed')) {
            drawer.classList.add('closed');
        }
    });
}

/**
 * Analogue Toggle Switches
 * Filter projects by AI/ML and WEB/SYS categories
 * Matches the React concept's AnalogueToggle component
 */
function initAnalogueToggles() {
    const toggles = document.querySelectorAll('.analogue-toggle');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Track filter states
    const filters = {
        'ai-ml': true,
        'web-sys': true
    };
    
    toggles.forEach(toggle => {
        const filterType = toggle.dataset.filter;
        const toggleSwitch = toggle.querySelector('.toggle-switch');
        
        toggle.addEventListener('click', () => {
            // Toggle the state
            filters[filterType] = !filters[filterType];
            toggleSwitch.classList.toggle('active');
            
            // Apply filters to projects
            filterProjects(filters, projectCards);
        });
    });
}

/**
 * Filter projects based on active filters
 */
function filterProjects(filters, projectCards) {
    projectCards.forEach(card => {
        const category = card.dataset.category;
        
        // Show if filter is active for this category
        if (filters[category]) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
        
        // If neither filter is active, hide all
        if (!filters['ai-ml'] && !filters['web-sys']) {
            card.classList.add('hidden');
        }
    });
}

/**
 * Terminal Glow Effect - Mouse following light
 * Creates glassmorphic glow that follows cursor
 */
function initTerminalGlow() {
    const terminal = document.getElementById('terminalWindow');
    
    if (!terminal) return;
    
    terminal.addEventListener('mousemove', (e) => {
        const rect = terminal.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        terminal.style.setProperty('--mouse-x', `${x}%`);
        terminal.style.setProperty('--mouse-y', `${y}%`);
    });
    
    terminal.addEventListener('mouseleave', () => {
        terminal.style.setProperty('--mouse-x', '50%');
        terminal.style.setProperty('--mouse-y', '50%');
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.glass-header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll spy - Highlight current section in nav
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav a');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--accent)';
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Header shadow on scroll
 */
function initHeaderShadow() {
    const header = document.querySelector('.glass-header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}
