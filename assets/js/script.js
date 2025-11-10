const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const yearSpan = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav-list a');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (navList && navList.classList.contains('is-open')) {
            navList.classList.remove('is-open');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('main section[id], header#inicio');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                if (!id) return;
                const navLink = document.querySelector(`.nav-list a[href="#${id}"]`);
                if (!navLink) return;

                if (entry.isIntersecting) {
                    navLinks.forEach((link) => link.classList.remove('is-active'));
                    navLink.classList.add('is-active');
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
} else {
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.forEach((item) => item.classList.remove('is-active'));
            link.classList.add('is-active');
        });
    });
}
