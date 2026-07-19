# VZ Concept – Struktur der Startseite

## Ziel der Seite

Die Startseite soll Besucher nicht mit Leistungen überladen.

Sie soll Schritt für Schritt beantworten:

1. Bin ich hier richtig?
2. Versteht Vanessa meine Situation?
3. Warum kann ich ihr vertrauen?
4. Wobei hilft sie mir konkret?
5. Wie läuft die Zusammenarbeit ab?
6. Was ist mein nächster Schritt?

---

## Section 1 – Hero

### Aufgabe

Innerhalb weniger Sekunden verständlich machen:

- worum es geht
- für wen Vanessa arbeitet
- welches Ergebnis der Besucher erhält
- was er als Nächstes tun soll

### Inhalt

Eyebrow:
Unternehmensberatung für Gründung und Wachstum

Headline:
Klarheit für deinen nächsten unternehmerischen Schritt.

Text:
Ich helfe dir herauszufinden, was wirtschaftlich sinnvoll ist –
mit einem ehrlichen Blick auf dein Vorhaben und 16 Jahren eigener
Erfahrung als Unternehmerin.

Primärer CTA:
Kostenloses Erstgespräch buchen

Sekundärer CTA:
So arbeite ich

Vertrauensnachweise:
- 16 Jahre Unternehmerin
- über 100 Menschen begleitet
- AVGS-Coaching möglich
- Google-Bewertungen

### Designhinweise

- maximal zwei Spalten
- Text links
- Vanessa rechts
- keine übergroße Hero
- keine leeren Flächen
- Headline auf Desktop maximal zwei Zeilen
- Vanessa groß und präsent
- Text nicht in das Bild integrieren

---

## Section 2 – Problem & Lösung (geschützte Bestandssektion)

### Aufgabe

Den Unterschied zwischen einer ungeprüften Ausgangslage und der klaren Einordnung
durch VZ Concept unmittelbar sichtbar machen.

### Verbindliche Umsetzung

- HTML-ID: `#problem-loesung`
- Eyebrow: „Problem & Lösung“
- Headline: „Viele Vorhaben scheitern nicht an Motivation. Sondern an fehlender Klarheit.“
- Zweiteilige Vergleichsdarstellung:
  - „Ohne klare Einordnung“
  - „Mit VZ Concept“
- Bestehende Klassen `.v4-compare`, `.v4-compare__side` und
  `.v4-compare__side--dark` beibehalten.

### Schutzregel

Diese Sektion darf weder durch „Deine Situation“ noch durch eine einfache Themenliste
oder ein neues Kartenlayout ersetzt werden. Änderungen sind ausschließlich nach einer
ausdrücklichen Anweisung von Dennis im aktuellen Chat zulässig.

---

## Section 3 – Vanessas Ansatz

### Aufgabe

Vanessa vom klassischen Berater abgrenzen.

### Kerngedanke

Keine Schablonen. Keine künstlich positiven Versprechen.
Sondern eine ehrliche Einschätzung und ein klarer Plan.

### Mögliche Headline

Ich sage dir nicht nur, was möglich ist. Ich sage dir auch, was nicht trägt.

### Inhalte

- ehrlicher Blick auf das Vorhaben
- Zahlen verständlich machen
- Risiken früh erkennen
- Entscheidungen gemeinsam vorbereiten
- eigene unternehmerische Erfahrung einbringen

---

## Section 4 – Leistungen

### Aufgabe

Leistungen nicht als Produktliste zeigen,
sondern als Antworten auf typische Situationen.

### Struktur

#### Du möchtest gründen
Geschäftsidee, Businessplan, Finanzierung, AVGS-Coaching

#### Du brauchst einen belastbaren Businessplan
Für Bank, Förderstelle, Investoren oder die eigene Planung

#### Du möchtest eine Entscheidung absichern
Markt, Zahlen, Wettbewerb und Wirtschaftlichkeit prüfen

#### Du möchtest dein Unternehmen weiterentwickeln
Strategie, Wachstum, neue Angebote oder Investitionen bewerten

---

## Section 5 – Zusammenarbeit

### Aufgabe

Unsicherheit reduzieren und den Ablauf einfach erklären.

### Schritte

1. Kostenloses Erstgespräch
2. Gemeinsame Bestandsaufnahme
3. Klare Empfehlung und nächster Schritt
4. Persönliche Begleitung bei der Umsetzung

---

## Section 6 – Über Vanessa

### Aufgabe

Vertrauen durch Persönlichkeit und Erfahrung schaffen.

### Fokus

Nicht Lebenslauf erzählen.

Stattdessen erklären:
- warum Vanessa berät
- was sie selbst als Unternehmerin erlebt hat
- warum sie ehrlich und praxisnah arbeitet
- was Kunden in der Zusammenarbeit erwarten können

---

## Section 7 – Kundenstimmen

### Aufgabe

Glaubwürdigkeit aufbauen.

### Vorgaben

- konkrete Aussagen bevorzugen
- keine anonymen Marketingzitate
- reale Namen und Rollen nur mit Freigabe
- Google-Bewertungen korrekt einbinden
- keine erfundenen Zahlen oder Ergebnisse

---

## Section 8 – Abschluss-CTA

### Aufgabe

Besucher zu einem unverbindlichen Gespräch einladen.

### Mögliche Headline

Lass uns herausfinden, welcher nächste Schritt für dich sinnvoll ist.

### Text

Im kostenlosen Erstgespräch schauen wir uns deine Situation an.
Du bekommst eine ehrliche erste Einschätzung und weißt danach,
wie es weitergehen kann.

CTA:
Kostenloses Erstgespräch buchen

---

## Anhang: Delta zur aktuellen index.html (für die Umsetzung)

Ziel-Struktur: 8 Sektionen. Aktuelle Seite: 11. Mapping:

| Neu | Übernimmt aus Bestand | Flächentyp-Vorschlag |
|---|---|---|
| 1 Hero | `.v4-hero` (Layout passt schon: Text links, Vanessa rechts, Trust-Zahlen) | Hero (C + 1 Glow) |
| 2 Problem & Lösung | Geschützter Bestand `#problem-loesung` mit Vergleich „Ohne klare Einordnung / Mit VZ Concept“ | A hell |
| 3 Ansatz | Neu; Material aus `.v4-why` (Bio-Text, Zitat) | B mint |
| 4 Leistungen | `#leistungen-uebersicht`, von 6 Karten auf 4 Situations-Blöcke | A hell |
| 5 Zusammenarbeit | `#ablauf` (4 Schritte bestehen bereits) | B mint |
| 6 Über Vanessa | Persönlicher Teil aus `.v4-why` + Kennzahlen | C dunkel |
| 7 Kundenstimmen | `#stimmen`, kuratiert auf 3–4 statt 6 | C dunkel oder A hell |
| 8 Abschluss-CTA | `.v4-final-cta` inkl. „Was nach dem Klick passiert" | D CTA |

Entfällt bzw. wandert: Partner-Marquee (`.v4-partners`), Drei-Karten-Router
(`#zielgruppen`), Investitions-Sektion (`#investition`), FAQ-Block (`#faq-start`)
— Verbleib/Ersatz vor der Umsetzung mit Dennis klären (siehe implementation-checklist.md).
