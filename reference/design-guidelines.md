# Design-Guidelines: vz-concept.de

**Verbindliches Regelwerk.** Vor jeder Design- oder CSS-Arbeit lesen. Ergänzt `design-tokens.md`
(Farben, Fonts, Spacing) um System-Regeln, Verbotsliste und Ausnahmen-Register.
Ziel: Premium-Editorial, seriös, ruhig — keine Coaching-Ästhetik, kein generischer KI-Look.

---

## 1. Flächensystem — die einzigen erlaubten Sektions-Hintergründe

Jede Sektion gehört genau **einem** von vier Flächentypen. Neue Sektionen erhalten **nie**
eigene Gradients — nur diese Tokens (definiert in `docs/css/style.css` `:root`):

| Typ | Token | Verwendung |
|-----|-------|-----------|
| **A — Weiß** | `--surface-light` | Inhalts-Sektionen, FAQ, Related-Cards |
| **B — Hell-Akzent (Mint)** | `--surface-mint` | Erkennungs-/Prozess-/Eignung-Sektionen |
| **C — Dunkel-Vertrauen** | `--surface-dark` | Proof-Bänder, Zitate, Stats, Footer. **Ohne Glow.** |
| **D — CTA-Dunkel** | `--surface-cta` | Conversion-Flächen. **Genau ein Glow, im Token fixiert.** |

**Hero-Regel:** Unterseiten-Heroes = Typ C + **ein** parametrisierter Glow.
Seiten-Identität entsteht ausschließlich über zwei Custom Properties pro Seite:

```css
.crisis-hero { --hero-glow-pos: 82% 86%; --hero-glow-a: 0.15; }
```

Nie über eigene Gradient-Stacks, Winkel oder Farbstops.

**Trennkanten:** Flächenwechsel dürfen eine 1-px-Hairline nutzen:
`--surface-border-light` auf hellen, `--surface-border-dark` auf dunklen Flächen.

## 2. Typografie-Hierarchie

- **Playfair Display** (`--font-heading`): H1–H4. Gewichte nur 400/700 (geladene Schnitte).
- **Playfair Italic** (`--font-script`): Editorial-Zitate und Akzente auf Unterseiten.
- **Dancing Script**: AUSSCHLIESSLICH die Hero-H1-Akzentzeile der Startseite
  (`.v4-hero__title-script`) — von Dennis bestätigte Ausnahme (§9). Nirgendwo sonst.
- **Inter** (`--font-body`): Body, UI, Buttons, Labels, Navigation. Gewichte 400–700.
- **Eyebrow-Muster** (einziges Label-Muster über Sektionen): Inter, Uppercase,
  `letter-spacing: 0.12–0.16em`, kurzer Strich davor (`::before`, 28–32 px).
- Genau **eine H1 pro Seite**. Überschriften-Hierarchie ohne Sprünge.
- `font-synthesis: none` bleibt aktiv — nie Gewichte/Styles verwenden, die nicht geladen sind.

## 3. Raster & Abstände

- Nur `--space-xs` bis `--space-3xl`. Keine Magic Numbers in neuen Regeln.
- Sektions-Rhythmus: `.section` (`padding-block: 7rem`), mobil kompakter über bestehende Breakpoints.
- Container: `.container` (max-width 1200px) — keine Ad-hoc-Breiten.

## 4. Radius & Schatten

- Nur `--radius-sm/md/lg/pill`. Rundungen gezielt: Buttons pill, Karten md, große Panels lg.
- Nur `--shadow-sm/md`. Keine zusätzlichen Schatten-Varianten, keine farbigen Schatten.

## 5. Komponenten-Regeln

- **Karten:** Border `rgba(11,118,105,0.2)`, Schatten nur Tokens. Karten sind
  Informations-Container, kein Deko-Mittel — siehe Verbotsliste „Karten-Inflation".
- **Buttons:** exakt vier Varianten (`.btn--primary`, `.btn--outline`, `.btn--outline-white`,
  `.btn--ghost`). Keine neuen Button-Stile.
- **Badges/Labels:** ein Muster (Eyebrow, s. o.). Keine konkurrierenden Label-Stile.
- **Icon-Hintergründe:** einziger erlaubter Komponenten-Gradient: `135deg` primary → `#0e4a3f`.

