import { env } from './env';

export type PortalType = 'student' | 'university' | 'organization';

/**
 * Builds the URL for student, university, or organization portals.
 * Uses explicit VITE_*_URL if set, otherwise falls back to https://{portal}.{domain}.
 * There is intentionally no 'admin' portal option.
 */
export function portalUrl(portal: PortalType, path = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  let baseUrl: string | undefined;
  if (portal === 'student') {
    baseUrl = env.VITE_STUDENT_URL;
  } else if (portal === 'university') {
    baseUrl = env.VITE_UNIVERSITY_URL;
  } else if (portal === 'organization') {
    baseUrl = env.VITE_ORGANIZATION_URL;
  }

  if (baseUrl && baseUrl.trim() !== '') {
    return `${baseUrl.replace(/\/$/, '')}${cleanPath}`;
  }

  return `https://${portal}.${env.VITE_ROOT_DOMAIN}${cleanPath}`;
}
