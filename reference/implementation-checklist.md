# VZ Concept – Umsetzungs- und Qualitätscheckliste

Eine Aufgabe gilt nicht als abgeschlossen, sobald der Code funktioniert.

Sie gilt erst als abgeschlossen, wenn die gerenderte Website
inhaltlich und visuell geprüft wurde.

## Vor der Umsetzung

- bestehende HTML-Struktur prüfen
- bestehende CSS-Regeln prüfen
- betroffene Links und Anker identifizieren
- relevante Bilder prüfen
- keine Inhalte erfinden

## Während der Umsetzung

- nur die vereinbarten Sections ändern
- semantisches HTML verwenden
- eine H1 pro Seite
- bestehende Links erhalten
- keine neuen Abhängigkeiten ohne Zustimmung
- vorhandene Markenfarben verwenden

## Visuelle Prüfung

Folgende Viewports testen:

- 1440 × 900
- 1280 × 800
- 768 × 1024
- 390 × 844

Für jeden Viewport einen Screenshot erstellen.

## Prüffragen

- Ist die Kernaussage innerhalb von fünf Sekunden verständlich?
- Ist die wichtigste Headline gut lesbar?
- Wirkt Vanessa präsent und professionell?
- Gibt es unnötige Leerräume?
- Sind Texte zu lang?
- Wirkt das Layout ausgewogen?
- Sind Buttons klar priorisiert?
- Gibt es horizontales Scrollen?
- Werden Wörter unschön getrennt?
- Ist der mobile Aufbau vollständig?
- Sieht das Ergebnis nach einer professionellen Website aus?

## Verpflichtende Iteration

Wenn eine der Prüffragen nicht eindeutig mit Ja beantwortet werden kann,
muss weiter überarbeitet werden.

Das Modell darf die Aufgabe nicht nach dem ersten Rendering abschließen.

## Abschlussbericht

Nach jeder Umsetzung zeigen:

1. geänderte Dateien
2. kurze Begründung
3. Screenshots aller Viewports
4. vollständigen Diff
5. bekannte offene Punkte
6. keine Commits oder Pushes ohne Freigabe

---

## Anhang A: Umgebungs-Hinweis zur visuellen Prüfung

Der Screenshot-Encoder des eingebetteten Test-Browsers hängt in dieser
Arbeitsumgebung reproduzierbar (dokumentiert seit 19.07.2026). Verfahren:

1. Screenshots in allen vier Viewports **immer zuerst versuchen**.
2. Hängt der Encoder, gelten als Ersatz: DOM-/Computed-Style-Messungen je Viewport
   (H1-Anzahl, Overflow, Flächen-Signaturen, Schrift-Renderings) **plus** Sichtprüfung
   durch Dennis auf `http://localhost:8124` — die Prüffragen beantwortet dann er.
3. Im Abschlussbericht transparent machen, welcher Weg genutzt wurde.

## Anhang B: Offene Arbeiten (Backlog)

Status: ☐ offen · ◐ in Arbeit · ☑ erledigt · ⏸ wartet auf Entscheidung/Zuarbeit

### Kritisch
- ☐ Review + Deploy des Design-System-Stands (Commits `7b58795`, `7f1cdaa`, Reference-Struktur) —
  Sichtprüfung auf localhost:8124, dann `/deploy`; vorher `git fetch origin main`

### Wichtig
- ☐ **Startseiten-Umbau auf 8-Sektionen-Struktur** (`homepage-structure.md`) —
  vorher klären: Verbleib von Partner-Marquee, Router, Investitions-Sektion, FAQ-Block
- ⏸ Case-Study-Sektionen (Problem → Vorgehen → Ergebnis in Zahlen) — wartet auf
  Vanessas Fragebogen (`outputs/Case-Study-Fragebogen-VZ-Concept.pdf`)
- ⏸ Hero-Foto-Entscheidung (Vanessa)
- ☐ Google Ads: Conversion-Tracking + Consent-Mode vor Kampagnenstart; Zuständigkeit klären
- ⏸ Träger-Seite öffentlich? (Vanessa) — aktuell noindex, ohne Nav-Link

### Visuelle Qualität
- ☐ Textbreite: `--container-text` 760 px → Ziel 560–680 px (`design-direction.md`), Unterseiten prüfen
- ☐ Hero-Glow-Feintuning nach Sichtprüfung (`--hero-glow-a` je Seite, subpage-theme.css)
- ☐ Sichtprüfung auf echten Geräten (Desktop + Smartphone)

### Technische Pflege (ohne Termindruck)
- ☐ `!important`-Abbau in `docs/css/style.css` (72 Vorkommen)
- ☐ Inline-`<style>`-Blöcke der Unterseiten schrittweise in Klassen überführen
- ☐ `audit-website`-Skill gegen Live-Domain (nach Deploy)
- ☐ Selbst-Tests (Gründer-Check, Förder-Check, Krisen-Check) — geplant, nicht gebaut

### Erledigt (Auszug, Historie in context/current-data.md)
- ☑ SEO/GEO-Paket, saubere URLs, CLS-/Kontrast-Fixes (Stand `fa509c8`, live)
- ☑ Fonts selbst gehostet — Google-CDN entfernt (DSGVO)
- ☑ Hero-Typografie auf Markensystem (`7b58795`)
- ☑ Design-System: 4 Flächentypen, Guidelines, Skill-Erweiterung (`7f1cdaa`)
- ☑ Reference-Struktur mit finalen Fassungen von Dennis (brand, copy, homepage, design, checklist)
