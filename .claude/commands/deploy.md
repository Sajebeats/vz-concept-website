# /deploy [nachricht]

Führe diese Git-Befehle aus dem Workspace-Ordner aus:

```bash
cd "C:\Users\Anwender\Desktop\claude-workspace-Vanessa Zimmer"
git add .
git status -s
git commit -m "{{nachricht}}"
git push origin main
```

Danach melde:
- ✅ Gepusht: "[nachricht]"
- 🌐 Live in ~2 Min auf vz-concept.de
- Welche Dateien geändert wurden (aus git status -s)

Falls keine Änderungen vorhanden: "Keine Änderungen zum Deployen."

Falls kein Commit-Text angegeben wurde: Frage nach einer kurzen Beschreibung.

**Commit-Format:** `Seite: Was wurde geändert`  
Beispiele:
- `index: Hero-Text aktualisiert`
- `leistungen: Neuen Abschnitt AVGS hinzugefügt`
- `faq: 3 neue Fragen ergänzt`
