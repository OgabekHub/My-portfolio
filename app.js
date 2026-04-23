// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.mobile-nav .nav-item');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#') {
            return;
        }

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        e.preventDefault();
        const offset = 80; // Navbar height
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Animate sections on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate hero title spans
            if (entry.target.classList.contains('hero')) {
                const spans = entry.target.querySelectorAll('.hero-title span');
                spans.forEach(span => span.classList.add('visible'));
            }
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe individual elements
document.querySelectorAll('.about-image-container, .about-card, .about-goals, .skill-card, .project-card, .contact-info, .contact-form, footer').forEach(element => {
    observer.observe(element);
});

// Add animation classes to about section elements
document.querySelectorAll('.about-image-container, .about-card, .about-goals, .about-text').forEach(element => {
    observer.observe(element);
});

// Add animation classes to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.classList.add('section-animate');
    observer.observe(card);
});

// Add hover effects to navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.classList.add('nav-link');
});

// Add animation classes to form inputs
document.querySelectorAll('input, textarea').forEach(input => {
    input.classList.add('form-input');
});

// Add animation classes to social icons
document.querySelectorAll('footer a').forEach(icon => {
    icon.classList.add('social-icon');
});

// Form submission handling with redirect + EmailJS auto-reply
const form = document.querySelector('form');
const submitButton = form ? form.querySelector('button[type="submit"]') : null;

if (form && submitButton) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitButton.classList.add('loading-animation');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin ml-2"></i>';

        const formData = new FormData(form);
        const senderName  = formData.get('name');
        const senderEmail = formData.get('email');

        try {
            // 1) Netlify Forms ga jo'natish
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) throw new Error('Netlify form failed');

            // 2) EmailJS orqali auto-reply yuborish
            try {
                await emailjs.send(
                    'service_5o3o1i8',
                    'template_goumrk5',
                    {
                        name:       senderName,   // template: {{name}}
                        email:      senderEmail,  // template: {{email}} (To Email field)
                        from_name:  "Og'abek Olimjonov",
                        reply_to:   'olimjonov.ogabek.dev@gmail.com'
                    }
                );
            } catch (autoReplyErr) {
                // Auto-reply yuborilmasa ham asosiy xabar bordi — ok
                console.warn('Auto-reply failed (non-critical):', autoReplyErr);
            }

            // 3) Thank-you sahifaga o'tkazish
            form.reset();
            window.location.href = '/thank-you';

        } catch (error) {
            alert('❌ Sorry, something went wrong. Please email me directly:\nolimjonov.ogabek.dev@gmail.com');
            submitButton.classList.remove('loading-animation');
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane ml-2"></i>';
        }
    });
}


// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Typing animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'UI/UX Designer', 'Frontend Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation
type();

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
            backToTopBtn.style.display = 'none';
        }, 300);
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Logo hover behavior (show name only when logo hovered)
document.querySelectorAll('.logo-container').forEach(container => {
    const circle = container.querySelector('.logo-circle');
    const details = container.querySelector('.logo-details');

    if (!circle || !details) return;

    circle.addEventListener('mouseenter', () => {
        container.classList.add('logo-active');
    });

    container.addEventListener('mouseleave', () => {
        container.classList.remove('logo-active');
    });
});
