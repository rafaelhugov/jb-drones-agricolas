// Header Scroll Effect
const header = document.getElementById('header');
const headerLogo = document.getElementById('header-logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        if (headerLogo) headerLogo.src = 'assets/img/logo-colored.png';
    } else {
        header.classList.remove('scrolled');
        if (headerLogo) headerLogo.src = 'assets/img/logo-white.png';
    }
});

// Mobile Menu
const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuBtn.classList.toggle('fa-times');
        menuBtn.classList.toggle('fa-bars');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuBtn) {
            menuBtn.classList.replace('fa-times', 'fa-bars');
        }
    });
});

// Count Up Animation
const counters = document.querySelectorAll('.benefit-number');
let hasCounted = false;

const startCounting = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!target) return; // Skip non-numeric

        const duration = 2000; // ms
        const increment = target / (duration / 20); // updates every 20ms

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + (counter.innerText.includes('%') ? '%' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
            }
        };
        updateCounter();
    });
};

// Intersection Observer for Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Trigger counters if benefits section
            if (entry.target.id === 'benefits' && !hasCounted) {
                startCounting();
                hasCounted = true;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section, #benefits').forEach(section => {
    observer.observe(section);
});




// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// Export for inline HTML calls
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (name && phone) {
            alert(`Obrigado, ${name}! Recebemos sua solicitação. Entraremos em contato pelo número ${phone} em breve.`);
            contactForm.reset();
        }
    });
}

// Scroll to Top Logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
