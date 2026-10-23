# AptoHire Backend (`aptohire-backend`)

This directory owns the backend implementation, Supabase database migrations, seed data, and Edge Functions that support the AptoHire portal network.

---

## 1. Directory Structure

```
backend/
├── functions/
│   ├── public-verify/         # Deno Edge Function for anonymous credential lookup
│   │   └── index.ts
│   └── submit-application/    # Deno Edge Function for university & recruiter applications
│       └── index.ts
├── migrations/
│   └── 20261012000000_create_aptohire_tables.sql  # SQL schema, RLS policies, indexes
├── src/
│   ├── server.ts              # Local Express/Node server emulating Edge Functions on port 54321
│   ├── db.ts                  # In-memory mock store and seed fixtures
│   └── types.ts               # Shared Zod validation schemas and TypeScript types
├── tests/
│   └── server.test.ts         # Vitest + Supertest integration tests
├── seed.sql                   # SQL seed script with test credentials and sample data
└── package.json
```

---

## 2. API Endpoints

### 2.1 `GET /functions/v1/public-verify?id=<credentialId>`
- **Method:** `GET`
- **Access:** Anonymous, rate-limited
- **Query param:** `id` (18 lowercase hex characters)
- **Response `200`:**
  ```json
  {
    "credential": {
      "credential_id": "a1b2c3d4e5f6a7b8c9",
      "issued_at": "2026-10-12",
      "last_updated": "2026-10-12",
      "display_name": "Aarav S.",
      "affiliation": {
        "label": "Uni A",
        "verification": "roster"
      },
      "skills": [
        {
          "name": "React",
          "level": "Proficient",
          "verified": true,
          "score": 72,
          "verified_on": "2026-10-12"
        }
      ],
      "shared_fields": ["name", "affiliation", "skills", "scores"]
    }
  }
  ```
- **Errors:** `404 NOT_FOUND`, `429 RATE_LIMITED` (with `Retry-After: 60`), `503 SERVICE_UNAVAILABLE`.

### 2.2 `POST /functions/v1/submit-application`
- **Method:** `POST`
- **Headers:** `Idempotency-Key: <UUID>`
- **Body:** Discriminated union on `type` (`university` or `organization`)
- **Response `202`:**
  ```json
  {
    "reference": "AH-7K2Q9F",
    "status": "received"
  }
  ```
- **Errors:** `422 VALIDATION_FAILED` (with field error map), `429 RATE_LIMITED`, `503 SERVICE_UNAVAILABLE`.

---

## 3. Local Development

### Install dependencies
```bash
npm install
```

### Run local Edge Functions emulator
```bash
npm run dev
```
Starts server on `http://localhost:54321`.

### Run backend automated tests
```bash
npm test
```

### Apply Migrations to Real Supabase
Using Supabase CLI:
```bash
supabase db push
supabase db reset --data-only --data-path seed.sql
supabase functions deploy public-verify
supabase functions deploy submit-application
```
