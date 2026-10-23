import React from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full min-h-[100px] px-3.5 py-2.5 rounded-control text-[16px] text-ink bg-canvas border transition-colors duration-fast placeholder:text-moss/60',
          'focus:outline-none focus:border-verdant-700 focus:ring-1 focus:ring-verdant-700',
          hasError
            ? 'border-danger-600 focus:border-danger-600 focus:ring-danger-600'
            : 'border-hairline hover:border-moss/40',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
