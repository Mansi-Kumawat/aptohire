import { z } from 'zod';

export const skillItemSchema = z.object({
  name: z.string(),
  level: z.string(),
  verified: z.boolean(),
  score: z.number().min(0).max(100).optional(),
  verified_on: z.string(),
});

export const affiliationSchema = z.object({
  label: z.string(),
  verification: z.enum(['roster', 'student_id', 'unverified']),
});

export const publicCredentialSchema = z.object({
  credential_id: z.string().regex(/^[a-f0-9]{18}$/),
  issued_at: z.string(),
  last_updated: z.string(),
  display_name: z.string().optional(),
  affiliation: affiliationSchema.optional(),
  skills: z.array(skillItemSchema).default([]),
  shared_fields: z.array(z.string()).default([]),
});

export type PublicCredential = z.infer<typeof publicCredentialSchema>;

export const universityApplicationSchema = z.object({
  type: z.literal('university'),
  institution_name: z.string().min(2).max(120),
  short_name: z.string().max(30).optional(),
  kind: z.enum(['university', 'college', 'school']),
  tier: z.enum(['tier1', 'tier2', 'tier3', 'other']),
  city: z.string().min(2),
  state: z.string().min(2),
  email_domains: z.string().optional(),
  student_count_band: z.enum(['<500', '500-2000', '2000-5000', '5000+']),
  departments: z.string().max(200).optional(),
  contact_name: z.string().min(2),
  contact_role: z.string().min(2),
  contact_email: z.string().email(),
  contact_phone: z.string().optional(),
  message: z.string().max(1000).optional(),
  consent: z.literal(true),
  hp: z.string().max(0),
});

export const organizationApplicationSchema = z.object({
  type: z.literal('organization'),
  org_name: z.string().min(2).max(120),
  org_kind: z.enum(['corporate', 'startup', 'agency', 'other']),
  size_band: z.enum(['1-10', '11-50', '51-250', '251-1000', '1000+']),
  website: z.string().url(),
  hiring_focus: z.array(z.string()).min(1),
  contact_name: z.string().min(2),
  contact_role: z.string().min(2),
  work_email: z.string().email(),
  message: z.string().max(1000).optional(),
  consent: z.literal(true),
  hp: z.string().max(0),
});

export const applicationSubmissionSchema = z.discriminatedUnion('type', [
  universityApplicationSchema,
  organizationApplicationSchema,
]);

export type ApplicationSubmission = z.infer<typeof applicationSubmissionSchema>;
