import React from 'react';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { TermsContent } from '@/content/legal/TermsContent';

const termsToc = [
  { id: 'acceptable-use', title: '1. Acceptable use' },
  { id: 'prototype-nature', title: '2. Prototype and demo nature' },
  { id: 'score-disclaimer', title: '3. Nature of review scores and credentials' },
  { id: 'termination', title: '4. Modifications and suspension' },
  { id: 'contact', title: '5. Contact' },
];

export const Terms: React.FC = () => {
  return (
    <LegalPageLayout
      title="Terms of use"
      description="Terms governing the use of the AptoHire public website, credential verification, and institutional access."
      canonicalPath="/terms"
      toc={termsToc}
    >
      <TermsContent />
    </LegalPageLayout>
  );
};
