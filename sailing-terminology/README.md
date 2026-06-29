# Seemannssprache – DE/EN Glossar

React-App mit Vite. Flashcards, Quiz und Nachschlagen für Segel-Begriffe
(Deutsch/Englisch). Lernstand wird im Browser via localStorage gespeichert.
Deployed via Vercel.

## Einmaliges Setup

```bash
npm install
```

## Lokale Entwicklung
```bash
npm run dev
```

## Begriffe aktualisieren

Alle Begriffe liegen im `TERMS`-Array in `src/App.jsx`.

## Vercel Setup (einmalig)
1. Repo ist bereits auf GitHub (vercel-pages monorepo)
2. vercel.com -> New Project -> Repo auswählen -> Root Directory: `sailing-terminology`
3. Framework: Vite -> Deploy
