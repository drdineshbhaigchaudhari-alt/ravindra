# Ravindra Medical Research University — Website

React (Vite) front end + Node/Express server. Content is stored as JSON in `server/data/`.

## Run locally
```bash
npm run install:all     # once
npm run dev             # client http://localhost:5173, API http://localhost:5000
```

## Production
```bash
npm run build           # builds client/dist
npm start               # Express serves API + built site on PORT (default 5000)
```
Copy `server/.env.example` to `server/.env` to change the port.

## Connecting ravindrameduni.com
1. Host on a VPS (or Render/Railway): `npm run install:all && npm run build`, then run `npm start` with PM2 (`pm2 start server/index.js --name rmru`).
2. Put Nginx in front: proxy `ravindrameduni.com` and `www.ravindrameduni.com` to `localhost:5000`.
3. At your domain registrar, add an A record for `@` and `www` pointing to the server IP.
4. Enable HTTPS: `sudo certbot --nginx -d ravindrameduni.com -d www.ravindrameduni.com`.

## Editing content
- Text/data: JSON files in `server/data/` (notices, programs, departments, events, schedules, gallery, pages, site contact details).
- PDFs: put files in `client/public/docs/` and reference them as `/docs/<name>.pdf`.
- Images: `client/public/images/` (Pexels, see `client/public/IMAGE_CREDITS.md`). Replace with Freepik images using the same filenames if you have a licence.
- Contact form submissions are saved in `server/data/enquiries.json`.

## Placeholders to replace
Address, phone numbers, emails, leadership names/messages, approvals (UGC/NMC/DCI/INC), seat counts, fees and dates are sample content.

## Deploy on Hostinger (Node.js web app)
1. hPanel → Websites → Add website → **Node.js Apps** → import from GitHub (`drdineshbhaigchaudhari-alt/ravindra`, branch `main`) or upload a ZIP of the repo (without `node_modules`/`client/dist`).
2. Settings: Node 20 or 22, **Build command** `npm run build`, **Start command** `npm start`, **Entry file** `server/index.js`, install command `npm install`.
3. Environment variables: `NODE_ENV=production` (Hostinger supplies `PORT`).
4. Deploy, then attach the domain `ravindrameduni.com` in the same Node.js app's Domains section and enable SSL.
