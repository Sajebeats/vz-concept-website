# CLAUDE.md — vz-concept.de Workspace

## Projekt auf einen Blick
**Website:** vz-concept.de — Vanessa Zimmer, Gründungs- & Unternehmensberaterin  
**Stack:** Static HTML/CSS/JS → GitHub Pages (kein CMS, kein Framework)  
**Repo:** github.com/Sajebeats/vz-concept-website  
**Arbeitsordner:** `C:\Users\Anwender\Desktop\claude-workspace-Vanessa Zimmer\`  
**Website-Dateien:** im `docs/` Unterordner — GitHub Pages serviert von dort

---

## Workspace-Struktur
```
claude-workspace-Vanessa Zimmer/
├── CLAUDE.md                    ← Diese Datei (immer geladen)
│
├── docs/                        ← WEBSITE (GitHub Pages serviert von hier)
│   ├── index.html + alle Seiten
│   ├── css/ js/ assets/
│   └── CNAME
│
├── context/          🔒 LOKAL   ← Business, Personen, Status, Strategie
├── reference/                   ← Design-Tokens, Template, Guides
├── plans/            🔒 LOKAL   ← Implementierungspläne
├── outputs/          🔒 LOKAL   ← Arbeitsergebnisse
└── .claude/
    ├── commands/                ← Slash-Commands
    └── settings.json
```

---

## Verhaltensregeln für Claude

**Immer:**
- Deutsch antworten (Fachbegriffe auf Englisch OK)
- Vor Code-Änderungen: kurz erklären WAS und WARUM
- HTML-Änderungen: CSS-Klassen aus `reference/design-tokens.md` nutzen
- Neue Seiten: `reference/page-template.html` als Basis verwenden
- Texte schreiben: `reference/copywriting-guide.md` immer lesen bevor Texte verfasst werden
- Nach Änderungen: `context/current-data.md` aktualisieren wenn sich Status ändert

**Nie:**
- Dateien in `context/` oder `plans/` auf GitHub pushen
- Design-Entscheidungen treffen ohne Rückfrage (Farben, Layout-Änderungen)
- Google Fonts CDN ersetzen ohne explizite Anweisung
- Mehr als nötig lesen — erst Reference-Dateien, dann nur die betroffene HTML-Datei

---

## Commands

| Command | Zweck |
|---------|-------|
| `/prime` | Session starten — Kontext laden, Status prüfen, bereit melden |
| `/new-page [name]` | Neue HTML-Seite aus Template erstellen |
| `/deploy [nachricht]` | Git add → commit → push nach GitHub |
| `/create-plan [aufgabe]` | Plan in `plans/` erstellen vor größeren Änderungen |
| `/implement [plan]` | Plan Schritt für Schritt umsetzen |

---

## Git-Workflow
```bash
# Änderungen deployen (aus diesem Ordner):
git add .
git commit -m "Kurze Beschreibung"
git push origin main
# → GitHub Pages updated in ~2 Minuten
```

**Commit-Format:** `Seite: Was geändert` z.B. `index: Hero-Text aktualisiert`

---

## Session-Start
1. `/prime` eingeben → Claude liest Kontext und meldet Status
2. Aufgabe beschreiben → Claude arbeitet mit vollem Kontext
3. Nach Arbeit: `/deploy "Beschreibung"` wenn live gehen soll

---

## Diese Datei aktuell halten
Nach jeder strukturellen Änderung am Workspace (neue Commands, neue Reference-Dateien, geänderter Workflow) → dieses CLAUDE.md sofort anpassen.
