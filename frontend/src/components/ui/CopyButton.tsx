import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label = 'Copy',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : `${label} ${value}`}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-control border border-hairline bg-canvas text-[14px] font-medium text-ink transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700',
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-verdant-700" strokeWidth={2} />
          <span className="text-verdant-700">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-moss" strokeWidth={1.75} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
