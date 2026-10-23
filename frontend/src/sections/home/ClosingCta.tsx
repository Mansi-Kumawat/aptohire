import React from 'react';
import { COPY } from '@/content/copy';
import { portalUrl } from '@/config/portals';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export const ClosingCta: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-grad-cta border-b border-hairline text-center">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-display-l font-display font-bold text-ink mb-4">
            {COPY.closingCta.headline}
          </h2>
          <p className="text-body-l text-moss max-w-xl mx-auto mb-10 leading-relaxed">
            {COPY.closingCta.lead}
          </p>
        </ScrollReveal>

        {/* Three CTAs for the three audiences */}
        <ScrollReveal delayMs={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a href={portalUrl('student', '/signup')} rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                variant="primary"
                fullWidth
                className="sm:w-auto shadow-sm hover:shadow-float active:scale-[0.98] transition-all"
              >
                <span>{COPY.closingCta.studentBtn}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <Link to="/apply/university" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                fullWidth
                className="sm:w-auto active:scale-[0.98] transition-all"
              >
                {COPY.closingCta.universityBtn}
              </Button>
            </Link>
            <Link to="/get-started?intent=organization" className="w-full sm:w-auto">
              <Button
                variant="accent"
                fullWidth
                className="sm:w-auto shadow-sm hover:shadow-float active:scale-[0.98] transition-all"
              >
                {COPY.closingCta.orgBtn}
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
