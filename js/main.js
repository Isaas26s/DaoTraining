/* ========================================
   1° ACADEMIA DA ORLA DE MARICÁ
   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // PRELOADER
    // ========================================

    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Fallback - hide preloader after 3 seconds max
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 3000);

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ========================================
    // MOBILE NAVIGATION TOGGLE
    // ========================================

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '#hero') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // COUNTER ANIMATION
    // ========================================

    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);

                counter.textContent = current.toLocaleString('pt-BR');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('pt-BR');
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ========================================
    // AOS-LIKE SCROLL ANIMATIONS
    // ========================================

    const aosElements = document.querySelectorAll('[data-aos]');

    function checkAOSAnimations() {
        const triggerBottom = window.innerHeight * 0.85;

        aosElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                const delay = element.getAttribute('data-aos-delay') || 0;
                setTimeout(function() {
                    element.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }

    // Initial check
    checkAOSAnimations();

    // Check on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                checkAOSAnimations();

                // Animate counters when they come into view
                if (!countersAnimated) {
                    const heroStats = document.querySelector('.hero-stats');
                    if (heroStats) {
                        const statsTop = heroStats.getBoundingClientRect().top;
                        if (statsTop < window.innerHeight * 0.9) {
                            animateCounters();
                            countersAnimated = true;
                        }
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // WAVE PARTICLES ANIMATION
    // ========================================

    const waveParticles = document.getElementById('waveParticles');
    if (waveParticles) {
        // Add more particles dynamically
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('span');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 60 + 20) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            waveParticles.appendChild(particle);
        }
    }

    // ========================================
    // PARALLAX EFFECT FOR HERO
    // ========================================

    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        if (heroContent && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });

    // ========================================
    // INTERSECTION OBSERVER FOR LAZY LOADING
    // ========================================

    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // FORM VALIDATION (if forms are added)
    // ========================================

    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form handling logic here
        });
    });

    // ========================================
    // CLICK TO CALL WHATSAPP
    // ========================================

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Track WhatsApp click if analytics is implemented
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'Contact Button'
                });
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================

    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) {
                    document.querySelectorAll('.nav-link').forEach(function(link) {
                        link.classList.remove('active');
                    });
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================

    document.addEventListener('keydown', function(e) {
        // Close mobile menu on ESC
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const args = arguments;
            const context = this;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    // ========================================
    // PRINT STYLES HANDLER
    // ========================================

    window.addEventListener('beforeprint', function() {
        document.body.classList.add('print-mode');
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('print-mode');
    });

    // ========================================
    // CONSOLE BRANDING
    // ========================================

    console.log('%c🏆 1° Academia da Orla de Maricá', 'color: #c9a227; font-size: 20px; font-weight: bold;');
    console.log('%cReferência em aprovação no TAF', 'color: #8b5a2b; font-size: 14px;');
    console.log('%cWhatsApp: (21) 96418-2864', 'color: #25D366; font-size: 12px;');

});

// ========================================
// SERVICE WORKER REGISTRATION (PWA)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(error) {
        //         console.log('SW registration failed: ', error);
        //     });
    });
}