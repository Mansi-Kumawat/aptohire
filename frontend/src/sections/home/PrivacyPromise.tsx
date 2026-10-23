import React from 'react';
import { COPY, BRAND_BLIND_MATCHING_LABEL } from '@/content/copy';
import { Link } from 'react-router-dom';
import { Send, UserCheck, ShieldCheck } from 'lucide-react';
import { ConsentSimulator } from '@/components/proof/ConsentSimulator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const PrivacyPromise: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-grad-section-subtle border-b border-hairline">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="max-w-3xl text-left mb-12">
            {/* Brand phrase used at most once as a feature label */}
            <span className="text-[12px] font-mono uppercase tracking-wider text-verdant-800 font-semibold px-2.5 py-1 rounded bg-verdant-100 border border-verdant-300/40 inline-block mb-3">
              {BRAND_BLIND_MATCHING_LABEL}
            </span>
            <h2 className="text-display-l font-display font-bold text-ink">
              {COPY.privacyPromise.headline}
            </h2>
            <p className="text-[17px] text-moss mt-3 leading-relaxed">
              {COPY.privacyPromise.protectionDetails} Withdraw access at any time from Sharing.
            </p>
          </div>
        </ScrollReveal>

        {/* Three-step diagram: Request -> You decide -> Reveal */}
        <ScrollReveal delayMs={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-panel border border-hairline bg-mist/40 space-y-3 transition-all duration-300 hover:border-verdant-200 hover:shadow-card-hover">
              <div className="w-10 h-10 rounded-control bg-canvas border border-hairline flex items-center justify-center text-moss">
                <Send className="w-5 h-5 text-ember-700" strokeWidth={1.75} />
              </div>
              <h3 className="text-[18px] font-display font-bold text-ink">
                1. Request
              </h3>
              <p className="text-[15px] text-moss leading-relaxed">
                Employers post roles and view anonymous candidates matching required skills. They submit an access request to your profile.
              </p>
            </div>

            <div className="p-6 rounded-panel border border-hairline bg-mist/40 space-y-3 transition-all duration-300 hover:border-verdant-200 hover:shadow-card-hover">
              <div className="w-10 h-10 rounded-control bg-canvas border border-hairline flex items-center justify-center text-moss">
                <UserCheck className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />
              </div>
              <h3 className="text-[18px] font-display font-bold text-ink">
                2. You decide
              </h3>
              <p className="text-[15px] text-moss leading-relaxed">
                You review the employer profile, compensation band, and project expectations. You have sole discretion to accept or decline.
              </p>
            </div>

            <div className="p-6 rounded-panel border border-hairline bg-mist/40 space-y-3 transition-all duration-300 hover:border-verdant-200 hover:shadow-card-hover">
              <div className="w-10 h-10 rounded-control bg-canvas border border-hairline flex items-center justify-center text-moss">
                <ShieldCheck className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />
              </div>
              <h3 className="text-[18px] font-display font-bold text-ink">
                3. Reveal
              </h3>
              <p className="text-[15px] text-moss leading-relaxed">
                Your contact details and name are revealed only after you click accept. Permissions can be revoked anytime from your dashboard.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Consent Simulator Graphic */}
        <ScrollReveal delayMs={150}>
          <ConsentSimulator />
        </ScrollReveal>

        {/* Links to AI & Fairness and Privacy */}
        <ScrollReveal delayMs={200}>
          <div className="mt-8 pt-6 border-t border-hairline flex flex-wrap items-center gap-6 text-[15px]">
            <Link to="/ai-and-fairness" className="text-verdant-700 hover:underline font-semibold flex items-center gap-1.5">
              <span>Read our AI & fairness commitment</span> →
            </Link>
            <Link to="/privacy" className="text-moss hover:text-ink hover:underline">
              Review platform privacy policy
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
