/* =====================================================
   VZ CONCEPT - main.js
   Minimale, progressive JavaScript-Logik
   ===================================================== */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const dropdownItems = document.querySelectorAll('.nav__item--dropdown');

  function handleScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  function closeDropdowns() {
    dropdownItems.forEach(function (item) {
      item.classList.remove('open');
      const trigger = item.querySelector('.nav__dropdown-trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      if (!isOpen) {
        closeDropdowns();
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav__link, .nav__dropdown-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (link.classList.contains('nav__dropdown-trigger')) {
          return;
        }
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        closeDropdowns();
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (!nav || nav.contains(e.target)) return;
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeDropdowns();
      document.body.style.overflow = '';
    });
  }

  dropdownItems.forEach(function (item) {
    const trigger = item.querySelector('.nav__dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const shouldOpen = !item.classList.contains('open');
      closeDropdowns();
      if (shouldOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDropdowns();
        trigger.focus();
      }
    });
  });

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link[href]').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    btn.setAttribute('aria-expanded', 'false');
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Skip empty/single-hash hrefs (z.B. JS-Trigger wie Cookie-Einstellungen)
      if (!href || href === '#' || href.length <= 1) return;
      let target = null;
      try {
        target = document.querySelector(href);
      } catch (err) {
        return;
      }
      if (target) {
        e.preventDefault();
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setMotionDelay(elements, step, start) {
    elements.forEach(function (el, index) {
      el.style.setProperty('--motion-delay', (start + index * step) + 'ms');
    });
  }

  function initHomeMotion() {
    const hero = document.querySelector('.v4-hero');
    const revealEls = document.querySelectorAll(
      '.service-card, .zielgruppe-card, .testimonial-card, .process-step, .fact, .stat-item, .about-hero__inner, .about-proof__item, .about-section__head, .about-story__media, .about-chapter, .about-pullquote, .about-principle, .about-cv-item, .about-focus-item, .about-cta__inner, .v4-partners__top, .partner-marquee, .v4-section-head, .v4-split > *, .v4-compare__side, .v4-offer-card, .v4-center-cta, .v4-proof-image, .v4-why__bio, .v4-proof-points div, .v4-stats__card, .v4-process article, .v4-testimonials article, .v4-faq-panel, .v4-final-cta .v4-hero__actions'
    );

    if (reduceMotion) {
      document.documentElement.classList.add('motion-reduced');
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
      if (hero) hero.classList.add('is-visible');
      return;
    }

    document.documentElement.classList.add('motion-ready');

    if (hero) {
      const heroParts = hero.querySelectorAll('.v4-eyebrow, .v4-hero__title, .v4-hero__text, .v4-hero__actions, .v4-hero__note, .v4-hero__visual');
      setMotionDelay(Array.from(heroParts), 90, 80);
      setMotionDelay(Array.from(hero.querySelectorAll('.v4-hero__title span')), 110, 220);
      window.requestAnimationFrame(function () {
        hero.classList.add('is-visible');
      });
    }

    revealEls.forEach(function (el) {
      el.classList.add('reveal-item');
    });

    document.querySelectorAll('.v4-situation-list, .v4-offer-grid, .v4-proof-points, .v4-why__stats, .v4-process, .v4-testimonials').forEach(function (group) {
      setMotionDelay(Array.from(group.children), 70, 0);
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  function initCountUp() {
    const values = document.querySelectorAll('.v4-stats__value[data-count]');
    if (!values.length) return;

    const formatValue = function (value, decimals) {
      const fixed = value.toFixed(decimals);
      return decimals > 0 ? fixed.replace('.', ',') : fixed;
    };

    const animateValue = function (el) {
      if (el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';

      const target = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      const plus = el.querySelector('.v4-stats__plus');
      const duration = reduceMotion ? 400 : 1400;
      const startTime = performance.now();

      const tick = function (now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        const text = formatValue(current, decimals);

        if (plus) {
          el.firstChild.nodeValue = text;
        } else {
          el.textContent = text;
        }

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else if (plus) {
          el.firstChild.nodeValue = formatValue(target, decimals);
        } else {
          el.textContent = formatValue(target, decimals);
        }
      };

      window.requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateValue(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      values.forEach(function (el) {
        countObserver.observe(el);
      });
    } else {
      values.forEach(animateValue);
    }
  }

  function initHeroDepth() {
    const hero = document.querySelector('.v4-hero');
    if (!hero || reduceMotion) return;

    let ticking = false;

    const update = function () {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      hero.style.setProperty('--hero-content-shift', (-progress * 18).toFixed(2) + 'px');
      hero.style.setProperty('--hero-visual-shift', (progress * 26).toFixed(2) + 'px');
      hero.style.setProperty('--hero-glow-shift', (progress * 38).toFixed(2) + 'px');
      ticking = false;
    };

    const requestUpdate = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();
  }

  document.querySelectorAll('.grid-2, .grid-3, .grid-4').forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  initHomeMotion();
  initCountUp();
  initHeroDepth();
})();
