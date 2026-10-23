import { describe, it, expect } from 'vitest';
import { PASS_MARK, levelFor, isVerified } from '../src/lib/scoring';

describe('scoring logic', () => {
  it('has PASS_MARK = 50', () => {
    expect(PASS_MARK).toBe(50);
  });

  it('determines correct levels at boundary points', () => {
    // Emerging: 0–50
    expect(levelFor(0)).toBe('Emerging');
    expect(levelFor(25)).toBe('Emerging');
    expect(levelFor(50)).toBe('Emerging');

    // Competent: 51–69
    expect(levelFor(51)).toBe('Competent');
    expect(levelFor(60)).toBe('Competent');
    expect(levelFor(69)).toBe('Competent');

    // Proficient: 70–84
    expect(levelFor(70)).toBe('Proficient');
    expect(levelFor(75)).toBe('Proficient');
    expect(levelFor(84)).toBe('Proficient');

    // Advanced: 85–100
    expect(levelFor(85)).toBe('Advanced');
    expect(levelFor(95)).toBe('Advanced');
    expect(levelFor(100)).toBe('Advanced');
  });

  it('verifies skills strictly above PASS_MARK (50)', () => {
    expect(isVerified(0)).toBe(false);
    expect(isVerified(50)).toBe(false);
    expect(isVerified(51)).toBe(true);
    expect(isVerified(72)).toBe(true);
    expect(isVerified(100)).toBe(true);
  });
});
