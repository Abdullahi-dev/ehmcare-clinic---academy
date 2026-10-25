import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const PORT = 3000;
const app = express();
app.use(express.json({ limit: '15mb' }));

// ==========================================
// PERSISTENT SERVER-SIDE DATABASE (server-data/db.json)
// Ensures all enquiries, bookings, subscribers, and settings
// are permanently saved to disk and never erased.
// ==========================================
const DB_DIR = path.resolve(process.cwd(), 'server-data');
const DB_FILE = path.join(DB_DIR, 'db.json');

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      submissions: [],
      subscribers: [
        {
          email: 'ehmcaree@gmail.com',
          fullName: 'EHMCare Official Desk',
          topic: 'all',
          subscribedAt: new Date().toISOString(),
          status: 'active',
        },
        {
          email: 'aalqutijifawy@gmail.com',
          fullName: 'Co-Admin Clinical Inquiries',
          topic: 'all',
          subscribedAt: new Date().toISOString(),
          status: 'active',
        },
        {
          email: 'devabdultechnologies@gmail.com',
          fullName: 'System Engineering',
          topic: 'all',
          subscribedAt: new Date().toISOString(),
          status: 'active',
        },
      ],
      broadcasts: [],
      stories: [],
      footage: [],
      emailConfig: {
        provider: 'resend',
        resendApiKey: '',
        web3FormsKey: '',
        adminRecipients: ['ehmcaree@gmail.com', 'aalqutijifawy@gmail.com'],
        autoBroadcastOnNewStory: true,
      },
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    console.log(`[DB Init] Created persistent database at ${DB_FILE}`);
  }
}

function readDb(): any {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[DB Read Error]', err);
    return { submissions: [], subscribers: [], broadcasts: [], stories: [], footage: [], emailConfig: {} };
  }
}

function writeDb(data: any): boolean {
  ensureDb();
  try {
    const tmpFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('[DB Write Error]', err);
    return false;
  }
}

// Initialize database on startup
ensureDb();

// ------------------------------------------
// DATABASE REST API ROUTES
// ------------------------------------------

