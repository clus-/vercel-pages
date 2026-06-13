# CLAUDE.md – Projektanweisungen

Dieses Repository enthält verschiedene deploybare Web-Apps (React/Vite),
die über Vercel mit fixer URL öffentlich erreichbar sind.

## Projektstruktur

```
/
├── wm2026-schiri/      # WM 2026 Schiedsrichter-Übersicht
│   ├── src/
│   │   ├── matches.js  # <-- Einzige Datei die regelmäßig aktualisiert wird
│   │   └── App.jsx
│   └── ...
├── weiteres-projekt/   # Zukünftige Seiten gleich hier daneben
└── CLAUDE.md           # Diese Datei
```

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
3. Auf Vercel als neues Projekt verknüpfen (einmalig manuell durch mich)
4. In diesem CLAUDE.md den neuen Ordner dokumentieren

## Bewertungs-Schema (matches.js)

```js
bewertung: {
  sterne: 1-5,          // 1=schlecht, 3=solide, 5=ausgezeichnet
  kurzfazit: "...",     // 1 Satz
  details: "...",       // 3-5 Sätze, keine Sonderzeichen/Anführungszeichen im String
  quellen: "..."        // Kommagetrennt
}
// null wenn noch keine Bewertung vorhanden
```

## Wichtige Hinweise
- Keine Umlaute oder Sonderzeichen in JS-Strings (ae/oe/ue statt ä/ö/ü)
- Keine typografischen Anführungszeichen in Strings – stattdessen \"escaped\" oder weglassen
- Nach jeder Änderung Build testen bevor pushen
- Commit-Messages auf Deutsch, präzise
