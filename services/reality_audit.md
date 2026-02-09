# Phase 1 — Service Reality Audit

**Date:** 2026-02-09
**Auditor:** Blacksmith Audit (automated)
**Scope:** All services referenced across website, repo, database schema, and copy

---

## Inventory of ALL Claimed Services

### 1. KSeF Studio

| Field | Value |
|---|---|
| **Where claimed** | Homepage card, dedicated `/ksef` page, contact form dropdown, partner page earnings calculator |
| **Claimed outcome** | Automated KSeF 2.0 e-invoicing integration with ERP, monitoring, JPK/VAT validation, error auto-correction |
| **Required inputs from client** | ERP system access, invoicing data, KSeF credentials |
| **Internal tools needed** | KSeF API integration layer, n8n/Make workflows, monitoring stack, JPK validator |
| **Human effort** | Discovery call, ERP mapping, integration build, testing, go-live support |
| **Delivery time** | Not explicitly stated (implied weeks) |
| **Current readiness** | Marketing page complete with pricing (8K-25K PLN setup + 1K-6K/mo). Zero backend tooling exists. No integration code, no monitoring, no JPK validator, no KSeF API client in repo. |

**Classification: 🟡 REAL BUT INCOMPLETE**

The service concept is specific, well-defined, and addresses a genuine regulatory deadline (Apr 1, 2026). Pricing exists. But delivery infrastructure is 100% missing. This is a brochure, not a product. Could become real if the team has KSeF/ERP integration capability.

---

### 2. AI Agents (Back-office)

| Field | Value |
|---|---|
| **Where claimed** | Homepage card, dedicated `/agents` page, contact form, partner earnings calculator |
| **Claimed outcome** | AI agents for email triage, lead qualification, cost control, L1 support, document analysis, HR onboarding |
| **Required inputs from client** | Access to email, CRM, invoicing, HR tools; process documentation |
| **Internal tools needed** | LLM APIs (GPT/Claude), n8n/Make, integration connectors for 20+ tools |
| **Human effort** | Discovery, prompt engineering, workflow design, testing, monitoring |
| **Delivery time** | Not stated |
| **Current readiness** | Marketing page complete with 6 agent types and pricing (15K-80K PLN + 2K-15K/mo). Zero agent code, prompts, workflows, or monitoring in repo. Specific metrics claimed (94% accuracy, 70% L1 resolution) with no evidence. |

**Classification: 🟡 REAL BUT INCOMPLETE**

Agent types are well-chosen and address real back-office pain points. But every metric is fabricated — no case studies, no demo, no working prototype. The 6 agent types may also be too many to deliver well initially.

---

### 3. Szablony Automatyzacji (Automation Templates)

| Field | Value |
|---|---|
| **Where claimed** | Homepage card, dedicated `/templates` page, contact form |
| **Claimed outcome** | Pre-built Make/n8n/Zapier workflow templates for Polish integrations (KSeF, BaseLinker, Allegro, etc.) |
| **Required inputs from client** | Payment, tool accounts |
| **Internal tools needed** | Make/n8n/Zapier accounts, template files, Supabase marketplace |
| **Human effort** | Template creation, documentation, support |
| **Delivery time** | "10 minutes" to deploy (claimed) |
| **Current readiness** | Marketplace UI exists and connects to Supabase `templates` table. **The table is empty** — no seed data in migrations. "Top sellers" (KSeF Auto-Sender, BaseLinker-InPost Tracker, etc.) are referenced by name but DO NOT EXIST anywhere. No template files (JSON exports) in the repo. Buy button routes to contact form (no payment flow). |

**Classification: 🔴 NOT REAL (REMOVE)**

The storefront exists but the shelves are empty. There are zero templates to sell. The named "top sellers" are fictional. A customer visiting this page sees an empty grid or loading skeleton. This is actively damaging to credibility.

---

### 4. AI Act Governance Kit

