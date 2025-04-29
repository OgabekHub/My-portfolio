// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const nav = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('hidden');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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
        }
    });
}, observerOptions);

// Add animation classes to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-animate');
    observer.observe(section);
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

// Form submission handling with loading animation
const form = document.querySelector('form');
const submitButton = form.querySelector('button[type="submit"]');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading animation
        submitButton.classList.add('loading-animation');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Reset form and button
        submitButton.classList.remove('loading-animation');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Yuborish';
        
        alert('Message sent successfully!');
        form.reset();
    });
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    z-index: 9999;
    transition: width 0.2s ease;
`;
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

// Skill progress animation
const skillCards = document.querySelectorAll('.skill-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress').forEach(progress => {
                progress.style.width = progress.parentElement.dataset.progress;
            });
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => observer.observe(card));

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
            backToTopBtn.classList.add('hidden');
        }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
