import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { MobileMenu } from './MobileMenu';
import { portalUrl } from '@/config/portals';
import { Menu, X, ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 w-full h-[64px] bg-nav-glass backdrop-blur-md border-b border-hairline flex items-center transition-colors">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 rounded-control p-1 -ml-1 flex items-center group transition-transform active:scale-[0.98]"
          aria-label="AptoHire home"
        >
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
          <a
            href={isHome ? '#how-it-works' : '/#how-it-works'}
            className="px-3 py-2 rounded-control text-[15px] font-medium text-ink hover:text-verdant-700 hover:bg-mist/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700"
          >
            How it works
          </a>
          <a
            href={isHome ? '#for-students' : '/#for-students'}
            className="px-3 py-2 rounded-control text-[15px] font-medium text-ink hover:text-verdant-700 hover:bg-mist/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700"
          >
            For students
          </a>
          <a
            href={isHome ? '#for-universities' : '/#for-universities'}
            className="px-3 py-2 rounded-control text-[15px] font-medium text-ink hover:text-verdant-700 hover:bg-mist/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700"
          >
            Universities
          </a>
          <a
            href={isHome ? '#for-organizations' : '/#for-organizations'}
            className="px-3 py-2 rounded-control text-[15px] font-medium text-ink hover:text-verdant-700 hover:bg-mist/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700"
          >
            Organizations
          </a>
          <Link
            to="/pricing"
            className={`px-3 py-2 rounded-control text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 ${
              location.pathname === '/pricing'
                ? 'text-verdant-700 bg-verdant-50 font-semibold'
                : 'text-ink hover:text-verdant-700 hover:bg-mist/80'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/verify"
            className={`px-3 py-2 rounded-control text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 inline-flex items-center gap-1.5 ${
              location.pathname.startsWith('/verify')
                ? 'text-verdant-700 bg-verdant-50 font-semibold'
                : 'text-ink hover:text-verdant-700 hover:bg-mist/80'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-verdant-700" strokeWidth={1.75} />
            <span>Verify</span>
          </Link>
        </nav>

        {/* Desktop Right CTAs: Log in popover + Get started button */}
        <div className="hidden md:flex items-center space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium text-ink hover:text-verdant-700 hover:bg-mist/80 rounded-control transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 cursor-pointer"
                aria-label="Select portal to log in"
              >
                <span>Log in</span>
                <ChevronDown className="w-4 h-4 text-moss" strokeWidth={1.75} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-2 shadow-float border border-hairline bg-canvas">
              <div className="text-[11px] font-mono uppercase tracking-wider text-moss font-semibold px-2 py-1 mb-1">
                Choose portal
              </div>
              <div className="flex flex-col space-y-0.5">
                <a
                  href={portalUrl('student', '/login')}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-2.5 py-2 rounded-control text-[14px] text-ink hover:bg-verdant-50 hover:text-verdant-700 transition-colors"
                >
                  <span>Student portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-moss" strokeWidth={1.75} />
                </a>
                <a
                  href={portalUrl('university', '/login')}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-2.5 py-2 rounded-control text-[14px] text-ink hover:bg-verdant-50 hover:text-verdant-700 transition-colors"
                >
                  <span>University portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-moss" strokeWidth={1.75} />
                </a>
                <a
                  href={portalUrl('organization', '/login')}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-2.5 py-2 rounded-control text-[14px] text-ink hover:bg-verdant-50 hover:text-verdant-700 transition-colors"
                >
                  <span>Organization portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-moss" strokeWidth={1.75} />
                </a>
              </div>
            </PopoverContent>
          </Popover>

          <Link to="/get-started">
            <Button variant="primary" className="shadow-none border border-transparent active:scale-[0.98] transition-all">
              Get started
            </Button>
          </Link>
        </div>

        {/* Mobile Header Right: Quick Start + Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/get-started">
            <Button
              variant="primary"
              className="min-h-[38px] px-3.5 text-[14px] shadow-none border border-transparent active:scale-95"
            >
              Get started
            </Button>
          </Link>

          <button
            ref={hamburgerButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 min-h-[44px] min-w-[44px] rounded-control border border-hairline bg-canvas text-ink hover:bg-mist active:bg-mist/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-ink" strokeWidth={2} />
            ) : (
              <Menu className="w-6 h-6 text-ink" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu (Rendered via Portal to escape containing blocks) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        triggerRef={hamburgerButtonRef}
      />
    </header>
  );
};
