import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import geminiRoutes from './geminiRoutes.js';

const app = express();

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://anaiai.co,capacitor://localhost,http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);
app.use(express.json({ limit: '10mb' }));

// Basic abuse guard. This is a metered Gemini key behind here - every hit costs money.
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/gemini', limiter);

// Lightweight shared-secret gate so the endpoint isn't wide open to anyone who
// finds the URL. Swap for real per-user auth (Supabase JWT, etc.) when ANAI.AI
// has accounts - this just stops anonymous scraping of the Gemini key's quota.
app.use('/api/gemini', (req, res, next) => {
  const appSecret = process.env.APP_SHARED_SECRET;
  if (!appSecret) return next(); // not configured yet - open (dev only, set this before prod)
  const provided = req.header('x-app-secret');
  if (provided !== appSecret) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
});

app.use('/api/gemini', geminiRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`anai-server listening on :${PORT}`));
