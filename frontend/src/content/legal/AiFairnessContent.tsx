import React from 'react';
import { env } from '@/config/env';

// TODO(decision): swap for approved legal counsel text before commercial launch.
export const AiFairnessContent: React.FC = () => {
  return (
    <div className="space-y-8 text-[16px] text-ink leading-relaxed prose-reading">
      <section id="work-first" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          1. Work-first evaluation
        </h2>
        <p className="text-moss">
          AptoHire evaluates what you actually build. The primary weight of every review is placed squarely on functional artifacts: code repositories, operational deployments, architectural documents, and automated test suites.
        </p>
      </section>

      <section id="audio-video-boundaries" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          2. Strict limits on video and presentation scoring
        </h2>
        <p className="text-moss mb-3">
          The 3-minute demo video serves solely as supporting evidence of project authorship and comprehension. Our evaluation system strictly enforces these non-negotiable boundaries:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-moss">
          <li><strong>Accent is not scored:</strong> Regional accents, dialect variations, and non-native pronunciation have zero impact on your review score.</li>
          <li><strong>Speaking pace and fluency are not scored:</strong> Hesitations, pauses, or nervous delivery are never penalised.</li>
          <li><strong>Visual environment is not scored:</strong> Camera resolution, lighting quality, background settings, and physical surroundings are entirely disregarded.</li>
        </ul>
      </section>

      <section id="ai-transparency" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          3. Transparent use of AI tools
        </h2>
        <p className="text-moss">
          Modern engineering leverages automated tools and AI assistance. Disclosing that you utilized AI copilots, code generation, or assistive tooling in your project is never penalised. What matters is your architectural understanding, code correctness, and ability to explain your engineering choices.
        </p>
      </section>

      <section id="missing-evidence" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          4. Confidence scoring over punitive deductions
        </h2>
        <p className="text-moss">
          When a submitted criterion lacks supporting timestamps or clear code references, our engine reduces evaluation confidence rather than penalizing the baseline score. Students are prompted with actionable feedback on where to attach verifying evidence.
        </p>
      </section>

      <section id="human-in-the-loop" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          5. Human-in-the-loop audit for borderline scores
        </h2>
        <p className="text-moss">
          Automated evaluation performs only the initial review. Any assessment yielding a score between <strong>40 and 60</strong> (the critical boundary around our 50-point verification benchmark) automatically undergoes human expert inspection before results are published to organization search feeds.
        </p>
      </section>

      <section id="appeals" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          6. Student rights and score appeals
        </h2>
        <p className="text-moss">
          Students retain the right to dispute any review. Raising a ticket from your skill scorecard assigns the project to an independent, secondary human reviewer who reviews the evidence afresh.
        </p>
      </section>

      <section id="deterministic-rules" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          7. Rule-based identity and consent
        </h2>
        <p className="text-moss">
          While generative models assist in rubric analysis, all identity masking, consent authorization, access control, and credential issuance are governed by deterministic, immutable SQL policies and cryptographic rules—never probabilistic AI models.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24">
        <h2 className="text-[24px] font-display font-bold text-ink mb-3">
          8. Questions or bias reporting
        </h2>
        <p className="text-moss">
          If you believe an assessment reflected algorithmic bias or unfair evaluation criteria, contact our fairness team at{' '}
          <a href={`mailto:${env.VITE_SUPPORT_EMAIL}`} className="text-verdant-700 underline font-medium">
            {env.VITE_SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </div>
  );
};
