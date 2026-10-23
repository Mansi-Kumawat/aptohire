# AptoHire: Connecting Portals & Backend to Production
> **Master Guide for Your IDE AI Tool (Cursor, Claude Code, Windsurf)**  
> *Use this guide to connect your 5 already-built portals to the backend and deploy them live.*

---

## 1. The Architecture: How the 5 Portals Connect

Because all 5 portals are already built, here is how they talk to each other:

```text
                           ┌────────────────────────┐
                           │   aptohire-backend     │
                           │  (Supabase / Postgres) │
                           └───────────┬────────────┘
                                       │
         ┌──────────────────┬──────────┴────────┬──────────────────┐
         ▼                  ▼                   ▼                  ▼
┌─────────────────┐ ┌───────────────┐ ┌───────────────────┐ ┌──────────────┐
│  aptohire-root  │ │aptohire-stud. │ │aptohire-univ.     │ │aptohire-org. │
│  (Landing/Auth) │ │ (Candidate)   │ │  (Placement TPO)  │ │ (Recruiter)  │
│  Port 5173      │ │ Port 5174     │ │  Port 5175        │ │ Port 5176    │
└────────┬────────┘ └───────┬───────┘ └───────────────────┘ └──────────────┘
         │                  │
         │                  │ (Resume QR code links to Root /verify/<id>)
         ▼                  ▼
┌───────────────────────────────────┐
│          aptohire-admin           │
│   (Governance / Blind Review)     │
│             Port 5177             │
└───────────────────────────────────┘
```

---

## 2. Step 1: Connecting Portals to Each Other (Cross-Linking)

Each portal needs to know where its sibling portals live so buttons like *"Go to Student Portal"* or *"Review on Root"* route correctly.

### For Local Testing (Running all on your computer)
In each portal's `.env.local` (or `.env`), set these exact URLs:

| Portal Folder | Port | Env Variable File | Sibling URLs to Set |
| :--- | :--- | :--- | :--- |
| **`aptohire-root`** | `5173` | `frontend/.env.local` | `VITE_STUDENT_URL=http://localhost:5174`<br>`VITE_UNIVERSITY_URL=http://localhost:5175`<br>`VITE_ORGANIZATION_URL=http://localhost:5176` |
| **`aptohire-student`** | `5174` | `.env.local` | `VITE_ROOT_URL=http://localhost:5173`<br>`VITE_UNIVERSITY_URL=http://localhost:5175`<br>`VITE_ORGANIZATION_URL=http://localhost:5176` |
| **`aptohire-university`**| `5175` | `.env.local` | `VITE_ROOT_URL=http://localhost:5173`<br>`VITE_STUDENT_URL=http://localhost:5174` |
| **`aptohire-organization`**| `5176` | `.env.local` | `VITE_ROOT_URL=http://localhost:5173`<br>`VITE_STUDENT_URL=http://localhost:5174` |
| **`aptohire-admin`** | `5177` | `.env.local` | `VITE_ROOT_URL=http://localhost:5173` |

### For Live Production on Vercel
In each portal's **Vercel Settings $\to$ Environment Variables**, change the localhost ports to your live domains:
```env
VITE_SITE_URL=https://aptohire.com
VITE_ROOT_URL=https://aptohire.com
VITE_STUDENT_URL=https://student.aptohire.com
VITE_UNIVERSITY_URL=https://university.aptohire.com
VITE_ORGANIZATION_URL=https://organization.aptohire.com
VITE_ADMIN_URL=https://admin.aptohire.com
```

---

## 3. Step 2: Connecting All Portals to the Backend (`aptohire-backend`)

### A. Local Connection (Using Supabase CLI & Docker)
1. In `aptohire-backend/`, open terminal and run:
   ```bash
   npx supabase start
   ```
2. Run `npx supabase status`. It will print:
   * **API URL**: `http://127.0.0.1:54321`
   * **anon key**: `eyJhbGciOi...`
3. Now, in **EVERY** portal's `.env.local`, set:
   ```env
   VITE_USE_MOCKS=false
   VITE_DEMO_MODE=true
   VITE_SUPABASE_URL=http://127.0.0.1:54321
   VITE_SUPABASE_ANON_KEY=<paste_the_anon_key_here>
   ```
4. In `aptohire-backend/.env.local`, ensure CORS allows all 5 portals:
   ```env
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177
   ```

---

