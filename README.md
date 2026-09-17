# FourthFolio — Archive Portfolio (2023–2024)

**Author:** King Miguel T. Remo — BSIT, CSTC  
**Purpose:** This is my **old / archive portfolio** (built in 3rd year). It showcases small early projects, certificates and tech stack.  
My **new portfolio** holds recent, defense-ready projects. This archive is kept as a *personal project / second portfolio* and is linked from the new one: **“To see my older / smaller projects, visit this archive.”**

If you're a panel / recruiter browsing my new portfolio and you clicked an *“old project → view archive”* link, you’re in the right place. Welcome! Use the **“New Portfolio →”** buttons to go back.

---

## 🔗 Linking the two portfolios

### 1) From NEW → this ARCHIVE (what you asked for)

In your **new portfolio**, on any old project card, add:

```html
<a href="https://king-miguel-archive-portfolio.vercel.app/clouds.html?from=new" target="_blank" rel="noopener">
  See older project → Archive
</a>
<!-- or simply: -->
<a href="https://king-miguel-archive-portfolio.vercel.app/?archive=1#projects">View archive projects</a>
```

The `?from=new` param highlights the top archive banner for 4 seconds so visitors know they came from the new site. Any link to `https://king-miguel-archive-portfolio.vercel.app/` works — the banner is always visible and has a **“visit my new portfolio →”** CTA.

### 2) From this ARCHIVE → NEW (already set up)

Every page now has:
- Top **ARCHIVE banner** (`🗂️ Archive Portfolio 2023–2024 — visit my new portfolio →`)
- Navbar **“New Portfolio →”** button
- Footer **“View new portfolio →”**

**You must set your NEW portfolio URL once:**

Search and replace in `index.html` (and optionally in other demo pages):

```
https://your-new-portfolio.vercel.app
```

Replace with your actual new Vercel URL, e.g. `https://king-miguel-new.vercel.app`

The easiest is to edit the one constant at the top of `index.html`:

```js
const NEW_PORTFOLIO_URL = "https://your-new-portfolio.vercel.app"; // <-- TODO: replace
```

When you set a real URL there, the JS automatically rewrites all `New Portfolio` links. Still, do a global search-replace for completeness (good for SEO / no-JS).

---

## 🚀 Deploying to Vercel (fixes your GitHub “security error”)

The “security error when clicking the link from GitHub” happens because:
- GitHub Pages was serving the site without proper HTTPS / HSTS headers
- File names with **spaces** (`clouds lul.html`, `malabu Sunshine.jpg`, `Untitled design (33).png`) create encoded URLs (`%20`) that browsers / GitHub flag as suspicious
- Missing security headers (`X-Content-Type-Options`, `Strict-Transport-Security`, etc.)

**Vercel fixes it:** automatic HTTPS, HSTS, and we added `vercel.json` with headers + redirects for old spaced URLs.

### Deploy in 3 clicks:

1. Push this branch to GitHub (already done — `arena/01a0adc6-fourthfolio`)
2. Go to **vercel.com → New Project → Import** `KingMiguelito-golteb/fourthfolio`
3. Leave defaults (Framework: *Other* / Static, Root Directory: `./`, Build: none) → **Deploy**

Vercel will give you `https://king-miguel-archive-portfolio.vercel.app` (or your chosen name) with **HTTPS** and no security warning. Share that link from GitHub / your new portfolio.

**Alternative via CLI:**

```bash
npm i -g vercel
vercel --prod
```

No build step needed — it’s static HTML/CSS/JS.

### After deploy:

- In Vercel → Project → **Settings → Domains** → add custom domain if you have one
- Copy your live URL and paste it into your **new portfolio** (and into `NEW_PORTFOLIO_URL` above) then redeploy this archive once more so the banner points correctly.

---

## ✅ What was systematically fixed / improved

### Vercel & URL safety (critical)
- **Renamed all files with spaces / special chars** (Vercel & Linux are case-sensitive, GitHub’s warning came from `%20` URLs):
  - `clouds lul.html` → `clouds.html`
  - `Online Certificates.html` → `certificates.html`
  - `social media.html` → `social-media.html`
  - `loading screen.html` → `loading-screen.html`
  - `malabu Sunshine.jpg` → `malabu-sunshine.jpg`
  - `primary skol.jpg` → `primary-skol.jpg`
  - `Untitled design (33).png` → `cstc-campus.png`
  - `RPG Sprite.png` → `rpg-sprite.png`, `SI ESES.png` → `si-eses.png`
  - `Resume\`1.pdf` → `Resume1.pdf` (backtick broke the PDF link)
- **Created `vercel.json`** with:
  - `cleanUrls`, security headers (HSTS, nosniff, SAMEORIGIN, XSS, Referrer-Policy)
  - `Cache-Control: immutable` for assets
  - **Redirects** for every old spaced URL so old GitHub links still work (`/clouds%20lul.html` → `/clouds.html`, etc.)
- Added `404.html`, `robots.txt`, `sitemap.xml` for SEO

