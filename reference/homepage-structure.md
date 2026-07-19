# Homepage-Struktur: vz-concept.de

**Zweck dieser Datei:** Die Soll-Struktur der Startseite (`docs/index.html`) —
jede Sektion hat genau einen Job. Neue Sektionen oder Umstellungen nur gegen
dieses Dokument. Gestaltung → `design-direction.md` · Texte → `copy-guidelines.md`.

---

## Sektionsfolge (Conversion-Dramaturgie)

| # | Sektion (ID/Klasse) | Job | Flächentyp |
|---|---|---|---|
| 1 | Hero (`.v4-hero`) | In 5 Sekunden: Wer, für wen, warum glaubwürdig. Portrait + Google-Badge + 3 Trust-Zahlen + Haupt-CTA | Hero (C + 1 Glow) |
| 2 | Partner (`.v4-partners`) | Soziale Absicherung durch bekannte Logos (Marquee) | Weiß |
| 3 | Router (`#zielgruppen`) | Selbst-Segmentierung: Gründung / Struktur / Krise → je eigener Pfad | A hell |
| 4 | Problem & Lösung (`#problem-loesung`) | Kernproblem benennen (fehlende Klarheit), Vorher/Nachher-Vergleich | A hell |
| 5 | Warum VZ (`.v4-why`) | Der Mechanismus-Beweis: eigene Unternehmerinnen-Erfahrung + Zitat + Kennzahlen | C dunkel |
| 6 | Leistungen (`#leistungen-uebersicht`) | Sechs Wege als Übersicht, je ein Satz + Link | A hell (Karten C) |
| 7 | Ablauf (`#ablauf`) | Reibung senken: 4 Schritte, nichts vorbereiten müssen | B mint |
| 8 | Stimmen (`#stimmen`) | Beweis durch echte Google-Zitate mit Namen | C dunkel |
| 9 | Investition (`#investition`) | Preistransparenz: 0 € Erstgespräch / AVGS 0 € / Individuell | A hell |
| 10 | FAQ (`#faq-start`) | Letzte Einwände abbauen (6 Fragen, Rest → /faq) | B mint |
| 11 | Final CTA (`.v4-final-cta`) | Abschluss + „Was nach dem Klick passiert" | D CTA |

## Regeln

1. **Ein Job pro Sektion.** Erfüllt eine Sektion zwei Jobs, wird geteilt oder gekürzt —
   erfüllt sie keinen, fliegt sie.
2. **Karten-Budget:** Bestand ist ausgereizt (Router 3, Offer 6, Invest 3, Stats 4,
   Testimonials 6). Keine neuen Karten-Grids; Straffung hat Vorrang (→ `implementation-checklist.md`).
3. **CTA-Rhythmus:** Haupt-CTA im Hero, Mitte (nach Leistungen) und Final-CTA.
   Dazwischen keine zusätzlichen Calendly-Blöcke.
4. **Jede Behauptung hat ihren Beweis in Sichtweite** (Zahl, Zitat oder Logo).
5. **Flächen-Rhythmus:** hell → dunkel wechselt bewusst (Spalte „Flächentyp");
   nie zwei dunkle Conversion-Flächen direkt hintereinander.
6. Sticky-Mobile-CTA erscheint nach dem Hero, verschwindet vorm Footer (bestehendes Verhalten).

## Bekannte Schwächen (Stand 19.07.2026, priorisiert in implementation-checklist.md)

- Seite ist sehr lang (11 Sektionen, einzelne > 2.300 px) — Straffungskandidaten:
  Offer-Grid kompakter, Testimonials auf 3–4 kuratierte
- Hero-Foto: finale Bildentscheidung von Vanessa steht aus
- Case-Study-Sektion (Problem → Vorgehen → Ergebnis in Zahlen) fehlt noch als
  stärkster Conversion-Baustein — Platz: zwischen #8 Stimmen und #9 Investition
