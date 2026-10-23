import React from 'react';
import { Seo } from '@/lib/seo';
import { Hero } from '@/sections/home/Hero';
import { HowItWorks } from '@/sections/home/HowItWorks';
import { ForStudents } from '@/sections/home/ForStudents';
import { ForUniversities } from '@/sections/home/ForUniversities';
import { ForOrganizations } from '@/sections/home/ForOrganizations';
import { PrivacyPromise } from '@/sections/home/PrivacyPromise';
import { Faq } from '@/sections/home/Faq';
import { ClosingCta } from '@/sections/home/ClosingCta';
import { env } from '@/config/env';

export const Home: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AptoHire',
    url: env.VITE_SITE_URL,
    logo: `${env.VITE_SITE_URL}/favicon.svg`,
  };

  return (
    <div>
      <Seo
        title="AptoHire — Hired for what you can do"
        description="AptoHire is a skill-verification and consent-first hiring platform. Students prove their skills by building real projects; employers discover verified talent without seeing names."
        canonicalPath="/"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <HowItWorks />
      <ForStudents />
      <ForUniversities />
      <ForOrganizations />
      <PrivacyPromise />
      <Faq />
      <ClosingCta />
    </div>
  );
};
