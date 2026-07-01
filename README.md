# Programmable Biology Studio, F1-ATPase Molecular Background

A deploy-ready Vite/React app with a continuously rotating 3Dmol.js/PyMOL-style F1-ATPase molecular background, clickable scientific modules, active console buttons, exportable YAML, and real public structural biology links.

## Features

- Crystallised F1-ATPase background, PDB 1BMF, rendered by 3Dmol.js.
- Continuous molecular rotation with play, pause, speed and ribbon/surface visual controls.
- Eight clickable scientific modules.
- Real-life links to RCSB PDB, UniProt, PyMOL, 3Dmol.js, AlphaFold DB, RFdiffusion, ProteinMPNN and EMDB.
- Active design console with run, export YAML, copy prompt and selected-link launch buttons.
- Light/dark mode and responsive landing-page layout.
- Local fallback animated protein ribbon if the CDN or PDB fetch fails.

## Run locally

```bash
cd ~/Downloads/latent_style_bio_ai_app
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Open:

```text
http://localhost:5173/
```

## Recommended Node version

Use Node 20 LTS.

```bash
nvm install 20
nvm use 20
```

## Deploy

Vercel or Netlify settings:

```text
Build command: npm run build
Output directory: dist
```
