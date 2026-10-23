import React, { useMemo } from 'react';
import { hashString, pseudoRandom } from '@/lib/hash';
import { cn } from '@/lib/cn';

interface AliasGlyphProps {
  alias: string;
  size?: number;
  className?: string;
}

export const AliasGlyph: React.FC<AliasGlyphProps> = ({ alias, size = 48, className }) => {
  const elements = useMemo(() => {
    const seed = hashString(alias);
    const rng = pseudoRandom(seed);

    // Palette colours: greens and oranges only
    const palette = [
      '#0E9F5B', // verdant-600
      '#34C98A', // verdant light
      '#8FE0B2', // verdant-300
      '#FF7A1A', // ember-500
      '#FFB470', // ember-300
    ];

    const shapes: Array<{
      type: 'circle' | 'arc';
      cx: number;
      cy: number;
      r: number;
      color: string;
      opacity: number;
      strokeWidth?: number;
    }> = [];

    // Generate 3-4 shapes
    const count = 3 + Math.floor(rng() * 2);

    for (let i = 0; i < count; i++) {
      const isArc = rng() > 0.5;
      const color = palette[Math.floor(rng() * palette.length)];
      const cx = 14 + rng() * 20; // 14 to 34 in 48x48 viewbox
      const cy = 14 + rng() * 20;
      const r = 8 + rng() * 12; // 8 to 20
      const opacity = 0.5 + rng() * 0.45; // 0.5 to 0.95

      if (isArc) {
        shapes.push({
          type: 'arc',
          cx,
          cy,
          r,
          color,
          opacity,
          strokeWidth: 2.5 + rng() * 2,
        });
      } else {
        shapes.push({
          type: 'circle',
          cx,
          cy,
          r,
          color,
          opacity,
        });
      }
    }

    return shapes;
  }, [alias]);

  return (
    <div
      className={cn(
        'rounded-control bg-mist border border-hairline overflow-hidden flex items-center justify-center shrink-0 select-none',
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {elements.map((shape, idx) => {
          if (shape.type === 'circle') {
            return (
              <circle
                key={idx}
                cx={shape.cx}
                cy={shape.cy}
                r={shape.r}
                fill={shape.color}
                fillOpacity={shape.opacity}
              />
            );
          }
          return (
            <circle
              key={idx}
              cx={shape.cx}
              cy={shape.cy}
              r={shape.r}
              stroke={shape.color}
              strokeWidth={shape.strokeWidth}
              strokeOpacity={shape.opacity}
              strokeDasharray="14 6"
              fill="none"
            />
          );
        })}
      </svg>
    </div>
  );
};
