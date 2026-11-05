// Preloader Module
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fillBar = document.querySelector('.loader-bar-fill');
    const percentText = document.querySelector('.loader-percentage');
    const statusText = document.querySelector('.loader-status');

    if (!preloader) return;

    let progress = 0;
    const stages = [
        { threshold: 25, message: "Initializing modules..." },
        { threshold: 55, message: "Loading assets..." },
        { threshold: 85, message: "Optimizing layout..." },
        { threshold: 100, message: "Ready!" }
    ];

    const progressTimer = setInterval(() => {
        const step = Math.floor(Math.random() * 5) + 3;
        progress = Math.min(100, progress + step);

        if (fillBar) fillBar.style.width = `${progress}%`;
        if (percentText) percentText.textContent = `${progress}%`;

        for (const stage of stages) {
            if (progress <= stage.threshold) {
                if (statusText) statusText.textContent = stage.message;
                break;
            }
        }

        if (progress >= 100) {
            clearInterval(progressTimer);
            setTimeout(() => {
                preloader.classList.add('hide');
                setTimeout(startTypewriter, 300);
            }, 350);
        }
    }, 15);

    // Fallback ensure preloader closes even on slow network connections
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!preloader.classList.contains('hide')) {
                if (fillBar) fillBar.style.width = '100%';
                if (percentText) percentText.textContent = '100%';
                preloader.classList.add('hide');
                startTypewriter();
            }
        }, 2000);
    });
}

// Scroll Progress & Header Navigation Module
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
const scrollToTopBtn = document.getElementById('scrollToTop');
const scrollProgressBar = document.getElementById('scroll-progress-bar');
const heroGlowOrb = document.querySelector('.hero-glow-orb');

let isScrollTicking = false;

function handleScroll() {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollProgressBar && docHeight > 0) {
        const progressPercent = Math.min(100, Math.max(0, (scrollPos / docHeight) * 100));
        scrollProgressBar.style.width = `${progressPercent}%`;
        scrollProgressBar.setAttribute('aria-valuenow', Math.round(progressPercent));
    }

    if (header) {
        if (scrollPos > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    if (scrollToTopBtn) {
        if (scrollPos > 380) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    if (heroGlowOrb && scrollPos < window.innerHeight) {
        heroGlowOrb.style.transform = `translate3d(0, ${scrollPos * 0.12}px, 0)`;
    }

    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 130;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });

    isScrollTicking = false;
}

function initScrollAndNavigation() {
    window.addEventListener('scroll', () => {
        if (!isScrollTicking) {
            window.requestAnimationFrame(handleScroll);
            isScrollTicking = true;
        }
    }, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    handleScroll();
}

// Hero Section: Typewriter Modul
const typewriterElement = document.getElementById('typewriter');
const typewriterRoles = [
    "Computer Science Student",
    "Full-Stack Web Developer",
    "Problem Solver & Tech Explorer"
];

let roleIndex = 0;
let charIdx = 0;
let isDeleting = false;
let typewriterStarted = false;

function startTypewriter() {
    if (typewriterStarted || !typewriterElement) return;
    typewriterStarted = true;
    typewriterLoop();
}

function typewriterLoop() {
    if (!typewriterElement) return;

    const currentRole = typewriterRoles[roleIndex];

    if (!isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;

        if (charIdx === currentRole.length) {
            isDeleting = true;
            setTimeout(typewriterLoop, 1800);
            return;
        }
        setTimeout(typewriterLoop, 85);
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;

        if (charIdx === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % typewriterRoles.length;
            setTimeout(typewriterLoop, 380);
            return;
        }
        setTimeout(typewriterLoop, 45);
    }
}

// About Section: Resume Download Module
function initResumeDownload() {
    const resumeBtn = document.getElementById('downloadresume');
    if (!resumeBtn) return;

    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const originalContent = resumeBtn.innerHTML;
        resumeBtn.disabled = true;
        resumeBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> <span>Downloading...</span>";

        const fileUrl = './Darshil_Ajudia_Resume.pdf';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'Darshil_Ajudia_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            resumeBtn.innerHTML = "<i class='bx bx-check-circle'></i> <span>Downloaded!</span>";
            setTimeout(() => {
                resumeBtn.innerHTML = originalContent;
                resumeBtn.disabled = false;
            }, 2200);
        }, 600);
    });
}

