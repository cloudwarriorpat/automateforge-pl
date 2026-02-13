# AutomateForge.pl - Production Deployment Checklist ✅

## Pre-Deployment Configuration

### 1. Analytics Setup (15 min) 🔴 REQUIRED

**Google Analytics 4:**
```html
<!-- index.html (head section) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // ← Replace with real GA4 ID
</script>
```

**Microsoft Clarity:**
```html
<!-- index.html (head section) -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "XXXXXXXXXXXX"); // ← Replace
</script>
```

**Where to get IDs:**
- GA4: https://analytics.google.com/ (Create property → Get Measurement ID)
- Clarity: https://clarity.microsoft.com/ (Create project → Get Project ID)

**Status:** 🟡 Placeholders active  
**Priority:** High (Polish market - important for tracking lokalnych użytkowników)

---

### 2. Environment Variables

**Create `.env.production`:**
```bash
# Copy from .env.example
cp .env.example .env.production

# Edit with production values:
VITE_API_URL=https://api.automateforge.pl
VITE_SITE_URL=https://automateforge.pl
VITE_GA_ID=G-XXXXXXXXXX # Optional: use env var instead of hardcoding
VITE_CLARITY_ID=XXXXXXXXXXXX # Optional
```

**Note:** `.env.example` exists in repo. Review and customize for production.

---

### 3. Build Verification

**Run before deploy:**
```bash
cd automateforge-pl
npm run build
```

**Expected output:**
- ✅ Vite build completes
- ✅ Assets optimized (JS, CSS chunked)
- ✅ `dist/` directory created
- ✅ Zero errors

**Check build size:**
```bash
du -sh dist/
# Should be reasonable (< 5MB for static assets)
```

**Preview built site:**
```bash
npm run preview
# Test at http://localhost:4173
```

**Last verified:** 2026-02-13 (Sprint 1)

---

### 4. SEO & Metadata Review

**Already configured in index.html:** ✅
- Title: "AutomateForge.pl - Automatyzacja dla Biznesu"
- Description (Polish market focused)
- Keywords (Polish)
- OpenGraph tags (pl_PL locale)
- Language: "pl" (Polish)

**To verify after deployment:**
- [ ] Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test with [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Verify `lang="pl"` in HTML

---

### 5. Security Headers

**For Vite static deploy, configure on hosting provider:**

**Netlify** (`netlify.toml`):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

**Cloudflare Pages** (`_headers` file in `dist/`):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Nginx** (if self-hosting):
```nginx
# See cybernexus/nginx-security-headers.conf for template
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

---

## Deployment Steps

### Option A: Netlify (Recommended for Vite)

**1. Connect repo:**
- Log in to Netlify
- New site from Git
- Choose `cloudwarriorpat/automateforge-pl`

**2. Build settings:**
```
Build command: npm run build
Publish directory: dist
```

**3. Environment variables:**
- Add `VITE_API_URL`, `VITE_SITE_URL`, etc.

**4. Deploy!**
- Automatic deployment on git push

**5. Custom domain:**
- Add `automateforge.pl` in Netlify DNS settings

### Option B: Cloudflare Pages

**1. Connect repo:**
- Cloudflare Dashboard → Pages → Create project
- Connect GitHub → Select `automateforge-pl`

**2. Build settings:**
```
Framework: Vite
Build command: npm run build
Output directory: dist
```

**3. Environment variables:**
- Add production env vars

**4. Deploy!**
- Push to main branch → auto-deploy

### Option C: Vercel

```bash
npm i -g vercel
cd automateforge-pl
vercel

# Vercel will detect Vite and configure automatically
```

### Option D: Self-hosted (Nginx + Docker)

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name automateforge.pl www.automateforge.pl;
    root /usr/share/nginx/html;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Post-Deployment Verification

### Critical Checks
- [ ] Site loads at https://automateforge.pl
- [ ] All routes work (SPA routing)
- [ ] Assets load (CSS, JS, images)
- [ ] No console errors
- [ ] Analytics firing (GA4 real-time)
- [ ] Polish language displays correctly (UTF-8 encoding)
- [ ] Mobile responsive

### SEO & Performance
- [ ] OG tags working (test with social media debuggers)
- [ ] Security headers present (DevTools → Network → Headers)
- [ ] Lighthouse audit (target: all >90)
- [ ] Polish characters render correctly (ą, ć, ę, ł, ń, ó, ś, ź, ż)

---

## Polish Market Specific

### 1. Language & Localization
- ✅ `lang="pl"` in HTML
- ✅ Polish content throughout
- ✅ OG locale: `pl_PL`

### 2. Analytics Goals
Set up GA4 goals for:
- Newsletter signups (if applicable)
- Contact form submissions
- Service inquiries
- Download actions

### 3. Legal Requirements
**To add (if not present):**
- [ ] Privacy Policy (Polityka Prywatności)
- [ ] Terms of Service (Regulamin)
- [ ] Cookie consent (RODO/GDPR compliance)

**Recommended tool:** Cookie Consent banner (e.g., Cookiebot, Osano)

---

## Monitoring & Maintenance

### Uptime Monitoring
- **UptimeRobot** (free, 5-minute checks)
- **Pingdom** (paid, advanced features)

### Performance
```bash
# Lighthouse audit after deployment
lighthouse https://automateforge.pl --output=html --output-path=./lighthouse-report.html --view
```

### Analytics Dashboard
- Check GA4 daily for first week
- Monitor bounce rate, page views, conversions
- Set up weekly email reports

---

## Rollback Plan

**Netlify/Vercel/Cloudflare:**
- Use platform UI to rollback to previous deployment
- Or: Revert git commit and push

**Docker/Self-hosted:**
```bash
# Rollback to previous tag
docker pull automateforge-pl:previous
docker restart automateforge-pl
```

---

## Sprint 1 Status

✅ **Completed:**
- Polish language metadata
- Analytics tracking (placeholders)
- SEO foundation
- `.env.example` template
- Documentation

🟡 **Configuration needed:**
- Replace analytics IDs
- Configure production env vars
- Deploy to hosting provider

🟢 **Future enhancements:**
- Add OG image (Polish branding)
- Cookie consent banner (RODO)
- Contact form integration
- Newsletter signup

---

**Last updated:** 2026-02-14 00:15 GMT+1  
**Sprint:** 1 - Foundation (COMPLETE)  
**Market:** Polish (PL)  
**Next sprint:** Production deploy + legal compliance (RODO)
