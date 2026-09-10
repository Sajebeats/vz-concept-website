/* Einheitlicher Buchungsweg mit bewusstem Calendly-Laden und Kampagnenübergabe. */
(function () {
  'use strict';
  const BASE = 'https://calendly.com/vz-vz-concept/30min';
  const allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const campaign = new URLSearchParams();
  const incoming = new URLSearchParams(window.location.search);

  allowed.forEach(function (key) {
    const value = incoming.get(key);
    if (value && value.length <= 200 && !/@/.test(value) && /^[\w .,:+\/-]+$/u.test(value)) campaign.set(key, value);
  });

  function decorate(url) {
    const parsed = new URL(url, window.location.href);
    campaign.forEach(function (value, key) { parsed.searchParams.set(key, value); });
    return parsed.toString();
  }

  if ([...campaign].length) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (link.hasAttribute('data-no-campaign') || (link.getAttribute('href') || '').startsWith('#')) return;
      try {
        const target = new URL(link.href, window.location.href);
        if (target.origin === window.location.origin || target.href.startsWith(BASE)) link.href = decorate(target.href);
      } catch (error) {}
    });
  }

  document.querySelectorAll('[data-calendly-link]').forEach(function (link) { link.href = decorate(BASE); });

  const container = document.querySelector('[data-booking-calendar]');
  const button = document.querySelector('[data-load-calendar]');
  const status = document.querySelector('.calendar-status');
  let frame = null;
  let booked = false;

  if (container && button) {
    button.addEventListener('click', function () {
      if (frame) return;
      const url = new URL(decorate(BASE));
      url.searchParams.set('embed_domain', window.location.hostname || 'vz-concept.de');
      url.searchParams.set('embed_type', 'Inline');
      frame = document.createElement('iframe');
      frame.className = 'booking-calendar__frame';
      frame.title = 'Termin bei VZ Concept auswählen';
      frame.src = url.toString();
      frame.loading = 'eager';
      frame.addEventListener('load', function () { if (status) status.textContent = 'Der Terminkalender ist geladen.'; });
      container.replaceChildren(frame);
      if (status) status.textContent = 'Terminkalender wird geladen …';
      window.dispatchEvent(new CustomEvent('vz:booking', { detail: { type: 'calendar_open' } }));
    });
  }

  window.addEventListener('message', function (event) {
    if (!frame || event.origin !== 'https://calendly.com' || event.source !== frame.contentWindow || !event.data || typeof event.data.event !== 'string') return;
    if (event.data.event === 'calendly.event_scheduled' && !booked) {
      booked = true;
      if (status) status.textContent = 'Danke – dein Termin wurde gebucht.';
      window.dispatchEvent(new CustomEvent('vz:booking', { detail: { type: 'appointment_booked' } }));
    }
  });
})();
