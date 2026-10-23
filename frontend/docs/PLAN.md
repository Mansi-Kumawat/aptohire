# AptoHire Root Website (`aptohire.com`) — Implementation Plan

> Short 1-page architecture and delivery plan. Scope: public root marketing website, credential verification, and access applications.

---

## 1. File Tree

```
frontend/ (aptohire-root/)
├── docs/
│   └── PLAN.md
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ScrollToTop.tsx
│   ├── config/
│   │   ├── env.ts
│   │   └── portals.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Pricing.tsx
│   │   ├── GetStarted.tsx
│   │   ├── ApplyUniversity.tsx
│   │   ├── ApplyOrganization.tsx
│   │   ├── VerifyLookup.tsx
│   │   ├── VerifyCredential.tsx
│   │   ├── Privacy.tsx
│   │   ├── Terms.tsx
│   │   ├── AiFairness.tsx
│   │   ├── Demo.tsx
│   │   └── NotFound.tsx
│   ├── sections/home/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ForStudents.tsx
│   │   ├── ForUniversities.tsx
│   │   ├── ForOrganizations.tsx
│   │   ├── PrivacyPromise.tsx
│   │   ├── Faq.tsx
│   │   └── ClosingCta.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PrototypeNotice.tsx
│   │   │   ├── NoticeBar.tsx
│   │   │   ├── SkipLink.tsx
│   │   │   └── PageShell.tsx
│   │   ├── brand/
│   │   │   ├── Logo.tsx
│   │   │   └── SealMark.tsx
│   │   ├── proof/
│   │   │   ├── ProofRing.tsx
│   │   │   ├── ScorecardPanel.tsx
│   │   │   ├── EvidenceRow.tsx
│   │   │   ├── EvidenceChip.tsx
│   │   │   ├── StatusChip.tsx
│   │   │   ├── AliasGlyph.tsx
│   │   │   ├── CandidateCardPreview.tsx
│   │   │   ├── SkillGraphPreview.tsx
│   │   │   ├── SampleRosterTable.tsx
│   │   │   └── StatRow.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Textarea.tsx
│   │       ├── Select.tsx
│   │       ├── Checkbox.tsx
│   │       ├── Field.tsx
│   │       ├── Accordion.tsx
│   │       ├── Popover.tsx
│   │       ├── Dialog.tsx
│   │       ├── Skeleton.tsx
│   │       ├── EmptyState.tsx
│   │       ├── CopyButton.tsx
│   │       └── Toast.tsx
│   ├── content/
│   │   ├── copy.ts
│   │   ├── sample.ts
│   │   ├── pricing.ts
│   │   ├── faq.ts
│   │   └── legal/
│   │       ├── PrivacyContent.tsx
│   │       ├── TermsContent.tsx
│   │       └── AiFairnessContent.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── scoring.ts
│   │   ├── format.ts
│   │   ├── hash.ts
│   │   ├── cn.ts
│   │   ├── seo.tsx
│   │   ├── hooks/
│   │   │   ├── useCountUp.ts
│   │   │   └── useIntersectionObserver.ts
│   │   ├── schemas/
│   │   │   ├── application.ts
│   │   │   ├── credential.ts
│   │   │   └── errors.ts
│   │   └── mocks/
│   │       ├── fixtures.ts
│   │       └── handlers.ts
│   └── styles/
│       ├── tokens.css
│       └── globals.css
├── tests/
│   ├── scoring.test.ts
│   ├── hash.test.ts
│   ├── portals.test.ts
│   ├── env.test.ts
│   ├── api.test.ts
│   ├── proof-ring.test.tsx
│   └── forms.test.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── vercel.json
```

---

## 2. Route List

| Path | Component | Loading | Description |
|---|---|---|---|
| `/` | `Home` | Eager | Landing page (Hero with ProofRing, HowItWorks, ForStudents, ForUniversities, ForOrganizations, PrivacyPromise, FAQ, ClosingCta) |
| `/pricing` | `Pricing` | Lazy | Student (Free), University (Pilot / Talk to us), Organization (Pilot / Talk to us) & feature table |
| `/get-started` | `GetStarted` | Lazy | Portal chooser (student, university, org) with `?intent=` support |
| `/login`, `/signup` | Redirect | Eager | Redirects to `/get-started` with appropriate intent |
| `/apply/university` | `ApplyUniversity` | Lazy | Application form for university access (validated, honeypot, ref confirmation) |
| `/apply/organization` | `ApplyOrganization` | Lazy | Request form for recruiter access |
| `/verify` | `VerifyLookup` | Lazy | Credential ID lookup input (validates 18-char hex, extracts ID from pasted URL) |
| `/verify/:credentialId` | `VerifyCredential` | Lazy | Public credential viewer handling all 7 states (Loading, Verified, Nothing Shared, Unverified Uni, 404, 429, 503) |
| `/privacy` | `Privacy` | Lazy | Privacy policy with prototype notice and sticky table of contents |
| `/terms` | `Terms` | Lazy | Terms of use |
| `/ai-and-fairness` | `AiFairness` | Lazy | Algorithmic transparency and human-in-the-loop policies |
| `/demo` | `Demo` | Lazy | 5–7 min demo script, fictional credentials, excluded from production builds |
| `*` | `NotFound` | Lazy | 404 with Go Home and Verify Credential buttons |

---

## 3. Component List

1. **Brand:** `Logo`, `SealMark` (inline SVG for white and `verdant-700` backgrounds).
2. **Proof Elements:** `ProofRing` (SVG arc, conic/linear gradient, 4 states, tick mark, animated counter), `EvidenceRow`, `EvidenceChip`, `StatusChip`, `AliasGlyph` (deterministic geometric SVG mark), `ScorecardPanel`, `CandidateCardPreview`, `SkillGraphPreview` (SVG node graph with toggle to list), `SampleRosterTable`, `StatRow`.
3. **UI Primitives:** `Button` (primary `verdant-700`, accent `ember-500` with `ink`, secondary, ghost, danger), `Input`, `Textarea`, `Select`, `Checkbox`, `Field` (aria-describedby, visible labels, errors), `Accordion` (Radix), `Popover` (Radix), `Dialog` (Radix), `Skeleton`, `EmptyState`, `CopyButton`.
4. **Layout:** `Header`, `MobileMenu` (accessible hamburger menu with trap focus, Escape handler, body scroll lock), `Footer`, `PrototypeNotice`, `NoticeBar` (cookie-free privacy banner), `SkipLink`, `PageShell`.

---

## 4. Mock Layer & Edge Function Contract

- **`public-verify`** (`GET /public-verify?id=<credentialId>`):
  - Fixtures:
    - `a1b2c3d4e5f6a7b8c9`: Full credential (Aarav S., Uni A roster, 3 verified skills + scores)
    - `b2c3d4e5f6a7b8c9d0`: Levels only (no name, no scores, no university)
    - `c3d4e5f6a7b8c9d0e1`: Nothing shared (empty skills array)
    - `d4e5f6a7b8c9d0e1f2`: Unverified university affiliation
    - `e5f6a7b8c9d0e1f2a3`: 429 Rate limited
    - Others: 404 Not Found
- **`submit-application`** (`POST /submit-application`):
  - Generates `AH-XXXXXX` reference, responds with 202 status.
  - `fail@demo.test` -> 422 with validation errors.
  - `rate@demo.test` -> 429 rate limit.
- **Backend counterpart** in `/backend`:
  - Contains migrations, seed SQL, and a local server implementing both `/functions/v1/public-verify` and `/functions/v1/submit-application`.

