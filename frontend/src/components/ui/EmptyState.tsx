import React from 'react';
import { Button } from './Button';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-feature border border-hairline bg-canvas overflow-hidden',
        className
      )}
    >
      {/* Decorative palette circles on mesh wash */}
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center" aria-hidden="true">
        <div className="absolute inset-0 rounded-full bg-verdant-100/70" />
        <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-ember-100/80" />
        <div className="absolute bottom-2 left-3 w-8 h-8 rounded-full border-2 border-verdant-600/40" />
      </div>

      <h3 className="text-[20px] font-display font-semibold text-ink mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[16px] text-moss max-w-md mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
