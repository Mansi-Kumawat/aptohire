import type { CandidateSampleData } from '@/components/proof/CandidateCardPreview';

export const sampleCandidates: CandidateSampleData[] = [
  {
    alias: 'Candidate K7F2',
    category: 'Tier 2 · State university',
    matchScore: 94,
    matchWord: 'Strong match',
    confidence: 'High confidence',
    skills: [
      { name: 'React', level: 'Proficient' },
      { name: 'TypeScript', level: 'Proficient' },
      { name: 'REST APIs', level: 'Competent' },
    ],
    reason: 'Demonstrated complex cart state management and rigorous edge-case unit testing in submitted e-commerce build.',
  },
  {
    alias: 'Candidate M3Q8',
    category: 'Tier 3 · Private institute',
    matchScore: 89,
    matchWord: 'Strong match',
    confidence: 'High confidence',
    skills: [
      { name: 'Node.js', level: 'Proficient' },
      { name: 'PostgreSQL', level: 'Proficient' },
      { name: 'Docker', level: 'Competent' },
    ],
    reason: 'Verified async pipeline architecture with benchmarked concurrency handling in audit test suite.',
  },
  {
    alias: 'Candidate T9R4',
    category: 'Autonomous technical college',
    matchScore: 81,
    matchWord: 'Good match',
    confidence: 'Medium confidence',
    skills: [
      { name: 'Frontend Architecture', level: 'Competent' },
      { name: 'Tailwind CSS', level: 'Proficient' },
      { name: 'Accessibility', level: 'Competent' },
    ],
    reason: 'Accessible UI component library built to WCAG 2.2 AA standards with full keyboard navigation proof.',
  },
];
