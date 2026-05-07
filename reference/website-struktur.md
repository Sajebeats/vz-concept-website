# Website-Struktur: vz-concept.de

## Ordner-Struktur (Workspace)
```
claude-workspace-Vanessa Zimmer/
│
├── docs/                        ← WEBSITE (GitHub Pages serviert von hier)
│   ├── index.html
│   ├── ablauf.html
│   ├── datenschutz.html
│   ├── erstgespraech.html
│   ├── faq.html
│   ├── impressum.html
│   ├── leistungen.html
│   ├── partner.html
│   ├── referenzen.html
│   ├── ueber-mich.html
│   ├── foto-vergleich.html      ← intern, kein Nav-Link
│   ├── css/style.css
│   ├── js/main.js
│   └── assets/images/
│
├── context/           🔒 Lokal  ← Claude-Kontext, nicht auf GitHub
├── reference/                   ← Docs, Templates, Guides
├── plans/             🔒 Lokal  ← Implementierungspläne
├── outputs/           🔒 Lokal  ← Arbeitsergebnisse
├── CLAUDE.md                    ← Auto-geladen bei Session-Start
└── .claude/
    ├── commands/                ← /prime /deploy /new-page etc.
    └── settings.json
```

## Navigation
```
Über mich | Leistungen ▾ | Ablauf | FAQ | Stimmen | Partner | [Erstgespräch buchen]
```

## GitHub Pages Einstellung
- **Repo:** github.com/Sajebeats/vz-concept-website
- **Branch:** main
- **Folder:** `/docs`  ← wichtig, nicht root!

## Git-Workflow (aus Workspace-Root)
```bash
git add .
git commit -m "docs: Was geändert"
git push origin main
# → GitHub Pages updated automatisch in ~2 Min
```

## Wichtige URLs
- Live: https://vz-concept.de
- Repo: https://github.com/Sajebeats/vz-concept-website
- Calendly: https://calendly.com/vz-vz-concept/30min
