# gateway

Bindet `pages.cfizzy.com` an dieses Projekt. Reine statische Seite,
kein Build-Schritt nötig (Vercel-Preset: "Other").

Proxyt per `vercel.json`-Rewrites pfadbasiert auf die unabhängigen
Deployments der einzelnen Tools (`wm2026-schiri`, `sailing-terminology`, ...).
Jedes Tool bleibt ein eigenes Vercel-Projekt mit eigenem Deploy-Workflow,
dieses Projekt stellt nur die gemeinsame Domain bereit.

## Setup (einmalig)
1. Repo ist bereits auf GitHub (vercel-pages monorepo)
2. vercel.com -> New Project -> Repo auswählen -> Root Directory: `gateway`
3. Framework Preset: "Other" (kein Build-Command nötig) -> Deploy
4. Domain `pages.cfizzy.com` an dieses Projekt binden (Settings -> Domains)
5. In `vercel.json` die Platzhalter-URLs durch die echten Produktions-Domains
   der jeweiligen Tool-Deployments ersetzen (Vercel zeigt sie im jeweiligen
   Projekt unter "Domains" an, Format meist `<projekt>.vercel.app`)

## Neues Tool hinzufügen
1. Tool in eigenem Unterordner deployen (siehe `../CLAUDE.md`)
2. Im Tool-Unterordner: `base: '/<name>/'` in `vite.config.js` setzen
3. Im Tool-Unterordner `vercel.json`: Rewrite `{ "source": "/<name>/:path*", "destination": "/:path*" }`
   vor dem Catch-all eintragen
4. Hier in `gateway/vercel.json` eine neue Rewrite-Zeile für `/<name>/:path*` ergänzen
