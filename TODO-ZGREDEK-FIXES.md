# AutomateForge.pl - TODO Sprint 1

**Zgredek applied:** Analytics + Security headers  
**Date:** 2026-02-13  
**Status:** Ready for configuration

---

## ⚠️ ACTION ITEMS (requires Patryk/Weronika)

### 1. Replace Analytics IDs

**File:** `index.html`

Replace placeholder values:
- `G-XXXXXXXXXX` → real Google Analytics 4 Measurement ID (2 occurrences)
- `XXXXXXXXXXXX` → real Microsoft Clarity Project ID

**How to get:**
- GA4: https://analytics.google.com/ → Data Streams → Measurement ID
- Clarity: https://clarity.microsoft.com/ → Project → Project ID

---

### 2. Generate OG Images (optional but recommended)

**Missing:**
- `public/og-image.jpg` (1200x630px) - for social media sharing
- `public/apple-touch-icon.png` (180x180px) - for iOS home screen

**Design suggestions:**
- AutomateForge branding
- Polish language context
- Tagline: "Kuźnia automatyzacji dla polskiego biznesu"
- Professional look, dark theme

**After creating:**
Add to `index.html` meta tags:
```html
<meta property="og:image" content="/og-image.jpg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

### 3. Test Production Build

After replacing analytics IDs:

```bash
cd automateforge-pl
npm install
npm run build
```

**Verify:**
- Build completes without errors
- Check console for analytics firing
- Test security headers in DevTools (after Docker deploy)
- Verify OG tags: https://www.opengraph.xyz/

---

### 4. Docker Build & Deploy

```bash
cd automateforge-pl
docker build -t automateforge-pl .
docker run -p 8080:80 automateforge-pl
```

Visit http://localhost:8080 and check:
- Analytics scripts loaded
- Security headers present (check DevTools → Network)
- SPA routing works (try navigating to /uslugi, /blog etc)

---

## ✅ DONE (by Zgredek)

- [x] Added Google Analytics 4 (with placeholder ID)
- [x] Added Microsoft Clarity (with placeholder ID)
- [x] Configured security headers in Dockerfile nginx config (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [x] Documented action items

---

## 📝 NOTES

**Metadata status:** ✅ EXCELLENT
- Already has full meta tags in index.html
- OpenGraph tags: ✅
- Twitter cards: ✅
- Theme color: ✅
- Polish locale (pl_PL): ✅

**Security headers:** ✅ ADDED
- Will apply in production Docker builds
- Configured in Dockerfile nginx entrypoint

**Analytics:** ⏳ PENDING
- Scripts added to index.html, need real IDs

**OG Images:** ❌ TODO
- Optional but recommended for professional appearance

**Supabase:** ✅ CONFIGURED
- .env.example has public Supabase anon key (this is OK - it's public by design)

---

**Next Sprint Ideas:**
1. Add structured data (JSON-LD) for local business SEO
2. Implement cookie consent banner (GDPR for Polish visitors)
3. Add conversion tracking events
4. Performance monitoring (Web Vitals)
5. Polish-specific analytics (e.g. tracking KSeF Studio usage)
