# Bazaar School

A free, step-by-step school for the Indian stock market at **bazaarschool.com**.
Static site built with Astro 6, content in Markdown, edited through Decap CMS at `/admin/`, deployed on Netlify.

Five sections sit in the top navigation. Three are **courses** (lessons shown in number order) and two are **feeds** (newest first):

| Section | URL | Kind |
| --- | --- | --- |
| Bazaar Basics | `/basics/` | course |
| Bazaar Intermediate | `/intermediate/` | course |
| Bazaar Advanced | `/advanced/` | course |
| Bazaar Stories | `/stories/` | feed |
| Bazaar AI | `/ai/` | feed |

Each section page lists all of its articles. Every article lives at `/<slug>/`.

The three course levels work like a textbook: **level > module > chapter**. Chapters are numbered `module.chapter` (2.3 is the third chapter of module 2). Planned chapters show on the syllabus as "Coming soon" until you write them. Every chapter ends with "You can now" lines, a three-question self-check and a **Mark chapter as done** button. Progress is saved in the reader's browser only (no accounts) and fills the bars on the home page, level pages and the curriculum; the home page button becomes "Continue: chapter 2.1".

The **glossary** at `/glossary/` holds one card per term. The first mention of a term in any chapter is linked to its card automatically when the site builds (dotted underline), except inside the chapter that teaches that term.

Other pages: `/start/` (pick a starting point), `/curriculum/` (everything in order, with a reset button for progress), `/latest/`.

For the launch steps that need your accounts (GitHub, Netlify, domain, analytics, AdSense), read **[LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md)**.

## Commands

```bash
npm install          # once
npm run dev          # http://localhost:4323 with live reload
npm run build        # production build into dist/
npm run preview      # serve dist/ at http://localhost:4324
npm run covers       # generate missing cover images (see below)
```

Node 22 or newer.

## Where things live

```
src/content/blog/          one .md file per article or lesson
src/content/categories/    the five sections (name, slug, kind, order, tagline)
src/content/modules/       modules of the three course levels, with their planned chapter titles
src/content/glossary/      one .md file per glossary term
src/content/authors/       author profiles
src/content/pages/         about, disclaimer, privacy, terms (Markdown)
src/data/settings.json     site name, taglines, contact, GA4 id, AdSense id, partner box
src/pages/                 routes: index, [section], [slug], curriculum, latest, legal pages
src/components/            header, footer, lesson register, story cards, consent, ads, partner box
src/styles/global.css      the whole design (tokens at the top)
public/admin/              Decap CMS (config.yml drives the editing forms)
public/images/             generated covers; uploads from the CMS go to public/uploads/
scripts/make-covers.mjs    cover generator
```

## Writing a lesson or article

Through the CMS (after launch): `/admin/` → Lessons & articles → New. Or by hand: add `src/content/blog/<slug>.md` with this front matter:

```yaml
---
title: "How to open a demat account in India"
excerpt: "One or two sentences. Shown under the title and used as the search description."
category: "Bazaar Basics"        # exact section name
module: "basics-2"               # courses only: a module ID from src/content/modules
lesson: 1                        # courses only: chapter number inside the module (shown as 2.1)
outcomes:                        # courses only: "You can now" lines at the end
  - "Name the three accounts you need and what each one holds."
quiz:                            # courses only: three questions work best
  - q: "You buy shares on a Monday. When do they reach your demat account?"
    a: "On Tuesday, the next working day, under T+1 settlement."
tags: ["Basics", "Demat"]
author: "Bazaar School Team"     # must match a name in src/content/authors
date: "2026-10-12"
updated: "2026-11-01"            # optional, shown when you revise a lesson
image: "/images/articles/how-to-open-a-demat-account.jpg"
readTime: "10 min"
draft: false                     # true hides it from the live site
---
Body in Markdown. Tables, lists, blockquotes and code blocks are styled.
```

When you publish a chapter that was listed as planned, delete its title from the module's `planned` list (an exact title match is hidden automatically).

Adding a glossary term: create `src/content/glossary/<id>.md` (or use CMS > Glossary) with `title`, `short` (one sentence), `aliases` (abbreviations and plurals to link), `related`, and `lesson` (the chapter that teaches it). Set `autolink: false` for everyday words such as "share".

Rules of thumb that the first fifteen articles follow:

- Lessons assume the reader finished the previous lesson. End each one with a short "Before lesson N" exercise.
- Anything that quotes a rule, rate or threshold ends with an italic line saying when it was written and telling the reader to confirm the current figure. Before launch, verify those figures yourself against the primary source and update the line.
- No stock recommendations, price targets or "multibagger" lists, ever. The disclaimer component renders under every article.
- Plain English, straight quotes, no em dashes, sentence-case headings.

## Cover images

The site ships with generated covers (a chalk line chart on a chalkboard, coloured by section) so that nothing is blank on day one. `npm run covers` draws a cover for any article whose `image` points to `/images/articles/<slug>.jpg` and does not exist yet; `npm run covers -- --force` redraws all of them. To use a real photo instead, upload it through the CMS (it lands in `/uploads/`) or drop it in `public/images/articles/` and point `image` at it. The script leaves non-generated paths alone.

## Settings that switch features on

All in `src/data/settings.json` (or CMS → Site settings):

- `gaId`: a GA4 measurement id turns analytics on. It loads only after the visitor accepts analytics cookies.
- `adsenseClient`: an AdSense publisher id turns the ad slots on (one under every article body).
- `partner.url` (+ `label`, `blurb`): shows the affiliate "Open an account" box in the article sidebar with the required disclosure.
- `social.*`: footer links; blank ones are hidden.

## SEO baked into the build

Unique title and description per page, canonical URLs, Open Graph and Twitter cards with a real image, JSON-LD (Organization and WebSite on the home page, Article plus BreadcrumbList on articles, CollectionPage with an ItemList on section pages), `sitemap-index.xml`, and `robots.txt`. The domain is already set in `astro.config.mjs`.

## Deploying

Push to the `main` branch of the GitHub repository connected to Netlify and the site rebuilds. `netlify.toml` already carries the build command, publish folder, Node version and security headers. The CMS signs in with GitHub through Netlify's GitHub OAuth provider, which section 4 of the checklist sets up once. It does not use Netlify Identity or the deprecated Git Gateway.
