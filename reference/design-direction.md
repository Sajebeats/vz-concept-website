# Design-Direction: vz-concept.de

**Zweck dieser Datei:** Die visuelle Richtung — das „Warum" hinter der Gestaltung.
Die harten Regeln (Flächentypen, Verbotsliste, Ausnahmen) stehen in
`design-guidelines.md`, die Werte (Farben, Fonts, Spacing) in `design-tokens.md`.
Diese drei Dateien gehören zusammen; bei Konflikt gilt `design-guidelines.md`.

---

## 1. Leitidee: Premium-Editorial

Die Website soll wirken wie das Büro einer erfahrenen Beraterin, nicht wie ein
Startup-Template: ruhige Flächen, serifenbetonte Typografie, viel Weißraum,
wenige, gezielte Akzente. Referenzgefühl: hochwertiges Wirtschaftsmagazin —
nicht SaaS-Landingpage, nicht Coaching-Welt.

## 2. Die fünf Prinzipien

1. **Ruhe vor Effekt.** Vier Flächentypen, ein Hero-Glow pro Seite, sonst nichts.
   Licht ist ein Akzent, kein Dauerzustand.
2. **Typografie trägt die Hierarchie.** Playfair Display gibt den editorialen
   Charakter (H1–H4, Italic als Akzent), Inter hält alles Funktionale sachlich.
   Größenkontraste statt Farbspielereien.
3. **Dunkelgrün ist Vertrauen, Türkis ist Handlung.** Dark Teal für Beweis- und
   Vertrauensflächen; das leuchtende Türkis nur dort, wo etwas passieren soll
   (CTAs, Akzentzeile, Kennzahlen-Indikatoren) — sparsam eingesetzt bleibt es stark.
4. **Echte Menschen, echte Belege.** Bildsprache: Vanessa in realen
   Beratungssituationen — keine Stockfotos, keine Illustrationen, keine Emojis.
   Jede Kennzahl, jedes Zitat ist belegbar und benannt.
5. **Bewegung ist Rückmeldung, nicht Show.** Dezente Reveals und Hover
   (max. 5-px-Lift), `prefers-reduced-motion` wird respektiert.
   Einzige Dauer-Animation: Partner-Marquee.

## 3. Was wir bewusst NICHT tun

- Glow-/Gradient-Wildwuchs (der alte Zustand: 117 Einzelverläufe — abgebaut auf 4 Typen)
- Karten für alles — Karten nur, wenn Inhalte wirklich parallel vergleichbar sind
- Skript-/Handschrift-Fonts, Pastellfarben, Abzeichen-Optik, Sterne-Deko ohne Quelle
- Trend-Effekte (Glassmorphism-Flächen, 3D-Blobs, Parallax-Spielereien)
- Dark Patterns: Countdown, Fake-Verknappung, aufdringliche Popups

## 4. Wiedererkennbarkeit je Seite

Seiten-Identität entsteht über Inhalt und **eine** Variable (Hero-Glow-Position/-Stärke),
nicht über eigene Farbwelten. Ausnahmen sind dokumentiert (helle Träger-Seite,
Foto-Hero der Über-mich-Seite, rote Warnfläche der Krisenseite) —
siehe Ausnahmen-Register in `design-guidelines.md` §9.

## 5. Messlatte

Vor jedem Release die Frage: **Würde diese Seite auch ohne Text seriös wirken —
wie die Kanzlei nebenan, nicht wie ein Template-Marktplatz?**
Wenn ein Element nur Dekoration ist: weglassen.