## 6. Motion

- Nur `transform` und `opacity` animieren. Kein `transition: all`.
- `prefers-reduced-motion` immer respektieren (Inhalte bleiben sichtbar, Motion entfällt).
- Keine Dauer-Animationen außer dem Partner-Marquee (dokumentierte Ausnahme, bei
  reduzierter Bewegung verlangsamt statt gestoppt).
- Hover: dezent (max. 5-px-Lift, eine Helligkeitsstufe). Fokus: sichtbarer Ring, nie entfernen.

## 7. Verbotsliste (Anti-generisch)

1. **Keine dekorativen Radial-Glows** — außer 1× Hero (`--hero-glow-pos`/`--hero-glow-a`)
   und dem im CTA-Token fixierten Glow.
2. **Keine neuen Gradient-Winkel oder Farbstops.** Flächen = die vier Surface-Tokens, Punkt.
3. **Keine Karten-Inflation:** Bevor eine neue Karten-Reihe entsteht, prüfen ob Liste,
   Tabelle oder Fließtext die Information besser trägt.
4. **Keine Flächendefinitionen in Inline-`<style>`-Blöcken** der HTML-Seiten.
5. **Kein `!important` für Backgrounds.**
6. **Keine Skript-/Handschrift-Fonts** (einzige Ausnahme: Hero-Akzentzeile, §9),
   **keine Pastell-Blobs, keine Emoji-Icons** — Coaching-Ästhetik ist per
   Strategie ausgeschlossen (`context/strategy.md`).
7. **Keine Deko ohne Zweck:** Jedes visuelle Element braucht eine Funktion
   (Orientierung, Hierarchie, Beweis, Handlung).

## 8. Do / Don't

```css
/* DON'T — individueller Gradient-Stack pro Sektion (alter Zustand) */
.meine-sektion {
  background:
    radial-gradient(ellipse at 88% 28%, rgba(0,200,168,0.27), transparent 38%),
    linear-gradient(116deg, #061815 0%, #08231f 34%, #0c3933 68%, #0b7065 100%);
}

/* DO — Flächentyp zuweisen */
.meine-sektion { background: var(--surface-dark); }

/* DO — Hero mit Seiten-Identität */
.meine-hero { --hero-glow-pos: 20% 70%; --hero-glow-a: 0.2; }
```

## 9. Ausnahmen-Register

| Ausnahme | Ort | Begründung |
|----------|-----|------------|
| `.inst-hero` ist hell (Typ B) | leistung-traeger.html | Institutionelle Zielgruppe, bewusste Abgrenzung |
| `.about-hero` Foto + Scrim-Gradients | ueber-mich.html (Inline-Style) | Funktionaler Scrim über Portrait, kein Deko-Gradient |
| `.urgency` rote Warnfläche | leistung-krise.html (Inline-Style) | Semantisches Dringlichkeits-Signal im Krisenkontext |
| `.v4-hero__title-script` in Dancing Script | index.html Hero | Von Dennis bestätigte Handschrift-Akzentzeile (19.07.2026) — einziger Skript-Font-Einsatz |
| Funktionale Gradients | style.css / v4-homepage.css | Scrims, Marquee-Fade-Kanten, Text-Clip, Fokus-Ringe — erlaubt, weil funktional |
| Partner-Marquee-Animation | Startseite | Dauer-Animation, bei reduced-motion verlangsamt |
| `--surface-hero` (v4-Hero-Basis) | v4-homepage.css | Startseiten-Hero darf einen eigenen, dokumentierten Basis-Verlauf nutzen, falls Typ C zu flach wirkt |

## 10. Review-Checkliste vor jedem Commit mit CSS-Änderungen

- [ ] Neue Flächen nutzen ausschließlich Surface-Tokens?
- [ ] Kein neuer Glow/Gradient außerhalb der Ausnahmen?
- [ ] Genau 1 H1 pro Seite, kein horizontaler Overflow bei 390 px?
- [ ] Kontrast: Text auf C/D ≥ 4.5:1 (AA)?
- [ ] `prefers-reduced-motion` weiterhin respektiert?
- [ ] `grep -c gradient docs/css/subpage-theme.css` ≤ 10?
