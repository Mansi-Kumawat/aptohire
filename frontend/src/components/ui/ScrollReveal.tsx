import React from 'react';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/cn';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
  threshold = 0.15,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce: true,
  });

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-6';
      case 'down':
        return '-translate-y-6';
      case 'left':
        return 'translate-x-6';
      case 'right':
        return '-translate-x-6';
      case 'none':
      default:
        return '';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClass()}`,
        className
      )}
    >
      {children}
    </div>
  );
};
