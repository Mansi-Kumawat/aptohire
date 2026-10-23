import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  organizationApplicationSchema,
  type OrganizationApplicationInput,
} from '@/lib/schemas/application';
import { submitApplication } from '@/lib/api';
import { AppApiError } from '@/lib/schemas/errors';
import { Seo } from '@/lib/seo';
import { Field } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { ApplicationConfirmation } from '@/components/proof/ApplicationConfirmation';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, CheckCircle } from 'lucide-react';

const HIRING_FOCUS_OPTIONS = [
  { id: 'web_frontend', label: 'Web & Frontend (React, TypeScript, CSS)' },
  { id: 'backend', label: 'Backend & Systems (Node.js, Python, Go, SQL)' },
  { id: 'data', label: 'Data & Analytics (Data Pipelines, Postgres)' },
  { id: 'management_commerce', label: 'Management & Operations' },
  { id: 'other', label: 'Other engineering roles' },
] as const;

export const ApplyOrganization: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<{ message: string; type: 'error' | 'warning' } | null>(null);
  const idempotencyKeyRef = useRef<string>(
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `org-${Date.now()}`
  );
  const loadTimeRef = useRef<number>(Date.now());

  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrganizationApplicationInput>({
    resolver: zodResolver(organizationApplicationSchema),
    defaultValues: {
      type: 'organization',
      org_kind: 'startup',
      size_band: '51-250',
      hiring_focus: ['web_frontend'],
      consent: true,
      hp: '',
    },
  });

  const selectedFocus = watch('hiring_focus') || [];

  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  const handleFocusToggle = (focusId: 'web_frontend' | 'backend' | 'data' | 'management_commerce' | 'other') => {
    const current = [...selectedFocus];
    const index = current.indexOf(focusId);
    if (index >= 0) {
      if (current.length > 1) {
        current.splice(index, 1);
        setValue('hiring_focus', current, { shouldValidate: true });
      }
    } else {
      current.push(focusId);
      setValue('hiring_focus', current, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: OrganizationApplicationInput) => {
    const timeSpent = (Date.now() - loadTimeRef.current) / 1000;
    if (timeSpent < 3) {
      await new Promise((r) => setTimeout(r, (3 - timeSpent) * 1000));
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await submitApplication(data, idempotencyKeyRef.current);
      setSuccessReference(result.reference);
      idempotencyKeyRef.current =
        typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `org-${Date.now()}`;
    } catch (err: unknown) {
      if (err instanceof AppApiError) {
        if (err.status === 422 && err.fields) {
          Object.entries(err.fields).forEach(([field, msg]) => {
            setError(field as keyof OrganizationApplicationInput, {
              type: 'server',
              message: msg,
            });
          });
          setServerError({
            message: 'Please review and fix the highlighted fields below.',
            type: 'error',
          });
        } else if (err.status === 429) {
          setServerError({
            message: 'Too many attempts. Try again in a few minutes.',
            type: 'warning',
          });
        } else if (err.status >= 500) {
          setServerError({
            message: "We couldn't send this right now. Your answers are still here. Try again.",
            type: 'error',
          });
        } else {
          setServerError({
            message: err.message,
            type: 'error',
          });
        }
      } else {
        setServerError({
          message: 'An unexpected network error occurred.',
          type: 'error',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-mist min-h-[calc(100vh-64px)]">
      <Seo
        title="Request recruiter access — AptoHire"
        description="Discover pre-verified talent through blind skill matchmaking. Connect with capable candidates based on real project evidence."
        canonicalPath="/apply/organization"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {successReference ? (
          <div className="max-w-2xl mx-auto">
            <ApplicationConfirmation type="organization" reference={successReference} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-canvas border border-hairline rounded-panel p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 pb-6 border-b border-hairline mb-6">
                <div className="w-12 h-12 rounded-control bg-verdant-50 border border-verdant-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-verdant-700" strokeWidth={1.75} />
                </div>
                <div>
                  <h1 className="text-[24px] font-display font-bold text-ink">
                    Request organization access
                  </h1>
                  <p className="text-[14px] text-moss mt-0.5">
                    For technical recruiters, hiring managers, and talent acquisition teams.
                  </p>
                </div>
              </div>

              {serverError && (
                <div className="mb-6">
                  <Toast
                    variant={serverError.type === 'error' ? 'error' : 'info'}
                    title={serverError.type === 'error' ? 'Submission error' : 'Rate limit notice'}
                    message={serverError.message}
                    onClose={() => setServerError(null)}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                {/* Honeypot field (hidden) */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" {...register('hp')} tabIndex={-1} autoComplete="off" />
                </div>

                {/* Fieldset 1: Organization details */}
                <fieldset className="space-y-4">
                  <legend className="text-[17px] font-display font-bold text-ink border-b border-hairline pb-2 w-full mb-3">
                    1. Organization profile
                  </legend>

                  <Field
                    id="org_name"
                    label="Organization name"
                    required
                    error={errors.org_name?.message}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        {...register('org_name')}
                        placeholder="e.g. Acme Technologies"
                      />
                    )}
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      id="org_kind"
                      label="Organization type"
                      required
                      error={errors.org_kind?.message}
                    >
                      {(fieldProps) => (
                        <Select {...fieldProps} {...register('org_kind')}>
                          <option value="corporate">Corporate / Enterprise</option>
                          <option value="startup">Growth Startup</option>
                          <option value="agency">Agency / Consultancy</option>
                          <option value="other">Other</option>
                        </Select>
                      )}
                    </Field>

                    <Field
                      id="size_band"
                      label="Company size"
                      required
                      error={errors.size_band?.message}
                    >
                      {(fieldProps) => (
                        <Select {...fieldProps} {...register('size_band')}>
                          <option value="1-10">1 – 10 employees</option>
                          <option value="11-50">11 – 50 employees</option>
                          <option value="51-250">51 – 250 employees</option>
                          <option value="251-1000">251 – 1,000 employees</option>
                          <option value="1000+">1,000+ employees</option>
                        </Select>
                      )}
                    </Field>
                  </div>

                  <Field
                    id="website"
                    label="Company website URL"
                    required
                    helperText="Must start with https://"
                    error={errors.website?.message}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        {...register('website')}
                        type="url"
                        placeholder="https://example.com"
                      />
                    )}
                  </Field>

                  {/* Hiring focus multi-select */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[15px] font-medium text-ink flex items-center justify-between">
                      <span>Primary hiring focus</span>
                      <span className="text-[13px] text-moss font-normal">(select at least one)</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {HIRING_FOCUS_OPTIONS.map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center gap-3 p-2.5 rounded-control border border-hairline hover:bg-mist cursor-pointer text-[14px] text-ink select-none min-h-[44px]"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFocus.includes(opt.id)}
                            onChange={() => handleFocusToggle(opt.id)}
                            className="rounded border-hairline text-verdant-700 focus:ring-verdant-700 w-4 h-4"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.hiring_focus && (
                      <p role="alert" className="text-[14px] text-danger-600 font-medium mt-1">
                        {errors.hiring_focus.message}
                      </p>
                    )}
                  </div>
                </fieldset>

                {/* Fieldset 2: Recruiter contact */}
                <fieldset className="space-y-4">
                  <legend className="text-[17px] font-display font-bold text-ink border-b border-hairline pb-2 w-full mb-3">
                    2. Recruiter contact
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      id="contact_name"
                      label="Contact person name"
                      required
                      error={errors.contact_name?.message}
                    >
                      {(fieldProps) => (
                        <Input
                          {...fieldProps}
                          {...register('contact_name')}
                          placeholder="Sarah Jenkins"
                        />
                      )}
                    </Field>

                    <Field
                      id="contact_role"
                      label="Role / Title"
                      required
                      error={errors.contact_role?.message}
                    >
                      {(fieldProps) => (
                        <Input
                          {...fieldProps}
                          {...register('contact_role')}
                          placeholder="Lead Technical Recruiter"
                        />
                      )}
                    </Field>
                  </div>

                  <Field
                    id="work_email"
                    label="Official work email"
                    required
                    helperText="Please use your company email domain (e.g. name@company.com)"
                    error={errors.work_email?.message}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        {...register('work_email')}
                        type="email"
                        placeholder="sarah@company.com"
                      />
                    )}
                  </Field>
                </fieldset>

                {/* Fieldset 3: Message & Consent */}
                <fieldset className="space-y-4">
                  <legend className="text-[17px] font-display font-bold text-ink border-b border-hairline pb-2 w-full mb-3">
                    3. Additional information
                  </legend>

                  <Field
                    id="message"
                    label="Hiring timeline or specific requirements"
                    helperText="Optional note for our partnership team (max 1000 characters)"
                    error={errors.message?.message}
                  >
                    {(fieldProps) => (
                      <Textarea
                        {...fieldProps}
                        {...register('message')}
                        rows={3}
                        placeholder="Describe current open positions or anticipated hiring volume…"
                      />
                    )}
                  </Field>

                  <div className="pt-2">
                    <Checkbox
                      id="consent"
                      {...register('consent')}
                      hasError={Boolean(errors.consent)}
                      label={
                        <span>
                          I agree to AptoHire contacting me about this application and to the{' '}
                          <Link to="/privacy" className="text-verdant-700 underline font-medium">
                            privacy notice
                          </Link>
                          .
                        </span>
                      }
                    />
                    {errors.consent && (
                      <p role="alert" className="text-[14px] text-danger-600 mt-1 font-medium">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>
                </fieldset>

                <div className="pt-4 border-t border-hairline">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    fullWidth
                    className="min-h-[48px] text-[16px]"
                  >
                    Request access
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-canvas border border-hairline rounded-panel p-6 shadow-sm space-y-4 text-left">
                <div className="flex items-center gap-2 text-verdant-700 font-display font-bold text-[18px]">
                  <CheckCircle className="w-5 h-5" strokeWidth={2} />
                  <span>The AptoHire difference</span>
                </div>
                <ol className="space-y-3 text-[14px] text-moss list-decimal pl-5 leading-relaxed">
                  <li>
                    <strong>Zero pedigree bias:</strong> Discover top 5% talent from Tier-2 and Tier-3 institutions based on verified project code.
                  </li>
                  <li>
                    <strong>Evidence you can audit:</strong> Inspect code repositories, test coverage, and 3-minute video walkthroughs before interview.
                  </li>
                  <li>
                    <strong>Respectful matching:</strong> Blind outreach ensures candidates only engage when genuinely interested.
                  </li>
                </ol>
              </div>

              <div className="bg-canvas border border-hairline rounded-panel p-6 shadow-sm space-y-3 text-left">
                <div className="flex items-center gap-2 text-ink font-display font-bold text-[16px]">
                  <ShieldCheck className="w-5 h-5 text-moss" strokeWidth={1.75} />
                  <span>Consent-first guarantee</span>
                </div>
                <p className="text-[14px] text-moss leading-relaxed">
                  Candidate identities are unlocked only after students accept your access request. Protect your hiring pipeline from unsolicited outreach disputes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
