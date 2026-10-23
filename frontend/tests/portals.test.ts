import { describe, it, expect } from 'vitest';
import { portalUrl } from '../src/config/portals';

describe('portalUrl helper', () => {
  it('generates URLs for student, university, and organization', () => {
    const studentUrl = portalUrl('student', '/signup');
    const uniUrl = portalUrl('university', '/login');
    const orgUrl = portalUrl('organization');

    expect(studentUrl).toContain('/signup');
    expect(uniUrl).toContain('/login');
    expect(orgUrl).toBeTruthy();
  });

  it('normalizes leading slashes in path', () => {
    const url1 = portalUrl('student', 'dashboard');
    const url2 = portalUrl('student', '/dashboard');
    expect(url1).toBe(url2);
  });
});
