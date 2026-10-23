import React, { useState, useEffect } from 'react';
import { CheckCircle2, Code2, Cpu, ShieldCheck, Lock, Play, Pause, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Stage {
  id: number;
  label: string;
  badge: string;
  icon: React.ReactNode;
  heading: string;
  description: string;
  terminalLines: { text: string; status: 'ok' | 'run' | 'hash' }[];
}

export const VerificationMotionGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const stages: Stage[] = [
    {
      id: 0,
      label: '1. Ingestion',
      badge: 'Git commit sync',
      icon: <Code2 className="w-4 h-4 text-verdant-700" />,
      heading: 'Source Code Artifact Ingestion',
      description: 'Raw TypeScript, Go, or Python repositories are ingested and stripped of author identity metadata.',
      terminalLines: [
        { text: '$ git clone repo.git --depth=1 --anonymize', status: 'run' },
        { text: '✓ Extracted 14 source files & 42 unit test cases', status: 'ok' },
        { text: '✓ PII scrubbed: 0 personal author tags retained', status: 'ok' },
      ],
    },
    {
      id: 1,
      label: '2. Analysis',
      badge: 'AST & Fuzzing',
      icon: <Cpu className="w-4 h-4 text-verdant-700" />,
      heading: 'Automated Multi-Suite Evaluation',
      description: 'Abstract Syntax Tree parsers, stress fuzzers, and mutation assertions evaluate code architecture and robustness.',
      terminalLines: [
        { text: '» AST parser: 0 unchecked types, 100% boundary safety', status: 'ok' },
        { text: '» Concurrency fuzzer: 10,000 goroutines stress passed', status: 'ok' },
        { text: '✓ Benchmark score computed: 92 / 100 Proficient', status: 'ok' },
      ],
    },
    {
      id: 2,
      label: '3. Seal',
      badge: 'Cryptographic hash',
      icon: <ShieldCheck className="w-4 h-4 text-verdant-700" />,
      heading: 'Tamper-Evident Hash Generation',
      description: 'Evaluated scores and artifact hashes are cryptographically signed with an immutable public identifier.',
      terminalLines: [
        { text: '» Sign rubric: SHA-256(scores + commit_hash + timestamp)', status: 'run' },
        { text: '✓ Proof ID issued: 0xa1b2c3d4e5f6a7b8c9', status: 'hash' },
        { text: '✓ Public lookup registered on aptohire.com/verify', status: 'ok' },
      ],
    },
    {
      id: 3,
      label: '4. Match',
      badge: 'Blind discovery',
      icon: <Lock className="w-4 h-4 text-ember-700" />,
      heading: 'Zero-Knowledge Blind Matchmaking',
      description: 'Recruiters search solely by skill rubric criteria. Candidate names and contact details remain locked until mutual consent.',
      terminalLines: [
        { text: '» Employer matched: Senior Systems Engineer criteria', status: 'run' },
        { text: '» Displayed candidate: Candidate Alpha (Score 92)', status: 'ok' },
        { text: '✓ Consent request dispatched to candidate dashboard', status: 'ok' },
      ],
    },
  ];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const current = stages[activeStage];

  return (
    <div
      className={cn(
        'rounded-feature border border-hairline bg-canvas p-6 sm:p-8 shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden text-left',
        className
      )}
    >
      {/* Top subtle progress beam */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-mist" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-verdant-700 to-verdant-400 transition-all duration-500 ease-out"
          style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
        />
      </div>

      {/* Header with Title & Play/Pause Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-hairline gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-verdant-800 font-semibold px-2 py-0.5 rounded bg-verdant-100">
              Interactive Motion Graphic
            </span>
            <span className="text-[12px] font-mono text-moss hidden sm:inline">
              Skill Verification Protocol
            </span>
          </div>
          <h3 className="text-[20px] font-display font-bold text-ink mt-1">
            Real-Time Verification Pipeline
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause pipeline animation' : 'Resume pipeline animation'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control border border-hairline bg-mist text-moss hover:text-ink hover:bg-canvas transition-colors text-[12px] font-mono self-start sm:self-auto cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-moss" />
              <span>Pause flow</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-verdant-700" />
              <span>Resume flow</span>
            </>
          )}
        </button>
      </div>

      {/* 4 Interactive Stage Pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {stages.map((stage) => {
          const isActive = stage.id === activeStage;
          const isPassed = stage.id < activeStage;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                setActiveStage(stage.id);
                setIsPlaying(false);
              }}
              className={cn(
                'p-3 rounded-panel border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[64px]',
                isActive
                  ? 'bg-verdant-50 border-verdant-300 text-verdant-900 shadow-xs'
                  : 'bg-canvas border-hairline/80 hover:bg-mist text-moss hover:text-ink'
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-mono font-semibold">
                  {stage.label}
                </span>
                {isPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-verdant-700" />
                ) : (
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      isActive ? 'bg-verdant-600 animate-pulse' : 'bg-hairline'
                    )}
                  />
                )}
              </div>
              <span className="text-[11px] font-medium opacity-80 block truncate">
                {stage.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Visual Display Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Stage detail description */}
        <div className="lg:col-span-5 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-verdant-50 text-verdant-800 text-[12px] font-semibold border border-verdant-100">
            {current.icon}
            <span>{current.badge}</span>
          </div>

          <h4 className="text-[18px] font-display font-bold text-ink leading-snug">
            {current.heading}
          </h4>

          <p className="text-[14px] text-moss leading-relaxed">
            {current.description}
          </p>

          <div className="pt-2 flex items-center gap-2 text-[12px] text-verdant-800 font-mono">
            <CheckCircle2 className="w-4 h-4 text-verdant-700 shrink-0" />
            <span>Zero human grading bias • Fully deterministic</span>
          </div>
        </div>

        {/* Right: Live Simulated Terminal Box */}
        <div className="lg:col-span-7 rounded-panel bg-ink text-canvas p-4 font-mono text-[13px] leading-relaxed border border-hairline shadow-inner">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-hairline/20 text-[11px] text-moss">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-danger-600/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-ember-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-verdant-600/80 inline-block" />
              <span className="ml-2 font-mono text-mist/70">aptohire-daemon v1.2</span>
            </div>
            <span className="text-verdant-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-verdant-300" />
              Active verification
            </span>
          </div>

          <div className="space-y-2 py-1 min-h-[96px]">
            {current.terminalLines.map((line, idx) => (
              <div
                key={`${current.id}-${idx}`}
                className={cn(
                  'flex items-start gap-2 transition-all duration-300 animate-in fade-in-50',
                  line.status === 'ok'
                    ? 'text-verdant-300'
                    : line.status === 'hash'
                    ? 'text-ember-300 font-bold'
                    : 'text-mist/90'
                )}
              >
                <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-moss" />
                <span className="break-all">{line.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 mt-3 border-t border-hairline/20 flex items-center justify-between text-[11px] text-moss">
            <span>Latency: &lt; 420ms</span>
            <span className="text-mist/80">Tamper-evident verification hash issued</span>
          </div>
        </div>
      </div>
    </div>
  );
};
