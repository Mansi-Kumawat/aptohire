import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppApiError } from '../src/lib/schemas/errors';

describe('real-mode Supabase configuration', () => {
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
});
