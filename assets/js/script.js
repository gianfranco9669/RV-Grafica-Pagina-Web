const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const yearSpan = document.getElementById('year');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href.endsWith('index.html'))) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
    }
    link.addEventListener('click', () => {
        if (navList && navList.classList.contains('is-open')) {
            navList.classList.remove('is-open');
            navToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Testimonial slider
const slider = document.querySelector('[data-slider]');
if (slider) {
    const cards = slider.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dot');
    let activeIndex = 0;
    const setActive = (index) => {
        cards.forEach((card) => card.classList.remove('is-active'));
        dots.forEach((dot) => dot.classList.remove('is-active'));
        cards[index]?.classList.add('is-active');
        dots[index]?.classList.add('is-active');
        activeIndex = index;
    };

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = Number(dot.dataset.slide);
            setActive(index);
        });
    });

    if (cards.length) {
        setActive(0);
        setInterval(() => {
            const nextIndex = (activeIndex + 1) % cards.length;
            setActive(nextIndex);
        }, 6000);
    }
}

// Generic tab component
const selector = document.querySelector('[data-selector]');
if (selector) {
    const buttons = selector.querySelectorAll('[data-target]');
    const panels = selector.querySelectorAll('[data-panel]');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            buttons.forEach((btn) => {
                btn.classList.toggle('is-active', btn === button);
                btn.setAttribute('aria-selected', String(btn === button));
            });
            panels.forEach((panel) => {
                panel.classList.toggle('is-active', panel.dataset.panel === target);
            });
        });
    });
}

// Timeline interaction
const timeline = document.querySelector('[data-timeline]');
if (timeline) {
    const steps = timeline.querySelectorAll('[data-timeline-step]');
    const panels = timeline.querySelectorAll('[data-timeline-panel]');

    const setActiveStep = (index) => {
        steps.forEach((step, stepIndex) => {
            const isActive = stepIndex === index;
            step.classList.toggle('is-active', isActive);
        });
        panels.forEach((panel, panelIndex) => {
            panel.classList.toggle('is-active', panelIndex === index);
        });
    };

    steps.forEach((step) => {
        step.addEventListener('click', () => {
            const index = Number(step.dataset.timelineStep);
            setActiveStep(index);
        });
    });

    setActiveStep(0);
}

// Scenario tabs
const scenarioLab = document.querySelector('[data-scenario]');
if (scenarioLab) {
    const tabs = scenarioLab.querySelectorAll('[data-target]');
    const panels = scenarioLab.querySelectorAll('[data-panel]');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            tabs.forEach((btn) => {
                btn.classList.toggle('is-active', btn === tab);
                btn.setAttribute('aria-selected', String(btn === tab));
            });
            panels.forEach((panel) => {
                panel.classList.toggle('is-active', panel.dataset.panel === target);
            });
        });
    });
}

// Lumen calculator
const lumenOutput = document.querySelector('[data-lumen-output]');
if (lumenOutput) {
    const range = document.getElementById('lumen-range');
    const valueSpan = lumenOutput.querySelector('.lumen-value');
    const suggestion = lumenOutput.querySelector('.lumen-suggestion');
    const suggestions = [
        { max: 350, text: 'Ideal para señalética interior y pasillos.' },
        { max: 550, text: 'Perfecto para accesos con iluminación ambiental.' },
        { max: 750, text: 'Óptimo para fachadas con tránsito medio.' },
        { max: 950, text: 'Recomendado para avenidas principales y shoppings.' }
    ];

    const updateLumen = (value) => {
        valueSpan.textContent = value;
        const match = suggestions.find((item) => value <= item.max) || suggestions[suggestions.length - 1];
        if (match) {
            suggestion.textContent = match.text;
        }
    };

    updateLumen(Number(range.value));
    range.addEventListener('input', (event) => {
        const value = Number(event.target.value);
        updateLumen(value);
    });
}

// Showcase slider
const showcase = document.querySelector('[data-showcase]');
if (showcase) {
    const after = showcase.querySelector('.showcase-after');
    const sliderInput = showcase.querySelector('.showcase-slider');
    const updateClip = (value) => {
        const right = 100 - Number(value);
        after.style.clipPath = `inset(0 ${right}% 0 0)`;
    };
    updateClip(sliderInput.value);
    sliderInput.addEventListener('input', (event) => updateClip(event.target.value));
}

// Mix board
const mixBoard = document.querySelector('[data-mix]');
if (mixBoard) {
    const checkboxes = mixBoard.querySelectorAll('input[type="checkbox"]');
    const gauge = mixBoard.querySelector('[data-mix-gauge]');
    const score = mixBoard.querySelector('[data-mix-score]');
    const text = mixBoard.querySelector('[data-mix-text]');

    const messages = {
        0: 'Sumá recursos sensoriales para elevar la experiencia.',
        1: 'Impacto moderado: ideal para campañas express.',
        2: 'Impacto alto: destacate con experiencias memorables.',
        3: 'Impacto máximo: crearás una experiencia inmersiva completa.'
    };

    const updateMix = () => {
        const selected = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
        const percent = 25 + selected * 18;
        gauge.style.background = `conic-gradient(var(--color-secondary) 0 ${percent}%, rgba(144, 188, 230, 0.12) ${percent}% 100%)`;
        score.textContent = `${percent}%`;
        text.textContent = messages[selected] || messages[3];
    };

    updateMix();
    checkboxes.forEach((checkbox) => checkbox.addEventListener('change', updateMix));
}

// FAQ accordion
const accordion = document.querySelector('[data-accordion]');
if (accordion) {
    const items = accordion.querySelectorAll('.faq-item');
    items.forEach((item) => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');
        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isOpen));
            content.classList.toggle('is-open', !isOpen);
        });
    });
}

// Reach calculator
const reachCalculator = document.querySelector('[data-reach-calculator]');
if (reachCalculator) {
    const countInput = reachCalculator.querySelector('#fleet-count');
    const distanceInput = reachCalculator.querySelector('#fleet-distance');
    const countOutput = reachCalculator.querySelector('[data-reach-count]');
    const distanceOutput = reachCalculator.querySelector('[data-reach-distance]');
    const impactOutput = reachCalculator.querySelector('[data-reach-impact]');
    const noteOutput = reachCalculator.querySelector('[data-reach-note]');
    const formatter = new Intl.NumberFormat('es-AR');

    const updateReach = () => {
        const count = Number(countInput.value);
        const distance = Number(distanceInput.value);
        const operationalDays = 26; // promedio mensual operando de lunes a sábado
        const impactsPerKm = 1.8; // estimación de vistas por kilómetro recorrido
        const monthlyImpacts = Math.round(count * distance * operationalDays * impactsPerKm);

        countOutput.textContent = count.toString();
        distanceOutput.textContent = `${distance} km`;
        impactOutput.textContent = formatter.format(monthlyImpacts);

        let message = 'Alcance masivo para campañas metropolitanas.';
        if (monthlyImpacts < 60000) {
            message = 'Cobertura ideal para líneas barriales y lanzamientos localizados.';
        } else if (monthlyImpacts < 120000) {
            message = 'Excelente equilibrio para corredores principales y refuerzos zonales.';
        }

        noteOutput.textContent = message;
    };

    countInput.addEventListener('input', updateReach);
    distanceInput.addEventListener('input', updateReach);
    updateReach();
}
