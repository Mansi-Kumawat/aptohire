import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Network, List, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  shortName: string;
  score: number;
  level: string;
  status: 'verified' | 'in-progress';
  x: number;
  y: number;
  evidence: string;
  details: string[];
}

interface SkillEdge {
  from: string;
  to: string;
}

const sampleNodes: SkillNode[] = [
  {
    id: 'core',
    name: 'Fullstack Systems Architecture',
    shortName: 'Systems Core',
    score: 84,
    level: 'Advanced',
    status: 'verified',
    x: 220,
    y: 160,
    evidence: 'Cross-stack integration between React frontend, Go microservice, and PostgreSQL store.',
    details: ['End-to-end telemetry', 'Zero architectural debt', 'Docker compose harness'],
  },
  {
    id: 'react',
    name: 'React & Component Architecture',
    shortName: 'React',
    score: 72,
    level: 'Proficient',
    status: 'verified',
    x: 105,
    y: 95,
    evidence: 'Cart reducer and state machine pass deterministic stress assertions.',
    details: ['State machines', 'Custom hooks', 'Zero unhandled errors'],
  },
  {
    id: 'ts',
    name: 'TypeScript & Type Safety',
    shortName: 'TypeScript',
    score: 68,
    level: 'Proficient',
    status: 'verified',
    x: 220,
    y: 55,
    evidence: '100% type coverage across shared schemas with zero unchecked any types.',
    details: ['Strict mode enabled', 'Branded ID types', 'Generic serializers'],
  },
  {
    id: 'go',
    name: 'Go & High Concurrency',
    shortName: 'Go',
    score: 91,
    level: 'Expert',
    status: 'verified',
    x: 335,
    y: 95,
    evidence: 'Worker pool bounded at 50k QPS with zero deadlocks or goroutine leaks.',
    details: ['Buffered channels', 'p99 latency 1.8ms', 'Clean mutex bounds'],
  },
  {
    id: 'api',
    name: 'REST APIs & Protocols',
    shortName: 'REST APIs',
    score: 75,
    level: 'Proficient',
    status: 'verified',
    x: 335,
    y: 225,
    evidence: 'Idempotency key enforcement, rate limiting headers, and OpenAPI schemas.',
    details: ['RFC 7807 problem details', 'Token bucket limiter', 'Cursor pagination'],
  },
  {
    id: 'sql',
    name: 'PostgreSQL & Data Modeling',
    shortName: 'PostgreSQL',
    score: 64,
    level: 'Intermediate',
    status: 'in-progress',
    x: 220,
    y: 265,
    evidence: 'B-tree index optimization and ACID isolation level benchmarks.',
    details: ['EXPLAIN ANALYZE tuned', 'Partial indices', 'Connection pooling'],
  },
  {
    id: 'css',
    name: 'CSS & Design Systems',
    shortName: 'CSS & UI',
    score: 81,
    level: 'Advanced',
    status: 'verified',
    x: 105,
    y: 225,
    evidence: 'Strict CSS token system with responsive container queries and WCAG AAA contrast.',
    details: ['Token architecture', 'No hardcoded hex', 'Prefers-reduced-motion'],
  },
];

const sampleEdges: SkillEdge[] = [
  { from: 'core', to: 'react' },
  { from: 'core', to: 'ts' },
  { from: 'core', to: 'go' },
  { from: 'core', to: 'api' },
  { from: 'core', to: 'sql' },
  { from: 'core', to: 'css' },
  { from: 'react', to: 'ts' },
  { from: 'ts', to: 'go' },
  { from: 'go', to: 'api' },
  { from: 'api', to: 'sql' },
  { from: 'sql', to: 'css' },
  { from: 'css', to: 'react' },
];