// Journey Section: Timeline Module
const timelineData = [
    {
        type: "education",
        title: "B.Tech in Computer Science & Engineering",
        institute: "Marwadi University",
        year: "Jul 2026 - Present",
        description: "Pursuing Bachelor's degree with focus on Advanced Web Technologies, Software Engineering, Algorithms, and Cloud Systems."
    },
    {
        type: "education",
        title: "Diploma in Computer Engineering",
        institute: "Marwadi University",
        year: "Aug 2023 - Feb 2026",
        description: "Completed diploma with distinction, specializing in Full-Stack Web Development, Data Structures, and Database Architecture."
    },
    {
        type: "education",
        title: "Secondary School Certificate (SSC)",
        institute: "Dholakiya School",
        year: "March 2022 - March 2023",
        description: "Built a solid foundational background in Mathematics, Physics, and Logic with top academic excellence."
    },
    {
        type: "experience",
        title: "Web Developer Intern",
        institute: "Comsci Technologies",
        year: "May 2026 - Aug 2026",
        description: "Built dynamic, full-stack solutions using Laravel, Next.js, and WordPress. Hands-on experience designing optimized MySQL schemas, developing responsive UI."
    }
];

const timelineContainer = document.getElementById("timeline");
const timelineTabs = document.querySelectorAll(".tab-wrapper .tab-btn");

