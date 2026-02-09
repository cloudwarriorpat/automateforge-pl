# AutomateForge.pl — Next Steps & Agent Handoff

> **Branch:** `claude/automateforge-services-rebuild-KKjp6`
> **Last commit:** `93e7c3c` — production readiness (404, privacy, terms, error boundary, SEO)
> **Date:** 2026-02-09
> **Build status:** TypeScript + Vite pass clean (411KB JS, 37KB CSS)

---

## What was done (4 commits, this session)

| # | Commit | Summary |
|---|--------|---------|
| 1 | `fe60cb2` | **Blacksmith Audit** — removed 10 fake services/features, fabricated stats, testimonials, dead blog, non-functional newsletter |
| 2 | `30dd5d5` | **Service deliverables** — KSeF Scanner quiz, 5 n8n templates, diagnosis report generator (Python), email triage agent MVP (Python), Supabase migrations (partners/referrals), seeds, ops runbooks, onboarding docs |
| 3 | `b7c2f19` | **Activate marketplace** — Templates page fetches from Supabase, nav restored, dead code deleted (Blog.tsx, Testimonials.tsx) |
| 4 | `93e7c3c` | **Production readiness** — 404 page, Privacy Policy, Terms of Service, ErrorBoundary, OG/Twitter meta tags, favicon, form error handling, aria-labels |

---

## Current architecture

```
src/
├── App.tsx                    # Routes + ErrorBoundary wrapper
├── components/
│   ├── ErrorBoundary.tsx      # Class-based crash handler
│   ├── Footer.tsx             # Links to /polityka-prywatnosci, /regulamin
│   ├── Guarantee.tsx          # Triple guarantee (results/satisfaction/timeliness)
│   ├── Layout.tsx             # Outlet + Navbar + Footer
│   ├── Navbar.tsx             # KSeF Studio | AI Agents | Szablony | Partnerzy
│   ├── ScrollToTop.tsx
│   └── SectionHeading.tsx
├── hooks/useInView.ts         # IntersectionObserver scroll animations
├── lib/supabase.ts            # Supabase client (anon key, insert-only RLS)
└── pages/
    ├── Home/                  # Hero, Stats (live KSeF countdown), Services, Process, CTA
    ├── KSeF.tsx               # KSeF Studio sales page → links to /skaner-ksef
    ├── KSeFScanner.tsx        # 10-question readiness quiz, lead capture
    ├── Agents.tsx             # 3 agents: email triage, lead qual, cost control
    ├── Templates.tsx          # Fetches from Supabase templates table, category filters
    ├── Contact.tsx            # Lead form → Supabase leads table
    ├── Partners.tsx           # Partner program info
    ├── Privacy.tsx            # GDPR privacy policy (Polish)
    ├── Terms.tsx              # Terms of service (Polish)
    └── NotFound.tsx           # 404 catch-all
```

```
Backend / tools (not part of Vite build):
├── templates/                 # 5 n8n workflow JSON + README per template
│   ├── ksef-auto-sender/
│   ├── baselinker-inpost-tracker/
│   ├── invoice-duplicate-detector/
│   ├── lead-enrichment-pipeline/
│   └── daily-slack-digest/
├── tools/
│   ├── diagnosis-report/      # Python CLI → PDF (reportlab)
│   └── email-triage-agent/    # Python + Anthropic API + Gmail IMAP + Slack
├── ops/
│   ├── runbooks/              # ksef-onboarding.md, agent-deployment.md
│   └── onboarding/            # welcome-email.md, kickoff-checklist.md
├── supabase/
│   ├── migrations/            # leads, templates, partners, referrals tables
│   └── seeds/                 # 5 template records
└── services/                  # Audit docs: reality_audit, forge_specs, product_ladder
```

---

## Supabase schema

| Table | RLS | Anon access |
|-------|-----|-------------|
| `leads` | INSERT only | Form submissions (contact, waitlist, scanner) |
| `templates` | SELECT only | Templates marketplace reads |
| `partners` | None (admin) | Managed via service_role key |
| `referrals` | None (admin) | Managed via service_role key |

---

## What's left — for the next agent

### Priority 1: Infrastructure (code tasks)

#### 1A. Deploy n8n on K8s
- Add Helm chart or Docker Compose for n8n to `ops/` or `infra/`
- n8n needs: PostgreSQL (can share Supabase or separate), persistent volume for workflows
- Expose via Traefik ingress with TLS (same pattern as main site)
- This is the single biggest blocker — every service depends on n8n

#### 1B. KSeF sandbox integration
- Build an n8n workflow or standalone service that:
  - Authenticates with KSeF test API (`https://ksef-test.mf.gov.pl/api`)
  - Submits FA(2) XML invoices
  - Polls for UPO (acknowledgment)
  - Handles errors (rejected invoices, auth failures)
- The `templates/ksef-auto-sender/workflow.json` is a starting point but needs real KSeF API auth flow
- KSeF uses session tokens via `/online/Session/InitToken` endpoint

#### 1C. Payment flow (Stripe or Przelewy24)
- Add Stripe checkout or Przelewy24 integration for template purchases
- Templates page currently links to `/kontakt` — should be replaced with actual buy flow
- Minimum: Stripe Checkout session → redirect to success page → email download link
- Needs `VITE_STRIPE_PUBLIC_KEY` env var + serverless function or Supabase Edge Function for session creation

