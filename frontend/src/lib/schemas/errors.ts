import { z } from 'zod';

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    fields: z.record(z.string()).optional(),
  }),
});

export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;

export class AppApiError extends Error {
  public code: string;
  public status: number;
  public fields?: Record<string, string>;
  public retryAfter?: number;

  constructor(message: string, code: string, status: number, fields?: Record<string, string>, retryAfter?: number) {
    super(message);
    this.name = 'AppApiError';
    this.code = code;
    this.status = status;
    this.fields = fields;
    this.retryAfter = retryAfter;
  }
}
