/* VZ Concept – Einwilligungen nur für tatsächlich konfigurierte Messdienste. */
(function () {
  'use strict';

  const STORAGE_KEY = 'vz_consent_v2';
  const VALIDITY_MS = 180 * 24 * 60 * 60 * 1000;
  const config = window.VZ_MEASUREMENT || {};
  const categories = [];

  if (config.enabled && /^G-[A-Z0-9]+$/i.test(config.ga4Id || '')) {
    categories.push({ key: 'statistik', title: 'Statistik', text: 'Hilft uns, die Nutzung der Website in zusammengefasster Form zu verstehen.' });
  }
  if (config.enabled && (/^AW-[0-9]+$/.test(config.googleAdsId || '') || /^[0-9]{5,}$/.test(config.metaPixelId || ''))) {
    categories.push({ key: 'marketing', title: 'Marketing', text: 'Misst, ob Anzeigen zu einer Anfrage oder Terminbuchung führen.' });
  }

  let consent = readConsent();
  let dialog = null;
  let previousFocus = null;

  function readConsent() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!value || Date.now() - Date.parse(value.savedAt) > VALIDITY_MS) return null;
      return value;
    } catch (error) {
      return null;
    }
  }

  function saveConsent(choices) {
    consent = { savedAt: new Date().toISOString(), choices: Object.assign({ necessary: true }, choices) };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch (error) {}
    window.dispatchEvent(new CustomEvent('vz:consent', { detail: consent.choices }));
    closeDialog();
  }

  function buildDialog(showInactiveState) {
    const root = document.createElement('div');
    root.className = 'consent-dialog';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'consent-title');

    const options = categories.map(function (category) {
      const checked = consent && consent.choices && consent.choices[category.key] ? ' checked' : '';
      return '<label class="consent-option"><span><strong>' + category.title + '</strong><small>' + category.text + '</small></span><input type="checkbox" data-consent-category="' + category.key + '"' + checked + '></label>';
    }).join('');

    root.innerHTML = '<div class="consent-dialog__backdrop" data-consent-close></div>' +
      '<section class="consent-dialog__panel"><button class="consent-dialog__close" type="button" data-consent-close aria-label="Einstellungen schließen">×</button>' +
      '<p class="section-label">Datenschutz</p><h2 id="consent-title">Cookie-Einstellungen</h2>' +
      (showInactiveState ? '<p>Aktuell sind keine Analyse- oder Marketingdienste aktiviert. Technisch notwendige Funktionen laufen ohne Werbetracking.</p>' : '<p>Du entscheidest, welche optionalen Messdienste geladen werden. Deine Auswahl kannst du jederzeit ändern.</p>' + options) +
      '<div class="consent-dialog__actions">' +
      (showInactiveState ? '<button class="btn btn--primary" type="button" data-consent-close>Verstanden</button>' : '<button class="btn btn--outline" type="button" data-consent-reject>Nur notwendig</button><button class="btn btn--primary" type="button" data-consent-save>Auswahl speichern</button><button class="btn btn--ghost" type="button" data-consent-all>Alle akzeptieren</button>') +
      '</div><p class="consent-dialog__legal"><a href="datenschutz" data-no-campaign="true">Datenschutzerklärung</a></p></section>';
    return root;
  }

  function closeDialog() {
    if (!dialog) return;
    dialog.remove();
    dialog = null;
    document.body.classList.remove('consent-open');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  function openDialog() {
    if (dialog) return;
    previousFocus = document.activeElement;
    dialog = buildDialog(categories.length === 0);
    document.body.appendChild(dialog);
    document.body.classList.add('consent-open');
    dialog.querySelector('button').focus();
  }

  document.addEventListener('click', function (event) {
    if (!dialog) return;
    if (event.target.closest('[data-consent-close]')) closeDialog();
    if (event.target.closest('[data-consent-reject]')) saveConsent({ statistik: false, marketing: false });
    if (event.target.closest('[data-consent-all]')) saveConsent({ statistik: true, marketing: true });
    if (event.target.closest('[data-consent-save]')) {
      const choices = {};
      dialog.querySelectorAll('[data-consent-category]').forEach(function (input) { choices[input.dataset.consentCategory] = input.checked; });
      saveConsent(choices);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (!dialog) return;
    if (event.key === 'Escape') closeDialog();
    if (event.key !== 'Tab') return;
    const focusable = Array.from(dialog.querySelectorAll('button, a, input')).filter(function (item) { return !item.disabled; });
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  window.cookieConsent = {
    has: function (category) { return !!(consent && consent.choices && consent.choices[category]); },
    show: openDialog,
    reset: function () { try { localStorage.removeItem(STORAGE_KEY); } catch (error) {} consent = null; if (categories.length) openDialog(); }
  };

  if (consent) window.dispatchEvent(new CustomEvent('vz:consent', { detail: consent.choices }));
  if (!consent && categories.length) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', openDialog, { once: true });
    else openDialog();
  }
})();
