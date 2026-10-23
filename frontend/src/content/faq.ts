import { env } from '@/config/env';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export function getFaqItems(): FaqItem[] {
  const items: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What makes a skill Verified?',
      answer:
        'A review score above 50. Scores from 40 to 60 are also checked by a person before they are shared with organizations.',
    },
    {
      id: 'faq-2',
      question: 'Who sees my demo video and files?',
      answer:
        'Only you, plus reviewers when needed. Organizations never see raw files before you accept a request, and only the parts you choose to share afterwards.',
    },
    {
      id: 'faq-3',
      question: 'What if I disagree with my score?',
      answer:
        'Raise a ticket from the scorecard. A different reviewer looks at it and records the decision.',
    },
    {
      id: 'faq-4',
      question: 'Do I need my university to be on AptoHire?',
      answer:
        'No. You can register with a university email, with a student ID check, or without either. Scores and job access are the same.',
    },
    {
      id: 'faq-5',
      question: 'Does AI decide everything?',
      answer:
        'AI does the first review. Identity, consent, permissions and verification status follow fixed rules, and borderline results go to a person. Read the AI and fairness statement.',
    },
    {
      id: 'faq-6',
      question: 'Is it free?',
      answer:
        'Free for students. See pricing for universities and organizations.',
    },
  ];

  // Show only when not in production
  if (env.VITE_APP_ENV !== 'production') {
    items.push({
      id: 'faq-7',
      question: 'Is this real data?',
      answer:
        'This is a prototype. All profiles, universities and organizations shown are fictional.',
    });
  }

  return items;
}
