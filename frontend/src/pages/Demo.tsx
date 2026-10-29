import React from 'react';
import { Seo } from '@/lib/seo';
import { portalUrl } from '@/config/portals';
import { Link } from 'react-router-dom';
import { ExternalLink, Copy, Check } from 'lucide-react';

const DEMO_STEPS = [
  { step: 1, title: 'Admin approves University C', desc: 'Institutional vetting ensures legitimate student affiliation rosters.' },
  { step: 2, title: 'Aarav (Uni A) signs in', desc: 'Aarav signs in on the student site and selects a React skill project challenge.' },
  { step: 3, title: 'Project submission & AI review', desc: 'Aarav submits repository code and a 3-minute video; receives an evidence-backed scorecard.' },
  { step: 4, title: 'Organization A posts a job', desc: 'Recruiter posts role criteria and receives an anonymous, ranked candidate list with match reasons.' },
  { step: 5, title: 'Access request & identity reveal', desc: 'Organization A requests access; Aarav reviews company details and accepts; identity is revealed.' },
  { step: 6, title: 'University analytics & unmatched demand', desc: 'University A placement cell inspects batch performance and notices demand for Next.js.' },
  { step: 7, title: 'Resume download & QR verification', desc: 'Aarav generates a verified digital resume and scans the QR code to open the public verification page.' },
  { step: 8, title: 'Lifelong portable profile', desc: 'Avi and Niya transfer institutions; their verified skill scores and evidence remain intact.' },
];

const DEMO_ACCOUNTS = [
  { role: 'Platform Admin', email: 'admin@demo.aptohire.test', note: 'System management (internal portal)' },
  { role: 'Student (Uni A)', email: 'aarav@unia.edu.test', note: 'Frontend specialist with verified scorecard' },
  { role: 'Student (Independent)', email: 'naman@demo.aptohire.test', note: 'Self-registered student without campus roster' },
  { role: 'Student (Alumnus)', email: 'avi@demo.aptohire.test', note: 'Graduated student with multi-year skill history' },
  { role: 'University TPO (Uni A)', email: 'tpo@unia.edu.test', note: 'Placement director monitoring batch metrics' },
  { role: 'Lead Recruiter (Org A)', email: 'recruiter@orga.demo.test', note: 'Enterprise talent recruiter evaluating candidates' },
  { role: 'Hiring Manager (Org B)', email: 'recruiter@orgb.demo.test', note: 'Startup engineering lead' },
];

const SAMPLE_CREDENTIAL_IDS = [
  { id: '9efdf52c1c90863fa1', label: 'Full Credential (Aarav S. · Uni A Roster · 3 Verified Skills)' },
  { id: 'dacbbe92e479be681c', label: 'Levels Only (Anonymous · No Scores Shared)' },
  { id: 'd0cc59fd5f27fec869', label: 'Empty State (Student shares no skills publicly)' },
  { id: '206790fbf3866c773a', label: 'Unverified Affiliation (Self-reported college chip)' },
  { id: 'e5f6a7b8c9d0e1f2a3', label: 'Rate-Limit Test (Returns 429 Retry-After)' },
];

export const Demo: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 1500);
  };

  return (
    <div className="py-12 md:py-20 bg-canvas text-left">
      <Seo
        title="Demo guide — AptoHire"
        description="Structured walkthrough guide, fictional test accounts, and sample credentials for product presentations."
        canonicalPath="/demo"
        noIndex={true}
      />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-12">
        <div>
          <span className="text-[12px] font-mono uppercase tracking-wider text-ember-700 font-semibold px-2.5 py-1 rounded bg-ember-50 border border-ember-100 inline-block mb-3">
            Demo guide & presentation script
          </span>
          <h1 className="text-display-l font-display font-bold text-ink">
            AptoHire walkthrough guide
          </h1>
          <p className="text-[17px] text-moss mt-2">
            A 5–7 minute narrative script to demonstrate the full end-to-end skill verification and consent-first hiring cycle.
          </p>
        </div>

        {/* Portals launchpad */}
        <div className="rounded-panel border border-hairline bg-mist/50 p-6">
          <h2 className="text-[18px] font-display font-bold text-ink mb-4">
            Portal environments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={portalUrl('student')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-control border border-hairline bg-canvas hover:bg-mist transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-ink text-[15px] block">Student Portal</span>
                <span className="text-[13px] text-moss">student.aptohire.com</span>
              </div>
              <ExternalLink className="w-4 h-4 text-moss" />
            </a>

            <a
              href={portalUrl('university')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-control border border-hairline bg-canvas hover:bg-mist transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-ink text-[15px] block">University Portal</span>
                <span className="text-[13px] text-moss">university.aptohire.com</span>
              </div>
              <ExternalLink className="w-4 h-4 text-moss" />
            </a>

            <a
              href={portalUrl('organization')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-control border border-hairline bg-canvas hover:bg-mist transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-ink text-[15px] block">Organization Portal</span>
                <span className="text-[13px] text-moss">organization.aptohire.com</span>
              </div>
              <ExternalLink className="w-4 h-4 text-moss" />
            </a>
          </div>
        </div>

        {/* 5-7 minute demo script */}
        <div>
          <h2 className="text-[22px] font-display font-bold text-ink mb-6">
            5–7 minute demonstration script
          </h2>
          <div className="space-y-4">
            {DEMO_STEPS.map((s) => (
              <div key={s.step} className="p-4 rounded-control border border-hairline bg-canvas flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-verdant-100 text-verdant-800 font-mono font-bold text-[14px] flex items-center justify-center shrink-0 mt-0.5">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-[16px] text-ink">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-moss mt-0.5">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo accounts */}
        <div>
          <h2 className="text-[22px] font-display font-bold text-ink mb-2">
            Fictional demo accounts
          </h2>
          <p className="text-[14px] text-moss mb-4">
            The shared demo password is in the project&apos;s <code>.env.example</code> file.
          </p>

          <div className="divide-y divide-hairline border border-hairline rounded-panel bg-canvas overflow-hidden">
            {DEMO_ACCOUNTS.map((acc, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink text-[15px]">{acc.role}</span>
                    <span className="font-mono text-[13px] text-moss">({acc.email})</span>
                  </div>
                  <span className="text-[13px] text-moss">{acc.note}</span>
                </div>

                <button
                  type="button"
                  onClick={() => copyEmail(acc.email)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control border border-hairline bg-canvas hover:bg-mist text-[13px] font-medium text-ink self-start sm:self-center min-h-[44px] md:min-h-[36px]"
                >
                  {copiedEmail === acc.email ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-verdant-700" />
                      <span className="text-verdant-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-moss" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Credential links */}
        <div>
          <h2 className="text-[22px] font-display font-bold text-ink mb-4">
            Sample public credential fixtures
          </h2>
          <div className="space-y-2">
            {SAMPLE_CREDENTIAL_IDS.map((item) => (
              <Link
                key={item.id}
                to={`/verify/${item.id}`}
                className="p-3.5 rounded-control border border-hairline bg-canvas hover:bg-mist transition-colors flex items-center justify-between block"
              >
                <div>
                  <span className="font-mono text-[14px] text-verdant-700 font-semibold block">
                    {item.id}
                  </span>
                  <span className="text-[13px] text-moss">{item.label}</span>
                </div>
                <span className="text-[14px] text-verdant-700 font-medium">Verify →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
