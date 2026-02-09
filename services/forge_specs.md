# Phase 2 — Forge Specs (Automation Service Design)

**Rule:** If a Forge Spec cannot be completed, the service is deleted.

---

## FORGE SPEC 01: KSeF Studio

| Field | Detail |
|---|---|
| **Service Name** | KSeF Studio |
| **Problem Solved** | Polish SMEs must comply with mandatory KSeF e-invoicing by April 1, 2026. Most lack integration between their ERP/invoicing software and the KSeF API. Non-compliance = fines + inability to issue valid invoices. |
| **Target Client** | Polish SMEs using ERP or invoicing software (Comarch Optima, Enova, Symfonia, Fakturownia, wFirma, ifirma) who haven't integrated with KSeF yet. Revenue: 2-50M PLN/year. |
| **Inputs Required** | 1. Access to client's ERP/invoicing system (API credentials or admin access). 2. Sample invoice data (XML/JSON). 3. KSeF test environment credentials. 4. Client's NIP (tax ID). 5. Current invoicing workflow documentation. |
| **Automation Logic** | **Phase A — Assessment (manual, 2-4h):** Map client's invoicing flow, identify ERP endpoints, assess KSeF readiness. **Phase B — Integration Build:** n8n workflow that: (1) polls ERP for new invoices via API, (2) transforms invoice data to KSeF FA(2) XML schema, (3) validates against JPK-V7M/K rules, (4) submits to KSeF API via signed REST calls, (5) stores UPO (confirmation) back in ERP, (6) handles rejections with auto-retry + alert. **Phase C — Monitoring:** n8n workflow that: (1) checks KSeF submission statuses hourly, (2) alerts via Slack/email on failures, (3) logs all operations to Supabase for audit trail. **Phase D — Reporting:** Scheduled n8n workflow that generates weekly/monthly metrics (volume, success rate, error breakdown) and pushes to Google Sheets or simple dashboard. |
| **Tooling Stack** | n8n (self-hosted), KSeF API (MF gov), ERP APIs (Comarch/Enova/Fakturownia), Supabase (audit log), Slack/email (alerts), Google Sheets (reporting) |
| **Deliverables** | 1. Working KSeF integration (invoices flow automatically). 2. Monitoring dashboard with alerts. 3. JPK/VAT validation rules configured. 4. Rejection handling workflow. 5. Documentation (PL): setup, troubleshooting, SLA terms. 6. 1h training call with client team. |
| **Maintenance / Support** | Monthly: schema updates when MF publishes new KSeF versions. Weekly monitoring review. Slack/email support within SLA (4h Pro / 1h Enterprise). Quarterly health check (Enterprise). |
| **Failure Modes** | 1. KSeF API downtime (MF infrastructure) → queue invoices, retry, alert client. 2. ERP API changes → version pinning + automated tests. 3. Invalid invoice data from client → pre-validation catches, sends correction request. 4. Token expiry → auto-refresh with fallback alert. |
| **Pricing Logic** | **Start:** 8,000 PLN setup + 1,000 PLN/mo (1 ERP, basic monitoring). **Pro:** 9,990 PLN setup + 3,000 PLN/mo (up to 3 ERPs, 24/7 monitoring, auto-correction, BI). **Enterprise:** 25,000 PLN setup + 6,000 PLN/mo (unlimited, dedicated support, custom reporting). Margins: ~60-70% on setup (mostly labor), ~80% on monthly (automated). |

**Verdict: APPROVED — Forge Spec complete.**

---

## FORGE SPEC 02: AI Agents — Email Triage