### B. Production Connection (Supabase Cloud)
1. Go to [supabase.com](https://supabase.com) and create your production database project.
2. In your terminal inside `aptohire-backend/`:
   ```bash
   npx supabase login
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   npx supabase functions deploy
   ```
3. Copy your production **Project URL** (`https://xyz.supabase.co`) and **Anon Key** from Supabase Settings $\to$ API.
4. In **Vercel** for each of your 5 portal projects, add:
   ```env
   VITE_USE_MOCKS=false
   VITE_DEMO_MODE=true
   VITE_SUPABASE_URL=https://xyz.supabase.co
   VITE_SUPABASE_ANON_KEY=your-production-anon-key
   ```

---

## 4. Prompt for Your IDE AI Tool: Cross-Portal Wiring Audit

> Copy and paste this prompt into your IDE AI Tool (Cursor, Claude Code, etc.) pointing to your project folders:

```markdown
I have already built all 5 portals and the backend for AptoHire:
- aptohire-backend/
- aptohire-root/
- aptohire-student/
- aptohire-university/
- aptohire-organization/
- aptohire-admin/

Please perform an Integration & Wiring Audit across these projects:
1. Verify Environment Variables:
   - Check that each portal's .env.example and .env.local has the correct sibling URLs:
     * Root (5173), Student (5174), University (5175), Organization (5176), Admin (5177).
   - Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are cleanly configured in all portals.
2. Verify Cross-Portal Links:
   - aptohire-root: "Student Sign in" redirects to student portal (port 5174 / student.aptohire.com).
   - aptohire-student: Resume QR code links back to root site /verify/<id> (port 5173 / aptohire.com).
   - aptohire-organization: Candidate profile view connects to student consent request workflow.
3. Check Backend CORS:
   - Ensure aptohire-backend allows requests from all 5 origins (both localhost ports and production domains).
4. Do not rewrite UI components. Only fix missing environment variables, cross-links, and API fetch client URLs.
```

---

## 5. One-Click Script to Run All 5 Portals + Backend Together

Save this script as `start-all.ps1` in the parent directory where all 6 folders reside:

```powershell
# start-all.ps1
$root = $PSScriptRoot

Write-Host "==========================================" -ForegroundColor Green
Write-Host "   Starting AptoHire 6-Project Cluster    " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# 1. Start Backend
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$root\aptohire-backend'; npm run dev"

# 2. Start 5 Portals
$portals = @(
  @{ name='root'; port=5173; dir='aptohire-root\frontend' },
  @{ name='student'; port=5174; dir='aptohire-student' },
  @{ name='university'; port=5175; dir='aptohire-university' },
  @{ name='organization'; port=5176; dir='aptohire-organization' },
  @{ name='admin'; port=5177; dir='aptohire-admin' }
)

foreach ($p in $portals) {
  $targetDir = "$root\$($p.dir)"
  if (Test-Path $targetDir) {
    Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$targetDir'; npm run dev"
  } else {
    # Fallback if folder name differs
    Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$root\aptohire-$($p.name)'; npm run dev"
  }
}

Write-Host "Cluster Active!" -ForegroundColor Cyan
Write-Host "Root (Public):        http://localhost:5173"
Write-Host "Student Portal:       http://localhost:5174"
Write-Host "University Portal:    http://localhost:5175"
Write-Host "Organization Portal:  http://localhost:5176"
Write-Host "Admin Portal:         http://localhost:5177"
Write-Host "Backend API:          http://localhost:54321"
```

---

## 6. End-to-End Verification Demo (The 7-Minute Test)

Once all 5 portals and the backend are connected, run this test to verify end-to-end integration:

1. **Admin Portal (`:5177`)**: Sign in as `admin@demo.aptohire.test` $\to$ Approvals $\to$ Approve **Uni C**.
2. **Student Portal (`:5174`)**: Sign in as `aarav@unia.edu.test` $\to$ Submit React project $\to$ Scorecard generates score **84**.
3. **Employer Portal (`:5176`)**: Sign in as `recruiter@orga.demo.test` $\to$ Search candidates $\to$ Find Aarav's anonymous card $\to$ **Request Access**.
4. **Student Portal (`:5174`)**: Aarav goes to Sharing $\to$ Accepts Northwind's request for 30 days.
5. **Employer Portal (`:5176`)**: Northwind sees Aarav's profile unmasked!
6. **Root Landing Site (`:5173`)**: Go to `/verify/a1b2c3d4e5f6a7b8c9` $\to$ Cryptographic proof seal validates in real time!
