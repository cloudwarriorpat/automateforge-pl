# Phase 4 — Website Alignment Audit

**Scope:** Audit every page and section of automateforge.pl against the approved service catalog from Phase 3.

---

## Page-by-Page Audit

### 1. Homepage (`/`)

#### Hero Section (`src/pages/Home/Hero.tsx`)
| Element | Issue | Action |
|---------|-------|--------|
| Headline: "Automatyzujemy procesy. Przyspieszamy wzrost." | Generic. Doesn't communicate what AutomateForge actually does. | **MODIFY** — Make specific: lead with KSeF compliance + AI agents |
| Badge: "KSeF deadline: 1 kwietnia 2026 dla MSP" | Good — urgent, specific, true. | **KEEP** |
| Badge: "Kuznia automatyzacji dla polskiego biznesu" | Generic tagline, fine. | **KEEP** |
| Stat: "Adopcja AI w Polsce: zaledwie 5.9%" | Good market context. Verifiable. | **KEEP** |
| Stat: "2.5M+ firm musi wdrozyc KSeF" | Good. Verifiable. | **KEEP** |
| CTA: "Bezplatny audyt 30 min" | Good — clear offer. But leads to generic contact form with no audit-specific messaging. | **MODIFY** — improve contact form for audit flow |
| CTA: "Przegladaj szablony" | Links to empty template page. | **REMOVE** until templates exist. Replace with "Sprawdz gotowość KSeF" or similar. |

#### Stats Section (`src/pages/Home/Stats.tsx`)
| Element | Issue | Action |
|---------|-------|--------|
| "85% Redukcja czasu manualnej pracy" | Fabricated metric. No client base. No source. | **REMOVE** |
| "3x Szybsze przetwarzanie faktur" | Fabricated. | **REMOVE** |
| "24h Od leada do rozmowy handlowej" | Aspirational, not achieved. | **REMOVE** |
| "99.9% Uptime monitorowanych procesow" | No monitoring system exists. | **REMOVE** |

**Recommended replacement:** Market statistics that are verifiable:
- "2.5M+ firm musi wdrozyc KSeF" (already on hero)
- "52 dni do deadline MSP" (countdown, dynamic)
- "5.9% adopcja AI w polskich firmach" (market gap)
- "~42 000 podmiotow objetych NIS2" (or remove if NIS2 service is cut)

Actually, with NIS2 removed, use 3 stats max:
1. "2.5M+" — Firm objetych obowiazkiem KSeF
2. "52 dni" — Do deadline dla MSP (dynamic countdown)
3. "5.9%" — Adopcja AI w polskim biznesie

#### Services Section (`src/pages/Home/Services.tsx`)
| Element | Issue | Action |
|---------|-------|--------|
| KSeF Studio card | Good — links to `/ksef` which is the most complete page. | **KEEP** |
| AI Agents card | Good — links to `/agents`. | **KEEP** |
| Szablony card | Links to empty marketplace. | **REMOVE** until templates exist, OR keep with "Wkrotce" badge and no link |
| "Równiez oferujemy" grid (6 items) | ALL 6 extra services are removed per audit. | **REMOVE ENTIRE SECTION** |

The 6 items to remove:
- AI Act Governance Kit
- Managed n8n
- GTM Engineering
- NIS2 Readiness
- Szkolenia AI
- Audyt bezpieczenstwa

#### Process Section (`src/pages/Home/Process.tsx`)
| Element | Issue | Action |
|---------|-------|--------|
| 4-step process | Good — Audyt→Diagnoza→Pakiet→Wdrozenie is honest and clear. | **KEEP** |
| "Dostajesz raport z ROI w 48h" | Only honest if the report generator exists. It does not. | **MODIFY** — soften to "Dostajesz raport z rekomendacjami" or build the report generator |

#### Testimonials Section (`src/pages/Home/Testimonials.tsx`)
| Element | Issue | Action |
|---------|-------|--------|
| All 3 testimonials | Fabricated names and companies. | **REMOVE ENTIRE SECTION** |

Replace with: nothing (empty is better than fake), OR a "Jak pracujemy" section showing the actual process with screenshots/diagrams.

#### CTA Section (`src/pages/Home/CTA.tsx`)
| Element | Issue | Action |
|---------|-------|--------|
| "Pokaz nam swoje procesy, a my pokazemy Ci 10 automatyzacji" | Overpromise — "10 automatyzacji" is specific and implies a comprehensive analysis that doesn't exist. | **MODIFY** — "Pokaz nam swoje procesy, a my pokarzemy Ci konkretne mozliwosci automatyzacji" |
| CTA: "Przegladaj szablony" | Empty marketplace. | **REMOVE** |

---

### 2. KSeF Page (`/ksef`)

| Element | Issue | Action |
|---------|-------|--------|
| Hero + deadline urgency | Excellent — specific, urgent, honest. | **KEEP** |
| Timeline section | Good — factual KSeF dates. | **KEEP** |
| 6 Features grid | All features are deliverable services (integration, monitoring, validation, error handling, security, reporting). | **KEEP** |
| Pricing (3 tiers) | Well-structured. Prices are reasonable for market. | **KEEP** |
| Bonuses (Pro tier) | "Audyt gotowosci KSeF" (1,500), "Szablon polityki" (800), "Checklisty walidacji" (500), "Nagranie video" (997) — do these exist? | **AUDIT** — bonuses must actually be deliverable. If the video doesn't exist, remove it. |
| Guarantee section | 90-day results guarantee, satisfaction guarantee, timeline guarantee. Bold but differentiating. | **KEEP** — but ensure legal review of guarantee terms. |
| Final CTA | Good — "Nie czekaj na deadline" is honest urgency. | **KEEP** |

