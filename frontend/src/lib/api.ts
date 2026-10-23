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

const BASE_URL = `${env.VITE_SUPABASE_URL}/functions/v1`;

function getAuthHeaders(): HeadersInit {
  return {
    apikey: env.VITE_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
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

  try {
    const response = await fetch(`${BASE_URL}/public-verify?id=${encodeURIComponent(credentialId)}`, {
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

  const key = idempotencyKey || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `ah-${Date.now()}`);

  try {
    const response = await fetch(`${BASE_URL}/submit-application`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Idempotency-Key': key,
      },
      body: JSON.stringify(payload),
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
