import { describe, it, expect } from 'vitest';
import { hashString, pseudoRandom } from '../src/lib/hash';

describe('hashString determinism', () => {
  it('returns identical hashes for identical alias strings', () => {
    const hash1 = hashString('Candidate K7F2');
    const hash2 = hashString('Candidate K7F2');
    expect(hash1).toBe(hash2);
    expect(typeof hash1).toBe('number');
  });

  it('returns distinct hashes for distinct aliases', () => {
    const hashA = hashString('Candidate K7F2');
    const hashB = hashString('Candidate M3Q8');
    expect(hashA).not.toBe(hashB);
  });

  it('produces deterministic pseudo-random sequence for a given seed', () => {
    const rng1 = pseudoRandom(12345);
    const rng2 = pseudoRandom(12345);

    const seq1 = [rng1(), rng1(), rng1()];
    const seq2 = [rng2(), rng2(), rng2()];

    expect(seq1).toEqual(seq2);
  });
});
