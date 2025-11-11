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

// Expansion lab
const expansionLab = document.querySelector('[data-expansion]');
if (expansionLab) {
    const controls = expansionLab.querySelectorAll('[data-expansion-control]');
    const areaOutput = expansionLab.querySelector('[data-expansion-area]');
    const hoursOutput = expansionLab.querySelector('[data-expansion-hours]');
    const investmentOutput = expansionLab.querySelector('[data-expansion-investment]');
    const noteOutput = expansionLab.querySelector('[data-expansion-note]');
    const currencyFormatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    });
    const numberFormatter = new Intl.NumberFormat('es-AR');

    const updateTotals = () => {
        let totalArea = 0;
        let totalHours = 0;
        let totalInvestment = 0;

        controls.forEach((control) => {
            const range = control.querySelector('input[type="range"]');
            const area = Number(control.dataset.area || 0);
            const hours = Number(control.dataset.hours || 0);
            const cost = Number(control.dataset.cost || 0);
            const count = Number(range.value);
            totalArea += count * area;
            totalHours += count * hours;
            totalInvestment += count * cost;
        });

        areaOutput.textContent = `${numberFormatter.format(Math.round(totalArea))} m²`;
        hoursOutput.textContent = `${numberFormatter.format(Math.round(totalHours))} h`;
        investmentOutput.textContent = currencyFormatter.format(Math.round(totalInvestment));

        let message = 'Configurá la flota para visualizar el escenario ideal.';
        if (totalArea > 0 && totalArea < 1500) {
            message = 'Escenario ágil para reforzar líneas base y utilitarios principales.';
        } else if (totalArea >= 1500 && totalArea < 2800) {
            message = 'Cobertura metropolitana con doble turno y coordinación regional.';
        } else if (totalArea >= 2800) {
            message = 'Plan nacional: sumá células de montaje en paralelo para reducir ventanas.';
        }
        noteOutput.textContent = message;
    };

    controls.forEach((control) => {
        const range = control.querySelector('input[type="range"]');
        const countOutput = control.querySelector('[data-expansion-count]');
        const handleInput = () => {
            countOutput.textContent = range.value;
            updateTotals();
        };
        range.addEventListener('input', handleInput);
        handleInput();
    });
}

// Schedule planner
const scheduleLab = document.querySelector('[data-schedule]');
if (scheduleLab) {
    const typeSelect = scheduleLab.querySelector('#schedule-type');
    const unitsRange = scheduleLab.querySelector('#schedule-units');
    const shiftsRange = scheduleLab.querySelector('#schedule-shifts');
    const unitsOutput = scheduleLab.querySelector('[data-schedule-units]');
    const shiftsOutput = scheduleLab.querySelector('[data-schedule-shifts]');
    const daysOutput = scheduleLab.querySelector('[data-schedule-days]');
    const teamOutput = scheduleLab.querySelector('[data-schedule-team]');
    const nightOutput = scheduleLab.querySelector('[data-schedule-night]');
    const noteOutput = scheduleLab.querySelector('[data-schedule-note]');

    const profiles = {
        urbano: {
            hoursPerUnit: 6.5,
            team: 6,
            note: 'Ideal para líneas urbanas con talleres propios y control fotográfico diario.'
        },
        media: {
            hoursPerUnit: 7.4,
            team: 7,
            note: 'Incluye ajustes de carrocería y kit de reposición para rutas de media distancia.'
        },
        utilitario: {
            hoursPerUnit: 4.2,
            team: 4,
            note: 'Perfecto para flotas comerciales flexibles con intervención parcial o total.'
        }
    };

    const updateSchedule = () => {
        const type = profiles[typeSelect.value] || profiles.urbano;
        const units = Number(unitsRange.value);
        const shifts = Number(shiftsRange.value);
        const hoursPerUnit = type.hoursPerUnit;
        const shiftHours = 8;
        const unitsPerNight = Math.max(1, Math.round((shifts * shiftHours) / hoursPerUnit));
        const nights = Math.max(1, Math.ceil(units / unitsPerNight));

        unitsOutput.textContent = units.toString();
        shiftsOutput.textContent = shifts.toString();
        daysOutput.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'}`;
        nightOutput.textContent = `${unitsPerNight} ${unitsPerNight === 1 ? 'unidad' : 'unidades'}`;
        teamOutput.textContent = `${type.team} técnicos`;
        noteOutput.textContent = type.note;
    };

    typeSelect.addEventListener('change', updateSchedule);
    unitsRange.addEventListener('input', updateSchedule);
    shiftsRange.addEventListener('input', updateSchedule);
    updateSchedule();
}

