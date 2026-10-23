import React from 'react';
import { AliasGlyph } from './AliasGlyph';
import { Lock, ShieldCheck } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface CandidateSampleData {
  alias: string;
  category: string;
  matchScore: number; // e.g. 92
  matchWord: string; // "Strong match" | "Good match"
  confidence: string; // "High confidence"
  skills: Array<{ name: string; level: string }>;
  reason: string;
}

interface CandidateCardPreviewProps {
  candidate: CandidateSampleData;
  className?: string;
}

export const CandidateCardPreview: React.FC<CandidateCardPreviewProps> = ({
  candidate,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-panel border border-hairline bg-canvas p-5 sm:p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-float hover:-translate-y-1 hover:border-verdant-200',
        className
      )}
    >
      <div>
        {/* Top row: Alias glyph + Alias name + Category */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <AliasGlyph alias={candidate.alias} size={48} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[18px] text-ink">
                  {candidate.alias}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-mist text-moss border border-hairline uppercase font-medium">
                  Sample
                </span>
              </div>
              <span className="inline-block mt-0.5 text-[13px] text-moss font-medium">
                {candidate.category}
              </span>
            </div>
          </div>
        </div>

        {/* Match meter */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[13px] mb-1.5">
            <span className="font-semibold text-verdant-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-verdant-600" strokeWidth={1.75} />
              {candidate.matchWord} · {candidate.confidence}
            </span>
            <span className="text-moss font-mono text-[12px]">{candidate.matchScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-mist rounded-full overflow-hidden border border-hairline/60">
            <div
              className="h-full bg-verdant-600 rounded-full"
              style={{ width: `${candidate.matchScore}%` }}
            />
          </div>
        </div>

        {/* Top skill chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {candidate.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-control bg-verdant-50 text-verdant-800 border border-verdant-100 text-[12px] font-medium"
            >
              {skill.name} · {skill.level}
            </span>
          ))}
        </div>

        {/* Reason line */}
        <p className="text-[14px] text-moss mb-4 leading-relaxed">
          {candidate.reason}
        </p>

        {/* Lock row */}
        <div className="flex items-center gap-2 py-2 px-3 rounded-control bg-mist border border-hairline text-[13px] text-moss mb-5">
          <Lock className="w-3.5 h-3.5 text-moss shrink-0" strokeWidth={1.75} />
          <span>Identity hidden until the student agrees</span>
        </div>
      </div>

      {/* Action buttons (Sample popover) */}
      <div className="flex items-center gap-3 pt-2 border-t border-hairline">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 min-h-[44px] md:min-h-[40px] px-3 py-2 rounded-control border border-hairline bg-canvas text-[14px] font-semibold text-ink hover:bg-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700"
            >
              View
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="text-left w-72">
            <p className="text-[14px] text-ink leading-relaxed mb-3">
              This is a sample. Organizations send real requests from their own portal.
            </p>
            <Link
              to="/get-started?intent=organization"
              className="text-[14px] font-semibold text-verdant-700 hover:underline inline-block"
            >
              Get started as an organization →
            </Link>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 min-h-[44px] md:min-h-[40px] px-3 py-2 rounded-control bg-ember-500 text-ink text-[14px] font-semibold hover:bg-ember-700 hover:text-canvas transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700"
            >
              Request access
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="text-left w-72">
            <p className="text-[14px] text-ink leading-relaxed mb-3">
              This is a sample. Organizations send real requests from their own portal.
            </p>
            <Link
              to="/get-started?intent=organization"
              className="text-[14px] font-semibold text-verdant-700 hover:underline inline-block"
            >
              Request recruiter access →
            </Link>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
