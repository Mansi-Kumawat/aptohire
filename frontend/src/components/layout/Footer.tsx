import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { portalUrl } from '@/config/portals';
import { env } from '@/config/env';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-mist border-t border-hairline py-12 md:py-16 text-ink">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-hairline">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-block" aria-label="AptoHire home">
              <Logo size="md" />
            </Link>
            <p className="text-[15px] text-moss max-w-sm leading-relaxed">
              Skill-verification and consent-first hiring platform. Students prove skills through real projects; organizations match on verified proof.
            </p>
            <div className="pt-2 text-[14px] text-moss">
              <span>Support: </span>
              <a
                href={`mailto:${env.VITE_SUPPORT_EMAIL}`}
                className="text-verdant-700 hover:underline font-medium"
              >
                {env.VITE_SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-ink font-display">
              Product
            </h4>
            <ul className="space-y-2 text-[14px] text-moss">
              <li>
                <a href="/#how-it-works" className="hover:text-verdant-700 transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-verdant-700 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-verdant-700 transition-colors">
                  Verify a credential
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="hover:text-verdant-700 transition-colors">
                  Get started
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals (NO ADMIN!) */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-ink font-display">
              Portals
            </h4>
            <ul className="space-y-2 text-[14px] text-moss">
              <li>
                <a
                  href={portalUrl('student', '/login')}
                  rel="noopener noreferrer"
                  className="hover:text-verdant-700 transition-colors"
                >
                  Student portal
                </a>
              </li>
              <li>
                <a
                  href={portalUrl('university', '/login')}
                  rel="noopener noreferrer"
                  className="hover:text-verdant-700 transition-colors"
                >
                  University portal
                </a>
              </li>
              <li>
                <a
                  href={portalUrl('organization', '/login')}
                  rel="noopener noreferrer"
                  className="hover:text-verdant-700 transition-colors"
                >
                  Organization portal
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-ink font-display">
              Legal & Transparency
            </h4>
            <ul className="space-y-2 text-[14px] text-moss">
              <li>
                <Link to="/privacy" className="hover:text-verdant-700 transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-verdant-700 transition-colors">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link to="/ai-and-fairness" className="hover:text-verdant-700 transition-colors">
                  AI & fairness
                </Link>
              </li>
              {env.VITE_DEMO_MODE && (
                <li>
                  <Link to="/demo" className="text-ember-700 font-medium hover:underline">
                    Demo guide
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright and prototype disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-moss">
          <p>© {new Date().getFullYear()} AptoHire. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Prototype demo. All people, universities, and organizations shown are fictional.
          </p>
        </div>
      </div>
    </footer>
  );
};
