import React from 'react';
import { cn } from '@/lib/cn';
import { CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

export type StatusChipType =
  | 'verified'
  | 'under-review'
  | 'pending'
  | 'unverified-university'
  | 'verified-university'
  | 'declined'
  | 'closed';

interface StatusChipProps {
  type: StatusChipType;
  label?: string;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ type, label, className }) => {
  switch (type) {
    case 'verified':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold bg-verdant-100 text-verdant-800 border border-verdant-300/40 select-none',
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-verdant-700" strokeWidth={2.5} />
          <span>{label || 'Verified'}</span>
        </span>
      );

    case 'under-review':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-ember-100 text-ember-700 select-none',
            className
          )}
        >
          <Clock className="w-3.5 h-3.5" strokeWidth={2} />
          <span>{label || 'Under review'}</span>
        </span>
      );

    case 'pending':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-ember-50 text-ember-700 select-none',
            className
          )}
        >
          <Clock className="w-3.5 h-3.5" strokeWidth={2} />
          <span>{label || 'Pending'}</span>
        </span>
      );

    case 'unverified-university':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-canvas border border-dashed border-hairline text-moss select-none',
            className
          )}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-moss" strokeWidth={1.75} />
          <span>{label || 'Unverified university'}</span>
        </span>
      );

    case 'verified-university':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-verdant-50 text-verdant-800 border border-verdant-100 select-none',
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-verdant-700" strokeWidth={2.5} />
          <span>{label || 'Verified university'}</span>
        </span>
      );

    case 'declined':
    case 'closed':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-mist text-moss select-none',
            className
          )}
        >
          <span>{label || (type === 'declined' ? 'Declined' : 'Closed')}</span>
        </span>
      );
  }
};