| Field | Detail |
|---|---|
| **Service Name** | AI Agent: Email Triage |
| **Problem Solved** | SMEs waste 10-20h/month manually reading, categorizing, and routing incoming emails. Important emails (invoices, complaints, urgent requests) get buried. |
| **Target Client** | Polish SMEs receiving 500+ emails/month across shared inboxes. Companies with 5-50 employees where admin staff manually sorts email. |
| **Inputs Required** | 1. Gmail/Outlook OAuth access to shared inbox(es). 2. Category definitions (e.g., invoice, complaint, supplier inquiry, sales lead, internal). 3. Routing rules (who gets what). 4. Access to task management tool (Asana/Jira/Notion) or Slack. 5. 100+ labeled email examples for tuning. |
| **Automation Logic** | n8n workflow triggered by new email arrival: (1) Extract sender, subject, body, attachments. (2) Call LLM (Claude/GPT) with classification prompt + few-shot examples. (3) Classify into client-defined categories. (4) Apply routing rules: create task in Asana/Jira, forward to person, tag in Slack. (5) For invoices: extract key data (amount, vendor, due date) and push to accounting channel. (6) For urgent items: immediate Slack notification. (7) Log all classifications to Supabase for quality tracking. Weekly quality review: sample 20 classifications, measure accuracy, adjust prompts. |
| **Tooling Stack** | n8n, Gmail/Outlook API, Claude API or OpenAI API, Asana/Jira/Notion API, Slack API, Supabase (logging) |
| **Deliverables** | 1. Working email triage agent (processes new emails within 2 minutes). 2. Classification accuracy report (baseline + weekly). 3. Routing rules configured and tested. 4. Quality monitoring dashboard. 5. Documentation (PL): categories, routing, escalation procedures. 6. 1h training call. |
| **Maintenance / Support** | Weekly: accuracy review + prompt adjustments. Monthly: report on volume, accuracy, time saved. Prompt updates when client adds categories or changes routing. |
| **Failure Modes** | 1. LLM misclassification → human-in-loop review queue for low-confidence (<70%) classifications. 2. Email API rate limits → queuing with backoff. 3. Attachment processing fails → forward original to fallback inbox. 4. LLM API outage → queue emails, alert team, process backlog on recovery. |
| **Pricing Logic** | Part of AI Agents pricing. **Starter:** 15,000 PLN setup + 2,000 PLN/mo (1 agent). **Growth:** 45,000 PLN setup + 8,000 PLN/mo (up to 3 agents). Margin: ~50% setup (significant prompt engineering), ~75% monthly. |

**Verdict: APPROVED — Forge Spec complete.**

---

## FORGE SPEC 03: AI Agent — Lead Qualification

| Field | Detail |
|---|---|
| **Service Name** | AI Agent: Lead Qualification & Enrichment |
| **Problem Solved** | Sales teams waste time on unqualified leads. Manual research on companies takes 15-30 min per lead. Follow-up is slow and inconsistent. |
| **Target Client** | B2B Polish companies using CRM (Pipedrive, HubSpot). Sales teams of 2-10 reps. Receiving 50+ inbound leads/month. |
| **Inputs Required** | 1. CRM API access (Pipedrive/HubSpot). 2. ICP (Ideal Customer Profile) definition: industry, size, revenue, location criteria. 3. Scoring rubric (what makes a lead hot/warm/cold). 4. Sales team Slack/email for notifications. 5. Optional: Apollo/LinkedIn Sales Nav credentials for enrichment. |
| **Automation Logic** | n8n workflow triggered by new CRM lead: (1) Extract lead data (name, company, email, source). (2) Enrich: query Apollo/LinkedIn for company size, industry, revenue, tech stack. (3) Call LLM with ICP scoring prompt: rate lead 1-100 based on fit criteria. (4) Update CRM fields: score, enrichment data, qualification notes. (5) Route: Hot (80+) → immediate Slack ping to assigned rep with context brief. Warm (50-79) → auto-enqueue for follow-up email sequence. Cold (<50) → tag as nurture, no immediate action. (6) For hot leads: draft personalized outreach email using LLM + company context. (7) Log all scoring decisions for review. |
| **Tooling Stack** | n8n, Pipedrive/HubSpot API, Apollo.io API, Claude/GPT API, Slack API, Supabase (logging) |
| **Deliverables** | 1. Working lead scoring agent. 2. CRM enrichment fields configured. 3. Routing rules active. 4. Scoring calibration report (after first 50 leads). 5. Documentation (PL). 6. 1h training call with sales team. |
| **Maintenance / Support** | Bi-weekly: score calibration review. Monthly: conversion analysis (did high-scored leads actually convert?). Prompt updates as ICP evolves. |
| **Failure Modes** | 1. Enrichment API returns no data → score based on available info, flag as "limited data". 2. CRM API changes → version pinning + tests. 3. Scoring drift → monthly calibration against actual conversion data. |
| **Pricing Logic** | Same AI Agents tiers as above. |

