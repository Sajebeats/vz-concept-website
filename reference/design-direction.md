# VZ Concept – Designrichtung

## Ziel

Die Website soll wie eine hochwertige persönliche Boutique-Beratung wirken.

Nicht:
- wie ein SaaS-Template
- wie eine Coaching-Landingpage
- wie eine anonyme Unternehmensberatung
- wie eine KI-generierte Website

## Visuelle Prinzipien

- klare Hierarchie
- großzügiger, aber kontrollierter Weißraum
- große, lesbare Headlines
- kurze Textblöcke
- Vanessa als sichtbare Persönlichkeit
- wenige, hochwertige Vertrauenselemente
- ruhige Markenfarben
- klare CTAs

## Layout

- maximale Inhaltsbreite etwa 1200–1280 px
- keine überlangen Textzeilen
- Textbreite meist 560–680 px
- keine unnötigen Karten für jeden Inhalt
- nicht jede Section braucht einen farbigen Hintergrund
- keine dekorativen Elemente ohne Funktion

## Bilder

- echte Bilder von Vanessa bevorzugen
- Vanessa nicht zu klein darstellen
- keine Texte direkt in Bilddateien integrieren
- Bild und Website-Text getrennt halten
- Portraits müssen responsive funktionieren

## Verboten

- riesige leere Hero-Flächen
- winzige Vertrauenspunkte
- zu viele Icons
- unnötige Animationen
- drei oder vier gleich starke CTAs
- harte Trennlinien in jeder Section
- übertriebene Schatten und Verläufe

---

## Anhang: Verknüpfung ins CSS-System

- **Harte Regeln** (Flächentypen A/B/C/D, Verbotsliste, Ausnahmen-Register):
  `design-guidelines.md` — bei Widerspruch gewinnt die Datei hier (Richtung schlägt Regelwerk;
  das Regelwerk wird dann nachgezogen).
- **Werte** (Farben, Fonts, Spacing, Radius, Schatten): `design-tokens.md`.
- Umsetzungsstand: Flächen laufen seit Commit `7f1cdaa` über vier Surface-Tokens
  in `docs/css/style.css` `:root`; Hero-Identität je Seite über `--hero-glow-pos`/`--hero-glow-a`.

**Bekannte Abweichung zum Bestand (bewusst zu entscheiden, siehe implementation-checklist.md):**
- Textbreite: Token `--container-text` steht auf 760 px, Zielvorgabe hier ist 560–680 px
  → beim nächsten Layout-Durchgang Token anpassen und Seiten prüfen.
- „Nicht jede Section braucht einen farbigen Hintergrund" → beim Startseiten-Umbau
  (homepage-structure.md) mehr Typ A/Weiß einsetzen, Mint sparsamer.
