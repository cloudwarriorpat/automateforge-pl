# Phase 6 — Delivery Readiness Check

---

## Service-by-Service Readiness

### KSeF Studio

| Check | Status | Detail |
|-------|--------|--------|
| **Delivery path defined?** | 🟡 Partial | Process exists on paper (audit→diagnosis→package→implementation). No internal runbook, no SOP documents. |
| **Tooling exists?** | 🔴 No | No n8n instance. No KSeF API client. No ERP connectors. No monitoring stack. No JPK validator. Everything must be built. |
| **Infra supports execution?** | 🟡 Partial | K8s cluster exists (runs the website). Could host n8n. But no n8n deployment, no CI/CD for workflows, no secrets management for client credentials. |
| **Failure handling?** | 🔴 No | No retry logic, no alerting, no error classification. Must be built as part of the n8n workflows. |
| **Human involvement explicit?** | 🟡 Partial | Pricing page implies human delivery (setup + onboarding). But no defined roles, SLAs, or escalation paths documented internally. |

**Readiness: NOT READY**

**Blockers:**
1. No n8n instance deployed
2. No KSeF API integration code
3. No ERP connector library
4. No internal delivery runbook
5. No client onboarding process

**Minimum to deliver first client:**
- [ ] Deploy n8n on existing K8s cluster
- [ ] Build KSeF sandbox integration (auth + invoice submission + status polling)
- [ ] Build one ERP connector (start with Fakturownia — most common among SMEs)
- [ ] Create internal delivery checklist (Notion)
- [ ] Create client onboarding email sequence
- [ ] Set up Slack channel for client communication

---

### AI Agents

| Check | Status | Detail |
|-------|--------|--------|
| **Delivery path defined?** | 🟡 Partial | 4-step process on page (discovery→design→build→monitor). No internal SOP. |
| **Tooling exists?** | 🔴 No | No agent code. No prompt library. No n8n workflows. No quality monitoring dashboard. |
| **Infra supports execution?** | 🟡 Partial | K8s cluster could host n8n for agent orchestration. LLM APIs (Claude/OpenAI) are external services — just need API keys. |
| **Failure handling?** | 🔴 No | No human-in-loop queue. No low-confidence routing. No fallback behavior defined. |
| **Human involvement explicit?** | 🟡 Partial | "Czlowiek w petli" mentioned on page but no process for it. |

**Readiness: NOT READY**

**Blockers:**
1. No working agent prototype
2. No prompt templates
3. No n8n workflows for any agent type
4. No quality monitoring system
5. No human-in-loop process

**Minimum to deliver first client:**
- [ ] Build Email Triage agent as MVP (n8n + Claude API + Gmail + Slack)
- [ ] Create prompt template library (classification prompts with few-shot examples)
- [ ] Define human-in-loop process (when agent confidence < threshold → route to human queue)
- [ ] Create quality tracking (log all classifications to Supabase, sample weekly)
- [ ] Internal testing on AutomateForge's own inbox before selling

---

### Automation Templates

| Check | Status | Detail |
|-------|--------|--------|
| **Delivery path defined?** | 🟢 Yes | Customer buys → downloads JSON → imports to Make/n8n → follows setup guide. Simple. |
| **Tooling exists?** | 🔴 No | Zero templates. Supabase table exists but is empty. No payment integration (Stripe/Przelewy24). |
| **Infra supports execution?** | 🟡 Partial | Supabase marketplace frontend exists. Needs payment flow and actual template files. |
| **Failure handling?** | 🟡 N/A | Templates are static files. Failure mode is "customer can't configure" → support email thread. |
| **Human involvement explicit?** | 🟢 Yes | Minimal — support via email. Implementation tier (2,000+ PLN) involves human setup. |

**Readiness: NOT READY**

**Blockers:**
1. Zero templates exist
2. No payment flow
3. No digital delivery system (after payment → download link)

