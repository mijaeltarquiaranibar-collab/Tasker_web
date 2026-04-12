/* ============================================
   MENÚ MÓVIL
   ============================================ */
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });
});

/* ============================================
   NAVBAR — SOMBRA AL HACER SCROLL
   ============================================ */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(238, 238, 238, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(238, 238, 238, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

/* ============================================
   CONTADOR ANIMADO DE ESTADÍSTICAS
   ============================================ */
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const stepTime = 2000 / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(stat => {
                animateCounter(stat, parseInt(stat.getAttribute('data-target')));
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

/* ============================================
   FILTRO DE CATEGORÍAS — CURSOS
   ============================================ */
const categoryButtons = document.querySelectorAll('.category-btn');
const courseCards = document.querySelectorAll('.course-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        courseCards.forEach(card => {
            if (category === 'todos' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => card.classList.add('hidden'), 300);
            }
        });
    });
});

/* ============================================
   ANIMACIÓN SCROLL — REVEAL
   ============================================ */
const revealElements = document.querySelectorAll('.course-card, .testimonial-card, .service-item, .product-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

/* ============================================
   FORMULARIO DE CONTACTO
   ============================================ */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

/* ============================================
   SECCIÓN ACTIVA EN NAVEGACIÓN
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   EFECTO TYPEWRITER — HERO BADGE
   ============================================ */
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
    const text = heroBadge.textContent;
    heroBadge.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroBadge.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 500);
}

/* ============================================
   FADE IN AL CARGAR LA PÁGINA
   CORRECCIÓN: se aplica la transición antes de
   poner opacity 1 para evitar el flash blanco.
   ============================================ */
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
});

// Aplicar opacity 0 antes de que cargue (en el CSS sería mejor, pero aquí lo dejamos como estaba)
document.body.style.opacity = '0';

/* ============================================
   EASTER EGG
   ============================================ */
console.log('%c¡Hola Developer! 👋', 'color: #10e2d2; font-size: 20px; font-weight: bold;');
console.log('%c¿Interesado en aprender más? Visita nuestros cursos de programación.', 'color: #141b54; font-size: 14px;');

/* ============================================
   CARRUSEL HERO
   ============================================ */
(function () {
    const slides   = Array.from(document.querySelectorAll('.carousel-slide'));
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn  = document.querySelector('.carousel-btn-prev');
    const nextBtn  = document.querySelector('.carousel-btn-next');
    const wrapper  = document.getElementById('carousel');

    if (!slides.length) return;

    let current = 0;
    let timer   = null;
    const DELAY = 4000;

    // Construir dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
        dot.addEventListener('click', () => { pauseAuto(); goTo(i); startAuto(); });
        dotsWrap.appendChild(dot);
    });

    const getDots = () => Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

    function goTo(index) {
        slides[current].classList.remove('active');
        getDots()[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        getDots()[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function startAuto() { clearInterval(timer); timer = setInterval(next, DELAY); }
    function pauseAuto() { clearInterval(timer); }

    startAuto();

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); pauseAuto(); next(); startAuto(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); pauseAuto(); prev(); startAuto(); });

    wrapper.addEventListener('mouseenter', pauseAuto);
    wrapper.addEventListener('mouseleave', startAuto);

    // CORRECCIÓN: el click en el carrusel ya NO abre el lightbox aquí.
    // El lightbox se maneja en el bloque unificado de más abajo,
    // que cubre tanto galería como productos como el carrusel del hero.
    // El carrusel del hero sí abre el lightbox pero a través del delegado general.
    wrapper.addEventListener('click', () => {
        const img = slides[current].querySelector('img');
        if (!img || !img.src) return;
        openLightbox(img.src, slides[current].dataset.caption || '');
        pauseAuto();
    });

    // Swipe táctil
    let touchStartX = 0;
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    wrapper.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { pauseAuto(); dx < 0 ? next() : prev(); startAuto(); }
    }, { passive: true });
})();

/* ============================================
   MODALES DE DESCRIPCIÓN DE CURSOS
   ============================================ */
(function () {
    function closeModal(overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.course-title-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.getElementById(btn.getAttribute('data-modal'));
            if (!modal) return;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelectorAll('.course-modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeModal(closeBtn.closest('.course-modal-overlay'));
        });
    });

    document.querySelectorAll('.course-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.course-modal-overlay.open');
            if (openModal) closeModal(openModal);
        }
    });

    // Al hacer click en "Consultar Inscripción" dentro del modal, cerrarlo
    document.querySelectorAll('.course-modal-cta').forEach(cta => {
        cta.addEventListener('click', () => {
            const openModal = document.querySelector('.course-modal-overlay.open');
            if (openModal) closeModal(openModal);
        });
    });
})();

/* ============================================
   GALERÍA — SLIDER + FILTROS
   ============================================ */
