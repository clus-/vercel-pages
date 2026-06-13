# WM 2026 Schiedsrichter-Uebersicht

React-App mit Vite. Deployed via Vercel.

## Einmaliges Setup

```bash
npm install
```

## Lokale Entwicklung
```bash
npm run dev
```

## Daten aktualisieren

Alle Spieldaten liegen in `src/matches.js`.

Felder pro Spiel:
- `schiedsrichter`: Name eintragen sobald FIFA bekanntgibt (24-48h vor Spiel)
- `ergebnis`: z.B. "2:1"
- `abgeschlossen`: auf `true` setzen
- `bewertung`: Objekt mit `sterne` (1-5), `kurzfazit`, `details`, `quellen`

Danach:
```bash
git add .
git commit -m "Spieltag X aktualisiert"
git push
```
Vercel deployed automatisch (~30 Sek).

## Vercel Setup (einmalig)
1. Repo auf GitHub pushen
2. vercel.com -> New Project -> Repo auswaehlen
3. Framework: Vite -> Deploy