**Minimum to deliver first sale:**
- [ ] Build 5 templates (n8n JSON workflows + documentation)
- [ ] Seed Supabase templates table with the 5 templates
- [ ] Add simple payment flow (even manual — customer contacts, pays via Przelewy24, gets download link)
- [ ] Write setup guide for each template (PL)

---

### Partner Program

| Check | Status | Detail |
|-------|--------|--------|
| **Delivery path defined?** | 🟡 Partial | Concept clear. No actual registration or tracking. |
| **Tooling exists?** | 🔴 No | No partner tracking. No referral attribution. No commission calculation. |
| **Infra supports execution?** | 🟡 Partial | Supabase could store partner data. Google Sheets for commission tracking as MVP. |
| **Failure handling?** | 🔴 No | No attribution dispute resolution process. |
| **Human involvement explicit?** | 🟢 Yes | Manual onboarding call. Manual commission calculation. |

**Readiness: NOT READY (but lowest effort to fix)**

**Minimum to launch MVP:**
- [ ] Create `partners` table in Supabase (name, company, NIP, email, status)
- [ ] Create `referrals` table in Supabase (partner_id, client_lead_id, status, commission_amount)
- [ ] Add partner registration flow to contact form
- [ ] Create monthly commission spreadsheet template
- [ ] Write partner onboarding document (PDF)

---

## Infrastructure Readiness

| Component | Status | Notes |
|-----------|--------|-------|
| **K8s cluster** | 🟢 Running | Hosts the website. Can be expanded for n8n. |
| **Supabase** | 🟢 Running | leads + templates tables exist. RLS configured. |
| **Domain (automateforge.pl)** | 🟢 Active | DNS, TLS via cert-manager + Let's Encrypt. |
| **CI/CD (GitHub Actions)** | 🟢 Working | Builds Docker image, deploys via Helm. |
| **n8n instance** | 🔴 Not deployed | Required for KSeF + Agents + Templates. Must be deployed on K8s or separate VPS. |
| **LLM API access** | 🔴 No keys | Need OpenAI or Anthropic API keys for agents. |
| **Payment system** | 🔴 Not configured | Need Stripe account with PLN support or Przelewy24. |
| **Email service** | 🔴 Not configured | Need transactional email (Resend, Postmark, or similar) for onboarding sequences. |
| **Monitoring/alerting** | 🔴 Not configured | Need for KSeF monitoring + agent quality tracking. |
| **Secrets management** | 🔴 Not configured | Need secure storage for client API keys and credentials. |

---

## Critical Path to First Revenue

```
Week 1: Infrastructure
├── Deploy n8n on K8s (or VPS)
├── Get LLM API keys (OpenAI/Anthropic)
├── Set up transactional email (Resend)
└── Create Stripe account (PLN)

Week 2: Site Cleanup
├── Execute all AF-001 through AF-012 build tasks
├── Deploy updated site
└── Test contact form end-to-end

Week 3: Build First Service
├── Build KSeF sandbox integration in n8n
├── Build Fakturownia→KSeF connector
├── Create internal delivery checklist
└── Create client onboarding emails

Week 4: First Client
├── Run outreach to accounting firms (partner channel)
├── Offer free KSeF readiness audit
├── Close first KSeF Studio client
└── Begin delivery
```

---

## Honest Assessment

**Can a client be onboarded tomorrow?** No. Not for any service.

**What blocks launch?**
1. No n8n instance (backbone of all services)
2. No KSeF integration code (core product #1)
3. No agent prototypes (core product #2)
4. No payment system (can't collect money)
5. Website claims things that don't exist

**What's the realistic timeline to first paying client?**
- If focused full-time: 3-4 weeks
- If part-time (15h/week per Notion constraints): 6-8 weeks
- KSeF deadline (April 1, 2026) is 51 days away — tight but achievable for KSeF Studio Start tier

**Is AutomateForge viable?**
Yes, conditionally. The market need is real (KSeF mandate + low AI adoption in Poland). The niche is well-chosen (Polish SMEs, Polish tooling). The pricing is reasonable. But today it's a website, not a business. The gap between promise and capability is significant. Closing that gap is the only priority.