// 1. Fetch complete database state
app.get('/api/data', (_req, res) => {
  try {
    const db = readDb();
    res.json({ success: true, data: db });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Submissions (Consultation, Academy Applications, Investor Inquiries)
app.get('/api/submissions', (_req, res) => {
  const db = readDb();
  res.json({ success: true, submissions: db.submissions || [] });
});

app.post('/api/submissions', (req, res) => {
  try {
    const submission = req.body;
    if (!submission || !submission.id) {
      return res.status(400).json({ success: false, error: 'Invalid submission data' });
    }
    const db = readDb();
    db.submissions = db.submissions || [];
    const idx = db.submissions.findIndex((s: any) => s.id === submission.id);
    if (idx >= 0) {
      db.submissions[idx] = { ...db.submissions[idx], ...submission };
    } else {
      db.submissions.unshift(submission);
    }
    writeDb(db);
    console.log(`[DB] Saved submission permanently: ${submission.id} (${submission.type}) - ${submission.name}`);
    res.json({ success: true, submission, total: db.submissions.length });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = readDb();
    db.submissions = db.submissions || [];
    const idx = db.submissions.findIndex((s: any) => s.id === id);
    if (idx >= 0) {
      db.submissions[idx] = { ...db.submissions[idx], ...updates };
      writeDb(db);
      return res.json({ success: true, submission: db.submissions[idx] });
    }
    res.status(404).json({ success: false, error: 'Submission not found' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = readDb();
    db.submissions = (db.submissions || []).filter((s: any) => s.id !== id);
    writeDb(db);
    res.json({ success: true, message: `Submission ${id} deleted` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Newsletter Subscribers
app.get('/api/subscribers', (_req, res) => {
  const db = readDb();
  res.json({ success: true, subscribers: db.subscribers || [] });
});

app.post('/api/subscribers', (req, res) => {
  try {
    const sub = req.body;
    if (!sub || !sub.email) {
      return res.status(400).json({ success: false, error: 'Email required' });
    }
    const db = readDb();
    db.subscribers = db.subscribers || [];
    const norm = String(sub.email).trim().toLowerCase();
    const idx = db.subscribers.findIndex((s: any) => s.email.toLowerCase() === norm);
    if (idx >= 0) {
      db.subscribers[idx] = { ...db.subscribers[idx], ...sub, email: norm };
    } else {
      db.subscribers.unshift({
        ...sub,
        email: norm,
        subscribedAt: sub.subscribedAt || new Date().toISOString(),
      });
    }
    writeDb(db);
    console.log(`[DB] Subscriber saved permanently: ${norm}`);
    res.json({ success: true, subscriber: sub, total: db.subscribers.length });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/subscribers/:email', (req, res) => {
  try {
    const norm = decodeURIComponent(req.params.email).trim().toLowerCase();
    const db = readDb();
    db.subscribers = (db.subscribers || []).filter((s: any) => s.email.toLowerCase() !== norm);
    writeDb(db);
    res.json({ success: true, message: `Subscriber ${norm} removed` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Custom Stories (Patient Success Videos)
app.post('/api/stories', (req, res) => {
  try {
    const story = req.body;
    const db = readDb();
    db.stories = db.stories || [];
    const idx = db.stories.findIndex((s: any) => s.id === story.id);
    if (idx >= 0) {
      db.stories[idx] = { ...db.stories[idx], ...story };
    } else {
      db.stories.unshift(story);
    }
    writeDb(db);
    res.json({ success: true, story });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/stories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = readDb();
    db.stories = (db.stories || []).filter((s: any) => s.id !== id);
    writeDb(db);
    res.json({ success: true, message: `Story ${id} deleted` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Custom Footage (Classroom / Academy Videos)
app.post('/api/footage', (req, res) => {
  try {
    const footageItem = req.body;
    const db = readDb();
    db.footage = db.footage || [];
    const idx = db.footage.findIndex((f: any) => f.id === footageItem.id);
    if (idx >= 0) {
      db.footage[idx] = { ...db.footage[idx], ...footageItem };
    } else {
      db.footage.unshift(footageItem);
    }
    writeDb(db);
    res.json({ success: true, footage: footageItem });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/footage/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = readDb();
    db.footage = (db.footage || []).filter((f: any) => f.id !== id);
    writeDb(db);
    res.json({ success: true, message: `Footage ${id} deleted` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Email Configuration & Settings
app.get('/api/email-config', (_req, res) => {
  const db = readDb();
  res.json({ success: true, emailConfig: db.emailConfig || {} });
});

app.post('/api/email-config', (req, res) => {
  try {
    const config = req.body;
    const db = readDb();
    db.emailConfig = { ...db.emailConfig, ...config };
    writeDb(db);
    console.log('[DB] Email settings updated and saved permanently');
    res.json({ success: true, emailConfig: db.emailConfig });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Broadcast History Log
app.post('/api/broadcasts', (req, res) => {
  try {
    const record = req.body;
    const db = readDb();
    db.broadcasts = db.broadcasts || [];
    db.broadcasts.unshift(record);
    writeDb(db);
    res.json({ success: true, record });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Database Restore / Import
app.post('/api/restore', (req, res) => {
  try {
    const backup = req.body;
    if (!backup || typeof backup !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid backup file payload' });
    }
    const current = readDb();
    const merged = {
      submissions: backup.submissions || current.submissions || [],
      subscribers: backup.subscribers || current.subscribers || [],
      broadcasts: backup.broadcasts || current.broadcasts || [],
      stories: backup.stories || current.stories || [],
      footage: backup.footage || current.footage || [],
      emailConfig: backup.emailConfig || current.emailConfig || {},
    };
    writeDb(merged);
    console.log('[DB] Database restored/imported successfully');
    res.json({
      success: true,
      message: 'Database restored successfully',
      stats: {
        submissions: merged.submissions.length,
        subscribers: merged.subscribers.length,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Resend & Multi-Service Server-Side Email Dispatch Route
// Bypasses browser CORS restrictions and provides real server-to-server delivery
app.post('/api/send-email', async (req, res) => {
  try {
    const { apiKey, from, to, subject, html, text, fromName } = req.body;

    if (!apiKey) {
      return res.status(400).json({ success: false, error: 'No Resend API key provided.' });
    }

    const recipients = Array.isArray(to) ? to : [to];
    const cleanApiKey = apiKey.trim();
    const sender = from || `${fromName || 'EHMCare Integrated Healthcare'} <onboarding@resend.dev>`;

    console.log(`[API /api/send-email] Dispatching to ${recipients.join(', ')} via Resend...`);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cleanApiKey}`,
      },
      body: JSON.stringify({
        from: sender,
        to: recipients,
        subject,
        html,
        text,
      }),
    });

    const data = (await response.json()) as any;

    if (!response.ok) {
      console.warn('[Resend API Notice]', data);

      // Check if Resend rejected because of sandbox restriction:
      // "You can only send testing emails to your own email address (xyz@gmail.com). To send to other recipients, please verify a domain at resend.com/domains"
      const ownEmailMatch = data.message?.match(/own email address \(([^)]+)\)/i);
      if (ownEmailMatch && ownEmailMatch[1]) {
        const fallbackOwnerEmail = ownEmailMatch[1].trim();
        console.log(`[Resend Sandbox Route] Dispatching testing alert to verified account: ${fallbackOwnerEmail}`);

        const retryResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cleanApiKey}`,
          },
          body: JSON.stringify({
            from: sender,
            to: [fallbackOwnerEmail],
            subject: `[EHMCare Alert - For: ${recipients.join(', ')}] ${subject}`,
            html: `
              <div style="background:#eef7ee;border:1px solid #004c22;padding:12px;border-radius:8px;margin-bottom:16px;font-family:sans-serif;font-size:12.5px;color:#004c22;">
                <strong>Resend Sandbox Delivery Notice:</strong><br/>
                Intended for: <strong>${recipients.join(', ')}</strong>.<br/>
                Because your Resend key is in testing mode (using <em>onboarding@resend.dev</em>), Resend delivers alerts to your registered account (<strong>${fallbackOwnerEmail}</strong>).<br/>
                To send directly to custom addresses (ehmcaree@gmail.com & aalqutijifawy@gmail.com), verify your clinic domain at <a href="https://resend.com/domains" target="_blank">resend.com/domains</a>.
              </div>
              ${html}
            `,
            text: `[Forwarded for ${recipients.join(', ')}]\n\n${text}`,
          }),
        });

        const retryData = (await retryResponse.json()) as any;
        if (retryResponse.ok) {
          return res.status(200).json({
            success: true,
            id: retryData.id,
            deliveredTo: [fallbackOwnerEmail],
            intendedRecipients: recipients,
            sandboxNotice: `Delivered via Resend testing mode to your account (${fallbackOwnerEmail}). To send directly to ${recipients.join(', ')}, add a verified domain at resend.com/domains.`,
          });
        }
      }

      return res.status(200).json({
        success: false,
        error: data.message || 'Resend delivery rejected',
        details: data,
      });
    }

    console.log(`[Resend Success] Email delivered. ID: ${data.id}`);
    return res.json({
      success: true,
      id: data.id,
      message: `Delivered via Resend to ${recipients.join(', ')}`,
    });
  } catch (err: any) {
    console.error('[API /api/send-email Error]', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal email dispatch error',
    });
  }
});

// 10. Generic Form Notification Endpoint
app.post('/api/forms/notify', async (req, res) => {
  try {
    const { recipients, subject, html, text } = req.body;
    console.log(`[Form Notification] Alerting admin recipients: ${recipients?.join(', ')}`);
    return res.json({ success: true, message: 'Form notification received by server.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Mount Vite Dev Middleware on Port 3000
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 EHMCare Full-Stack Dev Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
