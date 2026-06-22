/* ================================================
   SAKURA DATABASE APP — Main Script
   3D Petals · Book UI · Page Transitions
   ================================================ */

(function () {
    'use strict';

    /* -------- Chapter / Project Data -------- */
    const BOOK_DATA = {
        manual: {
            label: 'MANUAL',
            coverTitle: 'Database<br>Manual',
            coverSubtitle: 'Course Recap — Babeș-Bolyai University',
            pageHeader: 'Table of Contents',
            pageSubtitle: 'Select a chapter to begin your revision journey',
            chapters: [
                {
                    id: 'course-recap',
                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
                    title: 'Course Recap Explained',
                    desc: 'All course essentials from Babeș-Bolyai, spanning both semesters — from foundational SQL and relational design to Database Management Systems, platform connectivity, and hands-on SupaBase utilities.',
                },
                {
                    id: 'seminar-labs',
                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
                    title: 'Seminars & Laboratories',
                    desc: 'Every seminar and lab exercise solved step-by-step with thorough explanations, covering practical SQL writing, query optimization, stored procedures, and real-world scenarios.',
                },
                {
                    id: 'exam-papers',
                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`,
                    title: 'Exam Papers & Solutions',
                    desc: 'Curated exam essentials focusing on the raw coding challenges — practical SQL problems, query construction, and schema design questions with complete worked solutions.',
                },
            ],
        },
        building: {
            label: 'BUILDING',
            coverTitle: 'Database<br>Projects',
            coverSubtitle: 'Hands-on Building — Practical Applications',
            pageHeader: 'Project Catalogue',
            pageSubtitle: 'Choose a project to explore its implementation',
            chapters: [
                {
                    id: 'restaurant',
                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
                    title: 'Restaurant Management',
                    desc: 'A complete restaurant management system — dish catalogues, client reservations, order tracking, and interactive sales statistics with plotted charts and analytics.',
                },
                {
                    id: 'bank',
                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="8" y1="10" x2="8" y2="21"/><line x1="12" y1="10" x2="12" y2="21"/><line x1="16" y1="10" x2="16" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>`,
                    title: 'Bank Management',
                    desc: 'Full-featured banking system with customer accounts, transaction processing, balance inquiries, loan management, transfer history, and financial reporting dashboards.',
                },
                {
                    id: 'student-records',
                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>`,
                    title: 'Student Records System',
                    desc: 'Academic records platform managing student enrollment, course registration, grade tracking, GPA calculations, and semester performance visualizations.',
                },
            ],
        },
    };

    /* -------- DOM References -------- */
    const introSection     = document.getElementById('intro-section');
    const bookOverlay      = document.getElementById('book-overlay');
    const book             = document.getElementById('book');
    const bookCoverFront   = document.getElementById('book-cover-front');
    const bookPages        = document.getElementById('book-pages');
    const pageContent      = document.getElementById('page-content');
    const bookCloseBtn     = document.getElementById('book-close-btn');
    const bookLabel        = document.getElementById('book-label');
    const bookTitle        = document.getElementById('book-title');
    const bookSubtitle     = document.getElementById('book-subtitle');
    const fadeOverlay      = document.getElementById('fade-overlay');
    const contentPage      = document.getElementById('content-page');
    const placeholderTitle  = document.getElementById('placeholder-title');
    const backBtn          = document.getElementById('back-btn');
    const navManual        = document.getElementById('nav-manual');
    const navBuilding      = document.getElementById('nav-building');
    const btnManual        = document.getElementById('btn-manual');
    const btnBuilding      = document.getElementById('btn-building');
    const navHome          = document.getElementById('nav-home');
    const creditsFooter    = document.getElementById('credits-footer');

    let currentBookType = null;  // 'manual' | 'building'

    /* ========================================
       BOOK — Open / Close / Navigate
       ======================================== */

    function openBook(type) {
        currentBookType = type;
        const data = BOOK_DATA[type];

        // Update cover text
        bookLabel.textContent = data.label;
        bookTitle.innerHTML = data.coverTitle;
        bookSubtitle.textContent = data.coverSubtitle;

        // Build chapter page
        buildPageContent(data);

        // Highlight correct nav
        navManual.classList.toggle('active', type === 'manual');
        navBuilding.classList.toggle('active', type === 'building');

        // Hide intro, show overlay
        introSection.classList.add('hidden');
        bookOverlay.classList.add('visible');

        // Auto-open cover after a moment
        setTimeout(() => {
            book.classList.add('open');
        }, 600);
    }

    function closeBook() {
        book.classList.remove('open');
        setTimeout(() => {
            bookOverlay.classList.remove('visible');
            introSection.classList.remove('hidden');
            navManual.classList.add('active');
            navBuilding.classList.remove('active');
            currentBookType = null;
        }, 500);
    }

    function buildPageContent(data) {
        pageContent.innerHTML = `
            <div class="page-header">${data.pageHeader}</div>
            <p class="page-subtitle">${data.pageSubtitle}</p>
            <div class="chapter-list">
                ${data.chapters.map((ch, i) => `
                    <div class="chapter-item" data-chapter-id="${ch.id}" data-chapter-title="${ch.title}">
                        <span class="chapter-number">${String(i + 1).padStart(2, '0')}</span>
                        <div class="chapter-icon">${ch.icon}</div>
                        <div class="chapter-title">${ch.title}</div>
                        <div class="chapter-desc">${ch.desc}</div>
                        <div class="chapter-arrow">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Attach click handlers to chapters
        pageContent.querySelectorAll('.chapter-item').forEach(item => {
            item.addEventListener('click', () => {
                const title = item.dataset.chapterTitle;
                navigateToContent(title);
            });
        });
    }

    function navigateToContent(title) {
        // Close book
        book.classList.remove('open');

        // After cover starts closing, trigger fade
        setTimeout(() => {
            fadeOverlay.classList.add('active');
        }, 300);

        // After fade is solid, swap views
        setTimeout(() => {
            bookOverlay.classList.remove('visible');
            placeholderTitle.textContent = title;
            contentPage.classList.add('visible');
            creditsFooter.style.zIndex = '850';

            // Lift fade
            setTimeout(() => {
                fadeOverlay.classList.remove('active');
            }, 200);
        }, 900);
    }

    function navigateBack() {
        fadeOverlay.classList.add('active');
        setTimeout(() => {
            contentPage.classList.remove('visible');
            creditsFooter.style.zIndex = '100';
            // Re-open book
            bookOverlay.classList.add('visible');
            setTimeout(() => {
                fadeOverlay.classList.remove('active');
                book.classList.add('open');
            }, 200);
        }, 600);
    }

    function goHome() {
        // Close everything, return to intro
        fadeOverlay.classList.add('active');
        setTimeout(() => {
            contentPage.classList.remove('visible');
            bookOverlay.classList.remove('visible');
            book.classList.remove('open');
            creditsFooter.style.zIndex = '100';
            introSection.classList.remove('hidden');
            navManual.classList.add('active');
            navBuilding.classList.remove('active');
            currentBookType = null;
            setTimeout(() => fadeOverlay.classList.remove('active'), 200);
        }, 500);
    }

    /* -------- Event Listeners -------- */
    // Nav buttons
    navManual.addEventListener('click', (e) => {
        e.preventDefault();
        if (contentPage.classList.contains('visible')) {
            // If on content page, go to manual book
            fadeOverlay.classList.add('active');
            setTimeout(() => {
                contentPage.classList.remove('visible');
                creditsFooter.style.zIndex = '100';
                openBook('manual');
                setTimeout(() => fadeOverlay.classList.remove('active'), 200);
            }, 500);
        } else if (currentBookType === 'manual') {
            return; // already here
        } else {
            if (bookOverlay.classList.contains('visible')) {
                book.classList.remove('open');
                setTimeout(() => openBook('manual'), 400);
            } else {
                openBook('manual');
            }
        }
    });

    navBuilding.addEventListener('click', (e) => {
        e.preventDefault();
        if (contentPage.classList.contains('visible')) {
            fadeOverlay.classList.add('active');
            setTimeout(() => {
                contentPage.classList.remove('visible');
                creditsFooter.style.zIndex = '100';
                openBook('building');
                setTimeout(() => fadeOverlay.classList.remove('active'), 200);
            }, 500);
        } else if (currentBookType === 'building') {
            return;
        } else {
            if (bookOverlay.classList.contains('visible')) {
                book.classList.remove('open');
                setTimeout(() => openBook('building'), 400);
            } else {
                openBook('building');
            }
        }
    });

    // Hero buttons
    btnManual.addEventListener('click', (e) => { e.preventDefault(); openBook('manual'); });
    btnBuilding.addEventListener('click', (e) => { e.preventDefault(); openBook('building'); });

    // Close / Back / Home
    bookCloseBtn.addEventListener('click', closeBook);
    backBtn.addEventListener('click', navigateBack);
    navHome.addEventListener('click', goHome);

    // Click cover to open it
    bookCoverFront.addEventListener('click', () => {
        if (!book.classList.contains('open')) {
            book.classList.add('open');
        }
    });


    /* ========================================
       3D SAKURA PETALS
       ======================================== */
    const canvas = document.getElementById('sakura-canvas');
    const ctx = canvas.getContext('2d');
    let W, H;
    const petals = [];
    const PETAL_COUNT = 50;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const petalColors = [
        'rgba(244, 114, 182, 0.55)',
        'rgba(249, 168, 212, 0.45)',
        'rgba(252, 231, 243, 0.4)',
        'rgba(236, 72, 153, 0.3)',
        'rgba(251, 207, 232, 0.45)',
        'rgba(167, 139, 250, 0.25)',
    ];

    class Petal {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : -20;
            this.z = Math.random() * 3 + 1;
            this.size = (Math.random() * 8 + 6) * (this.z / 3);
            this.speedY = (Math.random() * 0.6 + 0.3) * (this.z / 2);
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            this.rotationX = Math.random() * Math.PI;
            this.rotationXSpeed = (Math.random() - 0.5) * 0.02;
            this.wobblePhase = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.opacity = (Math.random() * 0.5 + 0.3) * (this.z / 4);
        }
        update() {
            this.wobblePhase += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobblePhase) * 0.5;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            this.rotationX += this.rotationXSpeed;
            if (this.y > H + 20 || this.x < -30 || this.x > W + 30) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            const scaleY = Math.abs(Math.cos(this.rotationX));
            ctx.scale(1, scaleY * 0.8 + 0.2);
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.fillStyle = this.color;
            const s = this.size;
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(s * 0.3, -s * 0.4, s * 0.7, -s * 0.5, s * 0.5, 0);
            ctx.bezierCurveTo(s * 0.7, s * 0.5, s * 0.3, s * 0.4, 0, 0);
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-s * 0.3, -s * 0.4, -s * 0.7, -s * 0.5, -s * 0.5, 0);
            ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.3, s * 0.4, 0, 0);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.arc(0, -s * 0.1, s * 0.15, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal());
    petals.sort((a, b) => a.z - b.z);

    function animatePetals() {
        ctx.clearRect(0, 0, W, H);
        for (const p of petals) { p.update(); p.draw(); }
        requestAnimationFrame(animatePetals);
    }
    animatePetals();


    /* ========================================
       TECH PARTICLES
       ======================================== */
    const particleContainer = document.getElementById('tech-particles');
    const techSymbols = [
        'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'WHERE', 'FROM',
        'CREATE', 'TABLE', 'INDEX', 'VIEW', 'ALTER', '{  }', '< />',
        '0101', '1010', 'NULL', 'KEY',
    ];

    const techStyle = document.createElement('style');
    techStyle.textContent = `
        @keyframes techFloat {
            0%   { transform: translateY(-30px) rotate(0deg); opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { transform: translateY(${window.innerHeight + 50}px) rotate(8deg); opacity: 0; }
        }
    `;
    document.head.appendChild(techStyle);

    for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.textContent = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        const sz = Math.random() * 4 + 10;
        el.style.cssText = `
            position:absolute;
            left:${Math.random()*100}%;
            top:-30px;
            font-family:'Courier New',monospace;
            font-size:${sz}px;
            font-weight:600;
            color:rgba(167,139,250,${Math.random()*0.1+0.04});
            pointer-events:none;
            animation:techFloat ${Math.random()*25+20}s linear ${Math.random()*15}s infinite;
            white-space:nowrap; user-select:none;
        `;
        particleContainer.appendChild(el);
    }


    /* ========================================
       MOUSE PARALLAX on floating icons
       ======================================== */
    const floatIcons = document.querySelectorAll('.float-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / W - 0.5) * 2;
        const y = (e.clientY / H - 0.5) * 2;
        floatIcons.forEach((icon, i) => {
            const f = (i + 1) * 8;
            icon.style.transform = `translate(${x * f}px, ${y * f}px)`;
        });
    });


    /* ========================================
       NAV RIPPLE
       ======================================== */
    const ripStyle = document.createElement('style');
    ripStyle.textContent = `@keyframes rippleEffect { to { transform:scale(40); opacity:0; } }`;
    document.head.appendChild(ripStyle);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const r = document.createElement('span');
            r.style.cssText = `
                position:absolute; width:5px; height:5px; border-radius:50%;
                background:rgba(244,114,182,0.4); transform:scale(0);
                animation:rippleEffect .6s ease-out forwards;
                left:${e.offsetX}px; top:${e.offsetY}px;
            `;
            link.appendChild(r);
            setTimeout(() => r.remove(), 600);
        });
    });

})();
