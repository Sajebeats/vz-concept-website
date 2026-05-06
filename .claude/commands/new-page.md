# /new-page [seitenname]

Erstellt eine neue HTML-Seite für vz-concept.de basierend auf dem Standard-Template.

## Vorgehen

1. Lies `reference/page-template.html`
2. Ersetze alle Platzhalter mit den Werten unten
3. Speichere als `[seitenname].html` im Workspace-Root
4. Melde welche Platzhalter du noch brauchst

## Platzhalter die ersetzt werden müssen

| Platzhalter | Bedeutung |
|------------|-----------|
| `{{PAGE_TITLE}}` | Seitentitel z.B. "Referenzen" |
| `{{PAGE_SLUG}}` | Dateiname ohne .html z.B. "referenzen" |
| `{{META_DESCRIPTION}}` | 150 Zeichen, für Google |
| `{{EYEBROW}}` | Kleiner Text über der H1 (Caps) |
| `{{H1}}` | Hauptüberschrift der Seite |
| `{{SUBTITLE}}` | Einleitungstext unter H1 |
| `{{SECTION_TITLE}}` | Erster Abschnittstitel |
| `{{SECTION_SUBTITLE}}` | Einleitung des ersten Abschnitts |

## Regeln

- Nav und Footer NIEMALS ändern — exakt aus Template übernehmen
- Tone of Voice: direkt, klar, kein Coaching-Sprech (siehe context/business-info.md)
- "Du"-Form außer auf B2B-spezifischen Seiten
- Immer `id="main"` auf dem ersten Inhalts-Element behalten
- Nach Erstellung: `context/current-data.md` mit neuer Seite aktualisieren

## Beispielaufruf

`/new-page kontakt`
→ Erstellt `kontakt.html` mit Kontaktformular-Seite
