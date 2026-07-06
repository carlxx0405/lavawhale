(function () {
    'use strict';

    var TOTAL = 8;
    var ANGLE_STEP = 360 / TOTAL; // 45 degrees per card
    var RADIUS = 440; // drum radius in px

    var projects = [
        {
            num: '01',
            title: 'Company Profile Pamphlet',
            client: 'Synthesis Agriculture',
            year: '2025',
            desc: 'A print-ready company profile pamphlet designed to communicate Synthesis Agriculture\'s mission, services, and scale to prospective partners and investors. Clean editorial layout, brand-consistent typography, and photography direction aligned with their sustainability positioning.',
            tags: ['Graphic Design', 'Print', 'Editorial']
        },
        {
            num: '02',
            title: 'Invoice Design',
            client: 'Eco Executive Stay — EcoES',
            year: '2025',
            desc: 'A cohesive invoice template system built to reflect EcoES\'s premium hospitality brand — clean, structured, and unmistakably on-brand. Every billing touchpoint now carries the same quality signal as the properties themselves.',
            tags: ['Document Design', 'Brand Identity', 'Print']
        },
        {
            num: '03',
            title: 'Pajo PrimeLand Flyer',
            client: 'Pajo',
            year: '2026',
            desc: 'A high-impact promotional flyer for Pajo\'s PrimeLand offering — designed to attract land investors and buyers through clear hierarchy, persuasive copy layout, and visuals that communicate value and exclusivity at a glance.',
            tags: ['Graphic Design', 'Print', 'Real Estate']
        },
        {
            num: '04',
            title: 'EliteHome Flyer',
            client: 'EliteHome Maid Agency',
            year: '2025',
            desc: 'A trust-forward flyer positioning EliteHome Maid Agency as the premium choice in domestic services. Distributed across residential developments and service directories, it generated direct inquiry uplift in its first month of release.',
            tags: ['Graphic Design', 'Print', 'Marketing']
        },
        {
            num: '05',
            title: 'Offices Branding',
            client: 'Synthesis Agriculture',
            year: '2026',
            desc: 'A full environmental branding rollout across Synthesis Agriculture\'s office spaces — entrance signage, and branded wall treatments. Every surface now reinforces the company\'s identity and communicates purpose to staff and visitors alike.',
            tags: ['Branding', 'Environmental Design', 'Signage']
        },
        {
            num: '06',
            title: 'Quotation Design',
            client: 'Eco Executive Stay — EcoES',
            year: '2025',
            desc: 'A branded quotation template designed to elevate client-facing communications for EcoES. Structured for clarity and speed, the design ensures every proposal reflects the premium standard the brand promises — before a single stay is booked.',
            tags: ['Document Design', 'Brand Identity', 'Print']
        },
        {
            num: '07',
            title: 'Receipt Design',
            client: 'Eco Executive Stay — EcoES',
            year: '2026',
            desc: 'A receipt design system that turns a transactional document into a branded touchpoint. Built for both digital and print delivery, it closes every stay with a polished, consistent impression that reinforces EcoES\'s commitment to quality.',
            tags: ['Document Design', 'Brand Identity', 'Print']
        },
        {
            num: '08',
            title: 'Call to Action Flyer',
            client: 'Synthesis Agriculture',
            year: '2026',
            desc: 'A direct-response flyer engineered to drive event attendance and product trial for Synthesis Agriculture\'s seasonal campaign. Strong headline hierarchy, a clear call to action, and imagery that communicates agricultural confidence and credibility.',
            tags: ['Graphic Design', 'Print', 'Campaign']
        }
    ];

    var drum = document.getElementById('projectsDrum');
    if (!drum) return;

    var cards = drum.querySelectorAll('.project-card');
    var infoInner = document.getElementById('projectsInfo');
    var numEl = document.getElementById('projNum');
    var titleEl = document.getElementById('projTitle');
    var clientEl = document.getElementById('projClient');
    var yearEl = document.getElementById('projYear');
    var descEl = document.getElementById('projDesc');
    var tagsEl = document.getElementById('projTags');
    var currentEl = document.getElementById('projCurrent');
    var prevBtn = document.getElementById('projPrev');
    var nextBtn = document.getElementById('projNext');

    var current = 0;

    // Position each card around the drum.
    // Cards use negative angle so that card i+1 starts below card i.
    // Advancing to next rotates the drum positively on X (current card exits upward,
    // next card rises from below).
    cards.forEach(function (card, i) {
        card.style.transform = 'rotateX(' + (-i * ANGLE_STEP) + 'deg) translateZ(' + RADIUS + 'px)';
    });

    function setCardOpacities() {
        cards.forEach(function (card, i) {
            var diff = ((i - current) % TOTAL + TOTAL) % TOTAL;
            var dist = Math.min(diff, TOTAL - diff);
            var opacity = dist === 0 ? 1 : dist === 1 ? 0.4 : 0.12;
            card.style.opacity = opacity;
            card.classList.toggle('active', dist === 0);
        });
    }

    function updateInfo(p) {
        numEl.textContent = p.num;
        titleEl.textContent = p.title;
        clientEl.textContent = p.client;
        yearEl.textContent = p.year;
        descEl.textContent = p.desc;
        tagsEl.innerHTML = p.tags.map(function (t) { return '<li>' + t + '</li>'; }).join('');
        currentEl.textContent = current + 1;
    }

    function goTo(index) {
        current = ((index % TOTAL) + TOTAL) % TOTAL;
        // Positive rotateX: drum tilts so current card exits upward, next rises from below
        drum.style.transform = 'rotateX(' + (current * ANGLE_STEP) + 'deg)';
        setCardOpacities();

        // Crossfade info panel
        infoInner.classList.add('is-leaving');
        setTimeout(function () {
            updateInfo(projects[current]);
            infoInner.classList.remove('is-leaving');
        }, 200);
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goTo(current - 1);
    });

    // Initialise
    setCardOpacities();
    updateInfo(projects[0]);
}());

// ── Menu overlay ────────────────────────────────────────────────
(function () {
    'use strict';

    var menuBtn = document.querySelector('.nav-button');
    var overlay = document.getElementById('navOverlay');
    var closeBtn = document.getElementById('navOverlayClose');
    if (!menuBtn || !overlay) return;

    function openMenu() {
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        menuBtn.textContent = 'Close';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        menuBtn.textContent = 'Menu';
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', function () {
        overlay.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    overlay.querySelectorAll('.nav-overlay-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });
}());
