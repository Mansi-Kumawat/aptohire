import React from 'react';
import { cn } from '@/lib/cn';
import { AlertCircle } from 'lucide-react';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  children: (props: { id: string; hasError: boolean; 'aria-describedby'?: string }) => React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  required = false,
  helperText,
  error,
  className,
  children,
}) => {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <label htmlFor={id} className="text-[15px] font-medium text-ink flex items-center justify-between">
        <span>{label}</span>
        {required && (
          <span className="text-[13px] text-moss font-normal">
            (required)
          </span>
        )}
      </label>

      {children({ id, hasError: Boolean(error), 'aria-describedby': describedBy })}

      {helperText && !error && (
        <p id={helperId} className="text-[14px] text-moss leading-normal">
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-[14px] text-danger-600 flex items-center gap-1.5 font-medium leading-normal"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-danger-600" strokeWidth={1.75} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
