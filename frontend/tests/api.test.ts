import { describe, it, expect } from 'vitest';
import { verifyCredential, submitApplication } from '../src/lib/api';
import { AppApiError } from '../src/lib/schemas/errors';

describe('API client and mock layer', () => {
  describe('verifyCredential', () => {
    it('successfully retrieves full fixture a1b2c3d4e5f6a7b8c9', async () => {
      const result = await verifyCredential('a1b2c3d4e5f6a7b8c9');
      expect(result.credential).toBeDefined();
      expect(result.credential.credential_id).toBe('a1b2c3d4e5f6a7b8c9');
      expect(result.credential.display_name).toBe('Aarav S.');
      expect(result.credential.skills.length).toBeGreaterThan(0);
      expect(result.credential.skills[0].score).toBe(72);
    });

    it('successfully retrieves levels-only fixture b2c3d4e5f6a7b8c9d0', async () => {
      const result = await verifyCredential('b2c3d4e5f6a7b8c9d0');
      expect(result.credential.credential_id).toBe('b2c3d4e5f6a7b8c9d0');
      expect(result.credential.display_name).toBeUndefined();
      expect(result.credential.skills[0].score).toBeUndefined();
    });

    it('successfully retrieves nothing-shared fixture c3d4e5f6a7b8c9d0e1', async () => {
      const result = await verifyCredential('c3d4e5f6a7b8c9d0e1');
      expect(result.credential.skills).toHaveLength(0);
    });

    it('returns unverified affiliation for d4e5f6a7b8c9d0e1f2', async () => {
      const result = await verifyCredential('d4e5f6a7b8c9d0e1f2');
      expect(result.credential.affiliation?.verification).toBe('unverified');
    });

    it('returns 429 for rate-limit fixture e5f6a7b8c9d0e1f2a3', async () => {
      await expect(verifyCredential('e5f6a7b8c9d0e1f2a3')).rejects.toThrowError(AppApiError);
      try {
        await verifyCredential('e5f6a7b8c9d0e1f2a3');
      } catch (err) {
        expect((err as AppApiError).status).toBe(429);
      }
    });

    it('returns 404 for unknown valid hex', async () => {
      await expect(verifyCredential('0000000000000000aa')).rejects.toThrowError(AppApiError);
      try {
        await verifyCredential('0000000000000000aa');
      } catch (err) {
        expect((err as AppApiError).status).toBe(404);
      }
    });

    it('rejects invalid hex without network call with 404', async () => {
      await expect(verifyCredential('short-id')).rejects.toThrowError(AppApiError);
      try {
        await verifyCredential('short-id');
      } catch (err) {
        expect((err as AppApiError).status).toBe(404);
      }
    });
  });

  describe('submitApplication', () => {
    it('successfully submits valid university application and returns reference', async () => {
      const result = await submitApplication({
        type: 'university',
        institution_name: 'Apex Institute of Technology',
        kind: 'university',
        tier: 'tier2',
        city: 'Jaipur',
        state: 'Rajasthan',
        student_count_band: '2000-5000',
        contact_name: 'Dr. Sharma',
        contact_role: 'Dean of Placements',
        contact_email: 'sharma@apex.edu.test',
        consent: true,
        hp: '',
      });

      expect(result.reference).toMatch(/^AH-[A-Z0-9]{6}$/);
      expect(result.status).toBe('received');
    });

    it('successfully submits valid organization application', async () => {
      const result = await submitApplication({
        type: 'organization',
        org_name: 'TechFlow Systems',
        org_kind: 'startup',
        size_band: '51-250',
        website: 'https://techflow.example.com',
        hiring_focus: ['web_frontend', 'backend'],
        contact_name: 'Sarah Jenkins',
        contact_role: 'Head of Talent',
        work_email: 'sarah@techflow.example.com',
        consent: true,
        hp: '',
      });

      expect(result.reference).toMatch(/^AH-[A-Z0-9]{6}$/);
      expect(result.status).toBe('received');
    });

    it('returns 422 with field errors for fail@demo.test', async () => {
      try {
        await submitApplication({
          type: 'university',
          institution_name: 'Demo Uni',
          kind: 'university',
          tier: 'tier1',
          city: 'Mumbai',
          state: 'Maharashtra',
          student_count_band: '500-2000',
          contact_name: 'Test Contact',
          contact_role: 'TPO',
          contact_email: 'fail@demo.test',
          consent: true,
          hp: '',
        });
        expect.fail('Should have thrown validation error');
      } catch (err) {
        expect(err).toBeInstanceOf(AppApiError);
        expect((err as AppApiError).status).toBe(422);
        expect((err as AppApiError).fields).toBeDefined();
      }
    });

    it('returns 429 for rate@demo.test', async () => {
      try {
        await submitApplication({
          type: 'organization',
          org_name: 'Rate Test Corp',
          org_kind: 'corporate',
          size_band: '251-1000',
          website: 'https://ratetest.example.com',
          hiring_focus: ['data'],
          contact_name: 'Alex',
          contact_role: 'Recruiter',
          work_email: 'rate@demo.test',
          consent: true,
          hp: '',
        });
        expect.fail('Should have thrown rate limit error');
      } catch (err) {
        expect(err).toBeInstanceOf(AppApiError);
        expect((err as AppApiError).status).toBe(429);
      }
    });

    it('rejects honeypot submission', async () => {
      try {
        await submitApplication({
          type: 'organization',
          org_name: 'Bot Corp',
          org_kind: 'startup',
          size_band: '1-10',
          website: 'https://bot.example.com',
          hiring_focus: ['backend'],
          contact_name: 'Bot',
          contact_role: 'Spammer',
          work_email: 'bot@example.com',
          consent: true,
          hp: 'spam-bot-value',
        });
        expect.fail('Should have rejected honeypot');
      } catch (err) {
        expect(err).toBeInstanceOf(AppApiError);
        expect((err as AppApiError).status).toBe(422);
      }
    });
  });
});
