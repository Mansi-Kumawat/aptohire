import { useState, useEffect } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number; // ms
  enabled?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 900,
  enabled = true,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(start);

  useEffect(() => {
    // If not enabled or user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!enabled || prefersReducedMotion) {
      setValue(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(start + (end - start) * easedProgress);

      setValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [start, end, duration, enabled]);

  return value;
}
