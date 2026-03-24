document.addEventListener('DOMContentLoaded', () => {

    /* ── Mobile Nav ── */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navCloseBtn = document.getElementById('nav-close-btn');
    const navbar = document.getElementById('navbar');
    const navOverlay = document.getElementById('nav-overlay');
    const navListLinks = document.querySelectorAll('#navbar a'); // Select all links in the navbar

    function openNav() {
        navbar.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
        navbar.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    hamburgerBtn.addEventListener('click', openNav);
    navCloseBtn.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', closeNav);

    navListLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    /* ── Sticky Header ── */
    const siteHeader = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ── Scroll Reveal ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    /* ── FAQ Accordion ── */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked (unless it was already open)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ── Contact Form ── */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple client-side validation
            const name = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const breed = document.getElementById('dog-breed').value.trim();

            if (!name || !email || !breed) {
                alert('Please fill in your name, email, and dog breed before submitting.');
                return;
            }

            // Simulated submission feedback
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fa-solid fa-check"></i>';
            submitBtn.style.background = '#2a9d5c';
            submitBtn.style.borderColor = '#2a9d5c';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span>Send My Request</span><i class="fa-solid fa-paper-plane"></i>';
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
            }, 4000);
        });
    }

    /* ── Active Nav Link on Scroll ── */
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active-link',
                        link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => navObserver.observe(section));

});
