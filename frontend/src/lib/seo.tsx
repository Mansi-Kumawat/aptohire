import React from 'react';
import { Helmet } from 'react-helmet-async';
import { env } from '@/config/env';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  noReferrer?: boolean;
  ogType?: 'website' | 'article';
}

export const Seo: React.FC<SeoProps> = ({
  title = 'AptoHire — Hired for what you can do',
  description = 'Skill-verification and consent-first hiring platform. Students prove their skills by building real projects; employers discover verified talent without seeing names.',
  canonicalPath = '',
  noIndex = false,
  noReferrer = false,
  ogType = 'website',
}) => {
  const canonicalUrl = `${env.VITE_SITE_URL}${canonicalPath}`;
  const ogImageUrl = `${env.VITE_SITE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {noReferrer && <meta name="referrer" content="no-referrer" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};