function showTimeline(type) {
    if (!timelineContainer) return;

    timelineContainer.innerHTML = "";
    const filtered = timelineData.filter(item => item.type === type);

    filtered.forEach((item, index) => {
        const side = index % 2 === 0 ? "left" : "right";
        const iconClass = type === "education" ? "bxs-graduation" : "bx-briefcase-alt-2";
        const badgeLabel = type === "education" ? "Education" : "Experience";

        const itemEl = document.createElement("div");
        itemEl.className = `timeline-item ${side} filter-item`;
        itemEl.style.transitionDelay = `${index * 0.1}s`;
        itemEl.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-card">
                <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
                    <span class="badge-tag">
                        <i class='bx ${iconClass}'></i> ${badgeLabel}
                    </span>
                    <span class="year-tag">${item.year}</span>
                </div>
                <h3>${item.title}</h3>
                <div class="institute">${item.institute}</div>
                <p>${item.description}</p>
            </div>
        `;
        timelineContainer.appendChild(itemEl);
    });

    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach(el => el.classList.add('active'));
        }, 50);
    });
}

function initTimeline() {
    timelineTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            timelineTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");
            showTimeline(tab.dataset.filter);
        });
    });
    showTimeline("education");
}

// Skills Section: Tech Stack Module
const techData = [
    // Frontend
    { name: "HTML", category: "frontend", icon: "bxl-html5", color: "#e34f26" },
    { name: "CSS", category: "frontend", icon: "bxl-css3", color: "#1572b6" },
    { name: "JavaScript", category: "frontend", icon: "bxl-javascript", color: "#f7df1e" },
    { name: "Bootstrap", category: "frontend", icon: "bxl-bootstrap", color: "#7952b3" },
    { name: "Tailwind CSS", category: "frontend", icon: "bxl-tailwind-css", color: "#3ab7bf" },
    { name: "React Js", category: "frontend", icon: "bxl-react", color: "#61DBFB" },

    // Backend
    { name: "PHP", category: "backend", icon: "bxl-php", color: "#777bb4" },
    { name: "Laravel", category: "backend", icon: "bxl bx-laravel", color: "#FF2D20" },
    { name: "Node.js", category: "backend", icon: "bxl-nodejs", color: "#68a063" },
    { name: "Python", category: "backend", icon: "bxl-python", color: "#3776ab" },

    // Database
    { name: "MySQL", category: "database", icon: "bx-data", color: "#00758f" },

    // Tools
    { name: "VS Code", category: "tools", icon: "bxl-visual-studio", color: "#007acc" },
    { name: "GitHub", category: "tools", icon: "bxl-github", color: "#ffffff" },
    { name: "Git", category: "tools", icon: "bxl-git", color: "#f05032" }
];

const skillGrid = document.getElementById('tech-grid');
const skillFilterButtons = document.querySelectorAll('#skills .filter-btn');

function updateSkillCounts() {
    const allCount = document.getElementById('count-all');
    if (allCount) allCount.innerText = techData.length;

    const categories = ['frontend', 'backend', 'database', 'tools'];
    categories.forEach(cat => {
        const countEl = document.getElementById(`count-${cat}`);
        if (countEl) {
            countEl.innerText = techData.filter(item => item.category === cat).length;
        }
    });
}

function renderSkills(filter = 'all') {
    if (!skillGrid) return;
    skillGrid.innerHTML = '';

    const filtered = filter === 'all' ? techData : techData.filter(item => item.category === filter);

    filtered.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col filter-item';
        col.style.transitionDelay = `${index * 0.05}s`;
        col.innerHTML = `
            <div class="tech-card">
                <div class="tech-icon-wrapper">
                    <i class='bx ${item.icon} tech-boxicon' style="color: ${item.color};"></i>
                </div>
                <div class="tech-title">${item.name}</div>
                <span class="tech-tag">${item.category}</span>
            </div>
        `;
        skillGrid.appendChild(col);
    });

    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll('#tech-grid .filter-item').forEach(el => el.classList.add('active'));
        }, 50);
    });
}

function initSkills() {
    updateSkillCounts();
    renderSkills('all');

    skillFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            skillFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderSkills(button.getAttribute('data-filter'));
        });
    });
}

// Projects Section: Showcase Module
const projectData = [
    {
        title: "Darshil Ajudia Portfolio",
        description: "A fast, fully responsive modern portfolio showcasing my projects, skills, and interactive responsive UI elements.",
        image: "project-1.webp",
        category: "fullstack",
        categoryLabel: "Full Stack",
        tech: ["HTML", "CSS", "JS", "Bootstrap", "PHP"],
        sourceCode: "https://github.com/darshilajudia7/portfolio",
        liveUrl: "#home"
    },
    {
        title: "E-Gram Portal",
        description: "A comprehensive digital governance portal for citizen applications, certificate issuance, welfare schemes, and admin management.",
        image: "project-2.webp",
        category: "fullstack",
        categoryLabel: "Full Stack",
        tech: ["HTML", "CSS", "JS", "Bootstrap", "PHP", "MySQL"],
        sourceCode: "https://github.com/darshilajudia7/egramportal",
        liveUrl: null
    },
    {
        title: "LED Sign City Commercial Web",
        description: "LED Sign City is a responsive marketing website built with Next.js to showcase LED signage products, solutions, industries, and services with interactive sliders and a user-friendly design.",
        image: "project-3.webp",
        category: "frontend",
        categoryLabel: "Frontend",
        tech: ["HTML", "CSS", "Next.js", "React.js"],
        sourceCode: "https://github.com/darshilajudia7/LED-Sign-City",
        liveUrl: "https://led-sign-city.vercel.app/"
    },
    {
        title: "QuizMaster Assessment Platform",
        description: "QuizMaster is a full-stack quiz management system for creating, scheduling, conducting, and evaluating quizzes with student performance tracking.",
        image: "project-4.webp",
        category: "fullstack",
        categoryLabel: "Full Stack",
        tech: ["HTML", "CSS", "JS", "Bootstrap", "PHP", "Laravel", "MySQL"],
        sourceCode: "https://github.com/darshilajudia7/QuizMaster",
        liveUrl: null
    }
];

function normalizeCategory(cat) {
    return (cat || '').toString().toLowerCase().replace(/[\s\-_]+/g, '');
}

const projectGrid = document.getElementById('project-grid');
const projectFilterButtons = document.querySelectorAll('#projects .filter-btn');

function updateProjectCounts() {
    const countAll = document.getElementById('project-count-all');
    if (countAll) countAll.innerText = projectData.length;

    const countFrontend = document.getElementById('project-count-frontend');
    if (countFrontend) {
        countFrontend.innerText = projectData.filter(p => normalizeCategory(p.category) === 'frontend').length;
    }

    const countFullstack = document.getElementById('project-count-fullstack');
    if (countFullstack) {
        countFullstack.innerText = projectData.filter(p => normalizeCategory(p.category) === 'fullstack').length;
    }
}

function renderProjects(filter = 'all') {
    if (!projectGrid) return;
    projectGrid.innerHTML = '';

    const targetFilter = normalizeCategory(filter);
    const filtered = (targetFilter === 'all')
        ? projectData
        : projectData.filter(item => {
            const itemCat = normalizeCategory(item.category);
            return itemCat === targetFilter || (targetFilter.startsWith('full') && itemCat.startsWith('full'));
        });

    if (filtered.length === 0) {
        projectGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class='bx bx-folder-open text-white-50' style='font-size: 3rem;'></i>
                <p class="text-white-50 mt-2 mb-0">No projects found in this category.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4 filter-item';
        col.style.transitionDelay = `${index * 0.08}s`;

        const techPills = item.tech.map(t => `<span class="project-tag">${t}</span>`).join('');
        const categoryLabel = item.categoryLabel || (normalizeCategory(item.category) === 'frontend' ? 'Frontend' : 'Full Stack');

        const hasLive = Boolean(item.liveUrl && item.liveUrl.trim());
        const hasCode = Boolean(item.sourceCode && item.sourceCode.trim());

        let overlayButtons = '';
        if (hasLive) {
            overlayButtons += `
                <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-primary" aria-label="Visit live website for ${item.title}">
                    <i class='bx bx-link-external'></i> Live Demo
                </a>
            `;
        }
        if (hasCode) {
            overlayButtons += `
                <a href="${item.sourceCode}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-secondary" aria-label="View source code on GitHub for ${item.title}">
                    <i class='bx bxl-github'></i> Code
                </a>
            `;
        }

        let actionButtons = '';
        if (hasLive && hasCode) {
            actionButtons = `
                <div class="project-actions dual-actions">
                    <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-primary" aria-label="Visit live website for ${item.title}">
                        <i class='bx bx-link-external'></i> View Project
                    </a>
                    <a href="${item.sourceCode}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-secondary" aria-label="View GitHub repository for ${item.title}">
                        <i class='bx bxl-github'></i> Code
                    </a>
                </div>
            `;
        } else if (hasCode) {
            actionButtons = `
                <div class="project-actions single-action">
                    <a href="${item.sourceCode}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-secondary btn-full-width" aria-label="View GitHub repository for ${item.title}">
                        <i class='bx bxl-github'></i> View Code
                    </a>
                </div>
            `;
        } else if (hasLive) {
            actionButtons = `
                <div class="project-actions single-action">
                    <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-primary btn-full-width" aria-label="Visit live website for ${item.title}">
                        <i class='bx bx-link-external'></i> View Project
                    </a>
                </div>
            `;
        }

        col.innerHTML = `
            <div class="project-card">
                <div class="project-img-wrapper">
                    <span class="project-category-badge">${categoryLabel}</span>
                    <img src="${item.image}" alt="${item.title} preview" class="project-img" width="600" height="338" loading="lazy" decoding="async">
                    <div class="project-overlay">
                        ${overlayButtons}
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-desc">${item.description}</p>
                    <div class="project-tech">
                        ${techPills}
                    </div>
                    ${actionButtons}
                </div>
            </div>
        `;
        projectGrid.appendChild(col);
    });

    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll('#project-grid .filter-item').forEach(el => el.classList.add('active'));
        }, 50);
    });
}

function initProjects() {
    updateProjectCounts();
    renderProjects('all');

    if (projectFilterButtons) {
        projectFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                projectFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderProjects(button.getAttribute('data-filter'));
            });
        });
    }
}

function initContactForm() {
    const form = document.querySelector('.contactform');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.contact-submit-btn');
        const originalContent = submitBtn ? submitBtn.innerHTML : ''
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> <span>Sending...</span>";
        }

        try {
            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action') || 'contact.php';

            const response = await fetch(actionUrl, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: formData
            });

            const result = await response.json();

            if (result.status === 'success') {
                showPopup({
                    title: 'Message Sent Successfully!',
                    message: result.message || 'Thank you! Your data has been inserted into the database.',
                    type: 'success'
                });
                form.reset();
            } else {
                showPopup({
                    title: 'Submission Failed',
                    message: result.message || 'Unable to submit your message. Please try again.',
                    type: 'error'
                });
            }
        } catch (err) {
            console.error('Contact form submission error:', err);
            showPopup({
                title: 'Connection Error',
                message: 'Could not connect to the database server. Please ensure XAMPP Apache and MySQL are running.',
                type: 'error'
            });
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }
        }
    });
}

// 9. Feedback Pop-up Modal Module
function showPopup(options = {}, type = 'success') {
    const popupOverlay = document.getElementById('portfolio-popup');
    if (!popupOverlay) return;

    let title = 'Data Inserted Successfully!';
    let message = 'Thank you! Your message has been saved in the database.';
    let popupType = type;

    if (typeof options === 'string') {
        message = options;
        title = (type === 'error') ? 'Submission Error' : 'Data Inserted Successfully!';
    } else if (typeof options === 'object' && options !== null) {
        message = options.message || message;
        title = options.title || ((options.type === 'error') ? 'Submission Error' : 'Data Inserted Successfully!');
        popupType = options.type || type;
    }

    const titleEl = document.getElementById('popup-title');
    const msgEl = document.getElementById('popup-message');
    const iconContainer = document.getElementById('popup-icon-container');
    const iconEl = document.getElementById('popup-icon');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    if (iconContainer && iconEl) {
        if (popupType === 'error') {
            iconContainer.className = 'popup-icon-container error';
            iconEl.className = 'bx bx-error-circle';
        } else {
            iconContainer.className = 'popup-icon-container success';
            iconEl.className = 'bx bx-check-circle';
        }
    }

    popupOverlay.classList.add('active');
    popupOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popupOverlay = document.getElementById('portfolio-popup');
    if (!popupOverlay) return;

    popupOverlay.classList.remove('active');
    popupOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function initPopupEvents() {
    const popupOverlay = document.getElementById('portfolio-popup');
    const closeBtn = document.getElementById('popup-close-btn');
    const confirmBtn = document.getElementById('popup-confirm-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', closePopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
}

window.showPopup = showPopup;
window.closePopup = closePopup;

// Global UI Animations: Scroll Reveal Module
function initScrollReveal() {
    const revealTargets = document.querySelectorAll(
        '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .section-header, .about-intro-box, .contact-info-panel, .contactform-card'
    );

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                if (entry.target.classList.contains('reveal-stagger')) {
                    const children = entry.target.querySelectorAll('.info-card, .modern-card, .tech-card, .project-card, .contact-channel');
                    children.forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.08}s`;
                        child.classList.add('active');
                    });
                }

                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    revealTargets.forEach(el => observer.observe(el));

    document.querySelectorAll('.reveal-stagger').forEach(staggerGroup => {
        observer.observe(staggerGroup);
    });
}

// Application Lifecycle Bootstrap
document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initScrollAndNavigation();
    initResumeDownload();
    initTimeline();
    initSkills();
    initProjects();
    initContactForm();
    initPopupEvents();
    initScrollReveal();
});
