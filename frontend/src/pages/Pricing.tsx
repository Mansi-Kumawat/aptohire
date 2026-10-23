import React from 'react';
import { Seo } from '@/lib/seo';
import { PRICING_PLANS, COMPARISON_TABLE } from '@/content/pricing';
import { portalUrl } from '@/config/portals';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-canvas text-left">
      <Seo
        title="Pricing plans — AptoHire"
        description="Transparent access plans for students, universities, and hiring organizations."
        canonicalPath="/pricing"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold px-2.5 py-1 rounded bg-mist border border-hairline inline-block mb-3">
            Pricing
          </span>
          <h1 className="text-display-l font-display font-bold text-ink">
            Transparent plans for verified talent
          </h1>
          <p className="text-[17px] text-moss mt-2">
            Free forever for students. Early pilot partnerships for universities and hiring organizations.
          </p>
        </div>

        {/* Three Plan Panels with Different Emphasis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-panel border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative hover:-translate-y-1 ${
                plan.highlighted
                  ? 'border-verdant-700 bg-verdant-50/40 shadow-float ring-1 ring-verdant-700 hover:shadow-elevation'
                  : 'border-hairline bg-canvas shadow-sm hover:shadow-float hover:border-verdant-300'
              }`}
            >
              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[22px] font-display font-bold text-ink">
                    {plan.name}
                  </h2>
                  {plan.badge && (
                    <span
                      className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                        plan.highlighted
                          ? 'bg-verdant-100 text-verdant-800 border border-verdant-300'
                          : 'bg-mist text-moss border border-hairline'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price display */}
                <div className="mb-4">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[36px] font-display font-extrabold text-ink tabular-nums">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-[14px] text-moss font-medium">
                          / {plan.period}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-[32px] font-display font-bold text-ink">
                      Talk to us
                    </div>
                  )}
                </div>

                <p className="text-[15px] text-moss mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features list */}
                <div className="space-y-3 pt-4 border-t border-hairline">
                  <span className="text-[13px] font-mono uppercase tracking-wider text-moss font-semibold block mb-2">
                    Included capabilities
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[14px] text-ink">
                        <Check className="w-4 h-4 text-verdant-700 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Plan Action CTA */}
              <div className="pt-8 mt-6 border-t border-hairline">
                {plan.id === 'students' ? (
                  <a href={portalUrl('student', '/signup')} rel="noopener noreferrer" className="block w-full">
                    <Button variant="primary" fullWidth>
                      {plan.ctaText}
                    </Button>
                  </a>
                ) : (
                  <Link to={plan.ctaLink} className="block w-full">
                    <Button variant={plan.highlighted ? 'primary' : 'secondary'} fullWidth>
                      {plan.ctaText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-12">
          <h2 className="text-[24px] font-display font-bold text-ink mb-4">
            Compare capabilities
          </h2>

          <div className="rounded-panel border border-hairline bg-canvas overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-mist/70 border-b border-hairline text-[14px] font-semibold text-ink">
                  <th className="py-3.5 px-4 sm:px-6">Platform capability</th>
                  <th className="py-3.5 px-4 text-center">Students</th>
                  <th className="py-3.5 px-4 text-center">Universities</th>
                  <th className="py-3.5 px-4 text-center">Organizations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline text-[14px]">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-mist/20 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-ink">
                      {row.capability}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-verdant-800 font-medium">
                        <Check className="w-4 h-4 text-verdant-700" strokeWidth={2.5} />
                        <span>{row.students}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.universities === 'Included' ? (
                        <span className="inline-flex items-center gap-1.5 text-verdant-800 font-medium">
                          <Check className="w-4 h-4 text-verdant-700" strokeWidth={2.5} />
                          <span>Included</span>
                        </span>
                      ) : (
                        <span className="text-moss text-[13px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.organizations === 'Included' ? (
                        <span className="inline-flex items-center gap-1.5 text-verdant-800 font-medium">
                          <Check className="w-4 h-4 text-verdant-700" strokeWidth={2.5} />
                          <span>Included</span>
                        </span>
                      ) : (
                        <span className="text-moss text-[13px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prototype notice footer note */}
        <div className="p-4 rounded-control bg-mist border border-hairline text-[14px] text-moss flex items-center gap-2">
          <Info className="w-4 h-4 text-moss shrink-0" strokeWidth={1.75} />
          <span>
            <strong>Prototype notice:</strong> AptoHire is currently an active prototype. Plans and capabilities shown here are not final.
          </span>
        </div>
      </div>
    </div>
  );
};