| Field | Value |
|---|---|
| **Where claimed** | Homepage "extra services" grid (one-liner: "Compliance w 10 dni"), contact form dropdown |
| **Claimed outcome** | AI Act compliance in 10 days |
| **Required inputs** | Unknown |
| **Tools needed** | Unknown |
| **Human effort** | Unknown |
| **Delivery time** | "10 days" (claimed) |
| **Current readiness** | No dedicated page. No spec. No deliverables defined. No tooling. Just a label with an icon. |

**Classification: 🔴 NOT REAL (REMOVE)**

A regulatory compliance offering with zero definition. "Compliance in 10 days" for a complex EU regulation is either a template/checklist service or marketing fiction. No way to deliver this.

---

### 5. Managed n8n

| Field | Value |
|---|---|
| **Where claimed** | Homepage "extra services" grid (one-liner: "Bezpieczny self-host"), contact form dropdown |
| **Claimed outcome** | Secure self-hosted n8n instance |
| **Required inputs** | Client infra requirements |
| **Tools needed** | n8n, Docker/K8s, monitoring |
| **Human effort** | Setup, maintenance, security |
| **Delivery time** | Not stated |
| **Current readiness** | No page. No spec. No pricing. AutomateForge does have K8s infra (for its own site), suggesting some DevOps capability. But nothing specific to n8n hosting exists. |

**Classification: 🔴 NOT REAL (REMOVE)**

Could be viable but is completely undefined. If n8n is the backbone of template/agent delivery, this might be worth developing later — but it's not a service today.

---

### 6. GTM Engineering

| Field | Value |
|---|---|
| **Where claimed** | Homepage "extra services" grid (one-liner: "Lead to Call w 24h"), contact form dropdown |
| **Claimed outcome** | 24-hour lead-to-call pipeline |
| **Required inputs** | Unknown |
| **Tools needed** | Unknown |
| **Human effort** | Unknown |
| **Delivery time** | Unknown |
| **Current readiness** | No page. No definition. Overlaps significantly with AI Agents "lead qualification" agent. |

**Classification: 🔴 NOT REAL (REMOVE)**

Vague label that duplicates the lead qualification agent. Remove to avoid confusion.

---

### 7. NIS2 Readiness

| Field | Value |
|---|---|
| **Where claimed** | Homepage "extra services" grid (one-liner: "Automatyzacja procedur"), contact form dropdown |
| **Claimed outcome** | NIS2 compliance procedure automation |
| **Required inputs** | Unknown |
| **Tools needed** | Unknown |
| **Human effort** | Unknown |
| **Delivery time** | Unknown |
| **Current readiness** | No page. No spec. No deliverables. |

**Classification: 🔴 NOT REAL (REMOVE)**

Another undefined regulatory offering. NIS2 is cybersecurity-focused — completely outside the automation/invoicing domain.

---

### 8. Szkolenia AI (AI Literacy Training)

| Field | Value |
|---|---|
| **Where claimed** | Homepage "extra services" grid only (one-liner: "AI Literacy dla zespolow"). NOT in contact form. |
| **Claimed outcome** | AI training for teams |
| **Required inputs** | Unknown |
| **Tools needed** | Unknown |
| **Current readiness** | No page. No curriculum. No format. Not even selectable in the contact form. |

**Classification: 🔴 NOT REAL (REMOVE)**

Completely undefined. Not even wired into lead capture.

---

### 9. Audyt Bezpieczenstwa (Security Audit)

| Field | Value |
|---|---|
| **Where claimed** | Homepage "extra services" grid only (one-liner: "Automatyzacji i integracji"). NOT in contact form. |
| **Claimed outcome** | Security audit of automations and integrations |
| **Required inputs** | Unknown |
| **Tools needed** | Unknown |
| **Current readiness** | No page. No methodology. Not in contact form. |

**Classification: 🔴 NOT REAL (REMOVE)**

Undefined. Not wired into lead capture. Remove.

---

### 10. Partner Program

| Field | Value |
|---|---|
| **Where claimed** | Dedicated `/partnerzy` page, navigation |
| **Claimed outcome** | 15% recurring commission for referrals; free KSeF for partner's clients |
| **Required inputs** | Partner registration |
| **Tools needed** | Referral tracking, commission calculation, partner dashboard |
| **Current readiness** | Full marketing page with benefits, 4-step process, earnings calculator. But: no partner registration form (uses generic contact form), no referral tracking, no partner dashboard, no commission system. Claims "5+ active partnerships" with no evidence. |

