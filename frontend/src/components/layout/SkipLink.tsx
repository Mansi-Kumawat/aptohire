import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-verdant-700 focus:text-canvas focus:rounded-control focus:shadow-modal focus:font-semibold text-[14px]"
    >
      Skip to content
    </a>
  );
};
