# Website-Struktur: vz-concept.de

## Datei-Struktur (Arbeitsordner)
```
C:\Users\Anwender\Desktop\Vanessa Zimmer\WebsiteV3\Website\
├── index.html
├── ueber-mich.html
├── leistungen.html
├── ablauf.html
├── faq.html
├── referenzen.html
├── partner.html
├── erstgespraech.html
├── impressum.html
├── datenschutz.html
├── foto-vergleich.html      ← intern, kein Nav-Link
├── css/
│   └── style.css            ← alle Styles in einer Datei
├── js/
│   └── main.js              ← Nav, FAQ, Scroll-Reveal
└── assets/
    ├── images/
    │   ├── logo.png / logo-white.png
    │   ├── vanessa-portrait.jpg
    │   └── vanessa/ (Hero-Fotos)
    └── downloads/           ← PDFs für Download-CTAs
```

## Navigation
```
Über mich | Leistungen ▾ | Ablauf | FAQ | Stimmen | Partner | [Erstgespräch buchen]
```

## GitHub Workflow
```bash
# Änderungen pushen (aus Website/ Ordner):
git add .
git commit -m "Beschreibung"
git push origin main
# → GitHub Pages updated automatisch in ~2 Min
```

## Wichtige URLs
- Live: https://vz-concept.de
- Repo: https://github.com/Sajebeats/vz-concept-website
- Calendly (Erstgespräch): https://calendly.com/vz-vz-concept/30min
