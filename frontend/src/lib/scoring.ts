/* Mirror of app_config.PASS_MARK in the shared database. Keep in sync. */
export const PASS_MARK = 50;

export type SkillLevel = 'Emerging' | 'Competent' | 'Proficient' | 'Advanced';

/**
 * Returns skill tier based on score:
 * - 0–50: Emerging (not verified)
 * - 51–69: Competent
 * - 70–84: Proficient
 * - 85–100: Advanced
 */
export function levelFor(score: number): SkillLevel {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  if (clamped <= PASS_MARK) {
    return 'Emerging';
  }
  if (clamped <= 69) {
    return 'Competent';
  }
  if (clamped <= 84) {
    return 'Proficient';
  }
  return 'Advanced';
}

/**
 * A skill is verified if its score strictly exceeds PASS_MARK (50).
 */
export function isVerified(score: number): boolean {
  return score > PASS_MARK;
}
