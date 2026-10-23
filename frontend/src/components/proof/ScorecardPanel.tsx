import React, { useState } from 'react';
import { ProofRing } from './ProofRing';
import { EvidenceRow, type CriterionData } from './EvidenceRow';
import { StatusChip } from './StatusChip';
import { CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ScorecardSampleData {
  id: string;
  candidateAlias: string;
  skill: string;
  score: number;
  level: string;
  criteria: CriterionData[];
}

export const sampleCandidates: ScorecardSampleData[] = [
  {
    id: 'cand-alpha',
    candidateAlias: 'Candidate Alpha',
    skill: 'React',
    score: 72,
    level: 'Proficient',
    criteria: [
      {
        name: 'Correctness',
        score: 74,
        rationale: 'Edge cases handled; cart reducer passes all stress assertions.',
        evidence: [
          {
            type: 'link',
            label: 'Live site',
            title: 'Production deployment check',
            preview: 'All checkout steps verify against live endpoints; empty cart state triggers inline validation.',
          },
          {
            type: 'code',
            label: 'cart.tsx',
            title: 'Shopping cart reducer implementation',
            preview: `// src/cart.tsx:42-49\nexport function cartReducer(state: CartState, action: CartAction) {\n  switch (action.type) {\n    case 'ADD_ITEM':\n      return { ...state, items: [...state.items, action.item] };\n  }\n}`,
            lineNumbers: true,
          },
        ],
      },
      {
        name: 'Code quality',
        score: 66,
        rationale: 'Clean component boundaries; type safety covers key props.',
        evidence: [
          {
            type: 'document',
            label: 'README.md',
            title: 'Project architecture documentation',
            preview: '# Architecture & Decisions\nState management leverages Context + Reducer. Custom hooks encapsulate checkout validation logic.',
          },
        ],
      },
      {
        name: 'Communication',
        score: 78,
        rationale: 'Clear, structured explanation of trade-offs and edge cases.',
        evidence: [
          {
            type: 'video',
            label: 'Demo 01:42',
            title: 'Demo video walkthrough',
            preview: 'Explains error boundary handling on network failure.',
            timestamp: '01:42',
          },
        ],
      },
    ],
  },
  {
    id: 'cand-beta',
    candidateAlias: 'Candidate Beta',
    skill: 'Go & Concurrency',
    score: 91,
    level: 'Expert',
    criteria: [
      {
        name: 'Correctness',
        score: 94,
        rationale: 'Zero deadlocks under 50,000 req/sec goroutine benchmark.',
        evidence: [
          {
            type: 'code',
            label: 'worker.go',
            title: 'Buffered channels with backpressure',
            preview: `// pkg/pool/worker.go:18-28\ntype Dispatcher struct {\n  WorkerPool chan chan Job\n  MaxWorkers int\n}\nfunc (d *Dispatcher) Run() {\n  for i := 0; i < d.MaxWorkers; i++ {\n    worker := NewWorker(d.WorkerPool)\n    worker.Start()\n  }\n}`,
            lineNumbers: true,
          },
        ],
      },
      {
        name: 'System Design',
        score: 89,
        rationale: 'Graceful shutdown, connection pooling, and structured logging.',
        evidence: [
          {
            type: 'link',
            label: 'Benchmark',
            title: 'Latency distribution report',
            preview: 'p99 latency bounded at 1.8ms under 50k QPS load simulator.',
          },
        ],
      },
      {
        name: 'Communication',
        score: 90,
        rationale: 'Crisp RFC explaining channel vs mutex selection rationale.',
        evidence: [
          {
            type: 'document',
            label: 'RFC-004.md',
            title: 'Concurrency model selection RFC',
            preview: '# Memory vs CPU contention\nBenchmarks proved channel dispatch minimized lock thrashing by 73%.',
          },
        ],
      },
    ],
  },
  {
    id: 'cand-gamma',
    candidateAlias: 'Candidate Gamma',
    skill: 'Python & Systems',
    score: 86,
    level: 'Advanced',
    criteria: [
      {
        name: 'Algorithm efficiency',
        score: 88,
        rationale: 'O(N log N) graph traversal with vectorized NumPy caching.',
        evidence: [
          {
            type: 'code',
            label: 'matrix.py',
            title: 'Sparse matrix propagation algorithm',
            preview: `# engine/matrix.py\ndef propagate(adjacency_csr, feature_matrix):\n    return adjacency_csr.dot(feature_matrix)`,
            lineNumbers: true,
          },
        ],
      },
      {
        name: 'Test coverage',
        score: 84,
        rationale: '98% unit coverage with property-based Hypothesis fuzzing.',
        evidence: [
          {
            type: 'link',
            label: 'Coverage run',
            title: 'Pytest CI telemetry report',
            preview: 'All 142 edge cases passed including cyclic disconnected graphs.',
          },
        ],
      },
    ],
  },
];

export const defaultHeroScorecard: ScorecardSampleData = sampleCandidates[0];

interface ScorecardPanelProps {
  data?: ScorecardSampleData;
  className?: string;
  animate?: boolean;
}

export const ScorecardPanel: React.FC<ScorecardPanelProps> = ({
  data = defaultHeroScorecard,
  className,
  animate = true,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<ScorecardSampleData>(data);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setHasVerified(true);
    }, 500);
  };

  return (
    <div
      className={cn(
        'w-full max-w-[420px] bg-canvas rounded-feature border border-hairline shadow-float hover:shadow-card-hover transition-all duration-300 p-4 sm:p-5 text-ink overflow-hidden relative',
        className
      )}
    >
      {/* Top subtle indicator accent */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-verdant-700 to-verdant-400" aria-hidden="true" />

      {/* Compact Top Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-moss font-semibold px-2 py-0.5 rounded bg-mist border border-hairline">
            Sample scorecard
          </span>
          <span className="text-[11px] text-moss font-medium">
            • {selectedCandidate.candidateAlias}
          </span>
        </div>
        <StatusChip type="verified" label="Verified" />
      </div>

      {/* Interactive Candidate Switcher Pills */}
      <div className="flex items-center gap-1 p-1 bg-mist rounded-panel mb-3.5">
        {sampleCandidates.map((cand) => {
          const isActive = cand.id === selectedCandidate.id;
          return (
            <button
              key={cand.id}
              type="button"
              onClick={() => {
                setSelectedCandidate(cand);
                setHasVerified(false);
              }}
              className={cn(
                'flex-1 min-h-[32px] px-2 py-1 rounded-control text-[12px] font-medium transition-all text-center whitespace-nowrap cursor-pointer',
                isActive
                  ? 'bg-canvas text-verdant-800 font-semibold shadow-xs border border-verdant-200'
                  : 'text-moss hover:text-ink'
              )}
            >
              <span>{cand.skill.split(' ')[0]}</span>
              <span className="ml-1 text-[11px] font-mono opacity-80">({cand.score})</span>
            </button>
          );
        })}
      </div>

      {/* Compact Hero Ring & Meta */}
      <div className="flex items-center gap-4 pb-3.5 mb-3.5 border-b border-hairline">
        <div className="shrink-0 flex items-center justify-center">
          <ProofRing
            score={selectedCandidate.score}
            skill={selectedCandidate.skill}
            size={110}
            level={selectedCandidate.level}
            animate={animate}
            showCaption={false}
          />
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[12px] font-medium text-moss">Assessed skill</span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-verdant-50 text-verdant-700 border border-verdant-100">
              {selectedCandidate.level}
            </span>
          </div>
          <h3 className="text-[20px] font-display font-bold text-ink leading-tight truncate mb-1">
            {selectedCandidate.skill}
          </h3>
          <p className="text-[12px] text-moss line-clamp-2 leading-relaxed mb-2">
            Verified with raw source-level proof. Exceeds the 50-point benchmark.
          </p>

          {/* Micro Verify Button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying || hasVerified}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-control text-[11px] font-medium border transition-all cursor-pointer',
              hasVerified
                ? 'bg-verdant-50 border-verdant-300 text-verdant-800'
                : 'bg-canvas hover:bg-mist border-hairline text-moss hover:text-ink shadow-xs'
            )}
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3 h-3 text-verdant-700 animate-spin" />
                <span>Auditing proof...</span>
              </>
            ) : hasVerified ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-verdant-700" />
                <span>Hash Validated</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3 h-3 text-verdant-700" />
                <span>Verify proof</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Evidence criteria rows */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <h4 className="text-[13px] font-semibold text-ink">
            Rubric evaluation & evidence
          </h4>
          <span className="text-[11px] text-moss">Click chips to inspect</span>
        </div>

        <div className="divide-y divide-hairline">
          {selectedCandidate.criteria.map((crit, idx) => (
            <EvidenceRow key={`${selectedCandidate.id}-${crit.name}-${idx}`} criterion={crit} />
          ))}
        </div>
      </div>
    </div>
  );
};