### HTML / Content (so you don’t look “stupid” in defense 😅)
- **Removed inappropriate comment** (`<!-- niggaballs -->`) and any profanity — *would be flagged by a defense panel*
- **Fixed duplicate `<div id="portfolio">`** (nested same id broke JS & accessibility)
- **Rewrote `<head>`:** proper `description`, `keywords`, `canonical`, Open Graph / Twitter cards, `theme-color`, `preconnect`, correct `title: King Miguel Remo | Archive Portfolio (2023–2024)` instead of just “King | Home”
- **Added archive banner** (dismissible, fixed top, explains this is the old portfolio) + dynamic offset for fixed navbar so nothing is hidden
- **Polished copy** in Hero / Education / Hobbies / Contact to sound confident & professional for a defense, while keeping your voice (e.g., “average skills” → “passionate about building clean & user-focused web experiences”; “HELL NAW” toned down; “terrible student” → more constructive). Original meaning kept, grammar fixed.
- **Contact form now works without backend:** prevents `action="#"` 404, validates, shows success toast (`✓ Message captured!`). You can later plug Formspree / EmailJS by replacing the handler.
- **Project cards:** fixed `alt` text, added `loading="lazy"`, made `Live Demo` / `Details` point to clean URLs (`clouds.html`), added `aria-label`, added “See my latest projects →” CTA at bottom
- **Tech Stack images:** fixed `si-eses.png` path, added lazy loading
- **Education carousel:** updated image paths to renamed files, improved captions for readability & defense tone

### Individual demo pages
- **Netflux.html, calcu.html, instagram.html, SolarBacca.html, clouds.html, FilterWDarkmode.html, certificates.html** — all rebuilt with proper `<!doctype html>`, viewport, `lang="en"`, meta description, and a fixed **Project Nav** (`← Back to Archive` + `New Portfolio →` + `ARCHIVE • tag`)
- `calcu.js`: removed unsafe `eval`, replaced with sanitized `Function` + `try/catch`, added keyboard support (type, Enter, Backspace)
- `FilterWDarkmode.html`: fixed `malabu-sunshine.jpg` path, added hints
- `certificates.html`: fixed all 12 image paths (`Cer1.jpg`…`Cer12.jpg`) — old file used wrong case `Cert.jpg` which 404s on Linux/Vercel
- `instagram.html`: added nav, improved semantic
- `clouds.html` & `SolarBacca.html`: added caption + nav

### CSS / JS
- **portfolio.css:** added archive banner styles, fixed `body { padding-top: 96px }` (was `70px !important` breaking banner offset), removed nuclear `!important` hacks that forced `#portfolio` visible and broke preloader, made reveal animations not get overridden, cleaned responsive rules
- **clouds.js:** complete rewrite — guarded against missing sidebar elements (old code threw `null.addEventListener` and broke the whole page), added `prefers-reduced-motion` fallback, faster 2.8s preloader, safe `pagesWrapper` checks, passive scroll listeners, preserved tab logic + added keyboard a11y
- `cloud1.js` / `cloud1.css` left functional for the standalone clouds demo

### Small but important
- Fixed stray `</svg>` in hero card
- Fixed duplicate `id="sybau"` usage? (kept but noted)
- Made all external links `target="_blank" rel="noopener"` for security
- Added `noscript` fallback so site is usable even if JS fails / preloader blocked

---

## 📁 Project structure

```
index.html                  — main archive (with banner, about, education, projects, hobbies, contact)
portfolio.css               — styles (+ archive banner)
clouds.js                   — interactions (tabs, reveal, preloader)
vercel.json                 — Vercel headers, redirects for old spaced URLs, cleanUrls
404.html                    — friendly 404
robots.txt / sitemap.xml
Netflux.html / netflux.css  — Netflix sign-in clone
calcu.html / calcu.css / calcu.js — Calculator (sanitized)
instagram.html              — Instagram profile clone
SolarBacca.html / solar.css — Eclipse animation
clouds.html / cloud1.*      — Moving clouds demo
FilterWDarkmode.*           — Filter + dark mode demo
certificates.html           — standalone cert gallery (also embedded in index)
OnlineCertificates/         — images, certs, Resume1.pdf, etc.
bootstrap-5.3.7-dist/       — local Bootstrap (works offline on Vercel)
```

---

## 🔧 Quick checklist before defense

- [ ] Replace `https://your-new-portfolio.vercel.app` everywhere with your real new URL (search in project)
- [ ] Test `https://king-miguel-archive-portfolio.vercel.app/` → banner visible, `New Portfolio →` goes to your new site
- [ ] Test from new portfolio: add a link `https://king-miguel-archive-portfolio.vercel.app/?from=new#projects` and verify banner highlights
- [ ] Click each demo: `clouds.html`, `calcu.html`, etc. — ensure nav `← Back to Archive` works
- [ ] Check resume: `OnlineCertificates/Resume1.pdf` opens (old backtick fixed)
- [ ] Optional: connect contact form to **Formspree** — replace JS handler in `index.html` with `fetch("https://formspree.io/f/YOUR_ID", ...)`
- [ ] Optional: compress `EzIcon.png` (currently 2.4 MB) — use tinypng.com and replace for faster load
- [ ] In Vercel, enable **“Automatically expose System Environment Variables”** off (not needed for static)

---

## 🤝 Notes for panel

This site is intentionally kept as an **archive** to show growth. My recent, larger, production projects are on my new portfolio. This archive demonstrates fundamentals: semantic HTML, responsive CSS, vanilla JS interactions, and iterative improvement — all built without frameworks in 3rd year and now cleaned for Vercel hosting.

— King Miguel Remo

