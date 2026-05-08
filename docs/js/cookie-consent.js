/* =====================================================
   VZ Concept — DSGVO-konformer Cookie-Consent Manager
   Selbstgehostet, ohne externe Abhängigkeiten

   API:
     window.cookieConsent.has('statistik')     → boolean
     window.cookieConsent.has('marketing')     → boolean
     window.cookieConsent.show()               → öffnet Einstellungen erneut
     window.cookieConsent.reset()              → Consent zurücksetzen

   Tools werden konditional geladen — siehe loadTools() unten.
   ===================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'vz_consent_v1';
  const CONSENT_VERSION = 1;
  const VALIDITY_DAYS = 365;

  const CATEGORIES = [
    {
      key: 'necessary',
      name: 'Notwendig',
      desc: 'Technisch erforderlich für die Funktion der Website. Speichert deine Cookie-Einstellungen lokal in deinem Browser. Diese Kategorie kann nicht deaktiviert werden.',
      required: true,
    },
    {
      key: 'statistik',
      name: 'Statistik',
      desc: 'Hilft uns zu verstehen, wie Besucher die Website nutzen, damit wir sie verbessern können (z. B. Google Analytics). Daten werden anonymisiert ausgewertet.',
      required: false,
    },
    {
      key: 'marketing',
      name: 'Marketing',
      desc: 'Wird verwendet, um dir relevante Werbung auf anderen Plattformen zu zeigen (z. B. Meta Pixel, Google Ads). Wir und unsere Partner können dadurch Conversion-Tracking durchführen.',
      required: false,
    },
  ];

  // ── State ─────────────────────────────────────────────
  let consent = loadConsent();

  function loadConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== CONSENT_VERSION) return null;
      // Validity check
      const ageMs = Date.now() - new Date(data.timestamp).getTime();
      if (ageMs > VALIDITY_DAYS * 86400000) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(choices) {
    const data = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      choices: { necessary: true, ...choices },
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
    consent = data;
    loadTools();
  }

  // ── Public API ────────────────────────────────────────
  window.cookieConsent = {
    has: function (category) {
      if (!consent) return false;
      return !!consent.choices[category];
    },
    show: function () {
      openModal();
    },
    reset: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      consent = null;
      showBanner();
    },
  };

  // ── Tool-Loader ──────────────────────────────────────
  // Hier werden Tracking-Tools konditional nachgeladen.
  // Wenn ein neues Tool dazukommt: hier integrieren.
  let toolsLoaded = { statistik: false, marketing: false };

  function loadTools() {
    if (!consent) return;

    // === STATISTIK ============================================
    // Google Analytics 4 — Beispiel, einkommentieren wenn aktiv:
    // if (consent.choices.statistik && !toolsLoaded.statistik) {
    //   toolsLoaded.statistik = true;
    //   const GA_ID = 'G-XXXXXXXXXX';
    //   const s = document.createElement('script');
    //   s.async = true;
    //   s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    //   document.head.appendChild(s);
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){ dataLayer.push(arguments); }
    //   window.gtag = gtag;
    //   gtag('js', new Date());
    //   gtag('config', GA_ID, { anonymize_ip: true });
    // }

    // === MARKETING ============================================
    // Meta Pixel — Beispiel, einkommentieren wenn aktiv:
    // if (consent.choices.marketing && !toolsLoaded.marketing) {
    //   toolsLoaded.marketing = true;
    //   const PIXEL_ID = 'XXXXXXXXXXXXXXXX';
    //   !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    //   n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    //   t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    //   document,'script','https://connect.facebook.net/en_US/fbevents.js');
    //   fbq('init', PIXEL_ID);
    //   fbq('track', 'PageView');
    // }

    // === GOOGLE ADS CONVERSION TRACKING =======================
    // if (consent.choices.marketing && !toolsLoaded.marketing) { ... }
  }

  // ── UI Rendering ──────────────────────────────────────
  function buildBanner() {
    const banner = document.createElement('div');
    banner.className = 'vz-cc';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'vz-cc-title');
    banner.setAttribute('aria-describedby', 'vz-cc-desc');
    banner.innerHTML = `
      <div class="vz-cc__panel" role="document">
        <div class="vz-cc__header">
          <h3 id="vz-cc-title" class="vz-cc__title">Cookies &amp; Datenschutz</h3>
        </div>
        <p id="vz-cc-desc" class="vz-cc__text">
          Wir nutzen Cookies und ähnliche Technologien, um die Website zu verbessern und dir relevante Inhalte anzuzeigen. Mit „Alle akzeptieren" stimmst du allen Kategorien zu. Du kannst deine Auswahl jederzeit unter <em>Einstellungen</em> anpassen.
        </p>
        <div class="vz-cc__actions">
          <button type="button" class="vz-cc__btn vz-cc__btn--secondary" data-action="reject">Nur Notwendige</button>
          <button type="button" class="vz-cc__btn vz-cc__btn--ghost" data-action="settings">Einstellungen</button>
          <button type="button" class="vz-cc__btn vz-cc__btn--primary" data-action="accept-all">Alle akzeptieren</button>
        </div>
        <p class="vz-cc__legal">
          Mehr erfährst du in unserer <a href="datenschutz.html">Datenschutzerklärung</a> und im <a href="impressum.html">Impressum</a>.
        </p>
      </div>
    `;
    return banner;
  }

  function buildModal() {
    const modal = document.createElement('div');
    modal.className = 'vz-cc-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'vz-cc-modal-title');

    const togglesHtml = CATEGORIES.map(cat => `
      <div class="vz-cc-cat">
        <div class="vz-cc-cat__head">
          <h4 class="vz-cc-cat__name">${cat.name}</h4>
          <label class="vz-cc-toggle ${cat.required ? 'vz-cc-toggle--required' : ''}">
            <input type="checkbox" data-cat="${cat.key}" ${cat.required ? 'checked disabled' : ''}>
            <span class="vz-cc-toggle__track" aria-hidden="true"></span>
            <span class="vz-cc-toggle__label">${cat.required ? 'Immer aktiv' : 'Optional'}</span>
          </label>
        </div>
        <p class="vz-cc-cat__desc">${cat.desc}</p>
      </div>
    `).join('');

    modal.innerHTML = `
      <div class="vz-cc-modal__backdrop" data-action="close"></div>
      <div class="vz-cc-modal__panel" role="document">
        <header class="vz-cc-modal__header">
          <h3 id="vz-cc-modal-title" class="vz-cc-modal__title">Cookie-Einstellungen</h3>
          <button type="button" class="vz-cc-modal__close" data-action="close" aria-label="Schließen">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </header>
        <div class="vz-cc-modal__body">
          <p class="vz-cc-modal__intro">Du kannst hier auswählen, welche Kategorien du zulassen möchtest. „Notwendig" ist immer aktiv, weil sie für die Funktion der Website erforderlich ist.</p>
          <div class="vz-cc-cats">${togglesHtml}</div>
        </div>
        <footer class="vz-cc-modal__footer">
          <button type="button" class="vz-cc__btn vz-cc__btn--secondary" data-action="reject">Nur Notwendige</button>
          <button type="button" class="vz-cc__btn vz-cc__btn--primary" data-action="save-selection">Auswahl speichern</button>
          <button type="button" class="vz-cc__btn vz-cc__btn--primary" data-action="accept-all">Alle akzeptieren</button>
        </footer>
      </div>
    `;
    return modal;
  }

  // ── Banner-Logik ──────────────────────────────────────
  let bannerEl = null;
  let modalEl = null;

  function showBanner() {
    if (bannerEl) return;
    bannerEl = buildBanner();
    document.body.appendChild(bannerEl);
    // Doppeltes rAF erzwingt Reflow → Transition feuert zuverlässig
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (bannerEl) bannerEl.classList.add('vz-cc--visible');
      });
    });
    bannerEl.addEventListener('click', onBannerClick);
  }

  function hideBanner() {
    if (!bannerEl) return;
    bannerEl.classList.remove('vz-cc--visible');
    setTimeout(() => {
      if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
      bannerEl = null;
    }, 350);
  }

  function onBannerClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'accept-all') {
      saveConsent({ statistik: true, marketing: true });
      hideBanner();
    } else if (action === 'reject') {
      saveConsent({ statistik: false, marketing: false });
      hideBanner();
    } else if (action === 'settings') {
      hideBanner();
      openModal();
    }
  }

  function openModal() {
    if (modalEl) return;
    modalEl = buildModal();
    document.body.appendChild(modalEl);
    document.body.style.overflow = 'hidden';

    // Pre-fill aus aktuellem Consent
    if (consent) {
      modalEl.querySelectorAll('input[data-cat]').forEach(input => {
        const cat = input.dataset.cat;
        if (cat === 'necessary') return;
        input.checked = !!consent.choices[cat];
      });
    }

    modalEl.addEventListener('click', onModalClick);
    document.addEventListener('keydown', onModalKey);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (modalEl) modalEl.classList.add('vz-cc-modal--visible');
      });
    });
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('vz-cc-modal--visible');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onModalKey);
    setTimeout(() => {
      if (modalEl && modalEl.parentNode) modalEl.parentNode.removeChild(modalEl);
      modalEl = null;
    }, 300);
  }

  function onModalClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'close') {
      closeModal();
    } else if (action === 'accept-all') {
      saveConsent({ statistik: true, marketing: true });
      closeModal();
    } else if (action === 'reject') {
      saveConsent({ statistik: false, marketing: false });
      closeModal();
    } else if (action === 'save-selection') {
      const choices = {};
      modalEl.querySelectorAll('input[data-cat]').forEach(input => {
        const cat = input.dataset.cat;
        if (cat === 'necessary') return;
        choices[cat] = input.checked;
      });
      saveConsent(choices);
      closeModal();
    }
  }

  function onModalKey(e) {
    if (e.key === 'Escape') closeModal();
  }

  // ── Init ─────────────────────────────────────────────
  function init() {
    if (consent) {
      // Bereits Consent vorhanden → Tools laden
      loadTools();
    } else {
      // Banner zeigen (erst nach DOM-Ready)
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBanner);
      } else {
        showBanner();
      }
    }
  }

  init();
})();
