/**
 * Computes a deterministic 32-bit integer hash from a string using FNV-1a.
 * Used for deterministic visual representations like AliasGlyph.
 */
export function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Returns a deterministic pseudo-random sequence of numbers between 0 and 1 from a seed.
 */
export function pseudoRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
