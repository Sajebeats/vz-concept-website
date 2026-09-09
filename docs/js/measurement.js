/* Consent-gesteuerte Messung. IDs werden ausschließlich in measurement-config.js gepflegt. */
(function () {
  'use strict';
  const config = window.VZ_MEASUREMENT || {};
  if (!config.enabled) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });

  let googleLoaded = false;
  let metaLoaded = false;
  function safeLocation() { return window.location.origin + window.location.pathname; }

  function loadGoogle(choices) {
    const id = /^G-[A-Z0-9]+$/i.test(config.ga4Id || '') ? config.ga4Id : (/^AW-[0-9]+$/.test(config.googleAdsId || '') ? config.googleAdsId : '');
    if (!id || googleLoaded || (!choices.statistik && !choices.marketing)) return;
    googleLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
    window.gtag('js', new Date());
    if (/^G-/.test(config.ga4Id || '') && choices.statistik) window.gtag('config', config.ga4Id, { page_location: safeLocation(), send_page_view: true });
    if (/^AW-/.test(config.googleAdsId || '') && choices.marketing) window.gtag('config', config.googleAdsId);
  }

  function loadMeta(choices) {
    if (!choices.marketing || metaLoaded || !/^[0-9]{5,}$/.test(config.metaPixelId || '')) return;
    metaLoaded = true;
    window.fbq = window.fbq || function () { (window.fbq.queue = window.fbq.queue || []).push(arguments); };
    window.fbq.loaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    window.fbq('init', config.metaPixelId);
    window.fbq('track', 'PageView');
  }

  function applyConsent(choices) {
    window.gtag('consent', 'update', {
      analytics_storage: choices.statistik ? 'granted' : 'denied',
      ad_storage: choices.marketing ? 'granted' : 'denied',
      ad_user_data: choices.marketing ? 'granted' : 'denied',
      ad_personalization: choices.marketing ? 'granted' : 'denied'
    });
    loadGoogle(choices);
    loadMeta(choices);
  }

  window.addEventListener('vz:consent', function (event) { applyConsent(event.detail || {}); });
  if (window.cookieConsent) {
    applyConsent({
      statistik: window.cookieConsent.has('statistik'),
      marketing: window.cookieConsent.has('marketing')
    });
  }
  window.addEventListener('vz:booking', function (event) {
    const type = event.detail && event.detail.type;
    if (window.cookieConsent && window.cookieConsent.has('statistik') && /^G-/.test(config.ga4Id || '')) window.gtag('event', type, { page_location: safeLocation() });
    if (type === 'appointment_booked' && window.cookieConsent && window.cookieConsent.has('marketing')) {
      if (/^AW-/.test(config.googleAdsId || '') && /^[\w-]+$/.test(config.googleAdsLabel || '')) window.gtag('event', 'conversion', { send_to: config.googleAdsId + '/' + config.googleAdsLabel });
      if (window.fbq) window.fbq('track', 'Schedule');
    }
  });
})();
