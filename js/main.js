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
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const animEls = document.querySelectorAll(
      '.service-card, .zielgruppe-card, .testimonial-card, .process-step, .fact, .stat-item'
    );

    animEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.querySelectorAll('.grid-2, .grid-3, .grid-4').forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });
})();
