/**
 * Dangote East African Refinery - Main JavaScript
 * Handles navigation automation, interactive metrics, modals, accordions, and forms.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDynamicYear();
    initMobileNav();
    initActiveNav();
    initCounters();
    initAccordions();
    initLightbox();
    initBackToTop();
    initContactForm();
    initNewsletterForm();
});

/**
 * 1. Dynamic Year Updater
 */
function initDynamicYear() {
    const yearElements = document.querySelectorAll('.current-year, #current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

/**
 * 2. Mobile Navigation Menu Toggle
 */
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');

    if (!mobileToggle || !nav) return;

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a navigation link is clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * 3. Active Nav Link Auto-Detector
 */
function initActiveNav() {
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (href && !href.startsWith('#') && href !== pageName) {
            link.classList.remove('active');
        }
    });
}

/**
 * 4. Animated Statistics Counter
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length) return;

    const animateCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // 1.8 seconds
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(target * easeOut);

            if (target >= 1000) {
                el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;
            } else {
                el.textContent = `${prefix}${currentVal}${suffix}`;
            }

            if (currentStep >= totalSteps) {
                clearInterval(timer);
                el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            }
        }, stepTime);
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => observer.observe(counter));
    } else {
        counters.forEach(counter => animateCounter(counter));
    }
}

/**
 * 5. Accordion Automation
 */
function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const parent = item.parentElement;
            
            // Optional: close siblings if desired
            parent.querySelectorAll('.accordion-item').forEach(sibling => {
                if (sibling !== item) {
                    sibling.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });
}

/**
 * 6. Lightbox Gallery Viewer
 */
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.lightbox-content');
    const modalCaption = modal.querySelector('.lightbox-caption');
    const closeBtn = modal.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-img-container').forEach(container => {
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            const caption = container.dataset.caption || img.alt;
            modalImg.src = img.src;
            modalCaption.textContent = caption;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * 7. Scroll to Top Floating Button
 */
function initBackToTop() {
    let btn = document.querySelector('.back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '&#8679;';
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 8. Contact Form Automation & Validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const alertBox = document.getElementById('form-alert');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('[name="name"]');
        const emailInput = form.querySelector('[name="email"]');
        const messageInput = form.querySelector('[name="message"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showAlert('Please complete all required fields.', 'error');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showAlert('Please provide a valid email address.', 'error');
            return;
        }

        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending message...';

        // Simulate automated asynchronous sending
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            showAlert(`Thank you, ${nameInput.value.trim()}! Your message has been received. Our research team will review it.`, 'success');
            form.reset();
        }, 800);
    });

    function showAlert(msg, type) {
        if (!alertBox) return;
        alertBox.textContent = msg;
        alertBox.className = `form-alert ${type}`;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * 9. Newsletter Subscription Automation
 */
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');

            if (!input || !input.value.trim()) return;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                alert('Please enter a valid email address.');
                return;
            }

            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.backgroundColor = '#28a745';
            button.style.color = '#ffffff';
            input.value = '';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 3000);
        });
    });
}
