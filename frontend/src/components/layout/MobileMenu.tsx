import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { portalUrl } from '@/config/portals';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import {
  X,
  Workflow,
  GraduationCap,
  School,
  Building2,
  CreditCard,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, triggerRef }) => {
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on route or hash changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, location.hash]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle escape, focus trap, and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
      } else if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    // Initial focus on close button
    const initialFocus = drawerRef.current?.querySelector<HTMLElement>('button[aria-label="Close navigation menu"]');
    initialFocus?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const isHome = location.pathname === '/';

  const navLinks = [
    {
      title: 'How it works',
      desc: '4-step skill verification protocol',
      href: isHome ? '#how-it-works' : '/#how-it-works',
      isAnchor: true,
      icon: <Workflow className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />,
    },
    {
      title: 'For students',
      desc: 'Prove skills anonymously with code evidence',
      href: isHome ? '#for-students' : '/#for-students',
      isAnchor: true,
      icon: <GraduationCap className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />,
    },
    {
      title: 'Universities',
      desc: 'Placement readiness & roster verification',
      href: isHome ? '#for-universities' : '/#for-universities',
      isAnchor: true,
      icon: <School className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />,
    },
    {
      title: 'Organizations',
      desc: 'Blind talent search with verified rubric',
      href: isHome ? '#for-organizations' : '/#for-organizations',
      isAnchor: true,
      icon: <Building2 className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />,
    },
    {
      title: 'Pricing',
      desc: 'Transparent student, campus & employer tiers',
      href: '/pricing',
      isAnchor: false,
      icon: <CreditCard className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />,
      isActive: location.pathname === '/pricing',
    },
    {
      title: 'Verify credential',
      desc: 'Instant cryptographic proof lookup',
      href: '/verify',
      isAnchor: false,
      icon: <ShieldCheck className="w-5 h-5 text-verdant-700" strokeWidth={1.75} />,
      badge: 'Public',
      isActive: location.pathname.startsWith('/verify'),
    },
  ];

  return createPortal(
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="md:hidden fixed inset-0 z-50 flex flex-col justify-start"
    >
      {/* Semi-transparent Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-base"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-down Navigation Drawer */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-h-[92vh] flex flex-col bg-canvas border-b border-hairline shadow-elevation overflow-hidden animate-in slide-in-from-top-4 duration-base ease-out"
      >
        {/* Mobile Header Bar inside drawer */}
        <div className="h-[64px] px-4 sm:px-6 flex items-center justify-between border-b border-hairline bg-canvas">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 rounded-control"
            aria-label="AptoHire home"
          >
            <Logo size="md" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 min-h-[44px] min-w-[44px] rounded-control border border-hairline bg-mist text-ink hover:bg-verdant-50 hover:text-verdant-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
          {/* Main Navigation Tabs */}
          <nav aria-label="Mobile Site Navigation">
            <span className="text-[11px] font-mono uppercase tracking-wider text-moss font-semibold px-2 mb-2 block">
              Navigation
            </span>
            <div className="space-y-1">
              {navLinks.map((item) => {
                const content = (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-control bg-verdant-50 border border-verdant-100 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] font-semibold text-ink leading-snug">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-verdant-100 text-verdant-800 font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[13px] text-moss block line-clamp-1">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-moss shrink-0" strokeWidth={1.5} />
                  </div>
                );

                const linkClasses = `flex items-center min-h-[48px] p-2.5 rounded-panel border transition-all ${
                  item.isActive
                    ? 'bg-verdant-50 border-verdant-200 text-verdant-900 shadow-sm'
                    : 'bg-canvas border-hairline/60 hover:bg-mist hover:border-hairline text-ink'
                }`;

                return (
                  <div key={item.title}>
                    {item.isAnchor ? (
                      <a href={item.href} onClick={onClose} className={linkClasses}>
                        {content}
                      </a>
                    ) : (
                      <Link to={item.href} onClick={onClose} className={linkClasses}>
                        {content}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Quick Portal Access Section */}
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-moss font-semibold px-2 mb-2.5 block">
              Portal Log In
            </span>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={portalUrl('student', '/login')}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-panel border border-hairline bg-mist/60 hover:bg-verdant-50 hover:border-verdant-200 min-h-[58px] transition-all text-center group"
              >
                <div className="flex items-center gap-1 text-[13px] font-semibold text-ink group-hover:text-verdant-700">
                  <span>Student</span>
                  <ExternalLink className="w-3 h-3 text-moss" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-moss mt-0.5">Proof profile</span>
              </a>

              <a
                href={portalUrl('university', '/login')}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-panel border border-hairline bg-mist/60 hover:bg-verdant-50 hover:border-verdant-200 min-h-[58px] transition-all text-center group"
              >
                <div className="flex items-center gap-1 text-[13px] font-semibold text-ink group-hover:text-verdant-700">
                  <span>University</span>
                  <ExternalLink className="w-3 h-3 text-moss" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-moss mt-0.5">TPO & Rosters</span>
              </a>

              <a
                href={portalUrl('organization', '/login')}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-panel border border-hairline bg-mist/60 hover:bg-verdant-50 hover:border-verdant-200 min-h-[58px] transition-all text-center group"
              >
                <div className="flex items-center gap-1 text-[13px] font-semibold text-ink group-hover:text-verdant-700">
                  <span>Company</span>
                  <ExternalLink className="w-3 h-3 text-moss" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-moss mt-0.5">Hiring teams</span>
              </a>
            </div>
          </div>

          {/* Interactive Demo Link */}
          <Link
            to="/demo"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-panel border border-dashed border-verdant-300 bg-verdant-50/50 hover:bg-verdant-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-verdant-700" strokeWidth={2} />
              <div className="text-left">
                <div className="text-[14px] font-semibold text-verdant-900 leading-tight">
                  Interactive Demo Mode
                </div>
                <div className="text-[12px] text-verdant-700">
                  Explore full hiring flow without an account
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-verdant-700" strokeWidth={2} />
          </Link>
        </div>

        {/* Fixed Drawer Bottom CTA */}
        <div className="p-4 sm:px-6 bg-canvas border-t border-hairline">
          <Link to="/get-started" onClick={onClose} className="block w-full">
            <Button variant="primary" fullWidth className="min-h-[48px] shadow-sm">
              <span>Get started with AptoHire</span>
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
            </Button>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};