(function () {
    const slider       = document.getElementById('gallerySlider');
    const dotsWrap     = document.getElementById('galleryDots');
    const prevBtn      = document.querySelector('.gallery-slider-prev');
    const nextBtn      = document.querySelector('.gallery-slider-next');
    const currentLabel = document.getElementById('galleryCurrentSlide');
    const totalLabel   = document.getElementById('galleryTotalSlides');
    const filterBtns   = document.querySelectorAll('.gallery-filter-btn');

    if (!slider) return;

    const allSlides = Array.from(slider.querySelectorAll('.gallery-slide'));
    let visibleSlides = [...allSlides];
    let currentIdx    = 0;
    let autoTimer     = null;
    const AUTO_DELAY  = 5000;

    function buildDots() {
        dotsWrap.innerHTML = '';
        visibleSlides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-slider-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
            dot.addEventListener('click', () => { pauseAuto(); goTo(i); startAuto(); });
            dotsWrap.appendChild(dot);
        });
    }

    function updateTrack() {
        allSlides.forEach(s => {
            s.style.display = 'none';
            s.style.minWidth = '';
        });
        visibleSlides.forEach(s => {
            s.style.display = 'block';
            s.style.minWidth = '100%';
        });
        slider.style.transform = `translateX(-${currentIdx * 100}%)`;
    }

    function updateDots() {
        Array.from(dotsWrap.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIdx);
        });
    }

    function updateCounter() {
        if (currentLabel) currentLabel.textContent = currentIdx + 1;
        if (totalLabel)   totalLabel.textContent   = visibleSlides.length;
    }

    function goTo(index) {
        currentIdx = (index + visibleSlides.length) % visibleSlides.length;
        updateTrack();
        updateDots();
        updateCounter();
    }

    function next() { goTo(currentIdx + 1); }
    function prev() { goTo(currentIdx - 1); }
    function startAuto() { clearInterval(autoTimer); autoTimer = setInterval(next, AUTO_DELAY); }
    function pauseAuto()  { clearInterval(autoTimer); }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            visibleSlides = filter === 'todos'
                ? [...allSlides]
                : allSlides.filter(s => s.getAttribute('data-filter-cat') === filter);

            currentIdx = 0;
            buildDots();
            updateTrack();
            updateCounter();
            pauseAuto();
            startAuto();
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => { pauseAuto(); prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { pauseAuto(); next(); startAuto(); });

    let touchStartX = 0;
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { pauseAuto(); dx < 0 ? next() : prev(); startAuto(); }
    }, { passive: true });

    slider.addEventListener('mouseenter', pauseAuto);
    slider.addEventListener('mouseleave', startAuto);

    buildDots();
    updateTrack();
    updateCounter();
    startAuto();
})();

/* ============================================
   LIGHTBOX UNIFICADO (galería, productos y carrusel hero)
   CORRECCIÓN: bloque único que maneja body.overflow
   correctamente en todos los casos, incluido Escape.
   ============================================ */
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lightboxImg');
const lbCaption = document.getElementById('lightboxCaption');
const lbClose   = document.getElementById('lightboxClose');

function openLightbox(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption || '';
    lbCaption.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = ''; // CORRECCIÓN: siempre se restaura
    lbImg.src = '';                     // Liberar memoria
}

// Delegado para galería y productos (data-lightbox)
document.addEventListener('click', (e) => {
    // Evitar que se active al hacer click en botones de navegación del slider
    if (e.target.closest('.gallery-slider-btn')) return;
    if (e.target.closest('.carousel-btn')) return;

    const target = e.target.closest('[data-lightbox]');
    if (!target) return;

    e.stopPropagation();
    openLightbox(target.dataset.lightbox, target.dataset.caption);
});

if (lbClose) lbClose.addEventListener('click', closeLightbox);

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// CORRECCIÓN: Escape cierra el lightbox Y restaura body.overflow
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
        closeLightbox();
    }
});

/* ============================================
   REPRODUCTOR DE VIDEOS — ASESORÍA
   ============================================ */
(function () {
    const video        = document.getElementById('advisoryVideo');
    const progressFill = document.getElementById('videoProgressFill');
    const dotsWrap     = document.getElementById('videoDots');
    const playerWrap   = video ? video.closest('.video-player-wrap') : null;

    if (!video || !playerWrap) return;

    // Lista de videos — agrega aquí tus archivos
    const videos = [
        { src: 'videos/video1.mp4' },
        { src: 'videos/video2.mp4' },
        { src: 'videos/video3.mp4' },
        { src: 'videos/video4.mp4' },
        { src: 'videos/video5.mp4' },
        // { src: 'videos/video4.mp4' },
    ];

    let current = 0;
    let rafId   = null;

    // Construir dots
    videos.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'video-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Video ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    function getDots() {
        return Array.from(dotsWrap.querySelectorAll('.video-dot'));
    }

    function updateDots() {
        getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function updateProgress() {
        if (!video.duration) return;
        progressFill.style.width = (video.currentTime / video.duration * 100) + '%';
        rafId = requestAnimationFrame(updateProgress);
    }

    function goTo(index) {
        cancelAnimationFrame(rafId);
        playerWrap.classList.add('fading');

        setTimeout(() => {
            current = (index + videos.length) % videos.length;
            video.src = videos[current].src;
            video.load();
            video.play().catch(() => {});
            updateDots();
            progressFill.style.width = '0%';
            playerWrap.classList.remove('fading');
            rafId = requestAnimationFrame(updateProgress);
        }, 300);
    }

    video.addEventListener('ended', () => goTo(current + 1));

    goTo(0);
})();