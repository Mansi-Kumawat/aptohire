import React from 'react';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { PrivacyContent } from '@/content/legal/PrivacyContent';

const privacyToc = [
  { id: 'overview', title: '1. Overview and data philosophy' },
  { id: 'what-we-collect', title: '2. Information collected on this site' },
  { id: 'student-principles', title: '3. Student data protection principles' },
  { id: 'data-retention', title: '4. Retention and deletion policies' },
  { id: 'demo-environment', title: '5. Prototype and demonstration environments' },
  { id: 'contact', title: '6. Contact and data rights inquiries' },
];

export const Privacy: React.FC = () => {
  return (
    <LegalPageLayout
      title="Privacy policy"
      description="How AptoHire safeguards candidate identity, limits collection, and enforces consent-first access."
      canonicalPath="/privacy"
      toc={privacyToc}
    >
      <PrivacyContent />
    </LegalPageLayout>
  );
};
