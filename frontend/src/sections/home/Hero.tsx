import React from 'react';
import { COPY } from '@/content/copy';
import { portalUrl } from '@/config/portals';
import { ScorecardPanel } from '@/components/proof/ScorecardPanel';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-grad-hero-sleek pt-12 pb-16 md:pt-18 md:pb-24 border-b border-hairline">
      {/* Sleek ambient background gradient glows */}
      <div
        className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-verdant-100/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-ember-100/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headline, Trust Badge, and CTAs (7 cols for spacious typography) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Live Trust Pill with sleek subtle gradient */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-gradient-to-r from-verdant-50 via-canvas to-verdant-50/60 border border-verdant-200 text-verdant-800 text-[13px] font-medium shadow-xs select-none">
              <span className="w-2 h-2 rounded-full bg-verdant-600 animate-pulse" />
              <span>Cryptographic Proof Protocol</span>
              <span className="text-verdant-300">•</span>
              <span className="text-[12px] font-mono text-verdant-700">Blind Matching</span>
            </div>

            <h1 className="text-display-xl font-display font-extrabold text-ink leading-[1.08] tracking-tight">
              {COPY.hero.headline}
            </h1>

            <p className="text-body-l text-moss max-w-xl leading-relaxed">
              {COPY.hero.lead}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a href={portalUrl('student', '/signup')} rel="noopener noreferrer">
                <Button variant="primary" fullWidth className="sm:w-auto shadow-sm hover:shadow-float active:scale-[0.98] transition-all">
                  {COPY.hero.ctaStudent}
                </Button>
              </a>
              <Link to="/get-started?intent=organization">
                <Button variant="secondary" fullWidth className="sm:w-auto active:scale-[0.98] transition-all">
                  {COPY.hero.ctaHiring}
                </Button>
              </Link>
            </div>

            {/* Micro verification tester & reassurance */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-[13px] text-moss border-t border-hairline/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-verdant-700 shrink-0" strokeWidth={2} />
                <span>{COPY.hero.reassurance}</span>
              </div>
              <span className="hidden sm:inline text-hairline">•</span>
              <Link
                to="/verify/9efdf52c1c90863fa1"
                className="inline-flex items-center gap-1 text-verdant-700 hover:text-verdant-800 font-medium hover:underline group"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try sample verify hash</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Sleek, Compact Scorecard Panel (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScorecardPanel animate={true} />
          </div>
        </div>
      </div>
    </section>
  );
};
