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

export const publicVerifyResponseSchema = z.object({
  credential: publicCredentialSchema,
});

export type SkillItem = z.infer<typeof skillItemSchema>;
export type Affiliation = z.infer<typeof affiliationSchema>;
export type PublicCredential = z.infer<typeof publicCredentialSchema>;
export type PublicVerifyResponse = z.infer<typeof publicVerifyResponseSchema>;
