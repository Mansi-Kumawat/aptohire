import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  detail: string;
}

const stats: StatItem[] = [
  { label: 'Active students', value: '412', detail: 'Across 4 engineering batches' },
  { label: 'Verified skills', value: '1,280', detail: 'Scores strictly above 50' },
  { label: 'Verified placement rate', value: '88%', detail: 'Consent-verified matches' },
];

interface UnmatchedDemandItem {
  skill: string;
  jobCount: number;
  reasonCount: number;
}

const unmatchedDemands: UnmatchedDemandItem[] = [
  { skill: 'Next.js & Server Components', jobCount: 42, reasonCount: 68 },
  { skill: 'PostgreSQL Query Optimization', jobCount: 29, reasonCount: 45 },
  { skill: 'Distributed Systems & Docker', jobCount: 24, reasonCount: 38 },
];

export const StatRow: React.FC = () => {
  return (
    <div className="w-full space-y-6 pt-4">
      {/* Plain stat row with hairline dividers, no cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline border-y border-hairline py-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="px-4 py-3 md:py-1 first:pl-0 last:pr-0">
            <span className="text-[13px] font-medium text-moss block mb-1">
              {stat.label}
            </span>
            <div className="text-[32px] font-display font-bold text-ink tabular-nums leading-none mb-1">
              {stat.value}
            </div>
            <span className="text-[13px] text-moss">
              {stat.detail}
            </span>
          </div>
        ))}
      </div>

      {/* Unmatched demand alert list */}
      <div className="rounded-panel border border-hairline bg-mist/40 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-[15px] font-display font-semibold text-ink">
              Unmatched demand signals
            </h4>
            <p className="text-[13px] text-moss mt-0.5">
              Skills requested in active employer searches with zero matching students in your roster.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-canvas border border-hairline text-moss uppercase font-semibold">
            Market intel
          </span>
        </div>

        <div className="divide-y divide-hairline">
          {unmatchedDemands.map((demand, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-[14px]">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-ember-700 shrink-0" strokeWidth={1.75} />
                <span className="font-medium text-ink">{demand.skill}</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-moss">
                <span><strong className="text-ink font-semibold">{demand.jobCount}</strong> jobs</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline"><strong className="text-ink font-semibold">{demand.reasonCount}</strong> search filters</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
