import React from 'react';
import { COPY } from '@/content/copy';
import { portalUrl } from '@/config/portals';
import { SampleRosterTable } from '@/components/proof/SampleRosterTable';
import { StatRow } from '@/components/proof/StatRow';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const ForUniversities: React.FC = () => {
  return (
    <section id="for-universities" className="py-16 md:py-28 bg-grad-section-subtle border-b border-hairline scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
            <div className="max-w-2xl">
              <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold px-2.5 py-1 rounded bg-mist border border-hairline inline-block mb-3">
                Universities & TPOs
              </span>
              <h2 className="text-display-l font-display font-bold text-ink">
                {COPY.forUniversities.headline}
              </h2>
              <p className="text-[17px] text-moss mt-2 leading-relaxed">
                {COPY.forUniversities.copy}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/apply/university">
                <Button variant="primary" className="shadow-sm hover:shadow-float active:scale-[0.98] transition-all">
                  {COPY.forUniversities.ctaApply}
                </Button>
              </Link>
              <a
                href={portalUrl('university', '/login')}
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-verdant-700 hover:underline px-3 py-2 min-h-[44px] flex items-center"
              >
                {COPY.forUniversities.ctaSignIn} →
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Sample Roster Table */}
        <ScrollReveal delayMs={100}>
          <SampleRosterTable />
        </ScrollReveal>

        {/* Stat Row + Unmatched Demand Signals */}
        <ScrollReveal delayMs={150}>
          <StatRow />
        </ScrollReveal>
      </div>
    </section>
  );
};
