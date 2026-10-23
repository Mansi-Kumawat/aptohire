import React from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full min-h-[44px] px-3.5 py-2.5 rounded-control text-[16px] text-ink bg-canvas border transition-colors duration-fast placeholder:text-moss/60',
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

Input.displayName = 'Input';
