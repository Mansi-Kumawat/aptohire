import React from 'react';
import { env } from '@/config/env';

// TODO(decision): swap for approved legal counsel text before commercial launch.
export const TermsContent: React.FC = () => {
  return (
    <div className="space-y-8 text-[16px] text-ink leading-relaxed prose-reading">
      <section id="acceptable-use" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          1. Acceptable use
        </h2>
        <p className="text-moss">
          AptoHire is a platform for authentic skill demonstration and verification. You agree to use the service only for lawful recruitment and verification purposes. You must not attempt to scrape anonymous candidate profiles, bypass rate limits, probe our Edge Functions, or reverse-engineer candidate identities.
        </p>
      </section>

      <section id="prototype-nature" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          2. Prototype and demo nature
        </h2>
        <p className="text-moss">
          This system is an active prototype demonstration. Features, database schemas, scoring rubrics, and user flows are subject to change without notice. All student profiles, university records, and organization listings displayed in demo mode are entirely fictional.
        </p>
      </section>

      <section id="score-disclaimer" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          3. Nature of review scores and credentials
        </h2>
        <p className="text-moss">
          Skill verification scores represent an assessment of submitted project artifacts, demo videos, and technical documentation against structured rubrics at the time of review. AptoHire review scores do not constitute a legal certification, professional licensure, or an absolute guarantee of future job performance or hiring outcomes.
        </p>
      </section>

      <section id="termination" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          4. Modifications and suspension
        </h2>
        <p className="text-moss">
          We reserve the right to suspend or restrict access to any institution, organization, or user who submits fraudulent project evidence, attempts unauthorized candidate deanonymization, or breaches platform terms.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          5. Contact
        </h2>
        <p className="text-moss">
          For questions regarding our terms of service, contact{' '}
          <a href={`mailto:${env.VITE_SUPPORT_EMAIL}`} className="text-verdant-700 underline font-medium">
            {env.VITE_SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </div>
  );
};
