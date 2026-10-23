-- Supabase Seed Data: seed.sql
-- Contains standard prototype credentials and mock records for AptoHire

-- Clear existing prototype data
TRUNCATE TABLE public.skills CASCADE;
TRUNCATE TABLE public.credentials CASCADE;
TRUNCATE TABLE public.applications CASCADE;

-- 1. Fixture: a1b2c3d4e5f6a7b8c9 (Full: Aarav S. · Uni A · 3 Verified Skills with scores)
INSERT INTO public.credentials (
  credential_id,
  student_id,
  display_name,
  issued_at,
  last_updated,
  affiliation_label,
  affiliation_verification,
  shared_fields
) VALUES (
  'a1b2c3d4e5f6a7b8c9',
  '11111111-1111-1111-1111-111111111111',
  'Aarav S.',
  '2026-10-12',
  '2026-10-12',
  'Uni A',
  'roster',
  ARRAY['name', 'affiliation', 'skills', 'scores']
);

INSERT INTO public.skills (credential_id, name, level, verified, score, verified_on) VALUES
  ('a1b2c3d4e5f6a7b8c9', 'React', 'Proficient', true, 72, '2026-10-12'),
  ('a1b2c3d4e5f6a7b8c9', 'TypeScript', 'Proficient', true, 70, '2026-10-12'),
  ('a1b2c3d4e5f6a7b8c9', 'REST APIs', 'Proficient', true, 75, '2026-10-12');

-- 2. Fixture: b2c3d4e5f6a7b8c9d0 (Levels only: anonymous, no scores, no university)
INSERT INTO public.credentials (
  credential_id,
  student_id,
  display_name,
  issued_at,
  last_updated,
  affiliation_label,
  affiliation_verification,
  shared_fields
) VALUES (
  'b2c3d4e5f6a7b8c9d0',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  '2026-09-18',
  '2026-10-05',
  NULL,
  NULL,
  ARRAY['skills', 'levels']
);

INSERT INTO public.skills (credential_id, name, level, verified, score, verified_on) VALUES
  ('b2c3d4e5f6a7b8c9d0', 'React', 'Proficient', true, NULL, '2026-09-18'),
  ('b2c3d4e5f6a7b8c9d0', 'TypeScript', 'Proficient', true, NULL, '2026-09-24'),
  ('b2c3d4e5f6a7b8c9d0', 'Node.js', 'Competent', true, NULL, '2026-10-05');

-- 3. Fixture: c3d4e5f6a7b8c9d0e1 (Nothing shared: empty skills)
INSERT INTO public.credentials (
  credential_id,
  student_id,
  display_name,
  issued_at,
  last_updated,
  affiliation_label,
  affiliation_verification,
  shared_fields
) VALUES (
  'c3d4e5f6a7b8c9d0e1',
  '33333333-3333-3333-3333-333333333333',
  'Priya K.',
  '2026-08-10',
  '2026-08-10',
  NULL,
  NULL,
  ARRAY['name']
);

-- 4. Fixture: d4e5f6a7b8c9d0e1f2 (Unverified university affiliation)
INSERT INTO public.credentials (
  credential_id,
  student_id,
  display_name,
  issued_at,
  last_updated,
  affiliation_label,
  affiliation_verification,
  shared_fields
) VALUES (
  'd4e5f6a7b8c9d0e1f2',
  '44444444-4444-4444-4444-444444444444',
  'Avi M.',
  '2026-10-01',
  '2026-10-01',
  'Autonomous College of Technology',
  'unverified',
  ARRAY['name', 'affiliation', 'skills', 'scores']
);

INSERT INTO public.skills (credential_id, name, level, verified, score, verified_on) VALUES
  ('d4e5f6a7b8c9d0e1f2', 'Python', 'Advanced', true, 88, '2026-10-01'),
  ('d4e5f6a7b8c9d0e1f2', 'FastAPI', 'Proficient', true, 76, '2026-10-01');

-- Sample Initial Applications
INSERT INTO public.applications (reference, type, status, payload) VALUES
  ('AH-9X4M2P', 'university', 'pending', '{"institution_name": "Apex Institute of Technology", "kind": "university", "tier": "tier2", "city": "Jaipur", "state": "Rajasthan"}'::jsonb),
  ('AH-3T8K7R', 'organization', 'pending', '{"org_name": "TechFlow Systems", "org_kind": "startup", "size_band": "51-250", "website": "https://techflow.example.com"}'::jsonb);
