import React from 'react';
import { env } from '@/config/env';

// TODO(decision): swap for approved legal counsel text before commercial launch.
export const PrivacyContent: React.FC = () => {
  return (
    <div className="space-y-8 text-[16px] text-ink leading-relaxed prose-reading">
      <section id="overview" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          1. Overview and data philosophy
        </h2>
        <p className="text-moss">
          AptoHire is designed on a principle of radical data minimisation and consent-first access.
          This public marketing website (<code>aptohire.com</code>) does not set tracking cookies, does not run third-party advertising scripts, and does not record behavioral analytics.
        </p>
      </section>

      <section id="what-we-collect" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          2. Information collected on this site
        </h2>
        <p className="text-moss mb-3">
          The only personal information collected on this website is information you explicitly submit through our institutional access forms:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-moss">
          <li>
            <strong>University access applications:</strong> Institution name, city, state, institutional email domain, student count band, departments, contact name, contact role, work email, and optional phone number.
          </li>
          <li>
            <strong>Organization access requests:</strong> Company name, organisation kind, team size, website URL, hiring focus areas, contact name, role, and work email.
          </li>
        </ul>
        <p className="text-moss mt-3">
          We never sell, rent, or trade application contact details to third parties. Form data is used exclusively to evaluate and respond to access requests.
        </p>
      </section>

      <section id="student-principles" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          3. Student data protection principles
        </h2>
        <p className="text-moss mb-3">
          Our core platform enforces strict boundaries to protect student privacy:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-moss">
          <li>
            <strong>Blind matchmaking:</strong> Recruiters review anonymized skills, evidence trails, and matching rubrics. Candidate names, photos, contact details, and specific universities are never exposed during discovery.
          </li>
          <li>
            <strong>Consent before reveal:</strong> Student identity is unlocked only when the student explicitly accepts an access request from a specific organization.
          </li>
          <li>
            <strong>Revocable access:</strong> Students can withdraw sharing permissions at any time from their personal dashboard.
          </li>
          <li>
            <strong>ID security:</strong> Student ID numbers are stored using one-way cryptographic hashes. We never collect or store physical ID card photos.
          </li>
          <li>
            <strong>Private project files:</strong> Raw code archives and submitted project files remain strictly private to the student and assigned reviewers.
          </li>
        </ul>
      </section>

      <section id="data-retention" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          4. Retention and deletion policies
        </h2>
        <p className="text-moss mb-3">
          We retain data only as long as necessary to support credential verification:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-moss">
          <li>Draft and unsubmitted project applications are purged after 30 days.</li>
          <li>Raw 3-minute demo video uploads are permanently deleted after 90 days; verified rubric scores and evidence pointers are retained on the permanent scorecard.</li>
          <li>Institutional access requests that are declined or withdrawn are purged within 60 days.</li>
        </ul>
      </section>

      <section id="demo-environment" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          5. Prototype and demonstration environments
        </h2>
        <p className="text-moss">
          In demo and staging environments, all individual names, universities, candidate aliases, and corporate identities are entirely fictional. Any similarity to actual persons, universities, or operating businesses is purely coincidental.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          6. Contact and data rights inquiries
        </h2>
        <p className="text-moss">
          For questions regarding privacy, data access requests, or deletion inquiries, contact our privacy team directly at{' '}
          <a href={`mailto:${env.VITE_SUPPORT_EMAIL}`} className="text-verdant-700 underline font-medium">
            {env.VITE_SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </div>
  );
};
