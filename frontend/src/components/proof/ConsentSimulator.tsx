import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle2, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ConsentSimulator: React.FC = () => {
  const [granted, setGranted] = useState(false);

  return (
    <div className="mt-12 rounded-panel border border-hairline bg-canvas p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono uppercase tracking-wider text-verdant-800 font-semibold px-2 py-0.5 rounded bg-verdant-100">
              Interactive Simulation
            </span>
            <span className="text-[12px] font-mono text-moss">Zero-Knowledge Disclosure</span>
          </div>
          <h3 className="text-[20px] font-display font-bold text-ink mt-1">
            See how your identity remains protected
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {granted ? (
            <Button
              variant="secondary"
              onClick={() => setGranted(false)}
              className="text-[13px] min-h-[38px] px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Revoke access</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setGranted(true)}
              className="text-[13px] min-h-[38px] px-3.5 py-1.5 flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Simulate grant consent</span>
            </Button>
          )}
        </div>
      </div>

      {/* Before vs After Split Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recruiter view */}
        <div className="p-5 rounded-panel border border-hairline bg-mist/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold">
                What employer sees
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold flex items-center gap-1 ${
                  granted
                    ? 'bg-verdant-100 text-verdant-800'
                    : 'bg-canvas border border-hairline text-moss'
                }`}
              >
                {granted ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {granted ? 'Access Granted' : 'Shielded State'}
              </span>
            </div>

            <div className="space-y-2.5 text-[14px]">
              <div className="flex items-center justify-between p-2 rounded bg-canvas border border-hairline">
                <span className="text-moss">Name:</span>
                <span className="font-mono font-medium text-ink">
                  {granted ? 'Aditi Sharma' : '●●●●●●●● (Encrypted)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-canvas border border-hairline">
                <span className="text-moss">Email / Contact:</span>
                <span className="font-mono font-medium text-ink">
                  {granted ? 'aditi.s@alumni.edu' : '●●●●●@●●●.●●●'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-canvas border border-hairline">
                <span className="text-moss">Verified Skills:</span>
                <span className="font-mono font-semibold text-verdant-700">
                  TypeScript 92, Rust 88
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-canvas border border-hairline">
                <span className="text-moss">Credential Proof:</span>
                <span className="font-mono text-ink text-[12px]">0x9f1a...4bc2</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline/80 text-[12px] text-moss flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-verdant-700 shrink-0" />
            <span>
              {granted
                ? 'Identity revealed with time-bounded cryptographic token.'
                : 'Employer evaluates code artifacts strictly without demographic cues.'}
            </span>
          </div>
        </div>

        {/* Student control view */}
        <div className="p-5 rounded-panel border border-verdant-200 bg-verdant-50/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-mono uppercase tracking-wider text-verdant-900 font-semibold">
                Your consent controls
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-canvas border border-verdant-200 text-verdant-800 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-verdant-700" />
                Audit Logged
              </span>
            </div>

            <div className="p-3 rounded-panel bg-canvas border border-hairline space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-ink">Incoming Request</span>
                <span className="text-moss text-[11px]">2 mins ago</span>
              </div>
              <p className="text-[13px] text-moss">
                Engineering Director at <strong className="text-ink">Acme Labs</strong> requested full profile contact access for Senior Systems Engineer.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Button
                  variant={granted ? 'secondary' : 'primary'}
                  onClick={() => setGranted(!granted)}
                  className="w-full text-[13px] min-h-[38px] py-1.5"
                >
                  {granted ? 'Revoke Permission' : 'Approve & Reveal Details'}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-verdant-200/60 text-[12px] text-verdant-800 flex items-center gap-1">
            <span>You retain full sovereign ownership over your private data.</span>
            <ArrowRight className="w-3 h-3 ml-auto text-verdant-700" />
          </div>
        </div>
      </div>
    </div>
  );
};