**Classification: 🟡 REAL BUT INCOMPLETE**

The concept is well-defined and strategically sound (targeting accounting firms who need KSeF). But the program infrastructure doesn't exist. Can't actually onboard or track partners.

---

### 11. Blog

| Field | Value |
|---|---|
| **Where claimed** | Dedicated `/blog` page, navigation |
| **Claimed outcome** | Articles, guides, and case studies about KSeF and automation |
| **Current readiness** | 6 "posts" hardcoded in component. ALL slugs point to `#` — no actual article content exists. Category filter is non-functional (hardcoded active state). It's a static mockup. |

**Classification: 🔴 NOT REAL (REMOVE)**

Fake blog. Every article is a title + excerpt with no actual content behind it. Damages credibility — a visitor who clicks "Czytaj dalej" goes nowhere.

---

### 12. Newsletter

| Field | Value |
|---|---|
| **Where claimed** | Blog page footer CTA |
| **Current readiness** | Email input + "Subskrybuj" button. **Button does nothing.** No backend handler, no Supabase table, no API call, no email service integration. |

**Classification: 🔴 NOT REAL (REMOVE)**

Non-functional. Collecting emails you can't store is worse than not having the feature.

---

### 13. Testimonials

| Field | Value |
|---|---|
| **Where claimed** | Homepage testimonials section |
| **Content** | 3 testimonials: Marta Kowalska (CFO, TechDistro), Piotr Nowak (CEO, E-commerce Pro), Anna Wisniewska (COO, SaaS Solutions) |
| **Current readiness** | Generic Polish names with generic company names. No photos, no LinkedIn links, no verification. Almost certainly fabricated. |

**Classification: 🔴 NOT REAL (REMOVE)**

Fake social proof. If discovered, destroys trust completely. Remove until real testimonials exist.

---

### 14. Statistics Banner

| Field | Value |
|---|---|
| **Where claimed** | Homepage stats section |
| **Content** | "85% reduction in manual work", "3x faster invoice processing", "24h lead-to-call", "99.9% uptime" |
| **Current readiness** | Presented as established facts. No source, no methodology, no client base to measure from. |

**Classification: 🔴 NOT REAL (REMOVE)**

Fabricated metrics presented as achievements. Should be replaced with market stats or removed entirely.

---

## Summary Matrix

| # | Service | Status | Action |
|---|---------|--------|--------|
| 1 | KSeF Studio | 🟡 INCOMPLETE | Keep. Build delivery stack. |
| 2 | AI Agents | 🟡 INCOMPLETE | Keep but narrow to 2-3 agents. Build one prototype. |
| 3 | Templates Marketplace | 🔴 NOT REAL | Remove page OR stock with real templates (min 5). |
| 4 | AI Act Governance Kit | 🔴 NOT REAL | Remove from site. |
| 5 | Managed n8n | 🔴 NOT REAL | Remove from site. Revisit later as internal tooling. |
| 6 | GTM Engineering | 🔴 NOT REAL | Remove from site. |
| 7 | NIS2 Readiness | 🔴 NOT REAL | Remove from site. |
| 8 | Szkolenia AI | 🔴 NOT REAL | Remove from site. |
| 9 | Audyt Bezpieczenstwa | 🔴 NOT REAL | Remove from site. |
| 10 | Partner Program | 🟡 INCOMPLETE | Keep concept. Simplify page. Wire to contact form properly. |
| 11 | Blog | 🔴 NOT REAL | Remove page until real content exists. |
| 12 | Newsletter | 🔴 NOT REAL | Remove or wire to Supabase. |
| 13 | Testimonials | 🔴 NOT REAL | Remove section. |
| 14 | Stats Banner | 🔴 NOT REAL | Replace with market stats or remove. |

**Services to keep:** 2 (KSeF Studio, AI Agents) + 1 conditional (Templates if stocked)
**Services to remove:** 6 extras + Blog + Newsletter + Testimonials + Stats
**Services to redesign:** Partner Program
