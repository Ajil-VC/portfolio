# Ajil VC — Portfolio

Static HTML/CSS/JS portfolio site, currently deployed on GitHub Pages at
`https://ajil-vc.github.io/portfolio/`.

## Moving to a Custom Domain

There's no build step or single config value for the site URL — it's hardcoded
as a literal string in several files (for SEO: canonical links, Open Graph,
Twitter Cards, JSON-LD, robots.txt, sitemap.xml). Switching domains means
updating **every** occurrence below, plus a few things outside the repo.

### 1. GitHub Pages / DNS

- [ ] Add a `CNAME` file at the repo root containing just the new domain (e.g. `ajilvc.com`) — or set it via **Settings → Pages → Custom domain**, which creates the file for you.
- [ ] At your domain registrar, add DNS records:
  - Apex domain (`ajilvc.com`): four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `www` subdomain: one `CNAME` record → `ajil-vc.github.io`
- [ ] Wait for DNS to propagate (can take up to 24h), then check **Enforce HTTPS** in Settings → Pages.
- [ ] Confirm `https://ajil-vc.github.io/portfolio/` now redirects to the new domain (GitHub does this automatically once the custom domain is verified).

### 2. Update every hardcoded URL in this repo

Base URL to replace: `https://ajil-vc.github.io/portfolio/` → `https://yourdomain.com/`
(drop the `/portfolio` path segment too — a custom domain serves from the root).

| File | Lines | What's there |
|---|---|---|
| `index.html` | 14, 18, 23, 34, 56, 57 | canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`, JSON-LD `image` |
| `project.html` | 14, 18, 23, 34 | canonical, `og:url`, `og:image`, `twitter:image` (fallback defaults — overwritten per-project by `project.js`) |
| `project.js` | 21, 22, 49 | `pageUrl`, `pageImage`, JSON-LD `creator.url` — built dynamically per project |
| `robots.txt` | 30 | `Sitemap:` directive |
| `sitemap.xml` | 4, 9, 14, 19, 24 | every `<loc>` entry |

Quickest way to catch all of them: search the whole repo for `ajil-vc.github.io`.

### 3. Places outside this repo

- [ ] **Google Search Console** — add the new domain as a property and verify it, then submit the updated `sitemap.xml`. If the github.io URL is already indexed, use **Settings → Change of Address** to carry over rankings instead of starting from zero.
- [ ] Update the portfolio link anywhere it's posted: LinkedIn "Contact info" / Featured section, GitHub profile bio or README, Instagram/Facebook bio. (Checked the current resume PDF — it only links LinkedIn and GitHub, not the portfolio, so nothing to update there unless you add the link later.)
- [ ] Force a re-scrape of social previews once the new domain is live (they cache the old one): Facebook Sharing Debugger, LinkedIn Post Inspector, Twitter/X Card Validator.

### 4. Sanity checks after switching

- [ ] View source on the live site — confirm canonical/OG/Twitter URLs point to the new domain, not `github.io`.
- [ ] Run the new domain through Google's Rich Results Test to confirm the JSON-LD still validates.
- [ ] Confirm `https://yourdomain.com/robots.txt` and `https://yourdomain.com/sitemap.xml` are both reachable.
