# SEO ProFaceApp - Quick Reference Card

**Print this or keep it in your notes. Updated 16 Juin 2026**

---

## SITUATION RAPIDE

| | Valeur | Status |
|---|---|---|
| **Crise** | 83% non-indexé | 🔴 CRITICAL |
| **Opportunité** | 1.7M/mois recherches | 🟢 HIGH |
| **Impact potentiel** | +$50K-150K/mois | 💰 MAJOR |
| **Timeline** | 12 semaines | ⏰ MEDIUM |

---

## 4 SOLUTIONS IMMÉDIATES

### 1️⃣ DÉBLOQUER INDEXATION (3 heures)
```
Créer: robots.txt + sitemap.ts + meta tags optimisés
Impact: 5 pages from "erreur" to "indexed" (week 2-3)
Gain: +500k impressions potential
Status: 🟢 Simple, High ROI
```

### 2️⃣ AMÉLIORER CTR (2 heures)
```
Optimiser: Titles + Meta descriptions (5 pages)
Impact: 0.67% CTR → 1.5-2% (+200%)
Gain: +400-700 trafic/month
Status: 🟢 Quick, Proven
```

### 3️⃣ LANDING PAGE HEADSHOTS (6 heures)
```
Créer: /ai-headshots avec hero, use cases, FAQ
Impact: Rank pour 120k/mois keyword
Gain: 2,000-5,000 trafic/month (week 8+)
Status: 🟡 Medium effort, High payoff
```

### 4️⃣ CONTENU SPÉCIALISÉ (80 heures)
```
Créer: 3 landings + 24 blog posts
Impact: Cover 256k/mois recherches additionnelles
Gain: +5,000-8,000 trafic/month (week 12)
Status: 🟠 Long-term, Huge impact
```

---

## GAIN PAR PHASE

```
PHASE 1 (Week 2)     → 5 pages indexées, +500k impressions potential
PHASE 2 (Week 4)     → CTR +200%, +400-700 trafic
PHASE 3 (Week 8)     → /ai-headshots ranking, +2-3k trafic
PHASE 4 (Week 12)    → 24 blogs live, +5-8k trafic
PHASE 5 (Week 20)    → Backlinks + authority, +15-25k trafic TOTAL
```

---

## CHECKLIST WEEK 1

- [ ] Read SEO_IMPLEMENTATION_GUIDE.md (30 min)
- [ ] Review SEO_CODE_TEMPLATES.md (20 min)
- [ ] Assign dev owner (5 min)
- [ ] Create GitHub issue (10 min)
- [ ] Establish baseline (GSC screenshots) (15 min)
- [ ] Implement Phase 1 (3-4 hours):
  - [ ] Create /public/robots.txt
  - [ ] Create /src/app/sitemap.ts
  - [ ] Update /src/app/layout.tsx
- [ ] Deploy + validate (1 hour):
  - [ ] curl robots.txt
  - [ ] curl sitemap.xml
  - [ ] Test /ai-headshots once phase 2 ready
- [ ] Submit to GSC (5 min):
  - [ ] Request indexing for 5 non-indexed pages

**Total: ~5 hours for full phase 1 implementation**

---

## 3 KEYWORDS TO OWN

| Keyword | Volume | Position | CTR | Target |
|---------|--------|----------|-----|--------|
| **ai headshot generator** | 120k | 64 | 0.67% | 10-20 |
| **ai image generator** | 450k | 43 | 0.65% | 20-30 |
| **ai photo generator** | 280k | 57 | 0.59% | 20-30 |

---

## 5 META TAG TEMPLATES

**Applied to homepage + future pages:**

| # | Title | Meta | Niche |
|---|-------|------|-------|
| 1️⃣ | "AI Headshot Generator: Studio Photos in 90s" | "Generate pro AI headshots in 90 seconds. 4 models, free trial, no photographer needed." | Generic |
| 2️⃣ | "Professional AI Headshots for LinkedIn" | "Create stunning LinkedIn AI headshots in seconds. Studio quality, free trial, used by 50k+" | LinkedIn |
| 3️⃣ | "Best AI Headshots for Real Estate Agents" | "Generate professional real estate headshots. MLS-ready, no photoshoot needed. Used by 5k+ agents." | Real Estate |
| 4️⃣ | "Professional Headshots for Lawyers" | "Professional legal headshots with AI. Authority & trust for law firms. Team photos in 90 seconds." | Legal |
| 5️⃣ | "AI Headshots for Finance Professionals" | "Professional AI headshots for bankers & advisors. Authority building, fast generation, affordable." | Finance |

---

## PAGE STRUCTURE TEMPLATE

**Every landing page should have:**

```
1. NAVIGATION (back link)

2. HERO SECTION
   - H1: Primary keyword
   - Subtitle: Benefit + social proof
   - 2 CTA buttons
   - Social proof: ratings, user count, time

3. FEATURED SECTION
   - Video or before/after images
   - Headline: "See It in Action"

4. USE CASES / VALUE PROPS (6 items)
   - 3-column grid
   - Each with icon + title + description

5. PRODUCT FEATURES
   - AI models section (show all 4)
   - Interactive model selector

6. STATS / SOCIAL PROOF
   - 3 stat blocks (50K+, 90s, 4.8★)
   - Testimonial or review count

7. FAQ SECTION (5-8 Q&A)
   - Schema: FAQPage JSON-LD
   - Keyword optimized questions
   - 150-200 word answers

8. FINAL CTA
   - Large button
   - Emotional benefit copy

9. FOOTER
   - Links to policy pages
   - Copyright
```

---

## INTERNAL LINKING MAP

