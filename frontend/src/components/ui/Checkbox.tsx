import React from 'react';
import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  hasError?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, hasError = false, id, checked, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'relative flex items-start gap-3 cursor-pointer py-1.5 select-none min-h-[44px]',
          className
        )}
      >
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            id={id}
            type="checkbox"
            ref={ref}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-5 h-5 rounded-[6px] border transition-colors flex items-center justify-center bg-canvas',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-verdant-700 peer-focus-visible:ring-offset-2',
              'peer-checked:bg-verdant-700 peer-checked:border-verdant-700 text-canvas',
              hasError
                ? 'border-danger-600'
                : 'border-hairline peer-hover:border-moss'
            )}
          >
            <Check className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={2.5} />
          </div>
        </div>
        {label && (
          <span className="text-[15px] leading-relaxed text-ink pt-0.5">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
