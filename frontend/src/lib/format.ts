/**
 * Extracts an 18-character lowercase hex credential ID from a string or pasted URL.
 * Matches /^[a-f0-9]{18}$/ or extracts it from /verify/<id>.
 */
export function extractCredentialId(raw: string): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();

  // If a full or relative URL is pasted
  const urlMatch = trimmed.match(/\/verify\/([a-fA-F0-9]{18})/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1].toLowerCase();
  }

  // Exact 18 hex characters
  const directMatch = trimmed.match(/^[a-fA-F0-9]{18}$/);
  if (directMatch) {
    return trimmed.toLowerCase();
  }

  return null;
}

/**
 * Validates whether a credential ID is strictly 18 lowercase hex characters.
 */
export function isValidCredentialId(id: string): boolean {
  return /^[a-f0-9]{18}$/.test(id);
}

/**
 * Formats ISO date string to readable UK/Standard date e.g. "12 Oct 2026".
 */
export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}
