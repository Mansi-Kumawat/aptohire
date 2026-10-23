import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/server.js';

describe('AptoHire Backend API Endpoints', () => {
  describe('GET /functions/v1/public-verify', () => {
    it('returns 200 and credential for valid fixture a1b2c3d4e5f6a7b8c9', async () => {
      const res = await request(app).get('/functions/v1/public-verify?id=a1b2c3d4e5f6a7b8c9');
      expect(res.status).toBe(200);
      expect(res.body.credential).toBeDefined();
      expect(res.body.credential.display_name).toBe('Aarav S.');
      expect(res.body.credential.skills).toHaveLength(3);
    });

    it('returns 404 for malformed ID', async () => {
      const res = await request(app).get('/functions/v1/public-verify?id=short-id');
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('returns 404 for unknown valid hex ID', async () => {
      const res = await request(app).get('/functions/v1/public-verify?id=0000000000000000aa');
      expect(res.status).toBe(404);
    });

    it('returns 429 for rate-limit test ID e5f6a7b8c9d0e1f2a3', async () => {
      const res = await request(app).get('/functions/v1/public-verify?id=e5f6a7b8c9d0e1f2a3');
      expect(res.status).toBe(429);
      expect(res.headers['retry-after']).toBe('60');
    });
  });

  describe('POST /functions/v1/submit-application', () => {
    it('accepts valid university application and returns 202 with reference', async () => {
      const res = await request(app)
        .post('/functions/v1/submit-application')
        .send({
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

      expect(res.status).toBe(202);
      expect(res.body.reference).toMatch(/^AH-[A-Z0-9]{6}$/);
      expect(res.body.status).toBe('received');
    });

    it('accepts valid organization application and returns 202', async () => {
      const res = await request(app)
        .post('/functions/v1/submit-application')
        .send({
          type: 'organization',
          org_name: 'TechFlow Systems',
          org_kind: 'startup',
          size_band: '51-250',
          website: 'https://techflow.example.com',
          hiring_focus: ['web_frontend', 'backend'],
          contact_name: 'Sarah Jenkins',
          contact_role: 'Lead Recruiter',
          work_email: 'sarah@techflow.example.com',
          consent: true,
          hp: '',
        });

      expect(res.status).toBe(202);
      expect(res.body.reference).toMatch(/^AH-[A-Z0-9]{6}$/);
      expect(res.body.status).toBe('received');
    });

    it('returns 422 with field errors for fail@demo.test', async () => {
      const res = await request(app)
        .post('/functions/v1/submit-application')
        .send({
          type: 'university',
          institution_name: 'Test Uni',
          kind: 'college',
          tier: 'tier3',
          city: 'Pune',
          state: 'Maharashtra',
          student_count_band: '500-2000',
          contact_name: 'Tester',
          contact_role: 'TPO',
          contact_email: 'fail@demo.test',
          consent: true,
          hp: '',
        });

      expect(res.status).toBe(422);
      expect(res.body.error.code).toBe('VALIDATION_FAILED');
      expect(res.body.error.fields).toBeDefined();
    });

    it('returns 429 for rate@demo.test', async () => {
      const res = await request(app)
        .post('/functions/v1/submit-application')
        .send({
          type: 'organization',
          org_name: 'Rate Corp',
          org_kind: 'corporate',
          size_band: '1000+',
          website: 'https://ratecorp.example.com',
          hiring_focus: ['backend'],
          contact_name: 'Alex',
          contact_role: 'HR',
          work_email: 'rate@demo.test',
          consent: true,
          hp: '',
        });

      expect(res.status).toBe(429);
      expect(res.headers['retry-after']).toBe('120');
    });

    it('rejects honeypot submission with 422', async () => {
      const res = await request(app)
        .post('/functions/v1/submit-application')
        .send({
          type: 'university',
          institution_name: 'Spam Uni',
          kind: 'college',
          tier: 'tier3',
          city: 'Delhi',
          state: 'Delhi',
          student_count_band: '<500',
          contact_name: 'Bot',
          contact_role: 'Bot',
          contact_email: 'bot@spam.com',
          consent: true,
          hp: 'spam-bot-value',
        });

      expect(res.status).toBe(422);
    });
  });
});
