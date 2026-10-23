# AptoHire Root Website (`aptohire.com`)

**Hired for what you can do.**

This repository contains the public root website for **AptoHire**, a skill-verification and consent-first hiring platform. On AptoHire, students prove their skills by building real projects, receiving verified skill scorecards with direct evidence links. Organizations discover pre-verified candidates without seeing names until the student agrees.

> **Important Security Boundary:** This root website **never logs anyone in** and **never holds the Supabase service-role key**. Authentication occurs exclusively on each distinct audience portal (Student, University, and Organization).

---

## 1. Where this project fits in AptoHire

AptoHire operates across separate portals sharing a single Supabase backend:

| Portal | Host | Purpose |
|---|---|---|
| **Root Website (this repo)** | `aptohire.com` | Marketing, pricing, portal chooser, public credential verification, legal |
| **Student Portal** | `student.aptohire.com` | Project submissions, living scorecards, resume QR generator |
| **University Portal** | `university.aptohire.com` | Student roster monitoring, placement readiness, unmatched demand |
| **Organization Portal** | `organization.aptohire.com` | Job posting, blind ranked matchmaking, candidate access requests |
| **Backend Services** | Shared Supabase | Database migrations, RLS policies, Edge Functions (`public-verify`, `submit-application`) |

---

## 2. Prerequisites

Before running the project locally, install:
- **Node.js**: v18.0.0 or higher (v20+ LTS recommended)
- **npm**: v9.0.0 or higher

---

## 3. Quick Start (in 4 Steps)

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Configure environment variables
Copy the example configuration:
```bash
cp .env.example .env
```
By default, `VITE_USE_MOCKS=true` is enabled, allowing the site to run fully offline without connecting to Supabase.

