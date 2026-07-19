# Implementation-Checklist: vz-concept.de

**Zweck dieser Datei:** Der eine Ort für offene Arbeiten — priorisiert, mit Status.
Nach jeder Session aktualisieren. Detail-Status/Historie: `context/current-data.md` (lokal).

Status: ☐ offen · ◐ in Arbeit · ☑ erledigt · ⏸ wartet auf Entscheidung/Zuarbeit

---

## Kritisch (vor dem nächsten Deploy)

- ☐ **Review + Deploy des Design-System-Stands** — Commits `7b58795` + `7f1cdaa`
  im Worktree ansehen (localhost:8124), dann `/deploy`; vorher `git fetch origin main`
  (parallele Arbeit an main!)

## Wichtig (Conversion & Vertrauen)

- ⏸ **Case-Study-Sektionen** bauen (Problem → Vorgehen → Ergebnis in Zahlen) —
  wartet auf Vanessas ausgefüllten Fragebogen (`outputs/Case-Study-Fragebogen-VZ-Concept.pdf`);
  Platzierung: Startseite zwischen Stimmen und Investition (→ `homepage-structure.md`)
- ⏸ **Hero-Foto-Entscheidung** (Vanessa) — danach ggf. Bildwechsel Startseite/Über-mich
- ☐ **Google Ads Vorbereitung**: Conversion-Tracking + Consent-Mode VOR Kampagnenstart;
  Zuständigkeit klären (Dennis oder Dienstleister)
- ⏸ **Träger-Seite öffentlich?** (Vanessa) — aktuell noindex, ohne Nav-Link, nicht in Sitemap

## Visuelle Qualität

- ☐ **Startseite straffen**: Offer-Grid kompakter, Testimonials auf 3–4 kuratierte
  (Karten-Budget in `homepage-structure.md` §Regeln)
- ☐ **Hero-Glow-Feintuning** nach Sichtprüfung: wirkt ein Unterseiten-Hero zu flach,
  `--hero-glow-a` der Seite in `subpage-theme.css` justieren (eine Zeile)
- ☐ **Sichtprüfung durch Menschen** auf echten Geräten (Desktop + iPhone/Android) —
  automatische Screenshots hängen weiterhin, DOM-Messungen ersetzen keine Augen

## Technische Pflege (optional, ohne Termindruck)

- ☐ `!important`-Abbau in `docs/css/style.css` (72 Vorkommen, Wartbarkeit)
- ☐ Inline-`<style>`-Blöcke der Unterseiten schrittweise in Klassen überführen
  (bei Gelegenheit, wenn eine Seite ohnehin angefasst wird — kein Big Bang)
- ☐ `audit-website`-Skill einmal gegen die Live-Domain laufen lassen (nach Deploy)
- ☐ Selbst-Tests (Gründer-Check, Förder-Check, Krisen-Check) — geplant, nicht gebaut

## Erledigt (Auszug, Details in context/current-data.md)

- ☑ SEO/GEO-Paket, saubere URLs, CLS-Fixes, Kontrast-Fixes (Stand `fa509c8`, live)
- ☑ Fonts selbst gehostet — Google-CDN entfernt (DSGVO)
- ☑ Hero-Typografie auf Markensystem (Playfair statt Dancing Script) — `7b58795`
- ☑ Design-System: 4 Flächentypen, Guidelines, Skill-Erweiterung — `7f1cdaa`
- ☑ Reference-Struktur: brand-foundation, copy-guidelines, homepage-structure,
  design-direction, implementation-checklist
