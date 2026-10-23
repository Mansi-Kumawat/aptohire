import React from 'react';
import { EvidenceChip, type EvidenceData } from './EvidenceChip';
import { cn } from '@/lib/cn';

export interface CriterionData {
  name: string;
  score: number;
  rationale: string;
  evidence: EvidenceData[];
}

interface EvidenceRowProps {
  criterion: CriterionData;
  className?: string;
}

export const EvidenceRow: React.FC<EvidenceRowProps> = ({ criterion, className }) => {
  const percentage = Math.max(0, Math.min(100, criterion.score));

  return (
    <div className={cn('py-3.5 border-b border-hairline last:border-b-0', className)}>
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="text-[15px] font-semibold text-ink">
          {criterion.name}
        </span>
        <div className="flex items-center gap-2">
          {/* Progress bar */}
          <div className="w-24 sm:w-28 h-2 rounded-full bg-mist overflow-hidden border border-hairline">
            <div
              className="h-full bg-verdant-600 rounded-full transition-all duration-base"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[14px] font-display font-semibold text-verdant-700 tabular-nums w-7 text-right">
            {criterion.score}
          </span>
        </div>
      </div>

      <p className="text-[13px] text-moss mb-2.5 leading-normal">
        {criterion.rationale}
      </p>

      {/* Evidence chips */}
      {criterion.evidence.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {criterion.evidence.map((item, idx) => (
            <EvidenceChip key={idx} evidence={item} />
          ))}
        </div>
      )}
    </div>
  );
};
