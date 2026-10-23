import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'aptohire-notice-v1';

export const NoticeBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem(STORAGE_KEY) === 'true';
      setDismissed(isDismissed);
    } catch {
      setDismissed(false);
    }

    // Hide while a form field is focused on mobile
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  if (dismissed || isInputFocused) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable
    }
  };

  return (
    <aside
      id="privacy-notice-bar"
      role="region"
      aria-label="Cookie and privacy notice"
      className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-nav-glass backdrop-blur-md border-t border-hairline shadow-float"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px] text-moss">
        <p className="text-center sm:text-left leading-relaxed">
          This site doesn&apos;t use tracking cookies. It remembers only whether you dismissed this notice.{' '}
          <Link to="/privacy" className="text-verdant-700 hover:underline font-medium">
            Read privacy statement
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="min-h-[44px] px-5 py-1.5 rounded-control bg-mist border border-hairline text-ink font-semibold text-[14px] hover:bg-canvas transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 cursor-pointer shrink-0"
        >
          Got it
        </button>
      </div>
    </aside>
  );
};
