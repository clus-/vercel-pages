# CLAUDE.md – Projektanweisungen

Dieses Repository enthält verschiedene deploybare Web-Apps (React/Vite),
die über Vercel mit fixer URL öffentlich erreichbar sind.

## Projektstruktur

```
/
├── wm2026-schiri/         # WM 2026 Schiedsrichter-Übersicht
│   ├── src/
│   │   ├── matches.js     # <-- Einzige Datei die regelmäßig aktualisiert wird
│   │   └── App.jsx
│   └── ...
├── sailing-terminology/   # Seemannssprache DE/EN-Glossar (Flashcards, Quiz, Nachschlagen)
│   ├── src/
│   │   └── App.jsx        # Begriffe liegen im TERMS-Array, Lernstand via localStorage
│   └── ...
├── gateway/               # Bindet pages.cfizzy.com, proxyt per Rewrite auf die Tool-Domains
├── weiteres-projekt/      # Zukünftige Seiten gleich hier daneben
└── CLAUDE.md              # Diese Datei
```

Alle Tools sind unabhängige Vercel-Projekte mit eigenem Deploy (siehe
"Neue Seite hinzufügen" unten). `gateway/` ist die einzige Ausnahme: kein
eigenständiges Tool, sondern nur ein dünner Reverse-Proxy, der die
gemeinsame Domain `pages.cfizzy.com` pfadbasiert auf die einzelnen
Tool-Deployments verteilt (siehe `gateway/README.md`).

## Deine Aufgaben

### Daten aktualisieren (Hauptaufgabe)
Die Spieldaten liegen in `wm2026-schiri/src/matches.js`.
Wenn ich neue SR-Zuordnungen oder Bewertungen mitteile:
1. Datei öffnen
2. Betreffende Einträge aktualisieren (schiedsrichter, sr_land, sr_konfed, ergebnis, abgeschlossen, bewertung)
3. Build testen: `cd wm2026-schiri && npm run build`
4. Committen und pushen (siehe unten)

### Git-Workflow
```bash
git add .
git commit -m "aussagekräftige Nachricht, z.B.: Spieltag 2 SR + Bewertungen ergänzt"
git push
```
Vercel deployed danach automatisch (~30 Sek).

### Neue Seite hinzufügen
Wenn ich eine neue App mitbringe (als Dateien oder Beschreibung):
1. Neuen Ordner im Root anlegen, z.B. `tippspiel/`
2. Vite+React Setup analog zu `wm2026-schiri/`
3. `base: '/<name>/'` in `vite.config.js` setzen
4. In `vercel.json` die Rewrite `{ "source": "/<name>/:path*", "destination": "/:path*" }`
   vor den Catch-all eintragen (Reihenfolge wichtig, siehe `wm2026-schiri/vercel.json`)
5. Auf Vercel als neues Projekt verknüpfen (einmalig manuell durch mich)
6. In `gateway/vercel.json` eine Rewrite-Zeile für `/<name>/:path*` ergänzen,
   die auf die echte Produktions-Domain des neuen Projekts zeigt
7. In diesem CLAUDE.md den neuen Ordner dokumentieren

## Bewertungs-Schema (matches.js)

```js
bewertung: {
  kurzfazit: "...",     // 1 Satz
  details: "...",       // 3-5 Sätze, keine Sonderzeichen/Anführungszeichen im String
  noten: [              // Quellen-Noten, kicker-Skala 1-6 (1=ausgezeichnet, 6=ungenuegend)
    { quelle: "kicker", note: 3.5 },
    { quelle: "Sportschau", note: 2.0 },
  ],
  quellen: "..."        // Textquellen ohne Note, kommagetrennt
}
// null wenn noch keine Bewertung vorhanden
// sterne werden automatisch aus dem Noten-Durchschnitt berechnet (nicht mehr manuell setzen!)
```

## Wichtige Hinweise
- Keine Umlaute oder Sonderzeichen in JS-Strings (ae/oe/ue statt ä/ö/ü)
- Keine typografischen Anführungszeichen in Strings – stattdessen \"escaped\" oder weglassen
- Nach jeder Änderung Build testen bevor pushen
- Commit-Messages auf Deutsch, präzise