export const SkillGraphPreview: React.FC<{ className?: string }> = ({ className }) => {
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [activeNodeId, setActiveNodeId] = useState<string>('go');

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 640) {
        setViewMode('list');
      }
    };
    checkWidth();
  }, []);

  const activeNode = sampleNodes.find((n) => n.id === activeNodeId) || sampleNodes[0];

  return (
    <div
      className={cn(
        'rounded-feature border border-hairline bg-canvas p-5 sm:p-6 shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden text-left',
        className
      )}
    >
      {/* Top Header Strip */}
      <div className="flex items-center justify-between mb-4 border-b border-hairline pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase text-verdant-800 font-semibold px-2 py-0.5 rounded bg-verdant-100">
              Interactive Topology
            </span>
            <span className="text-[12px] font-mono text-moss hidden sm:inline">
              Sample Graph
            </span>
          </div>
          <h4 className="text-[18px] font-display font-bold text-ink mt-1">
            Verified Knowledge Network
          </h4>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center rounded-control border border-hairline bg-mist p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('graph')}
            aria-label="Show skill graph"
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-medium transition-colors min-h-[44px] md:min-h-[34px] cursor-pointer',
              viewMode === 'graph'
                ? 'bg-canvas text-verdant-800 font-semibold shadow-xs border border-verdant-200'
                : 'text-moss hover:text-ink'
            )}
          >
            <Network className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Graph</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-label="Show skill list"
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-medium transition-colors min-h-[44px] md:min-h-[34px] cursor-pointer',
              viewMode === 'list'
                ? 'bg-canvas text-verdant-800 font-semibold shadow-xs border border-verdant-200'
                : 'text-moss hover:text-ink'
            )}
          >
            <List className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {viewMode === 'graph' ? (
        <div className="space-y-4">
          {/* SVG Canvas with subtle blueprint grid */}
          <div className="relative w-full h-[290px] sm:h-[310px] rounded-panel bg-mist/40 border border-hairline overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 440 320"
              className="w-full h-full max-w-[440px] max-h-[320px] select-none"
              aria-label="Interactive skill graph"
            >
              {/* Background blueprint grid dots */}
              <defs>
                <pattern id="graph-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="var(--hairline)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#graph-grid)" opacity="0.8" />

              {/* Connecting Edges */}
              {sampleEdges.map((edge, idx) => {
                const node1 = sampleNodes.find((n) => n.id === edge.from);
                const node2 = sampleNodes.find((n) => n.id === edge.to);
                if (!node1 || !node2) return null;

                const isConnectedToActive =
                  activeNodeId === node1.id || activeNodeId === node2.id;
                const isCoreConnection = edge.from === 'core' || edge.to === 'core';

                return (
                  <line
                    key={idx}
                    x1={node1.x}
                    y1={node1.y}
                    x2={node2.x}
                    y2={node2.y}
                    stroke={
                      isConnectedToActive
                        ? 'var(--verdant-600)'
                        : isCoreConnection
                        ? 'var(--verdant-300)'
                        : 'var(--hairline)'
                    }
                    strokeWidth={isConnectedToActive ? 2.5 : isCoreConnection ? 1.5 : 1}
                    strokeDasharray={
                      node1.status === 'in-progress' || node2.status === 'in-progress'
                        ? '4 3'
                        : 'none'
                    }
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Skill Nodes */}
              {sampleNodes.map((node) => {
                const isSelected = activeNodeId === node.id;
                const isCore = node.id === 'core';
                const r = isCore ? 26 : 21;

                return (
                  <g
                    key={node.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.name}, score ${node.score}, ${node.status}`}
                    onClick={() => setActiveNodeId(node.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveNodeId(node.id);
                      }
                    }}
                    className="cursor-pointer focus:outline-none group"
                  >
                    {/* Glowing outer ring when active */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r + 6}
                        fill="none"
                        stroke="var(--verdant-300)"
                        strokeWidth={3}
                        className="animate-pulse"
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill={
                        isSelected
                          ? 'var(--verdant-700)'
                          : node.status === 'verified'
                          ? 'var(--canvas)'
                          : 'var(--mist)'
                      }
                      stroke={
                        isSelected
                          ? 'var(--verdant-700)'
                          : node.status === 'verified'
                          ? 'var(--verdant-600)'
                          : 'var(--ember-500)'
                      }
                      strokeWidth={isSelected ? 3 : 2}
                      strokeDasharray={node.status === 'in-progress' ? '3 2' : 'none'}
                      className="transition-all duration-200 group-hover:scale-105"
                    />

                    {/* Inside Node: Score Text or Verified Icon */}
                    <text
                      x={node.x}
                      y={node.y - 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn(
                        'font-mono font-bold text-[12px] select-none pointer-events-none',
                        isSelected
                          ? 'fill-canvas'
                          : node.status === 'verified'
                          ? 'fill-verdant-800'
                          : 'fill-ember-700'
                      )}
                    >
                      {node.score}
                    </text>

                    {/* Mini verified tick dot indicator */}
                    {node.status === 'verified' && (
                      <circle
                        cx={node.x + r - 3}
                        cy={node.y - r + 3}
                        r={4.5}
                        fill="var(--verdant-600)"
                        stroke="var(--canvas)"
                        strokeWidth={1.5}
                      />
                    )}

                    {/* Clean pill badge beneath node */}
                    <g transform={`translate(${node.x}, ${node.y + r + 13})`}>
                      <rect
                        x="-40"
                        y="-8"
                        width="80"
                        height="16"
                        rx="8"
                        fill="var(--canvas)"
                        stroke={isSelected ? 'var(--verdant-600)' : 'var(--hairline)'}
                        strokeWidth={isSelected ? 1.5 : 1}
                        className="transition-colors"
                      />
                      <text
                        x="0"
                        y="1"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={cn(
                          'font-body text-[10px] font-semibold select-none pointer-events-none',
                          isSelected ? 'fill-verdant-900' : 'fill-ink'
                        )}
                      >
                        {node.shortName}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Node Detail Card */}
          <div className="p-4 rounded-panel border border-verdant-200 bg-verdant-50/40 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-verdant-200/60">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[16px] text-ink">
                  {activeNode.name}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-canvas border border-verdant-200 text-verdant-800 font-semibold">
                  {activeNode.level}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[13px] font-mono text-moss">Score:</span>
                <span className="text-[16px] font-mono font-bold text-verdant-800">
                  {activeNode.score} / 100
                </span>
                {activeNode.status === 'verified' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-verdant-800 bg-verdant-100 px-2 py-0.5 rounded-full border border-verdant-200">
                    <CheckCircle2 className="w-3 h-3 text-verdant-700" strokeWidth={2.5} />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ember-700 bg-ember-100 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    In Progress
                  </span>
                )}
              </div>
            </div>

            <p className="text-[13px] text-moss mt-2.5 leading-relaxed">
              <strong className="text-ink">Rubric evidence: </strong>
              {activeNode.evidence}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono">
              {activeNode.details.map((detail, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-canvas border border-hairline text-moss flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-verdant-700" />
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List fallback view */
        <div className="space-y-2">
          {sampleNodes.map((node) => {
            const isSelected = activeNodeId === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={cn(
                  'w-full p-3 rounded-panel border text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer',
                  isSelected
                    ? 'bg-verdant-50 border-verdant-300 shadow-xs'
                    : 'bg-canvas border-hairline/80 hover:bg-mist'
                )}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-ink">{node.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-mist text-moss border border-hairline">
                      {node.level}
                    </span>
                  </div>
                  <span className="text-[12px] text-moss line-clamp-1 mt-0.5">{node.evidence}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="text-[13px] font-mono font-bold text-verdant-800">
                    {node.score} / 100
                  </span>
                  {node.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-verdant-800 bg-verdant-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-verdant-700" strokeWidth={2.5} />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ember-700 bg-ember-100 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      In Progress
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