**Verdict: APPROVED — Forge Spec complete.**

---

## FORGE SPEC 04: AI Agent — Invoice Cost Control

| Field | Detail |
|---|---|
| **Service Name** | AI Agent: Invoice & Cost Anomaly Detection |
| **Problem Solved** | Finance teams miss duplicate invoices, budget overruns, and pricing anomalies when processing manually. Average Polish SME loses 2-5% of costs to errors. |
| **Target Client** | Polish SMEs processing 100+ invoices/month. Companies using ifirma, wFirma, or similar. Finance teams of 1-3 people. |
| **Inputs Required** | 1. Invoicing system API access (ifirma/wFirma/Fakturownia). 2. Budget thresholds per category/vendor. 3. Historical invoice data (12 months for baseline). 4. Alert recipients (Slack/email). |
| **Automation Logic** | n8n workflow on schedule (daily) + triggered by new invoice: (1) Fetch new invoices from system. (2) Extract: vendor, amount, category, line items, dates. (3) Run anomaly checks: duplicate detection (same vendor + amount + date range), budget threshold breach, significant price increase vs. historical average, unusual vendor (first-time or dormant). (4) Call LLM for complex cases: "Is this invoice consistent with historical patterns for this vendor?" (5) Flag anomalies in Slack with severity (high/medium/low) + context. (6) Generate weekly cost summary report. |
| **Tooling Stack** | n8n, ifirma/wFirma API, Claude/GPT API (for complex analysis), Slack API, Google Sheets (reporting), Supabase (anomaly log) |
| **Deliverables** | 1. Working cost control agent. 2. Anomaly detection rules configured. 3. Budget threshold alerts. 4. Weekly cost summary report. 5. Documentation (PL). |
| **Maintenance / Support** | Monthly: threshold review. Quarterly: rule tuning based on false positive/negative rates. |
| **Failure Modes** | 1. High false positives → adjustable thresholds + human review queue. 2. Invoice format changes → parser updates. 3. API downtime → queue + retry + alert. |
| **Pricing Logic** | Same AI Agents tiers. |

**Verdict: APPROVED — Forge Spec complete.**

---

## FORGE SPEC 05: Automation Templates (Conditional)

