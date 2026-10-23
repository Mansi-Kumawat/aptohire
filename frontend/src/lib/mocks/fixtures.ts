import type { PublicCredential } from '../schemas/credential';

export const mockCredentials: Record<string, PublicCredential> = {
  // 1. Full: display name, university (roster), three verified skills with scores
  a1b2c3d4e5f6a7b8c9: {
    credential_id: 'a1b2c3d4e5f6a7b8c9',
    issued_at: '2026-10-12',
    last_updated: '2026-10-12',
    display_name: 'Aarav S.',
    affiliation: {
      label: 'Uni A',
      verification: 'roster',
    },
    skills: [
      {
        name: 'React',
        level: 'Proficient',
        verified: true,
        score: 72,
        verified_on: '2026-10-12',
      },
      {
        name: 'TypeScript',
        level: 'Proficient',
        verified: true,
        score: 70,
        verified_on: '2026-10-12',
      },
      {
        name: 'REST APIs',
        level: 'Proficient',
        verified: true,
        score: 75,
        verified_on: '2026-10-12',
      },
    ],
    shared_fields: ['name', 'affiliation', 'skills', 'scores'],
  },

  // 2. Levels only: no name, no scores, no university
  b2c3d4e5f6a7b8c9d0: {
    credential_id: 'b2c3d4e5f6a7b8c9d0',
    issued_at: '2026-09-18',
    last_updated: '2026-10-05',
    skills: [
      {
        name: 'React',
        level: 'Proficient',
        verified: true,
        verified_on: '2026-09-18',
      },
      {
        name: 'TypeScript',
        level: 'Proficient',
        verified: true,
        verified_on: '2026-09-24',
      },
      {
        name: 'Node.js',
        level: 'Competent',
        verified: true,
        verified_on: '2026-10-05',
      },
    ],
    shared_fields: ['skills', 'levels'],
  },

  // 3. Student shares nothing: empty skills
  c3d4e5f6a7b8c9d0e1: {
    credential_id: 'c3d4e5f6a7b8c9d0e1',
    issued_at: '2026-08-10',
    last_updated: '2026-08-10',
    display_name: 'Priya K.',
    skills: [],
    shared_fields: ['name'],
  },

  // 4. unverified affiliation (shows dashed unverified university chip)
  d4e5f6a7b8c9d0e1f2: {
    credential_id: 'd4e5f6a7b8c9d0e1f2',
    issued_at: '2026-10-01',
    last_updated: '2026-10-01',
    display_name: 'Avi M.',
    affiliation: {
      label: 'Autonomous College of Technology',
      verification: 'unverified',
    },
    skills: [
      {
        name: 'Python',
        level: 'Advanced',
        verified: true,
        score: 88,
        verified_on: '2026-10-01',
      },
      {
        name: 'FastAPI',
        level: 'Proficient',
        verified: true,
        score: 76,
        verified_on: '2026-10-01',
      },
    ],
    shared_fields: ['name', 'affiliation', 'skills', 'scores'],
  },
};
