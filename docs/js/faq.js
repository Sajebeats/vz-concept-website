/* FAQ-Seite: Suche, Themenfilter, aktive Themen-Navigation und Direktlinks.
   Das Auf- und Zuklappen selbst übernimmt main.js (.faq-question). */
(function () {
  'use strict';

  var content = document.querySelector('.faq-content');
  if (!content) return;

  var items = Array.prototype.slice.call(content.querySelectorAll('.faq-item[data-cat]'));
  var groups = Array.prototype.slice.call(content.querySelectorAll('.faq-group'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.faq-chip'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.faq-nav__link'));
  var input = document.getElementById('faq-search-input');
  var status = document.getElementById('faq-status');
  var empty = document.getElementById('faq-empty');
  var total = items.length;

  var state = { filter: 'all', query: '' };

  // Umlaute und Akzente ignorieren: „forderung“ findet „Förderung“
  function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
  }

  var index = items.map(function (item) {
    return normalize(item.textContent);
  });

  function isOpen(item) {
    return item.classList.contains('open');
  }

  function openItem(item) {
    var btn = item.querySelector('.faq-question');
    if (btn && !isOpen(item)) btn.click();
  }

  function apply() {
    var words = normalize(state.query).split(/\s+/).filter(Boolean);
    var visible = 0;
    var lastMatch = null;

    items.forEach(function (item, i) {
      var catOk = state.filter === 'all' || item.getAttribute('data-cat') === state.filter;
      var queryOk = words.every(function (w) { return index[i].indexOf(w) !== -1; });
      var show = catOk && queryOk;
      item.hidden = !show;
      if (show) { visible++; lastMatch = item; }
    });

    groups.forEach(function (group) {
      group.hidden = !group.querySelector('.faq-item:not([hidden])');
    });

    content.classList.toggle('is-searching', words.length > 0);
    empty.hidden = visible !== 0;

    if (words.length || state.filter !== 'all') {
      status.textContent = visible === 1 ? '1 passende Frage' : visible + ' von ' + total + ' Fragen';
    } else {
      status.textContent = '';
    }

    // Genau ein Treffer bei der Suche: direkt aufklappen
    if (words.length && visible === 1 && lastMatch) openItem(lastMatch);
  }

  function setFilter(value) {
    state.filter = value;
    chips.forEach(function (chip) {
      var active = chip.getAttribute('data-filter') === value;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
    apply();
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      setFilter(chip.getAttribute('data-filter'));
    });
  });

  var timer = null;
  if (input) {
    input.addEventListener('input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        state.query = input.value.trim();
        apply();
      }, 120);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var first = content.querySelector('.faq-item:not([hidden])');
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Themen-Navigation: Filter zurücksetzen, damit das Ziel sichtbar ist
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (state.filter !== 'all' || state.query) {
        if (input) input.value = '';
        state.query = '';
        setFilter('all');
      }
    });
  });

  // Aktives Thema beim Scrollen markieren
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (link) { byId[link.getAttribute('data-nav')] = link; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('data-group');
        navLinks.forEach(function (link) {
          var active = link === byId[id];
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    groups.forEach(function (group) { observer.observe(group); });
  }

  // Direktlink auf eine Frage (z. B. /faq#avgs) öffnet sie
  function openFromHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (!target || !target.classList.contains('faq-item')) return;
    if (target.hidden) {
      if (input) input.value = '';
      state.query = '';
      setFilter('all');
    }
    openItem(target);
    window.setTimeout(function () {
      target.scrollIntoView({ block: 'start' });
    }, 60);
  }

  window.addEventListener('hashchange', openFromHash);
  if (document.readyState === 'complete') openFromHash();
  else window.addEventListener('load', openFromHash);
})();
