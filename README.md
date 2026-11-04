# Resonance Communications website

Marketing website for **Resonance Communications** (Resonance Events and Resonance Media & Communications), Addis Ababa.

- **Copy** comes from `docs/content-spec.pdf`; **visual identity** from `docs/brand-guidelines.pdf`.
- **Stack:** Next.js 16 (App Router, Cache Components, TypeScript strict), Tailwind CSS v4, Sanity (Studio embedded at `/studio`), Resend, Framer Motion (`motion`), react-hook-form + zod. Deploy target: Vercel.

The site runs fully **before Sanity is connected**: every page falls back to the spec copy bundled in `src/content/defaults.ts`. Once a Sanity project is connected and seeded, all content is edited in the Studio.

---

## Contents

1. [Local setup](#1-local-setup)
2. [Create the Sanity project](#2-create-the-sanity-project)
3. [Environment variables](#3-environment-variables)
4. [Seed the content](#4-seed-the-content)
5. [Deploy to Vercel](#5-deploy-to-vercel)
6. [Revalidation webhook](#6-revalidation-webhook)
7. [Preview and draft mode](#7-preview-and-draft-mode)
8. [Inquiry emails (Resend)](#8-inquiry-emails-resend)
9. [Editor guide](#9-editor-guide)
10. [Brand implementation notes](#10-brand-implementation-notes)
11. [Project structure](#11-project-structure)
12. [Scripts](#12-scripts)
13. [Open items and decisions](#13-open-items-and-decisions)

---

## 1. Local setup

Requirements: Node.js 20.9+ and pnpm 9.

```bash
pnpm install
cp .env.example .env.local   # fill in values as you go (all optional for a first run)
pnpm dev                      # http://localhost:3000
```

Without any environment variables the site renders the spec copy, `/studio` shows a "Not connected yet" notice, and the contact form returns an error, because it has nowhere to deliver submissions.

## 2. Create the Sanity project

1. Sign in at <https://www.sanity.io/manage> and **Create project** (for example "Resonance Communications"). Create a dataset named `production` (public read is fine; drafts are private either way).
2. Copy the **Project ID** into `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Under **API → CORS origins**, add (with **Allow credentials** ticked):
   - `http://localhost:3000`
   - your production URL, e.g. `https://www.your-domain.com`
   - any Vercel preview domain you want to open the Studio on
4. Under **API → Tokens**, create two tokens:
   - **Viewer**, saved as `SANITY_API_READ_TOKEN` (draft preview)
   - **Editor**, saved as `SANITY_API_WRITE_TOKEN` (seeding and storing contact form submissions)
5. Restart `pnpm dev` and open <http://localhost:3000/studio>. Log in with the Sanity account you used above.
6. Invite editors under **Members** in sanity.io/manage.

## 3. Environment variables

| Variable                                             | Required          | Purpose                                                                                          |
| ---------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`                      | yes (for CMS)     | Sanity project ID                                                                                |
| `NEXT_PUBLIC_SANITY_DATASET`                         | yes               | Usually `production`                                                                             |
| `NEXT_PUBLIC_SANITY_API_VERSION`                     | no                | Defaults to `2026-11-01`                                                                         |
| `SANITY_API_READ_TOKEN`                              | for preview       | Viewer token; enables draft mode / Presentation                                                  |
| `SANITY_API_WRITE_TOKEN`                             | for seed + form   | Editor token; `pnpm seed` and inquiry storage                                                    |
| `SANITY_REVALIDATE_SECRET`                           | for webhook       | Random string shared with the Sanity webhook                                                     |
| `RESEND_API_KEY`                                     | for email         | Resend API key                                                                                   |
| `INQUIRY_TO_EMAIL`                                   | for email         | Recipient(s), comma-separated. Defaults in `.env.example` to `communicationsresonance@gmail.com` |
| `INQUIRY_FROM_EMAIL`                                 | for email         | Sender on a domain verified in Resend, e.g. `Website <website@your-domain.com>`                  |
| `NEXT_PUBLIC_SITE_URL`                               | yes in production | Canonical URL, no trailing slash. Used for canonical links, sitemap, OG and JSON-LD              |
| `NEXT_PUBLIC_ANALYTICS_SCRIPT_URL`                   | no                | Cookie-free analytics script (e.g. Plausible/Umami). Off when empty                              |
| `NEXT_PUBLIC_ANALYTICS_SITE_ID`                      | no                | Site/domain ID for that script                                                                   |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | no                | Shared rate limiting for the contact form (otherwise per-instance memory)                        |
| `ENABLE_BRAND_KIT`                                   | no                | Set `true` to expose `/brand-kit` on the Vercel production deployment                            |

Never commit `.env.local`; `.gitignore` excludes every `.env*` file except `.env.example`.

## 4. Seed the content

The seed imports **all copy from the content spec** (site settings, navigation, the seven pages, the 8 services, the 6 event services and the 8 portfolio categories). It creates **no projects** and **no inquiries**.

```bash
pnpm seed             # creates documents that don't exist yet (safe to re-run)
pnpm seed --dry-run   # prints the documents without writing anything
pnpm seed --replace   # overwrites existing documents with the spec copy (destroys edits!)
```

Requires `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_API_WRITE_TOKEN` in `.env.local`.

## 5. Deploy to Vercel

1. Push the repository to GitHub and **Import** it in Vercel (framework preset: Next.js, package manager: pnpm, detected automatically).
2. Add the environment variables from section 3 for **Production** (and **Preview** if you want previews connected to the CMS). Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Deploy, then add the production domain to Sanity CORS origins (section 2, step 3).
4. Set up the revalidation webhook (section 6).
5. Before launch, verify that `/brand-kit` returns 404 on production (it does unless `ENABLE_BRAND_KIT=true`).

Pages are prerendered and cached. A Sanity publish triggers the webhook, which marks the affected content stale so it updates on the next visit.

## 6. Revalidation webhook

In <https://www.sanity.io/manage> → your project → **API → Webhooks → Create webhook**:

| Field             | Value                                        |
| ----------------- | -------------------------------------------- |
| Name              | Revalidate website                           |
| URL               | `https://www.your-domain.com/api/revalidate` |
| Dataset           | `production`                                 |
| Trigger on        | Create, Update, Delete                       |
| Filter            | _(leave empty: all document types)_          |
| Projection        | `{_type, "slug": slug.current}`              |
| Status            | Enabled                                      |
| HTTP method       | POST                                         |
| API version       | `v2025-02-19` or later                       |
| Drafts / Versions | off (only published changes)                 |
| Secret            | the same value as `SANITY_REVALIDATE_SECRET` |

The handler verifies the signature and calls `revalidateTag()` for the document type (plus `project:<slug>` for projects). Changes to Site settings or Navigation refresh the header and footer on every page.

## 7. Preview and draft mode

The Studio's **Presentation** tool shows the live site beside the editor, with click-to-edit overlays. It needs `SANITY_API_READ_TOKEN`. Presentation opens `/api/draft` with a signed URL, which enables Next.js Draft Mode for that browser only: drafts appear, caching is bypassed, and a "Draft preview" banner with **Exit preview** is shown. Visitors always see published content.

## 8. Inquiry emails (Resend)

1. Create an account at <https://resend.com>, add and **verify the sending domain** (DNS records).
2. Create an API key → `RESEND_API_KEY`.
3. Set `INQUIRY_FROM_EMAIL` to an address on the verified domain and `INQUIRY_TO_EMAIL` to the team inbox.

Every submission is validated twice (browser and server, same zod schema), rate-limited per IP (5 per 10 minutes), screened with a honeypot field, stored as an **Inquiry** in Sanity and emailed to the team with **Reply-To** set to the sender. A submission succeeds when either channel works. Personal data is never written to logs.

## 9. Editor guide

Open `/studio` and sign in.

### How to edit contact details

**Site settings → Contact details**: email, phone, office address, location. Phone and address stay hidden on the website until they're filled in. Publish, and the footer, Contact page and structured data update.

Social links are in **Site settings → Social media**. Each network appears only once its URL is set (shown in the footer and on the Contact page).

### How to add a project

1. **Projects → + (new)**.
2. **Details**: project name (the URL slug generates from it), client, service category, division, date. Tick **Feature on the Home page** to show it in "Selected Projects".
3. **Case study**: Overview, The Objective, Our Approach, Our Contribution, The Outcome. Include only verified results.
4. **Images & video**: a cover image (required) and gallery items. Every image needs **alternative text**. Pick a **photography treatment**:
   - _Black & white_ (default, the brand's dominant treatment)
   - _Full colour_ (when colour conveys the atmosphere better)
   - _Teal overlay_ (selectively, for campaign visuals; adjust its strength)

   Videos take a YouTube or Vimeo link and a title. They load only when a visitor presses play.

5. Tick **Approved by the client for publication** once the client has signed off on names, images and results. **Unapproved projects never appear on the site.**
6. **Publish**. Use the Presentation tool to preview before publishing.

### Other common edits

- **Page copy:** **Pages → (page)**. Fields follow the content spec's section order. Each page also has an **SEO** tab.
- **Services / Event services / Project categories:** their own lists; the **Order** field sets the display order.
- **Navigation and the header button:** **Navigation**.
- **Contact form options, labels and messages, optional response-time note:** **Pages → Contact → Section 3**.
- **Inquiries:** **Inquiries → New / Contacted / Closed**. Submitted fields are read-only; update the **Status** as you follow up.

## 10. Brand implementation notes

| Element           | Implementation                                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colours           | `src/styles/tokens.css`: the four official colours plus derived tints only, exposed to Tailwind via `@theme`                                                                                              |
| Typography        | Bricolage Grotesque (display) and IBM Plex Sans (body), self-hosted from the brand package as Latin WOFF2 subsets (`brand-assets/fonts`, OFL). Bricolage is pinned to optical size 72 to keep it at 35 KB |
| Amharic           | Nokia Pure Headline (Ethiopic subset, UltraLight + Bold) is wired to `--font-amharic` and applied to any `lang="am"` content. It is not preloaded, so English pages never download it                     |
| Logos             | `<Logo>` renders the **official SVGs unmodified** (`public/brand`) and enforces the exclusion zone (X = height of the R bowl). Per the guideline, **Symbol** = circular badge and **Mini** = RC mark      |
| Signal Field      | `<SignalField>`: one repeat unit taken from the official `signal-field.svg` grid, applied as a CSS mask                                                                                                   |
| Resonance Flow    | `<ResonanceFlow>`: the official path, clipped per segment so segments can pulse; static frame under reduced motion                                                                                        |
| Resonance Carrier | `<Carrier>`: teal bar + the official RC termination (from `carrier.svg`), height-locked so it scales with its text                                                                                        |
| Photography       | B&W by default via CSS, with optional full colour or teal overlay per image                                                                                                                               |

Review everything at **`/brand-kit`** (noindex, not in the sitemap, disabled on Vercel production).

### Assets derived from official files: to be replaced by official asset

These were composed from official artwork because the brand package did not include them. Replace them if the designer supplies official versions:

- `public/brand/signal-field-tile.svg`: single repeat unit cut from `Pattern-01`
- Resonance Flow segment animation: per-segment clipping of `Pattern-02-01` / `02-02`
- `src/app/icon.svg` (favicon) and `src/app/apple-icon.tsx`: official near-black RC mark on a teal rounded square, as in the guideline's app-icon mockup
- `/api/og` sharing image template

### Regenerating font subsets

Font files are generated from the brand package zips with fontTools:

```bash
pip install fonttools brotli
fonttools varLib.instancer BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf wdth=100 opsz=72 wght=200:700 -o b.ttf
pyftsubset b.ttf --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2193,U+2212,U+2215" \
  --layout-features='kern,liga,calt,ccmp,locl,mark,mkmk' --flavor=woff2 --output-file=BricolageGrotesque-Variable-latin.woff2
```

Plex: the same, with `wdth=100 wght=400:600`. Nokia: `pyftsubset` with `--unicodes="U+0020-007E,U+00A0,U+1200-139F,U+2D80-2DDF,U+AB00-AB2F,U+2000-206F"`.

> **Licence note:** the Nokia Pure Headline files in the brand package carry "© 2011 Nokia. All rights reserved." and no licence file. Confirm the web-embedding licence with whoever supplied the font before launch.

### Adding Amharic later

UI microcopy lives in `src/lib/strings.ts`. Page copy lives in Sanity, with one document per page, so a localisation plugin (e.g. document-level internationalisation) can be added without restructuring. Amharic typography already works for any element with `lang="am"`.

## 11. Project structure

```
src/
  app/
    (site)/            public pages (home, about, services, events, media-communications,
                       our-work, our-work/[slug], contact, brand-kit), layout, 404
    studio/[[...tool]] embedded Sanity Studio
    api/               inquiry, revalidate, draft, draft/disable, og
    sitemap.ts robots.ts manifest.ts icon.svg apple-icon.tsx
  components/
    brand/             Logo, SignalField, ResonanceFlow, Carrier, HeroBackdrop
    layout/            Header, MobileMenu, Footer, DraftModeTools, Analytics
    sections/          one component per page section
    work/              project cards, filter, gallery, lightbox
    forms/             InquiryForm
    ui/                buttons, eyebrows, chips, images, lists
    seo/               JSON-LD, breadcrumbs
  content/             front-end content types + spec copy (defaults.ts)
  sanity/              schemaTypes/, lib/ (client, fetch, queries, image), structure, presentation
  lib/                 content access, SEO, validators, email, rate limit, strings
  styles/tokens.css
scripts/seed.ts
brand-assets/          official logos, patterns, font subsets
docs/                  content spec and brand guidelines
```

## 12. Scripts

| Command                     | What it does                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| `pnpm dev`                  | Development server                                                                           |
| `pnpm build` / `pnpm start` | Production build / server                                                                    |
| `pnpm lint`                 | ESLint                                                                                       |
| `pnpm typecheck`            | Route types + `tsc --noEmit` (also checks GROQ projections against the front-end types)      |
| `pnpm format`               | Prettier                                                                                     |
| `pnpm typegen`              | Extract the Sanity schema and regenerate `src/sanity/types.ts` after schema or query changes |
| `pnpm seed`                 | Import spec copy into Sanity (section 4)                                                     |

## 13. Open items and decisions

**Decisions taken by the client**

- The footer statement is the spec's "Resonance Communications. Making Every Experience Resonate." The brand line "Magic from the details" appears on the footer **Symbol badge** (official artwork) and in the default sharing description. It is editable in Site settings.
- Nokia Pure Headline ships for Amharic (see the licence note above).

**Defaults chosen during the build (all editable in the Studio)**

- **CTA destinations:** the spec gives labels without URLs. For example: "Discover Resonance" → `/about`; "Explore Integrated Solutions" → `/services#integrated-campaigns-and-experiences`; "Plan Your Event With Us" → `/contact?service=Corporate Events` (preselects the form); "Contact Us" → `/contact#contact-information`.
- **Our Work** has no closing CTA in the spec; it reuses the Home closing CTA copy.
- **Section eyebrows** that the spec gives only as section names (e.g. "Company Overview", "Our Vision") are shown as labels.
- **Required form fields:** Full Name, Email, Service of Interest, Project Description. Organization and Phone are optional.
- **UI microcopy** not in the spec (form errors, empty state, 404, success message) is written in the brand voice and lives in `src/lib/strings.ts` or the Studio.

**Client feedback round 1 (Home, Nov 2026)**

- Main navigation reduced to Home, About Us, Services, Our Work, Contact (+ Start a Project). The Events and Media & Communications pages remain and are linked from the Home division cards; they will move under Our Work in the next round.
- Who We Are on Home shortened to its first paragraph; the full text lives on About Us.
- Footer: Our Divisions column removed; the Symbol badge ring rotates.
- New interactions: glass header, stacked section scrolling on Home, hover glow on grid and Signal Field patterns, page transitions. All are disabled under reduced motion and on touch devices where relevant.
- Sector cards now have short descriptions (**draft copy, awaiting approval**) and icons; both are editable in Pages → Home → Section 5.
- "Our Group" section (sister companies) is built but hidden until logos are added in Pages → Home → Section 2b.

**Content still needed from the client**

- Official phone number and office address (hidden until set).
- Social media profile URLs. The footer and contact page currently link to each network's homepage as temporary placeholders (`src/content/defaults.ts`); replace them before launch.
- Sister company logos and names for the "Our Group" section.
- Client-approved projects, images and verified outcomes.
- The production domain (`NEXT_PUBLIC_SITE_URL`).

**Spec copy flagged, not changed**

- "Financial Institutions & SACCOS": commonly written "SACCOs".
- No serial comma in "Stories, Ideas and Messages That Connect." and "Bringing Ideas, Experiences and Communication Together.", unlike the rest of the copy.
- The Home Events list omits "National & International Events", which appears on the Events page.
- The Services page title "Corporate Events & Event Production" vs the form option "Corporate Events"; the Our Work categories, the Services list and the form options are three different lists.

**Never published:** the guideline mockup details (phone numbers `+259 11 123 4567` and `+251 912 345 678`, `resonancecommunications.com`, `@RCs_34`, `@resonance_communications`, "Abebe Kebede") and the designer's studio logo.