**KSeF page verdict:** Best page on the site. Minimal changes needed. Main risk: bonuses may not exist yet.

---

### 3. AI Agents Page (`/agents`)

| Element | Issue | Action |
|---------|-------|--------|
| Hero | Good positioning. | **KEEP** |
| Problem stats (5-15K/mo, 30+ hours, 5.9%) | Market-level stats, not company claims. Acceptable. | **KEEP** |
| 6 Agent cards | Per Phase 3, only 3 agents launch initially. | **MODIFY** — show 3 launch agents prominently, show other 3 as "Wkrotce" or remove |
| Specific metrics per agent | "15,000+ maili/mies." "94% trafnosc" "3x wiecej SQL" — these are fabricated benchmarks. | **MODIFY** — change to capability descriptions, not claimed results. E.g., "Klasyfikacja maili" instead of "15,000+ maili/mies." |
| Process (4 steps) | Good — honest about discovery→design→build→monitor. | **KEEP** |
| Pricing (3 tiers) | Well-structured. | **KEEP** |
| Guarantee section | Same as KSeF page. | **KEEP** |

**Agents page verdict:** Good structure. Needs metric cleanup (remove fabricated numbers) and agent count reduction (3 not 6).

---

### 4. Templates Page (`/templates`)

| Element | Issue | Action |
|---------|-------|--------|
| Entire page | Empty marketplace. Templates table has zero rows. "Top sellers" are fictional products. | **REMOVE PAGE** until minimum 5 templates exist |

**Alternative:** Replace with a "Wkrotce" landing page that collects emails for notification when templates launch.

---

### 5. Contact Page (`/kontakt`)

| Element | Issue | Action |
|---------|-------|--------|
| Contact form | Works — inserts into Supabase `leads` table. | **KEEP** |
| Service dropdown | Lists removed services: Managed n8n, AI Act Governance, NIS2 Readiness, GTM Engineering. | **MODIFY** — remove deleted services from dropdown |
| "Odpowiadamy w 24h" | Promise — must be honored. | **KEEP** (with operational commitment) |
| Process steps | Good. | **KEEP** |
| Contact info | kontakt@automateforge.pl, Warszawa. | **KEEP** |

---

### 6. Partners Page (`/partnerzy`)

| Element | Issue | Action |
|---------|-------|--------|
| Program concept | Good — targeting accounting firms is strategically sound. | **KEEP** |
| "5+ aktywnych partnerstw" | Is this true? If not, remove specific numbers. | **VERIFY** — if fabricated, change to "Dolacz jako jeden z pierwszych partnerow" |
| Earnings calculator | Good — transparent commission math. | **KEEP** |
| Benefits (6 items) | "Bezplatna integracja KSeF" for partners' clients — can this be honored? | **VERIFY** — ensure this is factored into pricing model |
| CTA → contact form | No dedicated partner form. Uses generic contact form. | **MODIFY** — add partner-specific routing to the contact form, or add "partner" as a service option |

---

### 7. Blog Page (`/blog`)

| Element | Issue | Action |
|---------|-------|--------|
| Entire page | Fake blog. 6 titles with no content. All links go to `#`. Non-functional category filter. | **REMOVE PAGE** from navigation until real articles exist |

---

### 8. Navigation / Header (`src/components/Header.tsx`)

| Element | Issue | Action |
|---------|-------|--------|
| Nav links | Likely includes links to Templates, Blog, Partners. | **MODIFY** — remove Templates link (until launch), remove Blog link |
| Remaining nav | Home, KSeF, AI Agents, Kontakt, Partnerzy. | **KEEP** |

---

### 9. Footer (`src/components/Footer.tsx`)

| Element | Issue | Action |
|---------|-------|--------|
| Links to removed pages | Must be updated to match nav changes. | **MODIFY** — remove links to Templates, Blog |
| Social links | Unknown if they exist. | **VERIFY** |

---

## Summary of Gaps

### Pages to REMOVE (or hide):
1. `/templates` — empty marketplace
2. `/blog` — fake content

### Sections to REMOVE:
1. Homepage Stats section (fabricated metrics)
2. Homepage "Również oferujemy" extra services grid (6 removed services)
3. Homepage Testimonials section (fabricated)
4. Homepage CTA "Przegladaj szablony" button

### Elements to MODIFY:
1. Homepage hero — make headline more specific
2. Homepage CTA copy — remove "10 automatyzacji" overpromise
3. Agents page — reduce from 6 to 3 agent cards, remove fabricated metrics
4. Contact form service dropdown — remove deleted services
5. Partners page stats — verify "5+ partnerships" claim
6. Navigation — remove Templates and Blog links
7. Footer — match navigation changes

### Trust Elements MISSING:
1. No "How it works" technical transparency (how integrations actually function)
2. No case studies or real results
3. No team/founder visibility
4. No legal pages (privacy policy, terms of service)
5. No social proof (when real clients exist, add logos + quotes)
