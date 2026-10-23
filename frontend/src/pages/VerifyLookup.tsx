import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { extractCredentialId } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Seo } from '@/lib/seo';
import { ShieldCheck, Search, AlertCircle } from 'lucide-react';

export const VerifyLookup: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const extracted = extractCredentialId(inputValue);
    if (!extracted) {
      setError('Credential IDs are 18 characters, 0–9 and a–f.');
      return;
    }

    navigate(`/verify/${extracted}`);
  };

  return (
    <div className="py-16 md:py-24 bg-mist min-h-[calc(100vh-64px)] flex items-center justify-center">
      <Seo
        title="Check a credential — AptoHire"
        description="Verify an AptoHire skill credential. Check verified skills, rubric scores, and authentic project evidence."
        canonicalPath="/verify"
        noIndex={true}
      />

      <div className="w-full max-w-lg mx-auto px-4">
        <div className="bg-canvas border border-hairline rounded-panel p-6 sm:p-8 shadow-float text-left">
          {/* Header icon + titles */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-control bg-verdant-50 border border-verdant-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-verdant-700" strokeWidth={1.75} />
            </div>
            <div>
              <h1 className="text-[24px] font-display font-bold text-ink leading-tight">
                Check a credential
              </h1>
              <p className="text-[14px] text-moss mt-0.5">
                Verify authentic skills and evidence links.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="credential-id-input" className="block text-[15px] font-medium text-ink mb-1.5">
                Credential ID
              </label>
              <div className="relative">
                <Input
                  id="credential-id-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. a1b2c3d4e5f6a7b8c9"
                  hasError={Boolean(error)}
                  className="font-mono text-[15px] pr-10"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-moss">
                  <Search className="w-4 h-4" strokeWidth={1.75} />
                </div>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="text-[14px] text-danger-600 flex items-center gap-1.5 font-medium mt-1.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>{error}</span>
                </p>
              ) : (
                <p className="text-[14px] text-moss mt-1.5">
                  Find the ID under the QR code on a student&apos;s resume.
                </p>
              )}
            </div>

            <Button type="submit" variant="primary" fullWidth className="mt-4">
              Check credential
            </Button>
          </form>

          {/* Sample quick links for demo mode */}
          <div className="mt-8 pt-6 border-t border-hairline">
            <span className="text-[12px] font-mono text-moss uppercase tracking-wider block mb-2 font-semibold">
              Sample credentials (for testing)
            </span>
            <div className="space-y-1 text-[13px] font-mono">
              <div>
                <Link
                  to="/verify/a1b2c3d4e5f6a7b8c9"
                  className="text-verdant-700 hover:underline block py-1"
                >
                  a1b2c3d4e5f6a7b8c9 (Full with scores)
                </Link>
              </div>
              <div>
                <Link
                  to="/verify/b2c3d4e5f6a7b8c9d0"
                  className="text-verdant-700 hover:underline block py-1"
                >
                  b2c3d4e5f6a7b8c9d0 (Levels only)
                </Link>
              </div>
              <div>
                <Link
                  to="/verify/c3d4e5f6a7b8c9d0e1"
                  className="text-verdant-700 hover:underline block py-1"
                >
                  c3d4e5f6a7b8c9d0e1 (Nothing shared)
                </Link>
              </div>
              <div>
                <Link
                  to="/verify/d4e5f6a7b8c9d0e1f2"
                  className="text-verdant-700 hover:underline block py-1"
                >
                  d4e5f6a7b8c9d0e1f2 (Unverified university)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
