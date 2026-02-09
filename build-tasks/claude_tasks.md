# Phase 5 — Build Tasks for Claude Code

**Rule:** No tasks for removed services. Every task maps to an approved service from Phase 3.

---

## TASK 001

| Field | Value |
|---|---|
| **TASK ID** | AF-001 |
| **SERVICE** | Homepage |
| **ACTION TYPE** | REMOVE |
| **GOAL** | Remove the "Również oferujemy" extra services grid from the homepage |
| **FILES TO TOUCH** | `src/pages/Home/Services.tsx` |
| **IMPLEMENTATION NOTES** | Delete the `EXTRA_SERVICES` array and the entire `<div ref={extraRef}>` section that renders the 6 extra service cards (AI Act, Managed n8n, GTM Engineering, NIS2, Szkolenia AI, Audyt bezpieczenstwa). Keep the 3 main service cards (SERVICES array). Also remove the unused imports (FileCheck, Cpu, ShoppingBag, BarChart3, Users, Lock) if they become orphaned. |
| **ACCEPTANCE CRITERIA** | Homepage shows only 3 main service cards. No "Równiez oferujemy" section visible. No console errors. Build passes. |

---

## TASK 002

| Field | Value |
|---|---|
| **TASK ID** | AF-002 |
| **SERVICE** | Homepage |
| **ACTION TYPE** | REMOVE |
| **GOAL** | Remove fabricated statistics section from homepage |
| **FILES TO TOUCH** | `src/pages/Home/Stats.tsx`, `src/pages/Home/index.tsx` (or wherever Stats is imported) |
| **IMPLEMENTATION NOTES** | Replace the 4 fabricated stats (85% reduction, 3x faster, 24h, 99.9% uptime) with 3 verifiable market stats: (1) "2.5M+" — "Firm objetych obowiazkiem KSeF", (2) Calculate and display days until April 1 2026 dynamically — "Do deadline MSP", (3) "5.9%" — "Adopcja AI w polskim biznesie". Use a dynamic countdown for the deadline stat. |
| **ACCEPTANCE CRITERIA** | Stats section shows 3 verifiable market statistics. Deadline countdown is dynamic (calculates from current date). No fabricated company metrics. Build passes. |

---

## TASK 003

| Field | Value |
|---|---|
| **TASK ID** | AF-003 |
| **SERVICE** | Homepage |
| **ACTION TYPE** | REMOVE |
| **GOAL** | Remove fabricated testimonials section |
| **FILES TO TOUCH** | `src/pages/Home/Testimonials.tsx`, parent component that imports it |
| **IMPLEMENTATION NOTES** | Remove the entire Testimonials component and its import. Do not replace with anything — empty space is better than fake social proof. When real client testimonials are available, this section can be rebuilt. |
| **ACCEPTANCE CRITERIA** | No testimonials section on homepage. No broken imports. Build passes. |

---

## TASK 004

| Field | Value |
|---|---|
| **TASK ID** | AF-004 |
| **SERVICE** | Homepage |
| **ACTION TYPE** | MODIFY |
| **GOAL** | Update homepage CTA section to remove template references and overpromises |
| **FILES TO TOUCH** | `src/pages/Home/CTA.tsx`, `src/pages/Home/Hero.tsx` |
| **IMPLEMENTATION NOTES** | In CTA.tsx: Change copy from "Pokaz nam swoje procesy, a my pokarzemy Ci 10 automatyzacji, ktore zmienia Twoj biznes" to "Pokaz nam swoje procesy, a my pokarzemy Ci konkretne mozliwosci automatyzacji". Remove the "Przegladaj szablony" secondary CTA button. In Hero.tsx: Change the secondary CTA from "Przegladaj szablony" (linking to /templates) to "Sprawdz gotowość KSeF" (linking to /ksef) or "Poznaj AI Agents" (linking to /agents). |
| **ACCEPTANCE CRITERIA** | No references to templates on homepage. No "10 automatyzacji" claim. CTAs link to existing, real pages only. |

---

## TASK 005