// ROI simulator
const roiLab = document.querySelector('[data-roi]');
if (roiLab) {
    const areaRange = roiLab.querySelector('#roi-area');
    const trafficRange = roiLab.querySelector('#roi-traffic');
    const areaOutput = roiLab.querySelector('[data-roi-area]');
    const trafficOutput = roiLab.querySelector('[data-roi-traffic]');
    const investmentOutput = roiLab.querySelector('[data-roi-investment]');
    const impactsOutput = roiLab.querySelector('[data-roi-impacts]');
    const percentageOutput = roiLab.querySelector('[data-roi-percentage]');
    const noteOutput = roiLab.querySelector('[data-roi-note]');
    const currencyFormatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    });
    const numberFormatter = new Intl.NumberFormat('es-AR');

    const updateRoi = () => {
        const area = Number(areaRange.value);
        const traffic = Number(trafficRange.value);

        areaOutput.textContent = numberFormatter.format(area);
        trafficOutput.textContent = numberFormatter.format(traffic);

        const productionCost = area * 21500;
        const lightingCost = traffic > 2500 ? 95000 : traffic > 1500 ? 78000 : 52000;
        const maintenance = area * 2800;
        const investment = productionCost + lightingCost + maintenance;
        const monthlyImpacts = Math.round(traffic * 30 * 0.82);
        const conversionRate = 0.002 + Math.min(0.004, traffic / 100000);
        const ticketAverage = 5200;
        const projectedRevenue = monthlyImpacts * conversionRate * ticketAverage;
        const roi = investment > 0 ? (projectedRevenue / investment) * 100 : 0;

        investmentOutput.textContent = currencyFormatter.format(Math.round(investment));
        impactsOutput.textContent = numberFormatter.format(monthlyImpacts);
        percentageOutput.textContent = `${roi.toFixed(1)}%`;

        let message = 'Mové los controles para proyectar resultados.';
        if (roi < 120) {
            message = 'Óptimo para branding sostenido con presencia constante.';
        } else if (roi < 240) {
            message = 'Excelente equilibrio entre inversión y conversiones en zonas de alto flujo.';
        } else {
            message = 'Campaña estrella: recomendada para lanzamientos y flagship stores.';
        }
        noteOutput.textContent = message;
    };

    areaRange.addEventListener('input', updateRoi);
    trafficRange.addEventListener('input', updateRoi);
    updateRoi();
}

// Calendar planner
const calendarLab = document.querySelector('[data-calendar]');
if (calendarLab) {
    const weeksInput = calendarLab.querySelector('#calendar-weeks');
    const weeksOutput = calendarLab.querySelector('[data-calendar-weeks]');
    const phaseOutput = calendarLab.querySelector('[data-calendar-phase]');
    const productionOutput = calendarLab.querySelector('[data-calendar-production]');
    const mountOutput = calendarLab.querySelector('[data-calendar-mount]');
    const noteOutput = calendarLab.querySelector('[data-calendar-note]');
    const buttons = calendarLab.querySelectorAll('[data-calendar-scenario]');
    const scenarios = {
        lanzamiento: {
            kickoffLead: 4,
            productionFactor: 0.35,
            mountLeadDays: 2,
            note: 'Plan de alto impacto para aperturas y lanzamientos nacionales.'
        },
        temporal: {
            kickoffLead: 3,
            productionFactor: 0.28,
            mountLeadDays: 1,
            note: 'Ideal para temporadas y campañas de retail con rotación mensual.'
        },
        evento: {
            kickoffLead: 2,
            productionFactor: 0.2,
            mountLeadDays: 0.5,
            note: 'Activaciones exprés para eventos y pop ups de corta duración.'
        }
    };
    let activeScenario = 'lanzamiento';

    const updateCalendar = () => {
        const weeks = Number(weeksInput.value);
        const scenario = scenarios[activeScenario] || scenarios.lanzamiento;
        const productionWeeks = Math.max(1, Math.round(weeks * scenario.productionFactor));
        const kickoffWeek = `Semana -${scenario.kickoffLead}`;
        const mountDays = Math.round(scenario.mountLeadDays * 24) / 24;
        const mountLabel = mountDays <= 1 ? `${Math.round(mountDays * 24)} h antes` : `${Math.round(mountDays)} días antes`;

        weeksOutput.textContent = weeks.toString();
        phaseOutput.textContent = kickoffWeek;
        productionOutput.textContent = `${productionWeeks} ${productionWeeks === 1 ? 'semana' : 'semanas'}`;
        mountOutput.textContent = mountLabel;
        noteOutput.textContent = scenario.note;
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((btn) => {
                const isActive = btn === button;
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-selected', String(isActive));
            });
            activeScenario = button.dataset.calendarScenario || 'lanzamiento';
            updateCalendar();
        });
    });

    weeksInput.addEventListener('input', updateCalendar);
    updateCalendar();
}

// Channel selector
const channelLab = document.querySelector('[data-channel]');
if (channelLab) {
    const buttons = channelLab.querySelectorAll('[data-channel-option]');
    const responseOutput = channelLab.querySelector('[data-channel-response]');
    const followupOutput = channelLab.querySelector('[data-channel-followup]');
    const noteOutput = channelLab.querySelector('[data-channel-note]');
    const channelData = {
        email: {
            response: '12 h',
            followup: 'Reporte detallado + agenda en 24 h',
            note: 'Recomendado para briefs completos con adjuntos y aprobaciones formales.'
        },
        whatsapp: {
            response: '2 h',
            followup: 'Chat en vivo + tablero compartido',
            note: 'Ideal para coordinaciones ágiles, envío de fotos y seguimiento diario.'
        },
        video: {
            response: '24 h',
            followup: 'Reunión por Meet/Teams + acta de acuerdos',
            note: 'Perfecto para definiciones estratégicas con múltiples áreas involucradas.'
        }
    };

    const setChannel = (key) => {
        const info = channelData[key] || channelData.email;
        responseOutput.textContent = info.response;
        followupOutput.textContent = info.followup;
        noteOutput.textContent = info.note;
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((btn) => {
                const isActive = btn === button;
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-selected', String(isActive));
            });
            const key = button.dataset.channelOption;
            setChannel(key);
        });
    });

    setChannel('email');
}
