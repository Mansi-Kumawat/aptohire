import React from 'react';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading = false, fullWidth = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-control transition-colors duration-fast select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 focus-visible:ring-offset-2 min-h-[44px] md:min-h-[40px] px-5 py-2';

    const variantStyles: Record<ButtonVariant, string> = {
      // Primary: white text on verdant-700 (5.1:1 contrast)
      primary: 'bg-verdant-700 text-canvas hover:bg-verdant-800 active:bg-verdant-800 shadow-none border border-transparent',
      // Accent: ink text on ember-500 (6.0:1 contrast) - NEVER white on ember-500
      accent: 'bg-ember-500 text-ink hover:bg-ember-700 hover:text-canvas active:bg-ember-700 shadow-none border border-transparent',
      // Secondary: flat hairline border
      secondary: 'bg-canvas text-ink border border-hairline hover:bg-mist active:bg-mist',
      // Ghost: transparent
      ghost: 'bg-transparent text-ink hover:bg-mist active:bg-mist border border-transparent',
      // Danger: error styling
      danger: 'bg-danger-50 text-danger-600 border border-danger-600 hover:bg-danger-600 hover:text-canvas',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          fullWidth && 'w-full',
          isLoading && 'relative cursor-wait',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-current" strokeWidth={1.75} />
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
