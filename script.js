/* =========================================================================
   PREMIUM PORTFOLIO SCRIPT
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');

    // Simulate loading time for visual effect
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Start Hero Animations after preloader hides
            initHeroAnimations();
        }, 800);
    }, 2000); // 2s loading time

    // --- 2. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');

    // Check if device supports hover (desktop)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }, { passive: true });

        const animateCursor = () => {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;
            cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Add hover effect on interactive elements
        const cursorInteractives = document.querySelectorAll('a, button, .portfolio-card, .service-card');
        cursorInteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // --- 3. Scroll Progress Indicator ---
    const scrollProgress = document.getElementById('scroll-progress');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    function handleScroll() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollHeight > 0) ? (scrollTop / scrollHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';

        // --- 4. Sticky Header ---
        const header = document.getElementById('header');
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // --- 5. Scroll to Top Button ---
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollTop > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }

        // --- 6. Active Nav Link Highlighting ---
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollTop >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        const navLinksArr = document.querySelectorAll('.nav-link');
        navLinksArr.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Scroll to Top action
    const scrollBtn = document.getElementById('scrollToTop');
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 7. Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- 8. Typing Effect ---
    const typingTexts = ["Production Co-ordinator", "Frontend Developer", "Team Leader"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector(".typing-text");

    function type() {
        const currentText = typingTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500; // Pause before start typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // --- 9. Counters Animation (Stats) ---
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-num');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-val');

            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + (target > 50 ? '+' : '');
                }
            };

            updateCount();
        });
    }

    // --- 11. Initializations ---

    function initHeroAnimations() {
        // Start typing effect
        setTimeout(type, 1000);

        // Start counters
        animateCounters();

        // Optional: Animate Skill Bars when in view (using Intersection Observer)
        const skillBars = document.querySelectorAll('.skill-bar .fill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Initialize Swiper JS for Testimonials (Removed as requested)

    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 50
    });

    // Contact Form Submission (Prevent default for demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                btn.style.background = '#10b981'; // Success color
                btn.style.color = 'white';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = ''; // Revert to primary
                }, 3000);
            }, 1500);
        });
    }

});


// --- 11. Initializations --- 
// Initialize 3D Tilt Effect on interactive cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.glass-panel, .glowing-border, .service-card, .resume-card, .timeline-content'), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.05,
        scale: 1.02
    });
}

// Initialize Particle Background
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#0ea5e9' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#0ea5e9', opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.5, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.4 } },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    });
}
