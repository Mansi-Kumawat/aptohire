import React from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApplicationConfirmationProps {
  type: 'university' | 'organization';
  reference: string;
  portalActionUrl?: string;
}

export const ApplicationConfirmation: React.FC<ApplicationConfirmationProps> = ({
  type,
  reference,
  portalActionUrl,
}) => {
  return (
    <div className="bg-canvas border border-hairline rounded-panel p-6 sm:p-8 shadow-float text-left space-y-6">
      {/* Top Banner with Seal */}
      <div className="flex items-center gap-3 pb-4 border-b border-hairline">
        <div className="w-12 h-12 rounded-full bg-verdant-100 flex items-center justify-center text-verdant-800 shrink-0">
          <CheckCircle2 className="w-6 h-6" strokeWidth={2} />
        </div>
        <div>
          <span className="text-[12px] font-mono text-moss uppercase tracking-wider font-semibold">
            Application received
          </span>
          <h2 className="text-[22px] font-display font-bold text-ink">
            {type === 'university'
              ? 'University access application submitted'
              : 'Recruiter access request submitted'}
          </h2>
        </div>
      </div>

      {/* Reference number box */}
      <div className="p-4 rounded-control bg-mist border border-hairline space-y-2">
        <span className="text-[13px] font-medium text-moss block">
          Your application reference number:
        </span>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[20px] font-bold text-ink tracking-wide select-all">
            {reference}
          </span>
          <CopyButton value={reference} label="Copy reference" />
        </div>
      </div>

      {/* What happens next in 3 plain steps */}
      <div className="space-y-3">
        <h3 className="text-[16px] font-display font-bold text-ink">
          What happens next
        </h3>
        <ol className="space-y-2.5 text-[15px] text-moss list-decimal pl-5 leading-relaxed">
          <li>
            <strong className="text-ink font-medium">We review your application:</strong> Our team verifies your institutional accreditation or corporate identity within 1–2 business days.
          </li>
          <li>
            <strong className="text-ink font-medium">You get an email when it is approved:</strong> You will receive a direct invitation link at your registered official email address.
          </li>
          <li>
            <strong className="text-ink font-medium">Then you can sign in:</strong> Access your institutional portal and begin managing student rosters or reviewing blind candidates.
          </li>
        </ol>
      </div>

      {/* Action button */}
      <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row gap-3">
        {type === 'university' && portalActionUrl ? (
          // TODO(decision): for universities the secondary button is "Create your university account" linking to portalUrl('university', '/signup?ref=AH-…')
          <a href={portalActionUrl} rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" fullWidth className="sm:w-auto">
              <span>Create your university account</span>
              <ArrowRight className="w-4 h-4 ml-1.5" strokeWidth={1.75} />
            </Button>
          </a>
        ) : (
          // TODO(decision): for organizations the button is "Back to home"
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="secondary" fullWidth className="sm:w-auto">
              Back to home
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
