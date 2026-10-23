import React from 'react';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { AiFairnessContent } from '@/content/legal/AiFairnessContent';

const aiFairnessToc = [
  { id: 'work-first', title: '1. Work-first evaluation' },
  { id: 'audio-video-boundaries', title: '2. Strict limits on video and presentation scoring' },
  { id: 'ai-transparency', title: '3. Transparent use of AI tools' },
  { id: 'missing-evidence', title: '4. Confidence scoring over punitive deductions' },
  { id: 'human-in-the-loop', title: '5. Human-in-the-loop audit for borderline scores' },
  { id: 'appeals', title: '6. Student rights and score appeals' },
  { id: 'deterministic-rules', title: '7. Rule-based identity and consent' },
  { id: 'contact', title: '8. Questions or bias reporting' },
];

export const AiFairness: React.FC = () => {
  return (
    <LegalPageLayout
      title="AI & fairness statement"
      description="Our transparent commitment to objective, artifact-first evaluation and bias prevention."
      canonicalPath="/ai-and-fairness"
      toc={aiFairnessToc}
    >
      <AiFairnessContent />
    </LegalPageLayout>
  );
};
