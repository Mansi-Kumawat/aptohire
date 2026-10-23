// Deno Edge Function: submit-application
// Handles access applications from universities and organizations
// Endpoint: POST /submit-application

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, idempotency-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const processedIdempotencyKeys = new Map<string, { reference: string; status: string }>();

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: { code: 'METHOD_NOT_ALLOWED', message: 'Only POST is supported.' } }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const idempotencyKey = req.headers.get('idempotency-key');
  if (idempotencyKey && processedIdempotencyKeys.has(idempotencyKey)) {
    const cached = processedIdempotencyKeys.get(idempotencyKey)!;
    return new Response(JSON.stringify(cached), {
      status: 202,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: { code: 'INVALID_JSON', message: 'Malformed JSON payload.' } }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Honeypot check
  if (body.hp && typeof body.hp === 'string' && body.hp.trim() !== '') {
    return new Response(
      JSON.stringify({ error: { code: 'VALIDATION_FAILED', message: 'Spam detected.' } }),
      { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Email test cases
  const email = (body.type === 'university' ? body.contact_email : body.work_email) as string;

  if (email === 'fail@demo.test') {
    return new Response(
      JSON.stringify({
        error: {
          code: 'VALIDATION_FAILED',
          message: 'The submitted application contains invalid fields.',
          fields: {
            [body.type === 'university' ? 'contact_email' : 'work_email']:
              'This test email was rejected for validation testing.',
          },
        },
      }),
      { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (email === 'rate@demo.test') {
    return new Response(
      JSON.stringify({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many application submissions from this IP/email.',
        },
      }),
      {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '120' },
      }
    );
  }

  // Basic validation check on consent
  if (body.consent !== true) {
    return new Response(
      JSON.stringify({
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Consent is required.',
          fields: { consent: 'You must agree to the privacy notice.' },
        },
      }),
      { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Generate reference AH-XXXXXX
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let refCode = '';
  for (let i = 0; i < 6; i++) {
    refCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const reference = `AH-${refCode}`;

  const responsePayload = {
    reference,
    status: 'received' as const,
  };

  if (idempotencyKey) {
    processedIdempotencyKeys.set(idempotencyKey, responsePayload);
  }

  return new Response(JSON.stringify(responsePayload), {
    status: 202,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
