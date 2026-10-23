import React, { useState } from 'react';
import { Seo } from '@/lib/seo';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  description: string;
  canonicalPath: string;
  toc: TocItem[];
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  description,
  canonicalPath,
  toc,
  children,
}) => {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  return (
    <div className="py-12 md:py-20 bg-canvas text-left">
      <Seo title={`${title} — AptoHire`} description={description} canonicalPath={canonicalPath} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Prototype draft banner */}
        <div className="mb-8 p-3.5 rounded-control bg-mist border border-hairline text-[14px] text-moss flex items-center gap-2.5 max-w-3xl">
          <AlertCircle className="w-4 h-4 text-moss shrink-0" strokeWidth={1.75} />
          <span>
            <strong>Prototype draft.</strong> Not yet reviewed by a lawyer.
          </span>
        </div>

        <div className="mb-10 max-w-3xl">
          <h1 className="text-display-l font-display font-bold text-ink">
            {title}
          </h1>
          <p className="text-[17px] text-moss mt-2">
            {description}
          </p>
        </div>

        {/* Mobile Collapsible TOC (below 1024px) */}
        <div className="block lg:hidden mb-8 border border-hairline rounded-panel p-4 bg-mist/50">
          <button
            type="button"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="flex items-center justify-between w-full text-left font-display font-semibold text-ink text-[16px] min-h-[44px]"
            aria-expanded={mobileTocOpen}
          >
            <span>On this page ({toc.length} sections)</span>
            {mobileTocOpen ? (
              <ChevronUp className="w-5 h-5 text-moss" />
            ) : (
              <ChevronDown className="w-5 h-5 text-moss" />
            )}
          </button>
          {mobileTocOpen && (
            <ul className="mt-3 space-y-2 pt-3 border-t border-hairline text-[14px] text-moss">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    className="block py-1 hover:text-verdant-700 transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Content Layout with Desktop Sticky TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main prose reading container (constrained to <= 68ch) */}
          <div className="lg:col-span-8 max-w-[68ch]">
            {children}
          </div>

          {/* Desktop Sticky TOC */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 pl-4 border-l border-hairline">
            <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold block mb-3">
              On this page
            </span>
            <ul className="space-y-2.5 text-[14px] text-moss">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-verdant-700 hover:underline block leading-snug transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
