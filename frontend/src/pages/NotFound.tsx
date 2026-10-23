import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/lib/seo';
import { SealMark } from '@/components/brand/SealMark';
import { Button } from '@/components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="py-20 md:py-32 bg-mist min-h-[calc(100vh-64px)] flex items-center justify-center text-center">
      <Seo title="Page not found — AptoHire" noIndex={true} />

      <div className="max-w-md mx-auto px-4 space-y-6">
        <div className="flex justify-center">
          <SealMark size={48} />
        </div>

        <h1 className="text-[32px] font-display font-bold text-ink">
          404
        </h1>

        <p className="text-[17px] text-moss">
          That page doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" fullWidth className="sm:w-auto">
              Go home
            </Button>
          </Link>
          <Link to="/verify" className="w-full sm:w-auto">
            <Button variant="secondary" fullWidth className="sm:w-auto">
              Check a credential
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
