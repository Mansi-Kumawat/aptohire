import React, { useId } from 'react';
import { PASS_MARK, levelFor } from '@/lib/scoring';
import { useCountUp } from '@/lib/hooks/useCountUp';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/cn';
import { CheckCircle2 } from 'lucide-react';

export type ProofRingState = 'verified' | 'not-verified' | 'under-review' | 'loading';
export type ProofRingSize = 56 | 96 | 110 | 120 | 160 | 240 | number;

export interface ProofRingProps {
  score: number | null;
  skill: string;
  state?: ProofRingState;
  size?: ProofRingSize;
  level?: string;
  animate?: boolean;
  showCaption?: boolean;
  passMark?: number;
  className?: string;
}

export function buildProofRingAriaLabel(
  skill: string,
  score: number | null,
  level: string,
  state: ProofRingState
): string {
  if (state === 'loading') {
    return `${skill}, score loading`;
  }
  if (state === 'under-review') {
    return `${skill}, score under review, ${level}`;
  }
  const verifiedStr = state === 'verified' ? ', verified' : ', not verified yet';
  return `${skill}, score ${score ?? 0} of 100, ${level}${verifiedStr}`;
}

export function buildProofRingCaption(
  state: ProofRingState,
  level: string,
  score: number | null,
  passMark = PASS_MARK
): string {
  if (state === 'loading') return 'Assessing skill…';
  if (state === 'under-review') return 'Under human review';
  if (state === 'verified') return `Verified · ${level}`;

  const currentScore = score ?? 0;
  const pointsRemaining = Math.max(1, passMark + 1 - currentScore);
  return `Not verified yet · ${pointsRemaining} points to go`;
}

export const ProofRing: React.FC<ProofRingProps> = ({
  score,
  skill,
  state: explicitState,
  size = 240,
  level: explicitLevel,
  animate = true,
  showCaption = true,
  passMark = PASS_MARK,
  className,
}) => {
  const [containerRef, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
    triggerOnce: true,
  });

  const rawScore = score !== null ? Math.max(0, Math.min(100, score)) : null;
  const computedLevel = explicitLevel || (rawScore !== null ? levelFor(rawScore) : 'Emerging');

  // Derive state if not explicitly passed
  const state: ProofRingState =
    explicitState ||
    (rawScore === null
      ? 'loading'
      : rawScore > passMark
      ? 'verified'
      : 'not-verified');

  const gradientId = useId();

  // Animated score counter (syncs with 900ms stroke animation)
  const animatedScore = useCountUp({
    start: 0,
    end: rawScore ?? 0,
    duration: 900,
    enabled: animate && isVisible && state !== 'loading',
  });

  const displayScore = animate && isVisible ? animatedScore : rawScore ?? 0;

  // Geometry calculations
  const strokeWidth = (size / 240) * 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressFraction = (animate && !isVisible ? 0 : displayScore) / 100;
  const strokeDashoffset = circumference * (1 - progressFraction);

  const ariaLabel = buildProofRingAriaLabel(skill, rawScore, computedLevel, state);
  const caption = buildProofRingCaption(state, computedLevel, rawScore, passMark);

  // Scaled typography
  const scoreTextSize =
    size >= 200
      ? 'text-[64px]'
      : size >= 150
      ? 'text-[40px]'
      : size >= 110
      ? 'text-[32px]'
      : size >= 80
      ? 'text-[22px]'
      : 'text-[15px]';
  const captionTextSize =
    size >= 200 ? 'text-[14px]' : size >= 130 ? 'text-[12px]' : 'text-[11px]';
  const sealSize = (size / 240) * 40;

  // Notch at passMark (50% = bottom, 6 o'clock)
  const notchAngle = (passMark / 100) * 360 - 90;
  const notchRad = (notchAngle * Math.PI) / 180;
  const notchLength = strokeWidth * 0.7;
  const notchX1 = size / 2 + (radius - notchLength / 2) * Math.cos(notchRad);
  const notchY1 = size / 2 + (radius - notchLength / 2) * Math.sin(notchRad);
  const notchX2 = size / 2 + (radius + notchLength / 2) * Math.cos(notchRad);
  const notchY2 = size / 2 + (radius + notchLength / 2) * Math.sin(notchRad);

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex flex-col items-center justify-center select-none', className)}
      role="img"
      aria-label={ariaLabel}
      style={{ width: size, height: showCaption ? size + (size >= 160 ? 36 : 24) : size }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          aria-hidden="true"
        >
          <defs>
            {/* Smooth 4-stop brand gradient */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A1A" />
              <stop offset="30%" stopColor="#FFB470" />
              <stop offset="60%" stopColor="#8FE0B2" />
              <stop offset="100%" stopColor="#0E9F5B" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--hairline)"
            strokeWidth={strokeWidth}
            className={state === 'loading' ? 'animate-pulse' : ''}
          />

          {/* Pass mark notch */}
          <line
            x1={notchX1}
            y1={notchY1}
            x2={notchX2}
            y2={notchY2}
            stroke="var(--moss)"
            strokeWidth={Math.max(1.5, strokeWidth * 0.2)}
            strokeLinecap="round"
            opacity={0.6}
          />

          {/* Active progress arc */}
          {state !== 'loading' && rawScore !== null && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={
                state === 'not-verified'
                  ? 'var(--ember-500)'
                  : state === 'under-review'
                  ? 'var(--ember-300)'
                  : `url(#${gradientId})`
              }
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: animate ? 'stroke-dashoffset 900ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
              }}
            />
          )}
        </svg>

        {/* Centre Score & Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {state === 'loading' ? (
            <div className="w-8 h-8 rounded-full border-2 border-verdant-600 border-t-transparent animate-spin" />
          ) : (
            <span
              className={cn(
                'font-display font-semibold text-ink leading-none tracking-tight tabular-nums',
                scoreTextSize
              )}
            >
              {displayScore}
            </span>
          )}
          {size >= 160 && state !== 'loading' && (
            <span className="text-[13px] font-medium text-moss mt-1">
              / 100
            </span>
          )}
        </div>

        {/* Top-right Verified Seal with green tick icon */}
        {state === 'verified' && (
          <div
            className={cn(
              'absolute top-0 right-1 transform translate-x-1 -translate-y-1 transition-transform duration-base rounded-full bg-canvas flex items-center justify-center shadow-xs',
              animate && isVisible ? 'scale-100 opacity-100 delay-700' : 'scale-100 opacity-100'
            )}
            style={{ width: sealSize, height: sealSize }}
          >
            <CheckCircle2 className="w-full h-full text-verdant-700 fill-verdant-100" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Caption beneath */}
      {showCaption && (
        <div className="mt-2 text-center pointer-events-none">
          <p className={cn('font-medium text-ink leading-snug', captionTextSize)}>
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};
