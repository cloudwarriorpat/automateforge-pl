# Phase 3 — Product Ladder & Bundling

---

## Design Principles

1. **Fewer services, sharper delivery.** AutomateForge sells 2 core services + 1 conditional product.
2. **Each tier has a clear upgrade path.** Entry → Core → Advanced → Retainer.
3. **No overlaps.** Each offering occupies a distinct problem/price point.
4. **No snowflakes.** Everything must be repeatable across clients.

---

## Final Service Catalog

### Service A: KSeF Studio (Compliance Automation)

**Why it leads:** Regulatory deadline (Apr 1, 2026) creates urgency. Every Polish SME needs this. No "do I need this?" conversation — it's mandatory.

| Tier | Name | Setup (PLN) | Monthly (PLN) | What's Included | Target Client |
|------|------|-------------|---------------|-----------------|---------------|
| Entry | **Start** | 8,000 | 1,000 | 1 ERP→KSeF integration, basic monitoring, JPK validation, email alerts, docs + 1h training | Single-system firms, micro/small businesses |
| Core | **Pro** | 9,990 | 3,000 | Up to 3 integrations, 24/7 monitoring, auto-correction on rejections, Slack/Teams alerts, BI dashboard, 4h SLA, schema updates | Multi-system SMEs, growing businesses |
| Advanced | **Enterprise** | 25,000 | 6,000 | Unlimited integrations, dedicated account manager, proactive monitoring, custom reports, 1h SLA, quarterly reviews | Mid-market, multi-entity companies |

**Upgrade path:** Start → Pro (when client adds systems or needs better SLA) → Enterprise (when volume/complexity demands dedicated support).

---

### Service B: AI Agents (Back-office Automation)

**Why it's second:** Higher ticket, longer sales cycle, but massive retention (once an agent works, clients don't churn). Requires more trust — KSeF engagement builds that trust first.

**NARROWED SCOPE:** Launch with 3 agents (not 6). The other 3 (L1 support, document analysis, HR onboarding) are deferred until the first 3 have proven delivery.

| Tier | Name | Setup (PLN) | Monthly (PLN) | What's Included | Target Client |
|------|------|-------------|---------------|-----------------|---------------|
| Entry | **Starter** | 15,000 | 2,000 | 1 agent (choice of: email triage, lead qualification, OR cost control), setup + training, weekly monitoring, email support, docs | SMEs wanting to test AI on one process |
| Core | **Growth** | 45,000 | 8,000 | Up to 3 agents, custom prompts, 24/7 monitoring, Slack support, monthly reports, prompt updates, human-in-loop | Companies scaling automation across departments |
| Advanced | **Enterprise** | 80,000 | 15,000 | Unlimited agents, dedicated team, proactive monitoring, 2h SLA, custom integrations, quarterly reviews, team training | Mid-market with complex back-office |

**Launch agents (3 only):**
1. Email Triage — classify, route, alert
2. Lead Qualification — enrich, score, route to sales
3. Invoice Cost Control — anomaly detection, budget alerts

**Deferred agents (Phase 2, after first 5 clients):**
4. Customer Service L1
5. Document Analysis
6. HR Onboarding

---

### Product C: Automation Templates (Self-serve, conditional)

**Why conditional:** Templates are a low-touch, scalable revenue stream — BUT only if inventory exists. Currently zero templates exist. This product launches ONLY when 5+ real templates are built and tested.

| Tier | Name | Price (PLN) | What's Included |
|------|------|-------------|-----------------|
| Entry | **Single Template** | 149-499 | 1 workflow file (n8n/Make JSON) + setup guide (PL) + 1 email support thread |
| Core | **Membership** | 299/month | Access to full template library + new templates monthly + priority support |
| Upsell | **Implementation** | 2,000+ | Template + we configure it in your account + testing + 30-day support |

**Minimum launch catalog (5 templates, all must exist before page goes live):**
1. KSeF Auto-Sender (n8n) — ERP→KSeF invoice submission
2. BaseLinker→InPost Tracker (n8n) — order tracking notifications
3. Invoice Duplicate Detector (n8n) — scan for duplicate payments
4. Lead Enrichment Pipeline (n8n) — CRM lead→Apollo→score→notify
5. Daily Slack Digest (n8n) — aggregate sources into morning summary

---

### Program D: Partner Referral (Distribution channel)

**Not a service sold to end clients.** This is a referral program for accounting firms and IT consultants.

| Tier | Name | Commission | Requirements |
|------|------|-----------|--------------|
| Referral | **Affiliate** | 15% recurring | Register, refer clients, we handle delivery |
| Strategic | **Strategic Partner** | 15% + co-branding + free KSeF for partner's clients | Minimum 5 referred clients/quarter |

**MVP infrastructure:** Manual tracking in Supabase. No dashboard. Monthly commission statements via email.

---

## Removed Overlaps & Snowflakes

| Removed | Reason |
|---------|--------|
| AI Act Governance Kit | Outside core competency. Regulatory consulting ≠ automation services. |
| Managed n8n | Different business model (hosting). Not a service — it's infrastructure. |
| GTM Engineering | Duplicates Lead Qualification agent. Vague label. |
| NIS2 Readiness | Cybersecurity compliance is outside domain. |
| Szkolenia AI | Training is a different delivery model. No curriculum exists. |
| Audyt Bezpieczenstwa | No methodology. Outside core competency. |
| L1 Customer Support Agent | Deferred — not removed. Launches after first 5 agent clients. |
| Document Analysis Agent | Deferred. |
| HR Onboarding Agent | Deferred. |

---

## Bundling Strategy

### Bundle 1: "KSeF + Agent" (Cross-sell)

KSeF Pro clients who also need back-office automation:
- KSeF Pro (9,990 + 3,000/mo) + 1 AI Agent Starter (15,000 + 2,000/mo)
- **Bundle price:** 22,000 setup + 4,500/mo (save 2,990 setup + 500/mo)
- **Trigger:** Offer during KSeF onboarding when pain points in other areas surface.

### Bundle 2: "Full Automation Stack"

For companies wanting comprehensive automation:
- KSeF Pro + AI Agents Growth + Template Membership
- **Bundle price:** 50,000 setup + 10,500/mo (save 4,990 setup + 799/mo)
- **Trigger:** Enterprise-level discovery calls.

---

## Revenue Model Summary

| Product | Entry MRR | Core MRR | Advanced MRR |
|---------|-----------|----------|-------------|
| KSeF Studio | 1,000 | 3,000 | 6,000 |
| AI Agents | 2,000 | 8,000 | 15,000 |
| Templates | 299 | 299 | 2,000+ (one-time) |

**Target Year 1:** 10-15 KSeF clients + 3-5 Agent clients + template revenue = 50-80K PLN MRR by month 12.

---

## Scaling Rules

1. **Do not add a new service until existing ones have 5+ paying clients each.**
2. **Do not add a new agent type until the first 3 are proven (3+ deployments each).**
3. **Do not launch the template marketplace until 5+ templates exist with documentation.**
4. **New services require a full Forge Spec before announcement.**
