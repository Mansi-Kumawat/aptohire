import React from 'react';
import { COPY } from '@/content/copy';
import { portalUrl } from '@/config/portals';
import { sampleCandidates } from '@/content/sample';
import { CandidateCardPreview } from '@/components/proof/CandidateCardPreview';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const ForOrganizations: React.FC = () => {
  return (
    <section id="for-organizations" className="py-16 md:py-28 bg-grad-section-warm border-b border-hairline scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div className="max-w-2xl">
              <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold px-2.5 py-1 rounded bg-mist border border-hairline inline-block mb-3">
                Recruiters & Engineering Teams
              </span>
              <h2 className="text-display-l font-display font-bold text-ink">
                {COPY.forOrganizations.headline}
              </h2>
              <p className="text-[17px] text-moss mt-2 leading-relaxed">
                {COPY.forOrganizations.copy}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/apply/organization">
                <Button variant="primary" className="shadow-sm hover:shadow-float active:scale-[0.98] transition-all">
                  {COPY.forOrganizations.ctaApply}
                </Button>
              </Link>
              <a
                href={portalUrl('organization', '/login')}
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-verdant-700 hover:underline px-3 py-2 min-h-[44px] flex items-center"
              >
                {COPY.forOrganizations.ctaSignIn} →
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Sample Candidates Grid */}
        <ScrollReveal delayMs={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCandidates.map((candidate, idx) => (
              <CandidateCardPreview key={idx} candidate={candidate} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
