# SEO Validation Checklist - ProFaceApp

**Use this checklist after each deployment to ensure quality.**

---

## PHASE 1: TECHNICAL AUDIT (Post-Deployment)

### robots.txt Validation

```bash
# Test 1: File exists
curl -I https://profaceapp.com/robots.txt
# Expected: HTTP 200

# Test 2: Content is correct
curl https://profaceapp.com/robots.txt | grep "User-agent"
# Expected: User-agent: *

# Test 3: Blocking rules
curl https://profaceapp.com/robots.txt | grep "Disallow"
# Expected: /dashboard, /api, /auth, etc
```

**Checklist:**
- [ ] Returns HTTP 200
- [ ] Has User-agent: *
- [ ] Has Allow: / for public content
- [ ] Disallows: /dashboard, /api, /auth
- [ ] References sitemap.xml

---

### sitemap.xml Validation

```bash
# Test 1: File exists
curl -I https://profaceapp.com/sitemap.xml
# Expected: HTTP 200

# Test 2: Valid XML
curl https://profaceapp.com/sitemap.xml | head -5
# Expected: <?xml version="1.0"?>

# Test 3: Count URLs
curl https://profaceapp.com/sitemap.xml | grep -o "<loc>" | wc -l
# Expected: 5+ (homepage + 4 static pages minimum)
```

**Checklist:**
- [ ] Returns HTTP 200
- [ ] Valid XML format
- [ ] Contains <loc> tags for each page
- [ ] Includes priority (0.0-1.0)
- [ ] Includes changeFrequency
- [ ] Includes lastModified date

---

### Metadata Validation

**Test Homepage:**

```bash
curl https://profaceapp.com | grep -o '<title>.*</title>'
# Should show: "AI Headshot Generator: Studio Photos in 90 Seconds..."

curl https://profaceapp.com | grep -o '<meta name="description".*>'
# Should show optimized meta description
```

**Checklist:**
- [ ] `<title>` contains primary keyword
- [ ] `<title>` includes brand name
- [ ] `<title>` under 60 characters (display ideal)
- [ ] `<meta name="description">` present
- [ ] `<meta description>` 150-160 characters
- [ ] `<meta name="robots">` has index=true
- [ ] OpenGraph tags present (og:title, og:description)
- [ ] OpenGraph image set

---

### Schema Markup Validation

**Test JSON-LD:**

```bash
# Extract script tags
curl https://profaceapp.com | grep -A 20 'application/ld+json'

# Validate at: https://schema.org/validate
# Paste entire page HTML
# Or use: https://validator.schema.org/
```

**Checklist:**
- [ ] SoftwareApplication schema present
- [ ] ratingValue = 4.8
- [ ] ratingCount = 5000+
- [ ] offers.price set
- [ ] offers.priceCurrency = "USD"
- [ ] applicationCategory = "BusinessApplication"
- [ ] Schema validator shows 0 errors
- [ ] Schema validator shows 0 warnings

**FAQ Schema (if applicable):**

```bash
curl https://profaceapp.com/ai-headshots | grep -A 5 'FAQPage'
```

**Checklist:**
- [ ] @type = "FAQPage"
- [ ] mainEntity array contains 5+ questions
- [ ] Each question has @type = "Question"
- [ ] Each answer has @type = "Answer"
- [ ] Answers are 150-300 words (good snippet content)

---

### Core Web Vitals Check

**Test with PageSpeed Insights:**

```
URL: https://www.pagespeed.web.dev/
Input: https://profaceapp.com
```

**Checklist:**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Overall score: 75+

**Common fixes:**
- Image optimization: https://tinypng.com
- Lazy loading: Add `loading="lazy"` to images
- Code splitting: Dynamic imports for heavy JS

---

### Mobile-Friendly Test

**Test at:**
```
https://search.google.com/test/mobile-friendly
```

**Checklist:**
- [ ] "Page is mobile-friendly" ✅
- [ ] Text is readable on mobile
- [ ] Tap targets are large enough (48x48px)
- [ ] Viewport meta tag present
- [ ] No mobile-specific errors

---

### Canonical & Redirect Test

**Test redirects:**

```bash
# Homepage redirect
curl -I https://profaceapp.com
# Should be: HTTP 200 (no redirect)

# Non-existent page
curl -I https://profaceapp.com/nonexistent
# Should be: HTTP 404 or redirect to homepage

# Trailing slash
curl -I https://profaceapp.com/
curl -I https://profaceapp.com
# Both should return 200 (no redirect loop)
```

**Checklist:**
- [ ] Homepage loads without redirect
- [ ] 404 pages return 404 (not 200)
- [ ] No redirect loops
- [ ] Trailing slash consistency (/ or no /?)

---

## PHASE 2: GOOGLE SEARCH CONSOLE (Week 1-2)

### Initial Setup

**Checklist:**
- [ ] Property added to GSC
- [ ] Sitemap submitted: https://profaceapp.com/sitemap.xml
- [ ] robots.txt verified
- [ ] No crawl errors visible

### Coverage Report

**Monitor in GSC → Coverage:**

