# Agile Portfolio Leadership Dashboard (React + Vite)

This repo contains the executive Agile dashboard we built (portfolio + project drilldowns), using React + TypeScript + Recharts.

## Prereqs
- Node.js 18+ (recommended)
- npm (or pnpm/yarn)

## Run locally
```powershell
npm install
npm run dev
```
Open the URL shown in the terminal.

## Build
```powershell
npm run build
npm run preview
```

## Deploy to Vercel (fastest)
1. Create a GitHub repo and push this folder.
2. Go to Vercel → Add New → Project → Import your repo.
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy.

After deploy you’ll get a permanent URL you can open from any computer.

## Notes
- Demo data is in `src/App.tsx` under `const portfolio = {...}`.
- To wire to JIRA later, replace demo data with data pulled from JIRA APIs (or exported CSVs).
