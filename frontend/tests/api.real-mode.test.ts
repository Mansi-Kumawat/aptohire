import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppApiError } from '../src/lib/schemas/errors';

describe('real-mode Supabase configuration and contract payloads', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: false, status: 404, headers: new Headers() });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_USE_MOCKS', 'false');
    vi.stubEnv('VITE_APP_ENV', 'demo');
    vi.stubEnv('VITE_SUPABASE_URL', 'https://demo-project.supabase.co/');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-publishable-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('sends the anon key header and normalizes a trailing project URL slash', async () => {
    const { verifyCredential } = await import('../src/lib/api');

    await expect(verifyCredential('a1b2c3d4e5f6a7b8c9')).rejects.toMatchObject({ status: 404 });

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(requestUrl).toBe('https://demo-project.supabase.co/functions/v1/public-verify?id=a1b2c3d4e5f6a7b8c9');
    expect(new Headers(requestInit.headers).get('apikey')).toBe('test-publishable-key');
  });

  it('fails clearly before fetching when the anon key is missing', async () => {
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');
    vi.resetModules();
    const { verifyCredential } = await import('../src/lib/api');

    await expect(verifyCredential('a1b2c3d4e5f6a7b8c9')).rejects.toMatchObject({
      name: 'AppApiError',
      code: 'CONFIGURATION_ERROR',
    } satisfies Partial<AppApiError>);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('omits an empty optional phone and sends a UUID idempotency key', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 202,
      json: async () => ({ reference: 'AH-ABC123', status: 'received' }),
    });
    const { submitApplication } = await import('../src/lib/api');

    await submitApplication({
      type: 'university',
      institution_name: 'Apex Institute',
      kind: 'university',
      tier: 'tier2',
      city: 'Jaipur',
      state: 'Rajasthan',
      email_domains: 'apex.edu.in',
      student_count_band: '2000-5000',
      contact_name: 'A. Sharma',
      contact_role: 'Dean',
      contact_email: 'dean@apex.edu.in',
      contact_phone: '',
      consent: true,
      hp: '',
    }, 'not-a-uuid');

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(requestUrl).toBe('https://demo-project.supabase.co/functions/v1/submit-application');
    const headers = new Headers(requestInit.headers);
    expect(headers.get('Idempotency-Key')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    const body = JSON.parse(String(requestInit.body)) as Record<string, unknown>;
    expect(body.email_domains).toEqual(['apex.edu.in']);
    expect(body).not.toHaveProperty('contact_phone');
  });

  it('accepts a backend credential without an optional verified_on date', async () => {
    const { publicVerifyResponseSchema } = await import('../src/lib/schemas/credential');
    const result = publicVerifyResponseSchema.safeParse({
      credential: {
        credential_id: 'a1b2c3d4e5f6a7b8c9',
        issued_at: '2026-10-10',
        last_updated: '2026-10-12',
        skills: [{ name: 'React', level: 'Proficient', verified: true }],
        shared_fields: ['skills', 'levels'],
      },
    });
    expect(result.success).toBe(true);
  });
});