```
/ai-headshots (PILLAR - Priority 1)
    ↓ from: homepage, blog articles
    ↓ links to: FAQ section
    
    /blog/ai-headshots-vs-photography
        ↓ links back to: /ai-headshots pillar
        ↓ links to: use cases below
        
    /ai-headshots/real-estate (CLUSTER 1)
        ↓ from: blog articles about real estate
        
    /ai-headshots/legal (CLUSTER 2)
        ↓ from: blog articles about lawyers
        
    /ai-headshots/finance (CLUSTER 3)
        ↓ from: blog articles about finance
        
    /blog/how-to-generate-ai-headshots
        ↓ links: /ai-headshots, /ai-headshots/real-estate, etc
```

---

## CONTENT CALENDAR

**Week 5-6:** Real Estate + Legal landings  
**Week 7-8:** Articles 1-4 (AI Headshots for Professionals pillar)  
**Week 9-10:** Articles 5-8 + Real Estate + Legal articles  
**Week 11-12:** Articles 9-24 + Internal linking pass  

Total: 24 articles, 2,000-2,500 words each

---

## TOOLS NEEDED

| Tool | Cost | Purpose | Link |
|------|------|---------|------|
| Google Search Console | Free | Monitor indexation | console.search.google.com |
| Google Analytics 4 | Free | Track traffic | analytics.google.com |
| Schema Validator | Free | Validate JSON-LD | schema.org/validate |
| PageSpeed Insights | Free | Core Web Vitals | pagespeed.web.dev |
| Ahrefs (optional) | $100/mo | Backlinks + keywords | ahrefs.com |
| SEMrush (optional) | $120/mo | Competitor analysis | semrush.com |

---

## EXPECTED RESULTS BY WEEK

```
Week 1  → Setup + indexation begun
Week 2  → 5 pages pending index
Week 4  → /ai-headshots live, baseline established
Week 8  → /ai-headshots ranking 40-50, +2k trafic
Week 12 → 24 blogs live, position 20-30, +5-8k trafic
Week 20 → Top 10 for "ai headshots", +15-25k trafic
```

---

## OWNER ASSIGNMENTS

| Phase | Owner | Hours/Week | Notes |
|-------|-------|-----------|-------|
| 1: Indexation | Dev Lead | 3-4 | Week 1 only |
| 2: Meta tags | Dev Lead | 1-2 | Week 2-3 |
| 3: /ai-headshots | Dev + Designer | 3-4 | Week 3-4 |
| 4: Blog content | Content Writer | 10-12 | Week 5-12 |
| 5: Backlinks | SEO Person | 5-7 | Week 13+ |
| Overall Monitor | SEO Person | 5/week | All 12 weeks |

---

## QUICK GAINS (RANKED BY ROI)

| Gain | Effort | Timeline | Impact |
|------|--------|----------|--------|
| 🥇 Fix robots.txt | 20 min | Week 1 | +500k impressions potential |
| 🥇 Add sitemap.ts | 40 min | Week 1 | +5 pages indexed |
| 🥈 Optimize meta tags | 2 hrs | Week 2 | +200% CTR, +400-700 trafic |
| 🥈 Add schema markup | 1 hr | Week 2 | +20-30% CTR (rich snippets) |
| 🥉 Create /ai-headshots | 6 hrs | Week 3-4 | +2-5k trafic (delayed to week 8) |

---

## 3 REASONS WHY THIS WILL WORK

1. **Simple foundation:** No robots.txt = Google can't index. Fix it → automatic gain.

2. **High intent keyword:** "ai headshots" searches = people WANT headshots, not casual browsers.

3. **Proven differentiation:** ProFaceApp = Speed (90s) + Specialization (headshots) + Price ($4.99). Competitors don't have this combo.

---

## RISK MITIGATION

| Risk | Mitigation |
|------|-----------|
| Product quality low | Ensure headshot generation works perfectly before SEO push |
| Slow implementation | Assign dedicated owner, weekly sync |
| Low conversion | Test pricing, landing page UX, onboarding flow in parallel |
| Algorithm update | Diversify keywords, maintain content quality, focus on E-E-A-T |

---

## WEEKLY TRACKING

**Every Friday, track:**
- GSC Coverage: Total indexed pages (target: 1→6)
- GSC Impressions: Month-to-date (target: 50-100→500-1,000)
- GSC Top queries: Position changes for 3 focus keywords
- Analytics: Organic traffic YoY (target: 300-500→5k+ by week 12)
- Ranking: "ai headshots" position (daily tracking recommended)

---

## DECISION GATE

**After Week 2:**
- Are 5 pages now "pending index"? ✅ Continue
- Is robots.txt/sitemap live? ✅ Continue
- No showstoppers? ✅ Proceed to Phase 2

**If NO:**
- Debug issue
- Don't move forward until Phase 1 resolved
- Escalate if needed

---

## LONG-TERM (6 MONTHS)

```
Month 1-2: Consolidate indexation, optimize CTR, launch /ai-headshots
Month 3-4: Blog content series, 3 specialized landings, internal linking
Month 5-6: Backlinks campaign, authority building, top 10 for main keyword

Result: 300-500 → 20,000-35,000 trafic/month
        0% CTR problem → Solved
        Dominating niche → AI Headshots for professionals
        Revenue impact → +$50K-150K/month
```

---

## FINAL NOTES

- **Start this week.** Every week of delay = 7 days less ranking time.
- **Phase 1 is P0.** Everything else depends on indexation.
- **Measure obsessively.** GSC is your best friend.
- **Quality first.** Good headshots → conversions → revenue.

---

**Questions? Check SEO_IMPLEMENTATION_GUIDE.md for details.**  
**Ready to code? Check SEO_CODE_TEMPLATES.md for copy-paste.**  
**Need executive brief? Read SEO_EXECUTIVE_SUMMARY.md**

**Let's build this. 🚀**
