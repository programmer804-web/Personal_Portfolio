/**
 * Personal Portfolio Website Script
 * Modern Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation Menu Toggle & ARIA Controls
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Profile Image Fallback Handling
    const heroProfileImg = document.getElementById('hero-profile-img');
    const profileFallback = document.getElementById('profile-fallback');
    if (heroProfileImg && profileFallback) {
        heroProfileImg.addEventListener('error', () => {
            heroProfileImg.style.display = 'none';
            profileFallback.style.display = 'flex';
        });
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon between bars and X
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile drawer when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Close mobile drawer when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    /* ==========================================================================
       2. Header Background Change on Scroll
       ========================================================================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. Active Navigation Link ScrollSpy
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    /* ==========================================================================
       4. Hero Section Typewriter Effect
       ========================================================================== */
    const typingText = document.getElementById('typing-text');
    const roles = [
        "MERN Stack Developer",
        "Frontend Developer",
        "JavaScript Developer",
        "Full-Stack Enthusiast"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        if (!typingText) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    };

    // Start typewriter
    typeEffect();

    /* ==========================================================================
       5. Intersection Observer for Scroll-Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       6. Animated Skill Progress Bars
       ========================================================================== */
    const progressBars = document.querySelectorAll('.progress-bar-fill');

    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-progress');
                if (targetWidth) {
                    entry.target.style.width = targetWidth;
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    progressBars.forEach(bar => progressObserver.observe(bar));

    /* ==========================================================================
       7. Project Category Filtering
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    card.classList.remove('hide');
                    // Add subtle fade-in effect
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       8. Contact Form Client-Side Validation & Notice
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        // Clear errors on input change
        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
                const errorSpan = document.getElementById(`${input.id}-error`);
                if (errorSpan) errorSpan.textContent = '';
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            
            // Get form values
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const subjectValue = subjectInput.value.trim();
            const messageValue = messageInput.value.trim();

            // Email Regex Pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate Name
            if (nameValue.length < 2) {
                showError(nameInput, 'name-error', 'Please enter your name (at least 2 characters).');
                isValid = false;
            }

            // Validate Email
            if (!emailPattern.test(emailValue)) {
                showError(emailInput, 'email-error', 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Subject
            if (subjectValue.length < 3) {
                showError(subjectInput, 'subject-error', 'Subject must be at least 3 characters long.');
                isValid = false;
            }

            // Validate Message
            if (messageValue.length < 10) {
                showError(messageInput, 'message-error', 'Message must be at least 10 characters long.');
                isValid = false;
            }

            if (isValid) {
                // Display success notice required by specifications
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Your message is ready. Please connect this form to a backend or email service to receive submissions.';
                
                // Reset Form
                contactForm.reset();

                // Scroll notice into view smoothly if needed
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fix the errors above before submitting.';
            }
        });

        function showError(inputElement, errorElementId, message) {
            inputElement.classList.add('invalid');
            const errorElement = document.getElementById(errorElementId);
            if (errorElement) {
                errorElement.textContent = message;
            }
        }
    }

    /* ==========================================================================
       9. Back-to-Top Button Handler
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       10. Footer Dynamic Current Year
       ========================================================================== */
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});

// Keyframe animation for project filter fade-in
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(15px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);
