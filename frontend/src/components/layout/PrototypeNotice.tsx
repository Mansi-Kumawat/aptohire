import React, { useState, useEffect } from 'react';
import { env } from '@/config/env';
import { X, Info } from 'lucide-react';

const STORAGE_KEY = 'aptohire-prototype-dismissed';

export const PrototypeNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(true); // default true to avoid flash

  useEffect(() => {
    if (!env.VITE_DEMO_MODE) return;
    try {
      const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
      setDismissed(isDismissed);
    } catch {
      setDismissed(false);
    }
  }, []);

  if (!env.VITE_DEMO_MODE || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable
    }
  };

  return (
    <div
      id="prototype-notice-bar"
      role="region"
      aria-label="Prototype announcement"
      className="bg-mist border-b border-hairline py-1.5 px-4 text-[13px] text-moss flex items-center justify-between relative z-40"
    >
      <div className="flex items-center gap-2 mx-auto">
        <Info className="w-4 h-4 text-verdant-700 shrink-0" strokeWidth={1.75} />
        <span>
          <strong>Prototype.</strong> All people, universities and organizations shown are fictional.
        </span>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss prototype announcement"
        className="p-1 rounded-control text-moss hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
      >
        <X className="w-3.5 h-3.5" strokeWidth={1.75} />
      </button>
    </div>
  );
};
