-- Supabase Migration: 20261012000000_create_aptohire_tables.sql
-- Owns tables, RLS policies, indexes, and triggers for AptoHire

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Credentials Table
CREATE TABLE IF NOT EXISTS public.credentials (
  credential_id VARCHAR(18) PRIMARY KEY,
  student_id UUID NOT NULL,
  display_name TEXT,
  issued_at DATE NOT NULL DEFAULT CURRENT_DATE,
  last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
  affiliation_label TEXT,
  affiliation_verification VARCHAR(20) CHECK (affiliation_verification IN ('roster', 'student_id', 'unverified')),
  shared_fields TEXT[] DEFAULT ARRAY['skills', 'levels']::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credential_id VARCHAR(18) NOT NULL REFERENCES public.credentials(credential_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  verified_on DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Applications Table (Access requests for universities and organizations)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(12) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('university', 'organization')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  payload JSONB NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_credentials_student_id ON public.credentials(student_id);
CREATE INDEX IF NOT EXISTS idx_skills_credential_id ON public.skills(credential_id);
CREATE INDEX IF NOT EXISTS idx_applications_reference ON public.applications(reference);
CREATE INDEX IF NOT EXISTS idx_applications_type_status ON public.applications(type, status);

-- Row-Level Security (RLS)
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Anonymous users may read public credentials
CREATE POLICY "Public credentials are viewable by everyone"
  ON public.credentials FOR SELECT
  USING (true);

-- Anonymous users may read skills associated with credentials
CREATE POLICY "Public skills are viewable by everyone"
  ON public.skills FOR SELECT
  USING (true);

-- Applications can only be inserted by anonymous users (Edge Function / anon key)
CREATE POLICY "Anonymous users can insert applications"
  ON public.applications FOR INSERT
  WITH CHECK (true);

-- Applications can only be viewed or modified by admin staff (service_role)
CREATE POLICY "Staff can view all applications"
  ON public.applications FOR SELECT
  USING (auth.role() = 'service_role');
