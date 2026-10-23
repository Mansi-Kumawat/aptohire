import { describe, it, expect } from 'vitest';
import { extractCredentialId, isValidCredentialId } from '../src/lib/format';

describe('format and credential extraction', () => {
  it('extracts valid 18 hex ID from raw string', () => {
    const raw = 'a1b2c3d4e5f6a7b8c9';
    expect(extractCredentialId(raw)).toBe('a1b2c3d4e5f6a7b8c9');
  });

  it('extracts valid 18 hex ID from full pasted URL', () => {
    const pasted = 'https://aptohire.com/verify/a1b2c3d4e5f6a7b8c9';
    expect(extractCredentialId(pasted)).toBe('a1b2c3d4e5f6a7b8c9');

    const relativePasted = '/verify/a1b2c3d4e5f6a7b8c9';
    expect(extractCredentialId(relativePasted)).toBe('a1b2c3d4e5f6a7b8c9');
  });

  it('returns null for malformed or short credential IDs', () => {
    expect(extractCredentialId('short123')).toBe(null);
    expect(extractCredentialId('nonhexZZZZZZZZZZZZ')).toBe(null);
    expect(extractCredentialId('')).toBe(null);
  });

  it('validates strictly 18 lowercase hex characters', () => {
    expect(isValidCredentialId('a1b2c3d4e5f6a7b8c9')).toBe(true);
    expect(isValidCredentialId('A1B2C3D4E5F6A7B8C9')).toBe(false); // must be lowercase
    expect(isValidCredentialId('a1b2c3d4e5f6a7b8c')).toBe(false); // 17 chars
  });
});
