import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { FileCode, Video, FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface EvidenceData {
  type: 'code' | 'video' | 'document' | 'link';
  label: string;
  title: string;
  preview: string;
  timestamp?: string;
  lineNumbers?: boolean;
}

interface EvidenceChipProps {
  evidence: EvidenceData;
  className?: string;
}

export const EvidenceChip: React.FC<EvidenceChipProps> = ({ evidence, className }) => {
  const getIcon = () => {
    switch (evidence.type) {
      case 'code':
        return <FileCode className="w-3.5 h-3.5 text-moss" strokeWidth={1.75} />;
      case 'video':
        return <Video className="w-3.5 h-3.5 text-ember-700" strokeWidth={1.75} />;
      case 'document':
        return <FileText className="w-3.5 h-3.5 text-moss" strokeWidth={1.75} />;
      case 'link':
        return <ExternalLink className="w-3.5 h-3.5 text-verdant-700" strokeWidth={1.75} />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`View evidence for ${evidence.label}`}
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] md:min-h-[36px] rounded-control border border-hairline bg-canvas text-[13px] font-mono text-ink transition-colors hover:bg-mist hover:border-moss/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verdant-700 cursor-pointer',
            className
          )}
        >
          {getIcon()}
          <span>{evidence.label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-3.5 text-left">
        <div className="flex items-center justify-between border-b border-hairline pb-2 mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-moss font-semibold">
            Sample evidence
          </span>
          <span className="text-[12px] text-moss">
            {evidence.type === 'video' ? 'Timestamp' : 'Verified source'}
          </span>
        </div>

        <h4 className="text-[14px] font-display font-semibold text-ink mb-1.5">
          {evidence.title}
        </h4>

        {evidence.type === 'video' ? (
          <div className="bg-mist p-2.5 rounded-control border border-hairline text-[13px] text-ink flex items-center gap-2">
            <Video className="w-4 h-4 text-ember-700 shrink-0" strokeWidth={1.75} />
            <div>
              <p className="font-medium">{evidence.preview}</p>
              {evidence.timestamp && (
                <p className="text-[12px] text-moss mt-0.5">At mark {evidence.timestamp}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-mist rounded-control p-2.5 border border-hairline overflow-x-auto max-h-48 text-[12px] font-mono text-ink leading-relaxed">
            <pre className="whitespace-pre-wrap font-mono">{evidence.preview}</pre>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
