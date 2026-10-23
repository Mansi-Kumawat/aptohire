import React from 'react';
import { SealMark } from './SealMark';

interface LogoProps {
  variant?: 'default' | 'inverted';
  showMark?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  showMark = true,
  className = '',
  size = 'md',
}) => {
  const isDefault = variant === 'default';

  // Heights for responsive logo display
  const imgHeight =
    size === 'sm'
      ? 'h-[26px]'
      : size === 'lg'
      ? 'h-[36px]'
      : 'h-[30px]';

  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      translate="no"
    >
      {isDefault ? (
        <img
          src="/logo.svg"
          alt="AptoHire"
          className={`${imgHeight} w-auto object-contain shrink-0`}
          loading="eager"
        />
      ) : (
        /* Inverted variant fallback: crisp mark + white text */
        <span className="inline-flex items-center gap-2 font-display font-bold text-2xl text-canvas tracking-tight">
          {showMark && <SealMark size={size === 'sm' ? 22 : size === 'lg' ? 32 : 26} variant="inverted" />}
          <span className="inline-flex items-baseline">
            <span>AptoH</span>
            <span className="relative inline-block mx-[0.5px]">
              <span className="opacity-0 select-none">i</span>
              <span className="absolute bottom-[0.14em] left-1/2 -translate-x-1/2 w-[0.15em] h-[0.52em] rounded-[1px] bg-canvas" />
              <span className="absolute top-[0.14em] left-1/2 -translate-x-1/2 w-[0.24em] h-[0.24em] rounded-full bg-verdant-300 shadow-sm" />
            </span>
            <span>re</span>
          </span>
        </span>
      )}
      <span className="sr-only">AptoHire</span>
    </span>
  );
};
