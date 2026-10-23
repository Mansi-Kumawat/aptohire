import { mockCredentials } from './fixtures';
import type { PublicCredential } from '../schemas/credential';
import type { ApplicationSubmissionInput, ApplicationSuccessResponse } from '../schemas/application';
import { AppApiError } from '../schemas/errors';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomDelay(min = 400, max = 900): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function mockPublicVerify(credentialId: string): Promise<{ credential: PublicCredential }> {
  await sleep(getRandomDelay());

  // 1. Check rate-limit test ID
  if (credentialId === 'e5f6a7b8c9d0e1f2a3') {
    throw new AppApiError('Too many requests. Please try again later.', 'RATE_LIMITED', 429, undefined, 60);
  }

  // 2. Check fixture match
  const fixture = mockCredentials[credentialId];
  if (fixture) {
    return { credential: fixture };
  }

  // 3. Not found
  throw new AppApiError('Credential not found.', 'NOT_FOUND', 404);
}

export async function mockSubmitApplication(
  payload: ApplicationSubmissionInput
): Promise<ApplicationSuccessResponse> {
  await sleep(getRandomDelay());

  const email = payload.type === 'university' ? payload.contact_email : payload.work_email;

  // 1. Validation error test email
  if (email === 'fail@demo.test') {
    throw new AppApiError('Validation failed for the submitted application.', 'VALIDATION_FAILED', 422, {
      [payload.type === 'university' ? 'contact_email' : 'work_email']:
        'This email address cannot be accepted for testing purposes.',
    });
  }

  // 2. Rate limit test email
  if (email === 'rate@demo.test') {
    throw new AppApiError('Too many application submissions from this IP/email.', 'RATE_LIMITED', 429, undefined, 120);
  }

  // 3. Honeypot check
  if (payload.hp && payload.hp.trim() !== '') {
    throw new AppApiError('Spam submission detected.', 'VALIDATION_FAILED', 422);
  }

  // 4. Generate random reference ID: AH-XXXXXX (6 alphanumeric chars)
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let refCode = '';
  for (let i = 0; i < 6; i++) {
    refCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const reference = `AH-${refCode}`;

  return {
    reference,
    status: 'received',
  };
}
