// TODO(decision): real prices are not yet finalized for production;
// price: null renders "Talk to us" for non-student plans after pilot.
export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string | null;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isExternalLink?: boolean;
  highlighted?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'students',
    name: 'Students',
    badge: 'Always free',
    price: '₹0',
    period: 'forever',
    description: 'Build real projects, earn verified scorecards, and connect directly with hiring organizations.',
    features: [
      'Unlimited skill project submissions',
      'AI rubric reviews with evidence links',
      'Downloadable resume with QR verification code',
      'Anonymous job matching with consent control',
      'Permanent profile spanning colleges and careers',
    ],
    ctaText: 'Start as a student',
    ctaLink: '/get-started?intent=student',
    highlighted: false,
  },
  {
    id: 'universities',
    name: 'Universities',
    badge: 'Pilot program',
    price: null, // "Talk to us"
    description: 'Placement cell and TPO analytics to track student progress and align curricula with employer demand.',
    features: [
      'Roster upload and automated verification',
      'Student skill breakdown & placement tracking',
      'Department and batch benchmark reports',
      'Real-time unmatched demand alerts',
      'Direct outreach for campus recruitment days',
    ],
    ctaText: 'Apply for university access',
    ctaLink: '/apply/university',
    highlighted: true,
  },
  {
    id: 'organizations',
    name: 'Organizations',
    badge: 'Pilot partners',
    price: null, // "Talk to us"
    description: 'Discover verified talent through zero-knowledge matchmaking based on real project code, not resumes.',
    features: [
      'Job posting with custom rubric weightings',
      'Ranked blind candidate feeds with match reasons',
      'Consent-governed identity unlock requests',
      'Candidate pipeline & interview tracking',
      'Direct contact with university TPO offices',
    ],
    ctaText: 'Request recruiter access',
    ctaLink: '/apply/organization',
    highlighted: false,
  },
];

export interface CapabilityRow {
  capability: string;
  students: boolean | string;
  universities: boolean | string;
  organizations: boolean | string;
}

export const COMPARISON_TABLE: CapabilityRow[] = [
  {
    capability: 'Skill verification rubric review',
    students: 'Included',
    universities: 'Included',
    organizations: 'Included',
  },
  {
    capability: 'QR verification resume',
    students: 'Included',
    universities: 'Included',
    organizations: 'Included',
  },
  {
    capability: 'Zero-knowledge blind candidate discovery',
    students: 'Included',
    universities: 'Not included',
    organizations: 'Included',
  },
  {
    capability: 'Institutional batch roster monitoring',
    students: 'Not included',
    universities: 'Included',
    organizations: 'Not included',
  },
  {
    capability: 'Curriculum demand gap signals',
    students: 'Not included',
    universities: 'Included',
    organizations: 'Included',
  },
  {
    capability: 'Consent-first candidate contact requests',
    students: 'Included',
    universities: 'Not included',
    organizations: 'Included',
  },
];