| Field | Value |
|---|---|
| **TASK ID** | AF-005 |
| **SERVICE** | AI Agents |
| **ACTION TYPE** | MODIFY |
| **GOAL** | Narrow agent page from 6 agents to 3 launch agents, remove fabricated metrics |
| **FILES TO TOUCH** | `src/pages/Agents.tsx` |
| **IMPLEMENTATION NOTES** | In the AGENTS array, keep only 3 entries: Email Triage (Triage maili), Lead Qualification (Kwalifikacja leadow), Cost Control (Kontrola kosztow). Remove: L1 Customer Service, Document Analysis, HR Onboarding. For the remaining 3 agents, change the `stats` and `accuracy` fields from fabricated numbers to capability descriptions. For example: Email Triage: stats → "Klasyfikacja i routing" , accuracy → "Z czlowiekiem w petli". Lead Qualification: stats → "Research + scoring + routing", accuracy → "Automatyczny follow-up". Cost Control: stats → "Anomalie, duplikaty, budzety", accuracy → "Alerty w czasie rzeczywistym". |
| **ACCEPTANCE CRITERIA** | Agents page shows exactly 3 agent cards. No fabricated metrics (no "15,000+", "94%", "3x", "85%", "70%", "99.2%", "10x", "97%", "90%"). Grid layout still looks good with 3 cards. Build passes. |

---

## TASK 006

| Field | Value |
|---|---|
| **TASK ID** | AF-006 |
| **SERVICE** | Templates |
| **ACTION TYPE** | REMOVE |
| **GOAL** | Remove or replace the templates page with a "coming soon" placeholder |
| **FILES TO TOUCH** | `src/pages/Templates.tsx`, `src/App.tsx` |
| **IMPLEMENTATION NOTES** | Option A (preferred): Replace Templates.tsx content with a simple "coming soon" page that has: heading "Szablony automatyzacji — wkrotce", a brief description, and an email capture field (insert to Supabase leads table with service='templates-waitlist'). Option B: Remove /templates route entirely from App.tsx. Either way, ensure no navigation links point to /templates as a functioning marketplace. |
| **ACCEPTANCE CRITERIA** | Visiting /templates shows either a clean "coming soon" page or redirects to homepage. No empty marketplace grid. No fictional "top sellers" visible. |

---

## TASK 007

| Field | Value |
|---|---|
| **TASK ID** | AF-007 |
| **SERVICE** | Blog |
| **ACTION TYPE** | REMOVE |
| **GOAL** | Remove the fake blog page |
| **FILES TO TOUCH** | `src/pages/Blog.tsx`, `src/App.tsx` |
| **IMPLEMENTATION NOTES** | Remove the /blog route from App.tsx. Remove Blog.tsx or replace with a redirect. Remove any navigation links to /blog from Header and Footer components. The blog can be rebuilt when real content exists. |
| **ACCEPTANCE CRITERIA** | No /blog route accessible. No blog links in navigation. No fake articles visible anywhere. Build passes. |

---

## TASK 008

| Field | Value |
|---|---|
| **TASK ID** | AF-008 |
| **SERVICE** | Contact |
| **ACTION TYPE** | MODIFY |
| **GOAL** | Remove deleted services from contact form dropdown |
| **FILES TO TOUCH** | `src/pages/Contact.tsx` |
| **IMPLEMENTATION NOTES** | In the SERVICES array, remove: `{ value: 'managed-n8n', label: 'Managed n8n' }`, `{ value: 'ai-act', label: 'AI Act Governance' }`, `{ value: 'nis2', label: 'NIS2 Readiness' }`, `{ value: 'gtm', label: 'GTM Engineering' }`. Keep: ksef, agents, templates, general. Optionally add: `{ value: 'partner', label: 'Program partnerski' }`. |
| **ACCEPTANCE CRITERIA** | Contact form dropdown shows only: KSeF Studio, AI Agents, Szablony automatyzacji, Program partnerski, Inne/Nie wiem jeszcze. No removed services visible. Form still submits correctly to Supabase. |

---

## TASK 009

