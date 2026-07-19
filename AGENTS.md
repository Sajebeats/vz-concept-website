# AGENTS.md — vz-concept.de Workspace

## Projekt auf einen Blick
**Website:** vz-concept.de — Vanessa Zimmer, Gründungs- & Unternehmensberaterin  
**Stack:** Static HTML/CSS/JS → GitHub Pages (kein CMS, kein Framework)  
**Repo:** github.com/Sajebeats/vz-concept-website  
**Arbeitsordner:** `C:\Users\Anwender\Desktop\Codex-workspace-Vanessa Zimmer\`  
**Website-Dateien:** im `docs/` Unterordner — GitHub Pages serviert von dort

---

## Workspace-Struktur
```
Codex-workspace-Vanessa Zimmer/
├── AGENTS.md                    ← Diese Datei (immer geladen)
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
└── .Codex/
    ├── commands/                ← Slash-Commands
    └── settings.json
```

---

## Session-Start (verbindlich)

**Bei jedem Chat-Start zuerst `reference/session-start.md` lesen und befolgen** —
Teil A: die fünf Reference-Dateien (brand-foundation, copy-guidelines,
homepage-structure, design-direction, implementation-checklist) vollständig lesen.
Teil B enthält die aktuelle Aufgabe.

## Verhaltensregeln für Codex

**Immer:**
- Deutsch antworten (Fachbegriffe auf Englisch OK)
- Vor Code-Änderungen: kurz erklären WAS und WARUM
- HTML-Änderungen: CSS-Klassen aus `reference/design-tokens.md` nutzen
- Vor Design-/CSS-Arbeit: `reference/design-guidelines.md` (Flächentypen, Verbotsliste) beachten
- Neue Seiten: `reference/page-template.html` als Basis verwenden
- Texte schreiben: `reference/copy-guidelines.md` immer lesen bevor Texte verfasst werden
- Jede Umsetzung folgt `reference/implementation-checklist.md` (Viewports, Prüffragen, Abschlussbericht)
- Nach Änderungen: `context/current-data.md` aktualisieren wenn sich Status ändert

**Nie:**
- Committen oder pushen ohne ausdrückliche Freigabe durch Dennis
- Aussagen, Zahlen oder Referenzen erfinden
- Dateien in `context/` oder `plans/` auf GitHub pushen
- Design-Entscheidungen treffen ohne Rückfrage (Farben, Layout-Änderungen)
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

**Commits und Pushes nur nach ausdrücklicher Freigabe durch Dennis.**
Nach Freigabe:
```bash
git add <gezielt die geänderten Dateien>   # nie pauschal "git add ." im Hauptordner
git commit -m "Seite: Was geändert"
git push origin main
# → GitHub Pages updated in ~2 Minuten
```

**Commit-Format:** `Seite: Was geändert` z.B. `index: Hero-Text aktualisiert`

---

## Session-Start
1. `/prime` eingeben → Codex liest Kontext und meldet Status
2. Aufgabe beschreiben → Codex arbeitet mit vollem Kontext
3. Nach Arbeit: `/deploy "Beschreibung"` wenn live gehen soll

---

## Diese Datei aktuell halten
Nach jeder strukturellen Änderung am Workspace (neue Commands, neue Reference-Dateien, geänderter Workflow) → dieses AGENTS.md sofort anpassen.