| Field | Detail |
|---|---|
| **Service Name** | Szablony Automatyzacji (Automation Templates) |
| **Problem Solved** | SMEs want quick automation wins without custom projects. Pre-built workflows for common Polish tool combinations save weeks of setup. |
| **Target Client** | Polish SMEs comfortable with Make/n8n/Zapier. Tech-savvy business owners or ops managers who want self-serve automation. |
| **Inputs Required** | Payment (Stripe/Przelewy24). Access to their Make/n8n/Zapier account. API keys for tools used in the template. |
| **Automation Logic** | Each template is a pre-built workflow file (n8n JSON / Make blueprint / Zapier zap) that the customer imports into their own instance. Templates include: (1) The workflow file. (2) Setup guide (PL) with screenshots. (3) Required API permissions checklist. (4) Test data set. (5) Troubleshooting FAQ. |
| **Tooling Stack** | n8n / Make / Zapier (template format), Supabase (catalog), Stripe or Przelewy24 (payments) |
| **Deliverables per template** | 1. Workflow file (JSON/blueprint). 2. Setup guide (PL, PDF or Notion). 3. Demo video (optional). 4. Support: 1 email thread for setup questions. |
| **Minimum viable catalog (REQUIRED to launch)** | 1. KSeF Auto-Sender (n8n: ERP → KSeF). 2. BaseLinker-InPost Tracker (n8n: order status → tracking notification). 3. Invoice Duplicate Detector (n8n: scan invoices for duplicates). 4. Lead Enrichment Pipeline (n8n: new CRM lead → Apollo → score → notify). 5. Slack Daily Digest (n8n: aggregate multiple sources → morning Slack summary). |
| **Maintenance / Support** | Template updates when tool APIs change. New templates monthly. |
| **Failure Modes** | 1. Template breaks after tool API update → version-pin + update cycle. 2. Customer can't configure → offer paid implementation (upsell). 3. Empty catalog → the current state. MUST have 5+ templates before launch. |
| **Pricing Logic** | Individual: 149-499 PLN/template. Membership: 299 PLN/mo (all templates). Implementation service: 2,000+ PLN (template + setup). |

**Verdict: CONDITIONALLY APPROVED — requires minimum 5 real templates before page goes live. Currently NOT deliverable.**

---

## FORGE SPEC 06: Partner Program

| Field | Detail |
|---|---|
| **Service Name** | Program Partnerski (Partner/Referral Program) |
| **Problem Solved** | AutomateForge needs distribution. Accounting firms serve hundreds of SMEs who need KSeF. Referral partnerships create a low-CAC acquisition channel. |
| **Target Client** | Polish accounting firms (biura rachunkowe), IT consultants, automation agencies. |
| **Inputs Required** | Partner registration (name, company, NIP, email). Client referral (introduction or tracked link). |
| **Automation Logic** | Phase 1 (MVP): Manual tracking via Supabase table. Partner submits referral via form. AF team marks conversion manually. Commission calculated monthly in spreadsheet. Paid via bank transfer. Phase 2 (future): Referral links with UTM tracking. Automated commission calculation. Partner dashboard. |
| **Tooling Stack** | Supabase (partner + referral tables), Google Sheets (commission tracking), email (monthly statements) |
| **Deliverables** | 1. Partner onboarding call (30 min). 2. Sales materials (PDF presentation, ROI calculator spreadsheet). 3. Monthly commission statement. 4. Priority client onboarding. |
| **Maintenance / Support** | Monthly commission calculation + payment. Quarterly partner call. Updated sales materials when services change. |
| **Failure Modes** | 1. Attribution disputes → clear referral form with timestamps. 2. Partner churn → minimum quarterly engagement. 3. Commission calculation errors → double-check spreadsheet + partner review before payment. |
| **Pricing Logic** | 15% recurring commission on referred client's monthly payments. No cap. No setup fee for partners. AF pays from margin (still profitable at 15% commission given 60-80% margins on services). |

**Verdict: APPROVED (MVP version) — simplified tracking, no dashboard needed for launch.**

---

## DELETED SERVICES (No Forge Spec possible)

| Service | Reason for deletion |
|---|---|
| AI Act Governance Kit | Cannot define automation logic, deliverables, or tooling. Regulatory expertise not demonstrated. Outside core competency. |
| Managed n8n | Hosting service is a different business model. No pricing, no SLA, no support structure defined. Revisit only after core services are live. |
| GTM Engineering | Duplicates Lead Qualification agent. Vague label with no definition. |
| NIS2 Readiness | Cybersecurity compliance is outside automation/invoicing domain. No expertise demonstrated. |
| Szkolenia AI | No curriculum, no format, no pricing. Training is a fundamentally different delivery model. |
| Audyt Bezpieczenstwa | No methodology, no tooling, not even wired to lead capture. |
| Blog (as a service/feature) | Zero real content. All articles are placeholder titles with `#` links. |
| Newsletter | No backend. Button does nothing. |