| Status | Week 0 | Week 2 | Week 4 |
|--------|--------|--------|--------|
| Indexed | 1 | 3-4 | 5-6 |
| Pending | 0 | 2-3 | 0-1 |
| Excluded | 0 | 0 | 0 |
| Error | 5 | 0 | 0 |

**Checklist:**
- [ ] Total indexed pages increasing
- [ ] Pending index items decreasing
- [ ] No new errors appearing
- [ ] All 5 previously non-indexed pages in "Pending" by week 2

### URL Inspection Tool

**For each major page, check:**

```
GSC → URL Inspection → https://profaceapp.com/ai-headshots
```

**Checklist:**
- [ ] Page indexable: "URL is indexed" ✅
- [ ] Coverage state: "Page is indexed"
- [ ] Crawl details: "Last crawled: [recent date]"
- [ ] Mobile-friendly: ✅
- [ ] No core web vitals issues
- [ ] Rich results: "Featured snippet eligible"

---

## PHASE 3: META TAGS & CTR MONITORING (Week 2-4)

### Search Results Preview

**Test how page appears in Google:**

```bash
# Use Google's preview tool
# Search: site:profaceapp.com
# Look at title/description rendering

# Or use: https://www.google.com/search?q=site:profaceapp.com+ai+headshots
```

**Checklist:**
- [ ] Title displays fully (not truncated)
- [ ] Meta description displays fully
- [ ] No weird characters (Ã©, etc)
- [ ] Title includes keyword
- [ ] Description includes key benefit

### CTR Tracking (Google Search Console)

**GSC → Performance:**

| Metric | Week 0 | Week 4 | Target |
|--------|--------|--------|--------|
| Impressions | 50-100 | 200-300 | 500+ |
| Clicks | 0-1 | 1-3 | 5-10 |
| CTR | 0.67% | 0.8-1.2% | 1.5-2% |

**Checklist:**
- [ ] Baseline CTR recorded (Week 0)
- [ ] CTR tracked weekly
- [ ] Impressions increasing over time
- [ ] CTR trend: flat or improving (not declining)

### Position Changes

**Track top keywords:**

```
GSC → Performance → Queries (sorted by impressions)
```

**Expected movement (4 weeks):**

| Keyword | Week 0 | Week 4 |
|---------|--------|--------|
| ai headshot generator | 64 | 50-60 |
| ai image generator | 43 | 40-50 |
| ai photo generator | 57 | 45-55 |

**Checklist:**
- [ ] Position 64 → moving toward 50 ✅
- [ ] No drastic drops (if it happens, investigate)
- [ ] Impressions + clicks both growing
- [ ] New keywords appearing (long-tail variations)

---

## PHASE 4: LANDING PAGE VALIDATION (/ai-headshots)

### Page Load & Rendering

```bash
# Test page exists
curl -I https://profaceapp.com/ai-headshots
# Expected: HTTP 200

# Test HTML structure
curl https://profaceapp.com/ai-headshots | grep "<h1>"
# Expected: <h1>Generate Professional AI Headshots...</h1>
```

**Checklist:**
- [ ] Page returns HTTP 200
- [ ] Page loads in < 3 seconds
- [ ] H1 tag present and contains primary keyword
- [ ] All sections render correctly

### On-Page SEO Checklist

```
Checklist for /ai-headshots page:
```

- [ ] **H1 present:** "Generate Professional AI Headshots in 90 Seconds"
- [ ] **Meta title optimized:** "AI Headshot Generator: Professional Photos..."
- [ ] **Meta description:** "Create professional AI headshots in 2 minutes..."
- [ ] **Keyword density:**
  - [ ] "ai headshots" appears 2-3 times (2-3%)
  - [ ] "professional" appears 4-5 times
  - [ ] "headshots" appears in H2 + body
- [ ] **Subheadings (H2/H3):**
  - [ ] "Perfect For:" section has H2
  - [ ] "4 AI Models" section has H2
  - [ ] "FAQ" section has H2
- [ ] **Images optimized:**
  - [ ] Images have alt text
  - [ ] Alt text includes keywords
  - [ ] Image size < 500KB (compressed)
  - [ ] WebP format used
- [ ] **Links:**
  - [ ] 3-5 internal links to related pages
  - [ ] Links use descriptive anchor text (not "click here")
  - [ ] No broken links (test with curl)
- [ ] **Length:**
  - [ ] Page body 1,500-2,500 words minimum
  - [ ] Each section 200-400 words

### Schema Markup on /ai-headshots

**Validate at https://schema.org/validate:**

- [ ] SoftwareApplication schema valid
- [ ] FAQPage schema valid (if FAQ present)
- [ ] No "error" level issues
- [ ] No "warning" level issues
- [ ] AggregateRating shows 4.8★

### CTA & Conversion Elements

- [ ] Primary CTA button visible (above fold)
- [ ] CTA text: "Generate Free" or "Start Now"
- [ ] CTA button links to signup: `/?auth=signup`
- [ ] Secondary CTA: "See Examples"
- [ ] Social proof visible: "50K+ professionals", "4.8★"
- [ ] Mobile: CTAs are large enough (48x48px minimum)

---

## PHASE 5: CONTENT & BLOG VALIDATION

