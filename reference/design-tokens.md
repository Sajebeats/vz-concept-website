# Design-Tokens: vz-concept.de

## Farben
```css
--color-primary:      #0C3530  /* Dark Teal — Brand-Farbe */
--color-primary-deep: #081F1C  /* Footer, maximale Tiefe */
--color-accent:       #00C8A8  /* Türkis — Akzent, sparsam */
--color-accent-hover: #00A88D
--color-accent-light: #E6F9F5  /* Hintergrund-Tints */
--color-text:         #111E1C  /* Body Text */
--color-text-muted:   #4A6260
--color-white:        #FFFFFF
--color-off-white:    #F7FAFA  /* Page Background */
```

## Schriften
```css
--font-heading: 'Playfair Display', Georgia, serif   /* H1-H4 */
--font-body:    'Inter', system-ui, sans-serif        /* Body, UI */
/* Geladen via Google Fonts CDN */
```

## Spacing
```css
--space-xs: 0.5rem   --space-sm: 1rem   --space-md: 1.5rem
--space-lg: 2rem     --space-xl: 3rem   --space-2xl: 5rem   --space-3xl: 7rem
```

## Schatten / Radius
```css
--radius-sm: 6px  --radius-md: 12px  --radius-lg: 28px  --radius-pill: 999px
--shadow-sm: 0 14px 34px rgba(12,53,48,0.08)
--shadow-md: 0 24px 56px rgba(12,53,48,0.12)
```

## Buttons
- `.btn--primary` — Türkis Gradient → CTA
- `.btn--outline` — Transparent, Border
- `.btn--outline-white` — Für dunkle Backgrounds
- `.btn--ghost` — Text-Link mit Pfeil

## Schlüssel-Klassen
```
.container      max-width: 1200px
.section        padding-block: 7rem
.section--dark  Background: #0C3530
.grid-2/3/4     CSS Grid layouts
.hero           Fullscreen Dark Teal Background
.nav            Fixed, transparent → weiß beim Scrollen
```