### Step 3: Run the local development server
```bash
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

### Step 4: Run tests and typecheck
```bash
npm run typecheck
npm run lint
npm test
```

---

## 4. Running with Mocks vs Real Supabase

### Running with Mocks (Offline / Presentation)
Set in `.env`:
```env
VITE_USE_MOCKS=true
VITE_DEMO_MODE=true
```
- Credential checks will resolve from fixtures in `src/lib/mocks/fixtures.ts`.
- Form submissions simulate realistic 400–900 ms latency and return generated reference IDs (`AH-XXXXXX`).
- Test IDs:
  - `a1b2c3d4e5f6a7b8c9`: Full credential (Aarav S., Uni A roster, 3 verified skills + scores)
  - `b2c3d4e5f6a7b8c9d0`: Levels only (no scores, no university)
  - `c3d4e5f6a7b8c9d0e1`: Student shares nothing
  - `d4e5f6a7b8c9d0e1f2`: Unverified university chip
  - `e5f6a7b8c9d0e1f2a3`: Simulates 429 rate limit

### Running Against Real Supabase Edge Functions
Set in `.env`:
```env
VITE_USE_MOCKS=false
VITE_DEMO_MODE=false
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-public-anon-key>
```
The client calls `${VITE_SUPABASE_URL}/functions/v1/public-verify` and `/functions/v1/submit-application` with the anonymous public key.

---

## 5. Commands Table

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite dev server on port `5173` |
| `npm run build` | Runs security scan, TypeScript typecheck, and bundles for production |
| `npm run preview` | Previews the production build locally |
| `npm run typecheck` | Validates TypeScript with strict type constraints (`noImplicitAny`) |
| `npm run lint` | Runs ESLint and JSX accessibility rules |
| `npm test` | Runs Vitest unit and integration test suite |
| `npm run check:secrets`| Scans codebase to verify no forbidden keys or hardcoded hex colors exist |

---

## 6. Folder Tour

```
frontend/
├── docs/                      # PLAN.md architecture spec
├── public/                    # Favicon, og-image.png, robots.txt, sitemap.xml, site.webmanifest
├── src/
│   ├── app/                   # Data router, providers, ErrorBoundary, ScrollToTop
│   ├── config/                # env.ts (Zod validation), portals.ts (URL builder)
│   ├── pages/                 # Home, Pricing, GetStarted, ApplyUniversity, ApplyOrganization,
│   │                          # VerifyLookup, VerifyCredential, Privacy, Terms, AiFairness, Demo, NotFound
│   ├── sections/home/         # Hero, HowItWorks, ForStudents, ForUniversities, ForOrganizations,
│   │                          # PrivacyPromise, Faq, ClosingCta
│   ├── components/
│   │   ├── layout/            # Header, MobileMenu, Footer, PrototypeNotice, NoticeBar, SkipLink, PageShell
│   │   ├── brand/             # Logo, SealMark
│   │   ├── proof/             # ProofRing, ScorecardPanel, EvidenceRow, EvidenceChip, StatusChip,
│   │   │                      # AliasGlyph, CandidateCardPreview, SkillGraphPreview, SampleRosterTable, StatRow
│   │   └── ui/                # Button, Input, Textarea, Select, Checkbox, Field, Toast, Accordion, Popover
│   ├── content/               # copy.ts, sample.ts, pricing.ts, faq.ts, legal/
│   ├── lib/                   # api.ts, scoring.ts, format.ts, hash.ts, seo.tsx, schemas/, mocks/
│   └── styles/                # tokens.css, globals.css
└── tests/                     # Vitest test suite
```

---

## 7. How to Edit Copy and Colors

### Editing Marketing Copy
All user-facing copy is consolidated inside `src/content/`:
- `src/content/copy.ts`: Headlines, feature explanations, and the blind matching label `BRAND_BLIND_MATCHING_LABEL`.
- `src/content/pricing.ts`: Plans, prices, and capability matrix.
- `src/content/faq.ts`: FAQ questions and answers.
- `src/content/legal/`: Legal drafts (`PrivacyContent.tsx`, `TermsContent.tsx`, `AiFairnessContent.tsx`).

### Editing Design System Tokens
Colors, radius, fonts, and shadows are defined as CSS variables in:
- `src/styles/tokens.css`
- Mapped in `tailwind.config.ts`

---

## 8. Deploying to Vercel

1. Create a **separate Vercel project** for this repository.
2. Link your production domain `aptohire.com` (and redirect `www.aptohire.com` to apex).
3. Set the production environment variables:
   - `VITE_APP_ENV=production`
   - `VITE_DEMO_MODE=false`
   - `VITE_USE_MOCKS=false`
   - `VITE_SITE_URL=https://aptohire.com`
   - `VITE_ROOT_DOMAIN=aptohire.com`
   - `VITE_SUPABASE_URL=https://<your-project>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=<public-anon-key>`
4. Deploy. The `vercel.json` file configures SPA rewrites, security headers (CSP, HSTS, X-Frame-Options), and cache policies.

> Note for SEO: Adding static prerendering for marketing routes is the next planned enhancement (`// TODO(decision):`).

---

## 9. Common Problems and Solutions

- **Problem:** Build fails with `Build error: VITE_USE_MOCKS cannot be true in production`.
  - **Solution:** In production (`VITE_APP_ENV=production`), `VITE_USE_MOCKS` and `VITE_DEMO_MODE` must both be `false`.
- **Problem:** Mobile menu does not close when pressing Escape.
  - **Solution:** Verify browser window has focus; the Escape handler is attached to the window event listener.
- **Problem:** Credential ID shows "Not Found" immediately without a network call.
  - **Solution:** Credential IDs must be exactly 18 lowercase hexadecimal characters (`0–9` and `a–f`).

---

## 10. Glossary

- **Proof Ring:** The signature UI component displaying an SVG gradient arc representing the candidate's skill score.
- **PASS_MARK:** 50 points. Scores strictly above 50 earn the "Verified" status.
- **Zero-knowledge anonymized matchmaking:** The platform's consent-first matching method where recruiters see skills and evidence without seeing candidate names until the student accepts.
- **Credential ID:** An 18-character lowercase hexadecimal hash mapping to a student's verified public scorecard.
