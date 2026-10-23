# Supabase-First Application Security Audit

**Application:** AptoHire Root Website (`aptohire.com`)  
**Frontend Stack:** React 18 + Vite + TypeScript  
**Backend Stack:** Supabase Edge Functions + PostgreSQL + RLS  
**Audit Status:** Fully Hardened & Compliant

---

## 1. Security Architecture & Boundary Verification

1. **No Service-Role Key in Frontend:**
   - Frontend repo contains zero instances of `service_role` or database secret keys.
   - Enforced by automated static security script: `npm run check:secrets`.
   - The Supabase client library `@supabase/supabase-js` is deliberately omitted from the frontend bundle; network communication occurs via plain `fetch` with the public anonymous key.

2. **Database Row-Level Security (RLS):**
   - `credentials` table: Public `SELECT` allowed for published records only.
   - `skills` table: Public `SELECT` allowed for skills tied to published credentials.
   - `applications` table: Insert-only by anonymous callers (`WITH CHECK (true)`). Reading or updating requires `service_role` (admin portal only).

3. **Input Validation & Data Sanitization:**
   - All inbound responses from Edge Functions are parsed with Zod schemas before rendering.
   - User inputs on `ApplyUniversity` and `ApplyOrganization` forms are validated with Zod schemas.
   - Zero usage of `dangerouslySetInnerHTML` for untrusted user inputs (JSON-LD uses hardcoded site metadata).

4. **Bot & Abuse Mitigation:**
   - Honeypot field (`hp`) included on all forms to silently block automated spam bots.
   - 3-second minimum fill time guard prevents programmatic form flooding.
   - Idempotency key (`Idempotency-Key: <UUID>`) prevents duplicate form submissions.
   - Rate limiting on `public-verify` (30 req/min) and `submit-application`.

5. **Privacy by Construction:**
   - Candidate verification pages (`/verify/:credentialId`) leak no database IDs and use identical "Credential not found" error messages for both malformed and nonexistent IDs.
   - Headers: `Referrer-Policy: no-referrer` and `X-Robots-Tag: noindex, nofollow` on verification routes.
   - Zero third-party tracking scripts, cookies, or external analytics.
   - Privacy banner operates purely on client-side state without tracking user behavior.

6. **Deployment Security Headers (`vercel.json`):**
   - `Content-Security-Policy`: Restricts scripts and styles to `'self'`, prevents framing (`frame-ancestors 'none'`), restricts API calls to Supabase origin.
   - `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
   - `X-Frame-Options`: `DENY`
   - `X-Content-Type-Options`: `nosniff`
   - `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`
   - `Cross-Origin-Opener-Policy`: `same-origin`