#### 1D. Transactional email
- Set up Resend/Postmark/SendGrid for:
  - Contact form auto-reply
  - KSeF Scanner results email
  - Template purchase confirmation
  - Client onboarding sequence (templates in `ops/onboarding/`)
- Could use Supabase Edge Functions + Resend SDK

### Priority 2: Frontend improvements (code tasks)

#### 2A. OG image for social sharing
- Create 1200x630px image with AutomateForge branding
- Add `og:image` and `twitter:image` to `index.html`

#### 2B. Analytics
- Add Plausible or Google Analytics
- Script tag in `index.html` or component in `App.tsx`
- Track: page views, form submissions, scanner completions

#### 2C. Cookie consent banner (if analytics added)
- Simple bottom banner with "Akceptuje" button
- Only needed if 3rd-party cookies/tracking are added
- Current site uses no cookies (Supabase client is cookieless)

#### 2D. Template purchase UX
- When payment is wired up, Templates page should show "Kup" button instead of "Zamow" link to contact
- Add success/download page at `/templates/dziekujemy`

### Priority 3: Backend / services (code tasks)

#### 3A. Test email triage agent end-to-end
- `tools/email-triage-agent/main.py` exists but hasn't been tested
- Needs: Gmail app password, Anthropic API key, Slack webhook
- Test with AutomateForge's own inbox before offering to clients

#### 3B. Test diagnosis report generator
- `tools/diagnosis-report/main.py` exists
- Run: `pip install reportlab && python main.py -c "Test Firma" -p "Jan Kowalski" -s "Excel,Fakturownia" -i 150 -pp "reczne fakturowanie,brak integracji KSeF"`
- Verify PDF output looks professional

#### 3C. Prompt library for AI agents
- Create `tools/prompts/` directory with:
  - `email-triage-classify.txt` — few-shot classification prompt
  - `lead-qualification-score.txt` — lead scoring prompt
  - `cost-control-anomaly.txt` — invoice anomaly detection prompt
- These are the core IP of the agent service

#### 3D. Monitoring/alerting
- Set up Slack alerts for: new leads (from Supabase), KSeF errors, agent failures
- Could be a simple n8n workflow polling Supabase + posting to Slack

---

## What's left — for Patryk (manual/account tasks)

### Week 1 (immediate)

- [ ] **Review and merge this PR** — branch `claude/automateforge-services-rebuild-KKjp6`
- [ ] **Review Privacy Policy and Terms** — I wrote reasonable defaults but a lawyer should review before accepting real client data
- [ ] **Set up Stripe account** (stripe.com) — enable PLN currency, get publishable + secret keys
- [ ] **Set up Resend account** (resend.com) — verify `automateforge.pl` domain for transactional email
- [ ] **Get Anthropic API key** — for the email triage agent (`console.anthropic.com`)

### Week 2

- [ ] **Deploy n8n** — either on your K8s cluster (`helm install n8n`) or a cheap VPS (Hetzner CX22 ~30 PLN/month)
- [ ] **Configure n8n credentials** — use `templates/.env.example` as reference for all needed API keys
- [ ] **Run Supabase migrations** — apply `20260209_partners_referrals.sql` and run `seeds/templates.sql`
- [ ] **Test the KSeF Scanner** — go through it yourself, verify lead appears in Supabase

### Week 3

- [ ] **Import n8n templates** — load the 5 workflow JSONs into your n8n instance, configure credentials
- [ ] **Test email triage agent** — on your own inbox first
- [ ] **Test diagnosis report** — generate a sample PDF, customize branding if needed
- [ ] **Start outreach** — KSeF deadline is April 1, 2026 (~51 days). Target accounting firms and biura rachunkowe

### Week 4

- [ ] **First free audit** — use the diagnosis report generator for the deliverable
- [ ] **Close first KSeF Studio client** — Start tier (8K setup + 1K/month)
- [ ] **Iterate** — adjust based on what the first client needs

---

## Key files to know

| File | What it does | When to touch it |
|------|-------------|-----------------|
| `src/App.tsx` | All routes | Adding new pages |
| `src/components/Navbar.tsx` | Navigation links | Adding/removing nav items |
| `src/components/Footer.tsx` | Footer links + legal | Updating services list |
| `src/pages/Home/Stats.tsx` | Dynamic KSeF countdown | After KSeF deadline passes |
| `src/pages/Templates.tsx` | Fetches from Supabase `templates` table | When adding payment flow |
| `src/pages/KSeFScanner.tsx` | 10-question quiz | Adjusting questions/scoring |
| `supabase/migrations/` | Database schema | Adding tables |
| `templates/.env.example` | All n8n credential keys | Reference for deployment |
| `services/product_ladder.md` | Pricing tiers | Business decisions |
| `ops/delivery_readiness.md` | What's ready vs not | Tracking progress |

---

## Tech constraints

- **Vite + React 18 + TypeScript 5.5 + Tailwind 3.4** — no SSR, no Next.js
- **Supabase anon key** is public (insert-only on `leads`, select-only on `templates`)
- **No backend server** — frontend only. Any server-side logic needs Supabase Edge Functions or external service
- **Docker + Nginx** serves the SPA with `try_files $uri /index.html` for client-side routing
- **All copy is Polish** — maintain Polish for all user-facing text
- **Brand colors**: orange (#f97316 primary), steel grays (#020617 darkest)
- **CSS classes**: `glass-card`, `glass-card-hover`, `btn-primary`, `btn-secondary`, `input-field`, `badge-brand`, `badge-steel`, `section-container`, `gradient-text`
