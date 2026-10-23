import React from 'react';
import { cn } from '@/lib/cn';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info';

interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  className,
}) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-verdant-700 shrink-0" strokeWidth={1.75} />,
    error: <AlertCircle className="w-5 h-5 text-danger-600 shrink-0" strokeWidth={1.75} />,
    info: <Info className="w-5 h-5 text-moss shrink-0" strokeWidth={1.75} />,
  };

  const borderStyles = {
    success: 'border-verdant-300 bg-verdant-50',
    error: 'border-danger-600/30 bg-danger-50',
    info: 'border-hairline bg-canvas',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 p-4 rounded-panel border shadow-float text-ink max-w-md w-full',
        borderStyles[variant],
        className
      )}
    >
      {icons[variant]}
      <div className="flex-1">
        <h4 className="text-[15px] font-semibold text-ink">{title}</h4>
        {message && <p className="text-[14px] text-moss mt-0.5 leading-normal">{message}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss message"
          className="p-1 rounded-control text-moss hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 -mt-2"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
};
