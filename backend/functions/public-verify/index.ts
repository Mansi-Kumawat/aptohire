// Deno Edge Function: public-verify
// Handles anonymous, rate-limited public credential verification queries
// Endpoint: GET /public-verify?id=<credentialId>

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Simple rate limiter tracking in memory
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30; // max 30 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const clientIp = req.headers.get('x-forwarded-for') || 'anon';
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many verification attempts from this connection.',
        },
      }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }

  const url = new URL(req.url);
  const credentialId = url.searchParams.get('id');

  // Validate format: 18 lowercase hex
  if (!credentialId || !/^[a-f0-9]{18}$/.test(credentialId)) {
    return new Response(
      JSON.stringify({
        error: {
          code: 'NOT_FOUND',
          message: 'Credential not found.',
        },
      }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  // Rate-limit test credential
  if (credentialId === 'e5f6a7b8c9d0e1f2a3') {
    return new Response(
      JSON.stringify({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many checks from this connection. Try again in a minute.',
        },
      }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }

  // Sample seed fixtures
  const fixtures: Record<string, unknown> = {
    a1b2c3d4e5f6a7b8c9: {
      credential_id: 'a1b2c3d4e5f6a7b8c9',
      issued_at: '2026-10-12',
      last_updated: '2026-10-12',
      display_name: 'Aarav S.',
      affiliation: { label: 'Uni A', verification: 'roster' },
      skills: [
        { name: 'React', level: 'Proficient', verified: true, score: 72, verified_on: '2026-10-12' },
        { name: 'TypeScript', level: 'Proficient', verified: true, score: 70, verified_on: '2026-10-12' },
        { name: 'REST APIs', level: 'Proficient', verified: true, score: 75, verified_on: '2026-10-12' },
      ],
      shared_fields: ['name', 'affiliation', 'skills', 'scores'],
    },
    b2c3d4e5f6a7b8c9d0: {
      credential_id: 'b2c3d4e5f6a7b8c9d0',
      issued_at: '2026-09-18',
      last_updated: '2026-10-05',
      skills: [
        { name: 'React', level: 'Proficient', verified: true, verified_on: '2026-09-18' },
        { name: 'TypeScript', level: 'Proficient', verified: true, verified_on: '2026-09-24' },
        { name: 'Node.js', level: 'Competent', verified: true, verified_on: '2026-10-05' },
      ],
      shared_fields: ['skills', 'levels'],
    },
    c3d4e5f6a7b8c9d0e1: {
      credential_id: 'c3d4e5f6a7b8c9d0e1',
      issued_at: '2026-08-10',
      last_updated: '2026-08-10',
      display_name: 'Priya K.',
      skills: [],
      shared_fields: ['name'],
    },
    d4e5f6a7b8c9d0e1f2: {
      credential_id: 'd4e5f6a7b8c9d0e1f2',
      issued_at: '2026-10-01',
      last_updated: '2026-10-01',
      display_name: 'Avi M.',
      affiliation: { label: 'Autonomous College of Technology', verification: 'unverified' },
      skills: [
        { name: 'Python', level: 'Advanced', verified: true, score: 88, verified_on: '2026-10-01' },
        { name: 'FastAPI', level: 'Proficient', verified: true, score: 76, verified_on: '2026-10-01' },
      ],
      shared_fields: ['name', 'affiliation', 'skills', 'scores'],
    },
  };

  const credential = fixtures[credentialId];
  if (!credential) {
    return new Response(
      JSON.stringify({
        error: {
          code: 'NOT_FOUND',
          message: 'Credential not found.',
        },
      }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({ credential }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300',
      },
    }
  );
});
