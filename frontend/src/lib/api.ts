import { env } from '@/config/env';
import { isValidCredentialId } from './format';
import { publicVerifyResponseSchema, type PublicCredential } from './schemas/credential';
import {
  applicationSuccessResponseSchema,
  type ApplicationSubmissionInput,
  type ApplicationSuccessResponse,
} from './schemas/application';
import { AppApiError } from './schemas/errors';
import { mockPublicVerify, mockSubmitApplication } from './mocks/handlers';

function getSupabaseFunctionsUrl(): string {
  const projectUrl = env.VITE_SUPABASE_URL.trim();
  const anonKey = env.VITE_SUPABASE_ANON_KEY.trim();
  if (!projectUrl || !anonKey) {
    throw new AppApiError(
      'Supabase is not configured for real mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then redeploy.',
      'CONFIGURATION_ERROR',
      503
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(projectUrl);
  } catch {
    throw new AppApiError('VITE_SUPABASE_URL must be a valid Supabase project URL.', 'CONFIGURATION_ERROR', 503);
  }
  const localHost = ['localhost', '127.0.0.1', '::1'].includes(parsedUrl.hostname);
  if (parsedUrl.protocol !== 'https:' && !(env.VITE_APP_ENV === 'local' && localHost)) {
    throw new AppApiError('VITE_SUPABASE_URL must use HTTPS outside local development.', 'CONFIGURATION_ERROR', 503);
  }
  if (/placeholder|example/i.test(parsedUrl.hostname) || anonKey === 'placeholder-anon-key') {
    throw new AppApiError('Supabase environment variables still contain placeholder values.', 'CONFIGURATION_ERROR', 503);
  }

  return `${projectUrl.replace(/\/+$/, '')}/functions/v1`;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function createIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function getAuthHeaders(): HeadersInit {
  const anonKey = env.VITE_SUPABASE_ANON_KEY.trim();
  return {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Converts the university form's comma-separated text field into the array
 * required by the frozen/backend submit-application contract.
 */
function normalizeApplicationPayload(payload: ApplicationSubmissionInput) {
  if (payload.type !== 'university') return payload;

  const email_domains = (payload.email_domains ?? '')
    .split(',')
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);
  const { contact_phone, ...universityPayload } = payload;
  const contactPhone = contact_phone?.trim();

  // The backend accepts contact_phone only when it is a non-empty phone value.
  // React Hook Form submits a blank optional input as an empty string, so omit it.
  return {
    ...universityPayload,
    email_domains,
    ...(contactPhone ? { contact_phone: contactPhone } : {}),
  };
}

/**
 * Public Credential Verification
 * Calls GET /public-verify?id=<credentialId>
 */
export async function verifyCredential(credentialId: string): Promise<{ credential: PublicCredential }> {
  // Validate 18-char lowercase hex client-side before calling
  if (!isValidCredentialId(credentialId)) {
    throw new AppApiError('Credential not found.', 'NOT_FOUND', 404);
  }

  // Switch to mock handlers when VITE_USE_MOCKS is true
  if (env.VITE_USE_MOCKS) {
    return mockPublicVerify(credentialId);
  }

  const functionsUrl = getSupabaseFunctionsUrl();
  try {
    const response = await fetch(`${functionsUrl}/public-verify?id=${encodeURIComponent(credentialId)}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.status === 429) {
      const retryAfterHeader = response.headers.get('Retry-After');
      const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;
      throw new AppApiError('Too many verification requests.', 'RATE_LIMITED', 429, undefined, retryAfter);
    }

    if (response.status === 404) {
      throw new AppApiError('Credential not found.', 'NOT_FOUND', 404);
    }

    if (response.status >= 500) {
      throw new AppApiError('Service temporarily unavailable.', 'SERVICE_UNAVAILABLE', response.status);
    }

    if (!response.ok) {
      throw new AppApiError('An error occurred while verifying credential.', 'UNKNOWN_ERROR', response.status);
    }

    const data = await response.json();
    const parsed = publicVerifyResponseSchema.safeParse(data);

    if (!parsed.success) {
      throw new AppApiError('Malformed credential response.', 'MALFORMED_RESPONSE', 502);
    }

    return parsed.data;
  } catch (err: unknown) {
    if (err instanceof AppApiError) {
      throw err;
    }
    throw new AppApiError('Network connection failure. Please check your connection.', 'NETWORK_ERROR', 0);
  }
}

/**
 * Access Application Submission
 * Calls POST /submit-application with Idempotency-Key
 */
export async function submitApplication(
  payload: ApplicationSubmissionInput,
  idempotencyKey?: string
): Promise<ApplicationSuccessResponse> {
  if (env.VITE_USE_MOCKS) {
    return mockSubmitApplication(payload);
  }

  const functionsUrl = getSupabaseFunctionsUrl();
  const key = idempotencyKey && UUID_PATTERN.test(idempotencyKey)
    ? idempotencyKey
    : createIdempotencyKey();

  try {
    const response = await fetch(`${functionsUrl}/submit-application`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Idempotency-Key': key,
      },
      body: JSON.stringify(normalizeApplicationPayload(payload)),
    });

    const data = await response.json().catch(() => null);

    if (response.status === 422) {
      const fieldErrors = data?.error?.fields as Record<string, string> | undefined;
      throw new AppApiError(
        data?.error?.message || 'Validation failed for application.',
        'VALIDATION_FAILED',
        422,
        fieldErrors
      );
    }

    if (response.status === 429) {
      throw new AppApiError('Too many attempts. Try again in a few minutes.', 'RATE_LIMITED', 429);
    }

    if (response.status >= 500) {
      throw new AppApiError("We couldn't send this right now. Your answers are still here. Try again.", 'SERVICE_UNAVAILABLE', response.status);
    }

    if (!response.ok) {
      throw new AppApiError(data?.error?.message || 'Failed to submit application.', 'UNKNOWN_ERROR', response.status);
    }

    const parsed = applicationSuccessResponseSchema.safeParse(data);
    if (!parsed.success) {
      throw new AppApiError('Invalid response from server.', 'MALFORMED_RESPONSE', 502);
    }

    return parsed.data;
  } catch (err: unknown) {
    if (err instanceof AppApiError) {
      throw err;
    }
    throw new AppApiError('Network error. Please try again.', 'NETWORK_ERROR', 0);
  }
}
