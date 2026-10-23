import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_ENV: z
    .string()
    .optional()
    .transform((val) => {
      const lower = (val || '').toLowerCase().trim();
      if (lower === 'production' || lower === 'demo' || lower === 'local') {
        return lower as 'local' | 'demo' | 'production';
      }
      return 'demo';
    })
    .default('demo'),
  VITE_DEMO_MODE: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return true;
      const lower = val.toLowerCase().trim();
      return lower === 'true' || lower === '1' || lower === 'yes';
    })
    .default('true'),
  VITE_USE_MOCKS: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return true;
      const lower = val.toLowerCase().trim();
      return lower === 'true' || lower === '1' || lower === 'yes';
    })
    .default('true'),
  VITE_SITE_URL: z
    .string()
    .optional()
    .transform((val) => val?.trim() || 'http://localhost:5173'),
  VITE_ROOT_DOMAIN: z
    .string()
    .optional()
    .transform((val) => val?.trim() || 'localhost')
    .default('localhost'),
  VITE_SUPABASE_URL: z
    .string()
    .optional()
    .transform((val) => val?.trim() || '')
    .default(''),
  VITE_SUPABASE_ANON_KEY: z
    .string()
    .optional()
    .transform((val) => val?.trim() || '')
    .default(''),
  VITE_STUDENT_URL: z
    .string()
    .optional()
    .transform((val) => val?.trim() || 'http://localhost:5174')
    .default('http://localhost:5174'),
  VITE_UNIVERSITY_URL: z
    .string()
    .optional()
    .transform((val) => val?.trim() || 'http://localhost:5175')
    .default('http://localhost:5175'),
  VITE_ORGANIZATION_URL: z
    .string()
    .optional()
    .transform((val) => val?.trim() || 'http://localhost:5176')
    .default('http://localhost:5176'),
  VITE_TURNSTILE_SITE_KEY: z
    .string()
    .optional()
    .transform((val) => val?.trim() || '')
    .default(''),
  VITE_SUPPORT_EMAIL: z
    .string()
    .optional()
    .transform((val) => val?.trim() || 'support@aptohire.com')
    .default('support@aptohire.com'),
});

function parseEnv() {
  const parsed = envSchema.safeParse(import.meta.env);
  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.format());
    throw new Error(`Environment validation failed: ${parsed.error.message}`);
  }

  // In production with mocks enabled, log a clear notice instead of halting execution
  if (parsed.data.VITE_APP_ENV === 'production' && parsed.data.VITE_USE_MOCKS) {
    console.warn('[AptoHire Notice] Running in production with mock data enabled.');
  }

  return parsed.data;
}

export const env = parseEnv();
