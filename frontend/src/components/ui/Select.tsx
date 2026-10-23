import React from 'react';
import { cn } from '@/lib/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError = false, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            'w-full min-h-[44px] pl-3.5 pr-10 py-2.5 rounded-control text-[16px] text-ink bg-canvas border appearance-none transition-colors duration-fast cursor-pointer',
            'focus:outline-none focus:border-verdant-700 focus:ring-1 focus:ring-verdant-700',
            hasError
              ? 'border-danger-600 focus:border-danger-600 focus:ring-danger-600'
              : 'border-hairline hover:border-moss/40',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-moss">
          <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
