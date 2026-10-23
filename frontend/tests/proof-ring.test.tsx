import { describe, it, expect } from 'vitest';
import {
  buildProofRingAriaLabel,
  buildProofRingCaption,
} from '../src/components/proof/ProofRing';

describe('ProofRing helpers', () => {
  it('builds accessible aria-labels correctly', () => {
    const verifiedLabel = buildProofRingAriaLabel('React', 72, 'Proficient', 'verified');
    expect(verifiedLabel).toBe('React, score 72 of 100, Proficient, verified');

    const notVerifiedLabel = buildProofRingAriaLabel('Node.js', 45, 'Emerging', 'not-verified');
    expect(notVerifiedLabel).toBe('Node.js, score 45 of 100, Emerging, not verified yet');

    const reviewLabel = buildProofRingAriaLabel('Python', 55, 'Competent', 'under-review');
    expect(reviewLabel).toBe('Python, score under review, Competent');

    const loadingLabel = buildProofRingAriaLabel('SQL', null, 'Emerging', 'loading');
    expect(loadingLabel).toBe('SQL, score loading');
  });

  it('builds accurate captions for all states', () => {
    expect(buildProofRingCaption('verified', 'Proficient', 72)).toBe('Verified · Proficient');
    expect(buildProofRingCaption('under-review', 'Competent', 55)).toBe('Under human review');
    expect(buildProofRingCaption('loading', 'Emerging', null)).toBe('Assessing skill…');

    // Not verified yet: 50 is pass mark, so score 42 needs 9 points to reach 51
    expect(buildProofRingCaption('not-verified', 'Emerging', 42, 50)).toBe('Not verified yet · 9 points to go');
  });
});
