'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const { getPool } = require('./db');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const allowedOrigins = [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: false,
}));

app.use(express.json({ limit: '1mb' }));
app.use(passport.initialize());

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  max: Number(process.env.RATE_LIMIT_MAX || 120),
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const pool = getPool();
    const googleId = profile.id;
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
    const name = profile.displayName || 'Usuario';
    const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

    if (!googleId || !email) {
      return done(new Error('Google profile missing id/email'));
    }

    const [rows] = await pool.query('SELECT id FROM users WHERE google_id = ? LIMIT 1', [googleId]);
    let userId;

    if (rows.length) {
      userId = rows[0].id;
      await pool.query('UPDATE users SET email = ?, name = ?, avatar_url = ? WHERE id = ?', [email, name, avatar, userId]);
    } else {
      const [result] = await pool.query(
        'INSERT INTO users (google_id, email, name, avatar_url) VALUES (?, ?, ?, ?)',
        [googleId, email, name, avatar]
      );
      userId = result.insertId;
    }

    return done(null, { id: userId, email, name, avatar });
  } catch (err) {
    return done(err);
  }
}));

function issueToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next();
  const token = header.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    // ignore invalid token
  }
  next();
}

function ipHash(req) {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();
  return crypto.createHash('sha256').update(ip + JWT_SECRET).digest('hex');
}

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: FRONTEND_URL + '/?login=fail' }), (req, res) => {
  const token = issueToken(req.user);
  const redirectUrl = `${FRONTEND_URL}/?token=${encodeURIComponent(token)}`;
  res.redirect(redirectUrl);
});

app.get('/auth/me', (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET);
    return res.json({ user: payload });
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Poll: Mayor amenaza
const POLL_KEY = 'threats';
const POLL_OPTIONS = [
  { key: 'ai', label: 'Inteligencia Artificial descontrolada' },
  { key: 'climate', label: 'Cambio Clim?tico' },
  { key: 'bio', label: 'Pandemia / Bioterrorismo' },
  { key: 'nuclear', label: 'Guerra Nuclear' },
];

app.get('/polls/threats', async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query(
    'SELECT option_key, COUNT(*) as cnt FROM poll_votes WHERE poll_key = ? GROUP BY option_key',
    [POLL_KEY]
  );
  const counts = POLL_OPTIONS.reduce((acc, o) => ({ ...acc, [o.key]: 0 }), {});
  rows.forEach(r => { counts[r.option_key] = Number(r.cnt || 0); });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const results = POLL_OPTIONS.map(o => ({
    key: o.key,
    label: o.label,
    count: counts[o.key],
    percent: total ? Math.round((counts[o.key] / total) * 100) : 0,
  }));
  res.json({ poll: POLL_KEY, total, results });
});

app.post('/polls/threats/vote', limiter, authOptional, async (req, res) => {
  const optionKey = (req.body && req.body.option_key) || '';
  if (!POLL_OPTIONS.find(o => o.key === optionKey)) {
    return res.status(400).json({ error: 'Invalid option' });
  }

  const pool = getPool();
  const userId = req.user ? req.user.sub : null;
  const ip = userId ? null : ipHash(req);

  if (userId) {
    const [rows] = await pool.query(
      'SELECT id FROM poll_votes WHERE poll_key = ? AND user_id = ? LIMIT 1',
      [POLL_KEY, userId]
    );
    if (rows.length) return res.status(409).json({ error: 'Already voted' });
  } else {
    const [rows] = await pool.query(
      'SELECT id FROM poll_votes WHERE poll_key = ? AND ip_hash = ? LIMIT 1',
      [POLL_KEY, ip]
    );
    if (rows.length) return res.status(409).json({ error: 'Already voted' });
  }

  await pool.query(
    'INSERT INTO poll_votes (poll_key, option_key, user_id, ip_hash) VALUES (?, ?, ?, ?)',
    [POLL_KEY, optionKey, userId, ip]
  );

  res.json({ ok: true });
});

app.post('/newsletter/subscribe', limiter, async (req, res) => {
  const email = (req.body && req.body.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  const pool = getPool();
  await pool.query('INSERT IGNORE INTO newsletter_subs (email) VALUES (?)', [email]);
  // TODO: enviar email de confirmacion via SMTP
  res.json({ ok: true });
});

app.post('/contact', limiter, async (req, res) => {
  const name = (req.body && req.body.name || '').trim();
  const email = (req.body && req.body.email || '').trim();
  const message = (req.body && req.body.message || '').trim();
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  const pool = getPool();
  await pool.query('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
  // TODO: enviar notificacion via SMTP
  res.json({ ok: true });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Backend running on :${port}`);
});
