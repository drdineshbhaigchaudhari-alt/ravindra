import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
const distDir = path.join(__dirname, '..', 'client', 'dist');
const PORT = process.env.PORT || 5000;

const RESOURCES = ['site', 'notices', 'departments', 'programs', 'events', 'schedules', 'gallery', 'leadership', 'committees', 'faqs', 'vacancies', 'pages'];

const readJson = (name) => JSON.parse(fs.readFileSync(path.join(dataDir, `${name}.json`), 'utf8'));

const app = express();
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/:resource', (req, res) => {
  const { resource } = req.params;
  if (!RESOURCES.includes(resource)) return res.status(404).json({ error: 'Not found' });
  try {
    res.json(readJson(resource));
  } catch {
    res.status(500).json({ error: 'Unable to load data' });
  }
});

const enquiryLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 });
app.post('/api/enquiries', enquiryLimiter, (req, res) => {
  const { name, email, phone = '', subject = '', message } = req.body || {};
  const clean = (v, max) => String(v ?? '').trim().slice(0, max);
  const entry = {
    name: clean(name, 100), email: clean(email, 150), phone: clean(phone, 30),
    subject: clean(subject, 150), message: clean(message, 2000), receivedAt: new Date().toISOString()
  };
  if (!entry.name || !/^\S+@\S+\.\S+$/.test(entry.email) || entry.message.length < 5) {
    return res.status(400).json({ error: 'Please provide a valid name, email and message.' });
  }
  const file = path.join(dataDir, 'enquiries.json');
  let list = [];
  try { list = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { /* first enquiry */ }
  list.push(entry);
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
  res.status(201).json({ ok: true });
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { maxAge: '7d', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.listen(PORT, () => console.log(`Ravindra server running on http://localhost:${PORT}`));
