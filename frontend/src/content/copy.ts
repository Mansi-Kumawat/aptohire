// TODO(decision): the product brand phrase for blind matching is "zero-knowledge anonymized matchmaking".
// Keep it as one editable constant BRAND_BLIND_MATCHING_LABEL in content/copy.ts, used at most once on the page,
// always followed by plain-language explanation.
export const BRAND_BLIND_MATCHING_LABEL = 'zero-knowledge anonymized matchmaking';

export const COPY = {
  hero: {
    headline: 'Hired for what you can do.',
    lead: 'Build a real project, get it reviewed in minutes, and carry a skill scorecard employers can check.',
    ctaStudent: 'Start as a student',
    ctaHiring: 'I hire',
    reassurance: 'Free for students. Employers see skills, not names, until you say yes.',
  },
  howItWorks: {
    headline: 'How it works',
    lead: 'A transparent sequence from project code to consent-verified hiring.',
    steps: [
      {
        step: 1,
        title: 'Build',
        description: 'Pick a skill and get a real-world project at your level, or upload one you already built.',
      },
      {
        step: 2,
        title: 'Review',
        description: 'Submit your code, files and a 3-minute demo. Every score comes with the evidence behind it.',
      },
      {
        step: 3,
        title: 'Verify',
        description: 'Skills above 50 become Verified. Not happy with a result? Raise a ticket and a different reviewer decides.',
      },
      {
        step: 4,
        title: 'Get found',
        description: 'Organizations find your skills, not your name. You choose who gets to see more.',
      },
    ],
  },
  forStudents: {
    headline: 'For students',
    subheading: 'Show your craft with irrefutable evidence.',
    points: [
      {
        title: 'Projects at your level',
        description: 'Work on realistic problems tailored to your current stage, from introductory tasks to production architectures.',
      },
      {
        title: 'Evidence-linked scorecard',
        description: 'Every rubric score links to timestamps, repositories, and documentation. No hollow credentials.',
      },
      {
        title: 'One permanent profile',
        description: 'Follows you across universities, graduation, dropout, or further study, plus a downloadable resume with a QR code.',
      },
    ],
    independentNote: "Your university isn't on AptoHire yet? Your scores and job matches are not affected.",
    cta: 'Create your profile',
  },
  forUniversities: {
    headline: 'For universities',
    subheading: 'Evidence-driven insights into your student body.',
    copy: "See how your students are doing, which skills employers ask for that you don't yet supply, and where placements stand.",
    ctaApply: 'Apply for university access',
    ctaSignIn: 'University sign in',
  },
  forOrganizations: {
    headline: 'For organizations',
    subheading: 'Discover verified talent without noise or pedigree bias.',
    copy: "Post a job, read the skills it needs, and see ranked candidates with the reasons they match. Ask for access when you're ready; the student decides.",
    ctaApply: 'Request organization access',
    ctaSignIn: 'Organization sign in',
  },
  privacyPromise: {
    headline: 'Employers see skills, not names, until you say yes.',
    subheading: 'Zero unwanted outreach. Zero unsolicited screening.',
    steps: [
      {
        title: 'Request',
        desc: "An employer posts a job and sees anonymous profiles matching their rubric. They request access to your identity.",
      },
      {
        title: 'You decide',
        desc: "You review the organization's role, salary range, and company mission, then choose to accept or decline.",
      },
      {
        title: 'Reveal',
        desc: "Identity is revealed only after you accept. Withdraw access at any time from Sharing.",
      },
    ],
    protectionDetails: 'Before you accept, organizations never receive your name, email, photo, university name, or files.',
  },
  closingCta: {
    headline: 'Show what you can do.',
    lead: 'Join thousands of students and hiring teams building trust on verified work.',
    studentBtn: "I'm a student",
    universityBtn: "I'm a university",
    orgBtn: "I'm hiring",
  },
};
