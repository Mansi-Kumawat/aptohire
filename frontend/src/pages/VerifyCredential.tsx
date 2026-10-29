import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verifyCredential } from '@/lib/api';
import { formatDate } from '@/lib/format';
import type { PublicCredential } from '@/lib/schemas/credential';
import { AppApiError } from '@/lib/schemas/errors';
import { Seo } from '@/lib/seo';
import { ProofRing } from '@/components/proof/ProofRing';
import { StatusChip } from '@/components/proof/StatusChip';
import { CopyButton } from '@/components/ui/CopyButton';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ShieldCheck, AlertCircle, RefreshCw, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const VerifyCredential: React.FC = () => {
  const { credentialId } = useParams<{ credentialId: string }>();

  const [loading, setLoading] = useState(true);
  const [credential, setCredential] = useState<PublicCredential | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  const fetchCredential = useCallback(async () => {
    if (!credentialId) {
      setErrorStatus(404);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorStatus(null);

    try {
      const response = await verifyCredential(credentialId);
      setCredential(response.credential);
    } catch (err: unknown) {
      if (err instanceof AppApiError) {
        setErrorStatus(err.status);
        if (err.retryAfter) {
          setRetryAfter(err.retryAfter);
        }
      } else {
        setErrorStatus(500);
      }
    } finally {
      setLoading(false);
    }
  }, [credentialId]);

  useEffect(() => {
    fetchCredential();
  }, [fetchCredential]);

  // STATE 1: LOADING SKELETON
  if (loading) {
    return (
      <div className="py-12 md:py-16 bg-mist min-h-[calc(100vh-64px)]">
        <Seo title="Verifying credential… — AptoHire" noIndex={true} noReferrer={true} />
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <div className="bg-canvas p-6 sm:p-8 rounded-panel border border-hairline shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-10 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="pt-6 border-t border-hairline space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STATE 6: RATE LIMITED (429)
  if (errorStatus === 429) {
    return (
      <div className="py-16 md:py-24 bg-mist min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Seo title="Rate limit exceeded — AptoHire" noIndex={true} noReferrer={true} />
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-canvas border border-hairline rounded-panel p-6 sm:p-8 shadow-float text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-ember-50 border border-ember-100 flex items-center justify-center mx-auto text-ember-700">
              <AlertCircle className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h1 className="text-[22px] font-display font-bold text-ink">
              Too many checks from this connection
            </h1>
            <p className="text-[15px] text-moss leading-relaxed">
              {retryAfter
                ? `Please wait ${retryAfter} seconds before requesting this verification again.`
                : 'Try again in a minute.'}
            </p>
            <div className="pt-2">
              <Button variant="secondary" onClick={fetchCredential}>
                <RefreshCw className="w-4 h-4 mr-2" strokeWidth={1.75} />
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STATE 7: SERVICE UNAVAILABLE (500/503)
  if (errorStatus && errorStatus >= 500) {
    return (
      <div className="py-16 md:py-24 bg-mist min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Seo title="Service unavailable — AptoHire" noIndex={true} noReferrer={true} />
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-canvas border border-hairline rounded-panel p-6 sm:p-8 shadow-float text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-danger-50 border border-danger-600/20 flex items-center justify-center mx-auto text-danger-600">
              <AlertCircle className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h1 className="text-[22px] font-display font-bold text-ink">
              Service unavailable
            </h1>
            <p className="text-[15px] text-moss leading-relaxed">
              We couldn&apos;t verify this credential right now. The verification network may be undergoing maintenance.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="primary" onClick={fetchCredential}>
                <RefreshCw className="w-4 h-4 mr-2" strokeWidth={1.75} />
                Try again
              </Button>
              <Link to="/verify">
                <Button variant="secondary">Check another</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STATE 5: NOT FOUND OR INVALID ID (Generic copy for both security & privacy)
  if (errorStatus === 404 || !credential) {
    return (
      <div className="py-16 md:py-24 bg-mist min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Seo title="Credential not found — AptoHire" noIndex={true} noReferrer={true} />
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-canvas border border-hairline rounded-panel p-6 sm:p-8 shadow-float text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-mist border border-hairline flex items-center justify-center mx-auto text-moss">
              <AlertCircle className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h1 className="text-[22px] font-display font-bold text-ink">
              We couldn&apos;t find this credential
            </h1>
            <p className="text-[15px] text-moss leading-relaxed">
              We couldn&apos;t find this credential. Check the ID and try again.
            </p>
            <div className="pt-2">
              <Link to="/verify">
                <Button variant="primary">
                  <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.75} />
                  Return to credential search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STATES 2, 3, 4: NORMAL VERIFIED VIEW
  const studentDisplayName = credential.display_name || 'A verified AptoHire student';
  const hasSkills = credential.skills && credential.skills.length > 0;
  const isUnverifiedUni = credential.affiliation?.verification === 'unverified';

  return (
    <div className="py-10 md:py-16 bg-mist min-h-[calc(100vh-64px)]">
      <Seo
        title={`Verified Credential — ${studentDisplayName} | AptoHire`}
        description="Public skill verification scorecard with authentic project rubric evaluations."
        canonicalPath={`/verify/${credential.credential_id}`}
        noIndex={true}
        noReferrer={true}
      />

      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Main Verification Card */}
        <div className="bg-canvas border border-hairline rounded-feature p-6 sm:p-8 shadow-float text-left">
          {/* Top header strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-hairline">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-verdant-700" strokeWidth={2.5} />
              <span className="font-display font-bold text-[16px] text-ink">
                Verified on AptoHire
              </span>
            </div>

            {/* Credential ID in mono with copy button */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[13px] bg-mist px-2.5 py-1 rounded-control border border-hairline text-ink select-all">
                {credential.credential_id}
              </span>
              <CopyButton value={credential.credential_id} label="Copy ID" />
            </div>
          </div>

          {/* Student Profile Info */}
          <div className="py-6 space-y-3 border-b border-hairline">
            <h1 className="text-[28px] font-display font-bold text-ink leading-tight">
              {studentDisplayName}
            </h1>

            {/* Affiliation / University chip */}
            {credential.affiliation && (
              <div className="pt-1">
                {isUnverifiedUni ? (
                  <div className="space-y-1.5">
                    <StatusChip
                      type="unverified-university"
                      label={`Unverified university: ${credential.affiliation.label}`}
                    />
                    <p className="text-[13px] text-moss">
                      This university isn&apos;t confirmed on AptoHire yet. Skill scores are not affected.
                    </p>
                  </div>
                ) : (
                  <StatusChip
                    type="verified-university"
                    label={`Verified student: ${credential.affiliation.label}`}
                  />
                )}
              </div>
            )}

            {/* Timestamps */}
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-moss pt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-moss" strokeWidth={1.75} />
                Issued {formatDate(credential.issued_at)}
              </span>
              <span>·</span>
              <span>Updated {formatDate(credential.last_updated)}</span>
            </div>
          </div>

          {/* Skills Assessment Section */}
          <div className="py-6 border-b border-hairline">
            <h2 className="text-[18px] font-display font-bold text-ink mb-4">
              Verified skills
            </h2>

            {hasSkills ? (
              <div className="space-y-4">
                {credential.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-panel bg-mist/50 border border-hairline gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {skill.score !== undefined ? (
                        <div className="shrink-0">
                          {/* 96px ProofRing, reveal plays once only for first skill */}
                          <ProofRing
                            score={skill.score}
                            skill={skill.name}
                            size={96}
                            level={skill.level}
                            animate={idx === 0}
                            showCaption={false}
                          />
                        </div>
                      ) : (
                        <div className="shrink-0 w-12 h-12 rounded-full bg-verdant-100 flex items-center justify-center text-verdant-800">
                          <ShieldCheck className="w-6 h-6" strokeWidth={1.75} />
                        </div>
                      )}

                      <div>
                        <h3 className="text-[17px] font-display font-bold text-ink">
                          {skill.name}
                        </h3>
                        <p className="text-[14px] text-moss mt-0.5">
                          {skill.level}{skill.verified_on ? ` · Verified on ${formatDate(skill.verified_on)}` : ' · Verified'}
                        </p>
                      </div>
                    </div>

                    <StatusChip type="verified" label="Verified" />
                  </div>
                ))}
              </div>
            ) : (
              /* STATE 3: NOTHING SHARED */
              <div className="p-6 rounded-panel bg-mist border border-hairline text-center space-y-2">
                <p className="text-[15px] font-medium text-ink">
                  This student hasn&apos;t shared any skills on this page.
                </p>
                <p className="text-[13px] text-moss">
                  Students retain granular control over which assessed skills are publicly exposed on their credential link.
                </p>
              </div>
            )}
          </div>

          {/* How to read this */}
          <div className="pt-6 space-y-4 text-left">
            <h3 className="text-[15px] font-display font-semibold text-ink">
              How to read this
            </h3>
            <ul className="space-y-2 text-[14px] text-moss list-disc pl-5 leading-relaxed">
              <li>
                <strong>Verified:</strong> Skill scores strictly exceed the 50-point benchmark on real project rubric audits.
              </li>
              <li>
                <strong>Levels:</strong> Emerging (0–50, not verified) · Competent (51–69) · Proficient (70–84) · Advanced (85–100).
              </li>
              <li>
                <strong>Authentic evidence:</strong> Scores derive from code repository reviews, test results, and student walkthrough videos.
              </li>
            </ul>

            {credential.shared_fields && credential.shared_fields.length > 0 && (
              <p className="text-[13px] text-moss pt-2 border-t border-hairline">
                This student shares: {credential.shared_fields.join(', ')}.
              </p>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2 no-print">
          <Link
            to="/verify"
            className="text-[14px] font-semibold text-verdant-700 hover:underline inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Check another credential
          </Link>
        </div>
      </div>
    </div>
  );
};