| Field | Value |
|---|---|
| **TASK ID** | AF-009 |
| **SERVICE** | Navigation |
| **ACTION TYPE** | MODIFY |
| **GOAL** | Update site navigation to reflect approved pages only |
| **FILES TO TOUCH** | `src/components/Header.tsx`, `src/components/Footer.tsx` (if exists) |
| **IMPLEMENTATION NOTES** | Navigation should include: Home (/), KSeF Studio (/ksef), AI Agents (/agents), Partnerzy (/partnerzy), Kontakt (/kontakt). Remove any links to /templates and /blog. If footer has separate navigation, update it to match. |
| **ACCEPTANCE CRITERIA** | Navigation shows only approved pages. No dead links. Mobile and desktop navigation both updated. |

---

## TASK 010

| Field | Value |
|---|---|
| **TASK ID** | AF-010 |
| **SERVICE** | Newsletter |
| **ACTION TYPE** | MODIFY |
| **GOAL** | Either wire newsletter signup to Supabase or remove it |
| **FILES TO TOUCH** | `src/pages/Blog.tsx` (if blog is kept), or wherever newsletter CTA appears |
| **IMPLEMENTATION NOTES** | If blog page is removed (per AF-007), newsletter CTA goes with it. If any newsletter CTA survives elsewhere: wire the email input to insert into Supabase `leads` table with service='newsletter'. Add success/error states. Without a backend handler, the button must not be clickable or visible. |
| **ACCEPTANCE CRITERIA** | No non-functional newsletter signup forms anywhere on the site. Either the form works (writes to Supabase) or it doesn't exist. |

---

## TASK 011

| Field | Value |
|---|---|
| **TASK ID** | AF-011 |
| **SERVICE** | KSeF Studio |
| **ACTION TYPE** | MODIFY |
| **GOAL** | Verify and fix KSeF page bonus deliverables |
| **FILES TO TOUCH** | `src/pages/KSeF.tsx` |
| **IMPLEMENTATION NOTES** | The Pro tier claims bonuses worth 3,797 PLN: "Audyt gotowosci KSeF" (1,500), "Szablon polityki e-fakturowania" (800), "Checklisty walidacji JPK" (500), "Nagranie wideo KSeF od A do Z" (997). Verify each bonus can actually be delivered. If the video doesn't exist and won't be created before launch, remove it from the bonus list. Update totalBonusValue calculation accordingly. |
| **ACCEPTANCE CRITERIA** | Every listed bonus is either deliverable or removed. Bonus values and total are mathematically correct. |

---

## TASK 012

| Field | Value |
|---|---|
| **TASK ID** | AF-012 |
| **SERVICE** | Partners |
| **ACTION TYPE** | MODIFY |
| **GOAL** | Fix partner page stats and add partner routing to contact form |
| **FILES TO TOUCH** | `src/pages/Partners.tsx`, `src/pages/Contact.tsx` |
| **IMPLEMENTATION NOTES** | On Partners.tsx: If "5+ aktywnych partnerstw" is not factual, change stat to "Dolacz jako jeden z pierwszych partnerow" or similar honest framing. Ensure partner CTA links to /kontakt. On Contact.tsx: If not already done in AF-008, add { value: 'partner', label: 'Program partnerski' } to the SERVICES dropdown. |
| **ACCEPTANCE CRITERIA** | Partner page stats are honest. Partner interest can be captured through contact form with proper routing. |

---

## Task Execution Order

**Batch 1 (removals — can be done in parallel):**
- AF-001: Remove extra services grid
- AF-002: Replace fabricated stats
- AF-003: Remove fake testimonials
- AF-007: Remove fake blog

**Batch 2 (modifications — can be done in parallel):**
- AF-004: Update homepage CTAs
- AF-005: Narrow agents to 3
- AF-006: Replace templates page
- AF-008: Clean contact form dropdown
- AF-009: Update navigation

**Batch 3 (verification):**
- AF-010: Wire or remove newsletter
- AF-011: Verify KSeF bonuses
- AF-012: Fix partner page

**Post-build:** Run `npm run build` and `npm run typecheck` to verify no errors.