### New Landing Pages (/ai-headshots/*)

For each new page (real-estate, legal, finance):

**Pre-launch:**
- [ ] Page created in correct directory
- [ ] Metadata optimized (unique title/description)
- [ ] Schema markup present + valid
- [ ] Internal links from main landing
- [ ] Mobile responsive
- [ ] Fast load time

**Post-launch:**
- [ ] curl returns 200
- [ ] GSC "Request Indexing" submitted
- [ ] Appears in sitemap.xml
- [ ] No 404 errors in GSC
- [ ] CTR baseline tracked in GSC

### Blog Articles

For each blog article (24 total):

**Pre-publish checklist:**
- [ ] Title 50-60 characters, includes keyword
- [ ] Meta description 150-160 characters, includes keyword
- [ ] H1 = title (or variation)
- [ ] 2-3 H2 subheadings (keyword variations)
- [ ] 1,500-2,500 words minimum
- [ ] 2-3 images, optimized + alt text
- [ ] Internal links: 3-5 links to related pages
- [ ] External links: 1-2 authority links
- [ ] Outbound links marked `target="_blank"`
- [ ] Spelling/grammar check (Grammarly)
- [ ] Schema markup: Article + FAQPage if applicable

**Post-publish checklist:**
- [ ] Live on site + renders correctly
- [ ] curl returns 200
- [ ] Appears in sitemap.xml
- [ ] Request indexing in GSC
- [ ] Track in analytics (goal: 2,000+ views/article after 2 months)

---

## PHASE 6: OVERALL HEALTH CHECK (Monthly)

### Monthly Audit Template

**1st of each month, check:**

```markdown
## ProFaceApp SEO Health Check - [Month]

### Indexation
- [ ] Total indexed pages: _____ (target: 6+)
- [ ] Coverage errors: _____ (target: 0)
- [ ] Pages pending: _____ (target: 0)

### Rankings
- [ ] "ai headshots" position: _____ (target: improving)
- [ ] "ai image generator" position: _____
- [ ] "ai photo generator" position: _____
- [ ] Keywords in top 10: _____ (target: 5+)

### Traffic
- [ ] Organic traffic (month): _____ (target: growing)
- [ ] Organic CTR: _____ % (target: 1.5%+)
- [ ] Conversions from organic: _____ (target: trending up)

### Technical
- [ ] Core Web Vitals score: _____ (target: 75+)
- [ ] Mobile-friendly: _____ (target: Yes)
- [ ] No crawl errors: _____ (target: Yes)

### Content
- [ ] New blog posts published: _____ (target: 2/month)
- [ ] Pages needing update: _____ (stale content?)
- [ ] Backlinks acquired: _____ (target: 2-3/month)
```

---

## AUTOMATED TESTING (If Using CI/CD)

### Pre-deployment Tests

```bash
#!/bin/bash

# Test robots.txt syntax
curl -s https://profaceapp.com/robots.txt | grep -q "User-agent" && echo "✓ robots.txt valid"

# Test sitemap XML
curl -s https://profaceapp.com/sitemap.xml | head -1 | grep -q "<?xml" && echo "✓ sitemap valid"

# Test homepage title
curl -s https://profaceapp.com | grep -q "AI Headshot Generator" && echo "✓ Title optimized"

# Test metadata
curl -s https://profaceapp.com | grep -q 'name="description"' && echo "✓ Meta description present"

# Test schema
curl -s https://profaceapp.com | grep -q 'schema.org' && echo "✓ Schema markup present"

echo "All SEO checks passed!"
```

---

## BROKEN LINK CHECKER

**Run monthly:**

```bash
# Option 1: Use tool
https://www.brokenlinkcheck.com/

# Option 2: Use wget
wget --spider -r --spider-timeout=10 https://profaceapp.com

# Option 3: Check in GSC
# GSC → Coverage → Errors (shows 404s)
```

**Checklist:**
- [ ] No broken internal links
- [ ] No broken external links (or document why)
- [ ] All navigational links work

---

## COMPETITOR BENCHMARK (Quarterly)

**Compare ProFaceApp to top 3 for "ai headshots":**

| Metric | Competitor A | Competitor B | Competitor C | ProFaceApp |
|--------|--------------|--------------|--------------|-----------|
| Organic keywords | ? | ? | ? | 5+ target |
| Backlinks | ? | ? | ? | 15+ target |
| Domain Authority | ? | ? | ? | 40+ target |
| Monthly traffic | ? | ? | ? | 5k-8k target |

**Tools:**
- Ahrefs: ahrefs.com
- SEMrush: semrush.com
- SimilarWeb: similarweb.com

---

## FINAL SIGN-OFF

**Before considering Phase [X] complete, check:**

- [ ] All technical items passing
- [ ] GSC showing expected improvements
- [ ] No regressions (traffic not declining)
- [ ] Content quality verified
- [ ] Mobile experience working
- [ ] Owner sign-off: [Name] on [Date]

---

**Use this checklist weekly. Automate what you can. Document results.**

**Questions?** Refer back to SEO_IMPLEMENTATION_GUIDE.md for details on why each check matters.
