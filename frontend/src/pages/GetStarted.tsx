import React, { useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Seo } from '@/lib/seo';
import { portalUrl } from '@/config/portals';
import { Button } from '@/components/ui/Button';
import { GraduationCap, School, Building2, ArrowRight, ExternalLink } from 'lucide-react';

export const GetStarted: React.FC = () => {
  const [searchParams] = useSearchParams();
  const intent = searchParams.get('intent');

  const studentRef = useRef<HTMLDivElement>(null);
  const universityRef = useRef<HTMLDivElement>(null);
  const organizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (intent === 'student') {
      studentRef.current?.focus();
    } else if (intent === 'university') {
      universityRef.current?.focus();
    } else if (intent === 'organization' || intent === 'hiring') {
      organizationRef.current?.focus();
    }
  }, [intent]);

  const panels = [
    {
      id: 'student',
      title: 'Students & Early Career',
      ref: studentRef,
      tagline: 'Prove your skills on real projects. Build a portable, verified skill profile.',
      icon: <GraduationCap className="w-6 h-6 text-verdant-700" strokeWidth={1.75} />,
      createLabel: 'Start as a student',
      createHref: portalUrl('student', '/signup'),
      isExternalCreate: true,
      loginHref: portalUrl('student', '/login'),
      isHighlighted: intent === 'student',
    },
    {
      id: 'university',
      title: 'Universities & Placement Cells',
      ref: universityRef,
      tagline: 'Track student placement readiness, identify curriculum gaps, and verify rosters.',
      icon: <School className="w-6 h-6 text-verdant-700" strokeWidth={1.75} />,
      createLabel: 'Apply for university access',
      createHref: '/apply/university',
      isExternalCreate: false,
      loginHref: portalUrl('university', '/login'),
      isHighlighted: intent === 'university',
    },
    {
      id: 'organization',
      title: 'Organizations & Recruiters',
      ref: organizationRef,
      tagline: 'Discover verified engineering talent without resumes. Blind search with direct evidence.',
      icon: <Building2 className="w-6 h-6 text-verdant-700" strokeWidth={1.75} />,
      createLabel: 'Request organization access',
      createHref: '/apply/organization',
      isExternalCreate: false,
      loginHref: portalUrl('organization', '/login'),
      isHighlighted: intent === 'organization' || intent === 'hiring',
    },
  ];

  return (
    <div className="py-12 md:py-24 bg-mist min-h-[calc(100vh-64px)] text-left">
      <Seo
        title="Where do you want to start? — AptoHire"
        description="Choose your portal: Students prove skills, universities track placement readiness, and organizations discover verified talent."
        canonicalPath="/get-started"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold px-2.5 py-1 rounded bg-canvas border border-hairline inline-block mb-3">
            Chooser
          </span>
          <h1 className="text-display-l font-display font-bold text-ink">
            Where do you want to start?
          </h1>
          <p className="text-[17px] text-moss mt-2">
            Select the portal designed for your role in the skill-verification ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {panels.map((p) => (
            <div
              key={p.id}
              ref={p.ref}
              tabIndex={p.isHighlighted ? -1 : undefined}
              className={`rounded-panel border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-canvas outline-none ${
                p.isHighlighted
                  ? 'border-verdant-700 ring-2 ring-verdant-700 shadow-modal'
                  : 'border-hairline shadow-sm hover:shadow-float hover:-translate-y-1 hover:border-verdant-300'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-control bg-verdant-50 border border-verdant-100 flex items-center justify-center mb-5">
                  {p.icon}
                </div>

                <h2 className="text-[20px] font-display font-bold text-ink mb-2">
                  {p.title}
                </h2>

                <p className="text-[15px] text-moss leading-relaxed mb-6">
                  {p.tagline}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-hairline">
                {p.isExternalCreate ? (
                  <a href={p.createHref} rel="noopener noreferrer" className="block w-full">
                    <Button variant="primary" fullWidth>
                      <span>{p.createLabel}</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" strokeWidth={1.75} />
                    </Button>
                  </a>
                ) : (
                  <Link to={p.createHref} className="block w-full">
                    <Button variant="primary" fullWidth>
                      <span>{p.createLabel}</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" strokeWidth={1.75} />
                    </Button>
                  </Link>
                )}

                <div className="text-center pt-1">
                  <a
                    href={p.loginHref}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-moss hover:text-verdant-700 transition-colors py-1 min-h-[44px]"
                  >
                    <span>Already have access? Sign in</span>
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
