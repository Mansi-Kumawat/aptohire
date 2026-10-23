import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  universityApplicationSchema,
  type UniversityApplicationInput,
} from '@/lib/schemas/application';
import { submitApplication } from '@/lib/api';
import { AppApiError } from '@/lib/schemas/errors';
import { portalUrl } from '@/config/portals';
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
import { School, ShieldCheck, CheckCircle } from 'lucide-react';

export const ApplyUniversity: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<{ message: string; type: 'error' | 'warning' } | null>(null);
  const idempotencyKeyRef = useRef<string>(
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `uni-${Date.now()}`
  );
  const loadTimeRef = useRef<number>(Date.now());

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UniversityApplicationInput>({
    resolver: zodResolver(universityApplicationSchema),
    defaultValues: {
      type: 'university',
      kind: 'university',
      tier: 'tier2',
      student_count_band: '2000-5000',
      consent: true,
      hp: '',
    },
  });

  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  const onSubmit = async (data: UniversityApplicationInput) => {
    // Client-side minimum fill time of 3 seconds
    const timeSpent = (Date.now() - loadTimeRef.current) / 1000;
    if (timeSpent < 3) {
      // Quietly wait remaining fraction of 3 seconds to avoid blocking honest fast typers
      await new Promise((r) => setTimeout(r, (3 - timeSpent) * 1000));
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await submitApplication(data, idempotencyKeyRef.current);
      setSuccessReference(result.reference);
      // Regenerate idempotency key only after successful submit
      idempotencyKeyRef.current =
        typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `uni-${Date.now()}`;
    } catch (err: unknown) {
      if (err instanceof AppApiError) {
        if (err.status === 422 && err.fields) {
          // Map server field errors
          Object.entries(err.fields).forEach(([field, msg]) => {
            setError(field as keyof UniversityApplicationInput, {
              type: 'server',
              message: msg,
            });
          });
          setServerError({
            message: 'Please correct the highlighted fields below.',
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
          message: 'An unexpected error occurred. Please try again.',
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
        title="Apply for university access — AptoHire"
        description="Connect your university placement cell with verified student skill credentials and employer hiring demand."
        canonicalPath="/apply/university"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {successReference ? (
          <div className="max-w-2xl mx-auto">
            <ApplicationConfirmation
              type="university"
              reference={successReference}
              portalActionUrl={portalUrl('university', `/signup?ref=${encodeURIComponent(successReference)}`)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Column (Left on desktop) */}
            <div className="lg:col-span-7 bg-canvas border border-hairline rounded-panel p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 pb-6 border-b border-hairline mb-6">
                <div className="w-12 h-12 rounded-control bg-verdant-50 border border-verdant-100 flex items-center justify-center shrink-0">
                  <School className="w-6 h-6 text-verdant-700" strokeWidth={1.75} />
                </div>
                <div>
                  <h1 className="text-[24px] font-display font-bold text-ink">
                    Apply for university access
                  </h1>
                  <p className="text-[14px] text-moss mt-0.5">
                    For placement offices, training heads, and department deans.
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
                  <input
                    type="text"
                    {...register('hp')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Fieldset 1: Institution */}
                <fieldset className="space-y-4">
                  <legend className="text-[17px] font-display font-bold text-ink border-b border-hairline pb-2 w-full mb-3">
                    1. Institution details
                  </legend>

                  <Field
                    id="institution_name"
                    label="Institution name"
                    required
                    error={errors.institution_name?.message}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        {...register('institution_name')}
                        placeholder="e.g. Apex Institute of Technology"
                      />
                    )}
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      id="kind"
                      label="Institution kind"
                      required
                      error={errors.kind?.message}
                    >
                      {(fieldProps) => (
                        <Select {...fieldProps} {...register('kind')}>
                          <option value="university">University</option>
                          <option value="college">College</option>
                          <option value="school">Technical School</option>
                        </Select>
                      )}
                    </Field>

                    <Field
                      id="tier"
                      label="Accreditation tier"
                      required
                      error={errors.tier?.message}
                    >
                      {(fieldProps) => (
                        <Select {...fieldProps} {...register('tier')}>
                          <option value="tier1">Tier 1 (National/Premier)</option>
                          <option value="tier2">Tier 2 (State/Regional)</option>
                          <option value="tier3">Tier 3 (Affiliated)</option>
                          <option value="other">Other</option>
                        </Select>
                      )}
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field id="city" label="City" required error={errors.city?.message}>
                      {(fieldProps) => (
                        <Input {...fieldProps} {...register('city')} placeholder="e.g. Jaipur" />
                      )}
                    </Field>

                    <Field id="state" label="State" required error={errors.state?.message}>
                      {(fieldProps) => (
                        <Input {...fieldProps} {...register('state')} placeholder="e.g. Rajasthan" />
                      )}
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      id="student_count_band"
                      label="Approximate students"
                      required
                      error={errors.student_count_band?.message}
                    >
                      {(fieldProps) => (
                        <Select {...fieldProps} {...register('student_count_band')}>
                          <option value="<500">&lt; 500 students</option>
                          <option value="500-2000">500 – 2,000</option>
                          <option value="2000-5000">2,000 – 5,000</option>
                          <option value="5000+">5,000+</option>
                        </Select>
                      )}
                    </Field>

                    <Field
                      id="short_name"
                      label="Short name / Acronym"
                      helperText="Optional (e.g. AIT)"
                      error={errors.short_name?.message}
                    >
                      {(fieldProps) => (
                        <Input {...fieldProps} {...register('short_name')} placeholder="AIT" />
                      )}
                    </Field>
                  </div>

                  <Field
                    id="email_domains"
                    label="Official email domain(s)"
                    helperText="Domain for automated student validation (e.g. ait.edu.in)"
                    error={errors.email_domains?.message}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        {...register('email_domains')}
                        placeholder="ait.edu.in"
                      />
                    )}
                  </Field>
                </fieldset>

                {/* Fieldset 2: Contact Person */}
                <fieldset className="space-y-4">
                  <legend className="text-[17px] font-display font-bold text-ink border-b border-hairline pb-2 w-full mb-3">
                    2. Primary contact
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      id="contact_name"
                      label="Contact person name"
                      required
                      error={errors.contact_name?.message}
                    >
                      {(fieldProps) => (
                        <Input {...fieldProps} {...register('contact_name')} placeholder="Dr. Sarah Sharma" />
                      )}
                    </Field>

                    <Field
                      id="contact_role"
                      label="Designation / Role"
                      required
                      error={errors.contact_role?.message}
                    >
                      {(fieldProps) => (
                        <Input
                          {...fieldProps}
                          {...register('contact_role')}
                          placeholder="Head of Placement / Dean"
                        />
                      )}
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      id="contact_email"
                      label="Official work email"
                      required
                      error={errors.contact_email?.message}
                    >
                      {(fieldProps) => (
                        <Input
                          {...fieldProps}
                          {...register('contact_email')}
                          type="email"
                          placeholder="tpo@institution.edu"
                        />
                      )}
                    </Field>

                    <Field
                      id="contact_phone"
                      label="Contact phone"
                      helperText="Optional"
                      error={errors.contact_phone?.message}
                    >
                      {(fieldProps) => (
                        <Input
                          {...fieldProps}
                          {...register('contact_phone')}
                          type="tel"
                          placeholder="+91 98765 43210"
                        />
                      )}
                    </Field>
                  </div>
                </fieldset>

                {/* Fieldset 3: Additional Notes & Consent */}
                <fieldset className="space-y-4">
                  <legend className="text-[17px] font-display font-bold text-ink border-b border-hairline pb-2 w-full mb-3">
                    3. Additional information
                  </legend>

                  <Field
                    id="departments"
                    label="Participating departments"
                    helperText="Optional (e.g. Computer Science, IT, Electronics)"
                    error={errors.departments?.message}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        {...register('departments')}
                        placeholder="CSE, IT, ECE"
                      />
                    )}
                  </Field>

                  <Field
                    id="message"
                    label="Message or batch timeline"
                    helperText="Optional message for our verification team (max 1000 characters)"
                    error={errors.message?.message}
                  >
                    {(fieldProps) => (
                      <Textarea
                        {...fieldProps}
                        {...register('message')}
                        rows={3}
                        placeholder="Tell us about your upcoming campus placement cycle or requirements…"
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
                    Send application
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar Column (Right on desktop, collapsed on mobile) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-canvas border border-hairline rounded-panel p-6 shadow-sm space-y-4 text-left">
                <div className="flex items-center gap-2 text-verdant-700 font-display font-bold text-[18px]">
                  <CheckCircle className="w-5 h-5" strokeWidth={2} />
                  <span>What happens next</span>
                </div>
                <ol className="space-y-3 text-[14px] text-moss list-decimal pl-5 leading-relaxed">
                  <li>
                    <strong>Review:</strong> We verify your institutional affiliation within 1–2 business days.
                  </li>
                  <li>
                    <strong>Activation link:</strong> You receive an email invitation to access your university dashboard.
                  </li>
                  <li>
                    <strong>Roster upload:</strong> Upload student rosters or share your institutional domain for zero-friction student verification.
                  </li>
                </ol>
              </div>

              <div className="bg-canvas border border-hairline rounded-panel p-6 shadow-sm space-y-3 text-left">
                <div className="flex items-center gap-2 text-ink font-display font-bold text-[16px]">
                  <ShieldCheck className="w-5 h-5 text-moss" strokeWidth={1.75} />
                  <span>Institutional privacy guarantee</span>
                </div>
                <p className="text-[14px] text-moss leading-relaxed">
                  Student rosters and departmental performance data are confidential to your institution. Aggregate demand signals help you address curriculum gaps without exposing student identities.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
