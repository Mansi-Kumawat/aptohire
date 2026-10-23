import React, { useState } from 'react';
import { COPY } from '@/content/copy';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { VerificationMotionGraphic } from '@/components/proof/VerificationMotionGraphic';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const stepDetails = [
    'Choose from production-grade challenges or sync your own GitHub repository with full commit history.',
    'Automated AST linters, unit fuzzers, and expert rubrics score your code and verify architecture artifacts.',
    'Skills achieving ≥50 points earn cryptographically verifiable status with immutable hash issuance.',
    'Recruiters search blind anonymized skill matrices. You receive consent requests before any identity reveal.',
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-grad-section-subtle border-b border-hairline scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-left mb-12 md:mb-16">
            <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold px-2.5 py-1 rounded bg-mist border border-hairline inline-block mb-3">
              Sequence
            </span>
            <h2 className="text-display-l font-display font-bold text-ink">
              {COPY.howItWorks.headline}
            </h2>
            <p className="text-[17px] text-moss mt-2 max-w-xl">
              {COPY.howItWorks.lead}
            </p>
          </div>
        </ScrollReveal>

        {/* Steps container with graphic connecting line */}
        <ScrollReveal delayMs={100}>
          <div className="relative">
            {/* Desktop connecting track */}
            <div
              className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-mist"
              aria-hidden="true"
            >
              {/* Active progress fill */}
              <div
                className="h-full bg-verdant-600 transition-all duration-500"
                style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {COPY.howItWorks.steps.map((step) => {
                const isSelected = activeStep === step.step;
                const isPast = activeStep > step.step;

                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStep(step.step)}
                    className={cn(
                      'w-full flex flex-col items-start text-left p-5 rounded-panel border transition-all duration-300 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700',
                      isSelected
                        ? 'bg-canvas border-verdant-400 shadow-float -translate-y-1'
                        : 'bg-canvas border-hairline hover:border-verdant-200 hover:shadow-card-hover'
                    )}
                    aria-pressed={isSelected}
                  >
                    {/* Step indicator circle with palette art */}
                    <div
                      className={cn(
                        'relative w-12 h-12 rounded-full border flex items-center justify-center mb-4 transition-all',
                        isSelected
                          ? 'bg-verdant-700 border-verdant-700 text-canvas shadow-xs scale-105'
                          : isPast
                          ? 'bg-verdant-50 border-verdant-200 text-verdant-800'
                          : 'bg-mist border-hairline text-moss'
                      )}
                    >
                      {isPast ? (
                        <CheckCircle2 className="w-5 h-5 text-verdant-700" />
                      ) : (
                        <span className="font-mono font-bold text-[16px]">
                          {step.step}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between w-full mb-1.5">
                      <h3 className="text-[19px] font-display font-bold text-ink">
                        {step.title}
                      </h3>
                      <ChevronRight
                        className={cn(
                          'w-4 h-4 transition-transform text-moss',
                          isSelected && 'text-verdant-700 translate-x-1'
                        )}
                      />
                    </div>

                    <p className="text-[14px] text-moss leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {/* Dynamic expanded detail */}
                    <div
                      className={cn(
                        'mt-auto pt-3 border-t text-[12px] transition-all w-full',
                        isSelected
                          ? 'border-verdant-100 text-verdant-900 font-medium'
                          : 'border-hairline/60 text-moss'
                      )}
                    >
                      {stepDetails[step.step - 1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Verification Motion Graphic */}
        <ScrollReveal delayMs={150}>
          <VerificationMotionGraphic className="mt-10 md:mt-14" />
        </ScrollReveal>
      </div>
    </section>
  );
};
