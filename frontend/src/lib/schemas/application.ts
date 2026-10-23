import { z } from 'zod';

const FREE_MAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'proton.me',
  'protonmail.com',
];

export const universityApplicationSchema = z.object({
  type: z.literal('university'),
  institution_name: z
    .string()
    .min(2, 'Institution name must be at least 2 characters')
    .max(120, 'Institution name must be at most 120 characters'),
  short_name: z.string().max(30, 'Short name must be at most 30 characters').optional().or(z.literal('')),
  kind: z.enum(['university', 'college', 'school'], {
    errorMap: () => ({ message: 'Please select an institution type' }),
  }),
  tier: z.enum(['tier1', 'tier2', 'tier3', 'other'], {
    errorMap: () => ({ message: 'Please select an institution tier' }),
  }),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  email_domains: z.string().optional().or(z.literal('')), // Comma-separated in UI, parsed to array
  student_count_band: z.enum(['<500', '500-2000', '2000-5000', '5000+'], {
    errorMap: () => ({ message: 'Please select an approximate student count' }),
  }),
  departments: z.string().max(200, 'Departments must be at most 200 characters').optional().or(z.literal('')),
  contact_name: z.string().min(2, 'Contact name is required'),
  contact_role: z.string().min(2, 'Contact role is required'),
  contact_email: z.string().email('Please enter a valid official email address'),
  contact_phone: z.string().optional().or(z.literal('')),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy notice to proceed' }),
  }),
  hp: z.string().max(0, 'Bot detected'), // Honeypot must be empty string
  captcha_token: z.string().optional(),
});

export const organizationApplicationSchema = z.object({
  type: z.literal('organization'),
  org_name: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(120, 'Organization name must be at most 120 characters'),
  org_kind: z.enum(['corporate', 'startup', 'agency', 'other'], {
    errorMap: () => ({ message: 'Please select an organization type' }),
  }),
  size_band: z.enum(['1-10', '11-50', '51-250', '251-1000', '1000+'], {
    errorMap: () => ({ message: 'Please select company size band' }),
  }),
  website: z
    .string()
    .url('Please enter a valid website URL (e.g. https://example.com)')
    .refine((val) => val.startsWith('https://'), 'Website URL must use https://'),
  hiring_focus: z
    .array(z.enum(['web_frontend', 'backend', 'data', 'management_commerce', 'other']))
    .min(1, 'Please select at least one hiring focus area'),
  contact_name: z.string().min(2, 'Contact name is required'),
  contact_role: z.string().min(2, 'Contact role is required'),
  work_email: z
    .string()
    .email('Please enter a valid work email')
    .refine(
      (email) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return !FREE_MAIL_DOMAINS.includes(domain);
      },
      'Please use your company work email rather than a free email provider'
    ),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy notice to proceed' }),
  }),
  hp: z.string().max(0, 'Bot detected'),
  captcha_token: z.string().optional(),
});

export const applicationSubmissionSchema = z.discriminatedUnion('type', [
  universityApplicationSchema,
  organizationApplicationSchema,
]);

export const applicationSuccessResponseSchema = z.object({
  reference: z.string(),
  status: z.literal('received'),
});

export type UniversityApplicationInput = z.infer<typeof universityApplicationSchema>;
export type OrganizationApplicationInput = z.infer<typeof organizationApplicationSchema>;
export type ApplicationSubmissionInput = z.infer<typeof applicationSubmissionSchema>;
export type ApplicationSuccessResponse = z.infer<typeof applicationSuccessResponseSchema>;
