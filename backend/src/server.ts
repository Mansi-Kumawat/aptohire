import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { mockDbCredentials, submittedApplications } from './db.js';
import { applicationSubmissionSchema } from './types.js';

export const app = express();
const PORT = process.env.PORT || 54321;

app.use(cors());
app.use(express.json());

// In-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60 * 1000;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  return false;
}

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'aptohire-backend', timestamp: new Date().toISOString() });
});

/**
 * 4.1 public-verify (anonymous, rate-limited, cached)
 * GET /functions/v1/public-verify?id=<credentialId>
 */
app.get('/functions/v1/public-verify', (req: Request, res: Response): void => {
  const ip = req.ip || 'anon';
  if (isRateLimited(ip)) {
    res.status(429).json({
      error: { code: 'RATE_LIMITED', message: 'Too many verification attempts.' },
    });
    return;
  }

  const credentialId = (req.query.id as string) || '';

  // Validate 18-char lowercase hex
  if (!/^[a-f0-9]{18}$/.test(credentialId)) {
    res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Credential not found.' },
    });
    return;
  }

  // Rate-limit test credential fixture
  if (credentialId === 'e5f6a7b8c9d0e1f2a3') {
    res.setHeader('Retry-After', '60');
    res.status(429).json({
      error: { code: 'RATE_LIMITED', message: 'Too many checks from this connection. Try again in a minute.' },
    });
    return;
  }

  const credential = mockDbCredentials[credentialId];
  if (!credential) {
    res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Credential not found.' },
    });
    return;
  }

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
  res.status(200).json({ credential });
});

/**
 * 4.2 submit-application (anonymous, rate-limited, validated)
 * POST /functions/v1/submit-application
 */
app.post('/functions/v1/submit-application', (req: Request, res: Response): void => {
  const ip = req.ip || 'anon';
  if (isRateLimited(ip)) {
    res.status(429).json({
      error: { code: 'RATE_LIMITED', message: 'Too many application submissions.' },
    });
    return;
  }

  const body = req.body;

  // Honeypot check
  if (body.hp && typeof body.hp === 'string' && body.hp.trim() !== '') {
    res.status(422).json({
      error: { code: 'VALIDATION_FAILED', message: 'Spam submission detected.' },
    });
    return;
  }

  const email = body.type === 'university' ? body.contact_email : body.work_email;

  // Test error trigger emails
  if (email === 'fail@demo.test') {
    res.status(422).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'The submitted application contains invalid fields.',
        fields: {
          [body.type === 'university' ? 'contact_email' : 'work_email']:
            'This test email was rejected for validation testing.',
        },
      },
    });
    return;
  }

  if (email === 'rate@demo.test') {
    res.setHeader('Retry-After', '120');
    res.status(429).json({
      error: { code: 'RATE_LIMITED', message: 'Too many application submissions from this IP/email.' },
    });
    return;
  }

  // Zod schema validation
  const parsed = applicationSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    parsed.error.errors.forEach((err) => {
      const fieldName = err.path.join('.');
      fields[fieldName] = err.message;
    });

    res.status(422).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Application payload validation failed.',
        fields,
      },
    });
    return;
  }

  // Generate reference number: AH-XXXXXX
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let refCode = '';
  for (let i = 0; i < 6; i++) {
    refCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const reference = `AH-${refCode}`;

  submittedApplications.push({
    reference,
    payload: parsed.data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });

  res.status(202).json({
    reference,
    status: 'received',
  });
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`[AptoHire Backend] Edge Functions emulator running on port ${PORT}`);
    console.log(` - GET  /functions/v1/public-verify?id=<id>`);
    console.log(` - POST /functions/v1/submit-application`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n[Port Conflict] Port ${PORT} is already in use by another program on your machine.`);
      console.error(`To fix this:`);
      console.error(`1. Close the previous terminal running the server, OR`);
      console.error(`2. Run on another port:`);
      console.error(`   - Windows PowerShell: $env:PORT="54322"; npm run dev`);
      console.error(`   - Mac / Linux: PORT=54322 npm run dev\n`);
    } else {
      console.error('[Server Error]', err);
    }
  });
}
