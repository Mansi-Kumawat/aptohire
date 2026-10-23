import React from 'react';
import { COPY } from '@/content/copy';
import { portalUrl } from '@/config/portals';
import { SkillGraphPreview } from '@/components/proof/SkillGraphPreview';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, QrCode } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const ForStudents: React.FC = () => {
  return (
    <section id="for-students" className="py-16 md:py-28 bg-grad-section-warm border-b border-hairline scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Points */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <ScrollReveal>
              <div>
                <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold px-2.5 py-1 rounded bg-mist border border-hairline inline-block mb-3">
                  Students
                </span>
                <h2 className="text-display-l font-display font-bold text-ink">
                  {COPY.forStudents.subheading}
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <div className="space-y-4 pt-2">
                {COPY.forStudents.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-verdant-700 shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <h3 className="text-[16px] font-semibold text-ink">
                        {point.title}
                      </h3>
                      <p className="text-[15px] text-moss mt-0.5 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* University independence reassurance */}
            <ScrollReveal delayMs={150}>
              <div className="p-4 rounded-panel bg-mist border border-hairline text-[14px] text-moss leading-relaxed">
                <strong>Independent verification: </strong>
                {COPY.forStudents.independentNote}
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <div className="pt-2">
                <a href={portalUrl('student', '/signup')} rel="noopener noreferrer">
                  <Button variant="primary" className="shadow-sm hover:shadow-float active:scale-[0.98] transition-all">
                    {COPY.forStudents.cta}
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: SkillGraphPreview & Resume Preview Card */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal delayMs={150}>
              <SkillGraphPreview />
            </ScrollReveal>

            {/* Small Resume with QR preview illustration */}
            <ScrollReveal delayMs={250}>
              <div className="rounded-panel border border-hairline bg-canvas p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-card-hover hover:border-verdant-200 transition-all duration-300">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-control bg-mist border border-hairline flex items-center justify-center shrink-0">
                    <QrCode className="w-6 h-6 text-verdant-700" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-ink">
                      Digital resume with verification QR
                    </h4>
                    <p className="text-[13px] text-moss">
                      Scannable by employers to inspect live rubric evidence on <code>aptohire.com/verify</code>
                    </p>
                  </div>
                </div>
                <span className="text-[12px] font-mono font-semibold px-2.5 py-1 rounded bg-verdant-50 text-verdant-800 border border-verdant-100 shrink-0 hidden sm:inline-block">
                  Instant verify
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
