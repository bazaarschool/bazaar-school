# Bazaar School: launch checklist

Everything the site still needs, in the order to do it. The code is finished; every step below needs an account, a password or a card that only you hold. Budget about two hours for steps 1 to 5. None of them is hard.

## 0. Already done (nothing to do)

- Astro 6 site in this folder with the five sections: Bazaar Basics, Intermediate and Advanced as ordered courses, Bazaar Stories and Bazaar AI as newest-first feeds. Each section page lists all of its articles.
- 15 starter articles, three per section, each lesson ending with an exercise and, where rules are quoted, a line saying when it was written (see section 7 about verifying those figures).
- Home page, curriculum page, latest page, about, disclaimer, privacy and terms.
- Decap CMS at `/admin/` with forms for articles, sections, authors, pages and site settings.
- SEO (titles, descriptions, canonicals, share images, JSON-LD, sitemap, robots), cookie consent, GA4 and AdSense hooks (off until you add ids), newsletter form, affiliate partner box (off until you add a link), SEBI-style disclaimers in the footer and under every article.
- Generated cover images for every article and section, favicons, default share image.
- Domain already set to `https://bazaarschool.com` in `astro.config.mjs` and `public/admin/config.yml`.

## 1. Run it on your machine (5 minutes)

Open a terminal in this folder.

```bash
npm install
```

```bash
npm run dev
```

Visit http://localhost:4323. Click through the five sections, open a lesson, try the search (press `/`), toggle dark mode with the round button bottom right. Stop the server with Ctrl+C when done.

## 2. Put the code on GitHub (10 minutes)

1. On github.com, create a new, empty repository. Suggested name: `bazaarschool`. Private is fine; Netlify can read private repos.
2. Back in the terminal, in this folder:

```bash
git add -A
```

```bash
git commit -m "Bazaar School: initial site"
```

```bash
git remote add origin https://github.com/bazaarschool/bazaar-school.git
```

```bash
git push -u origin main
```

3. Open `public/admin/config.yml` and change the line `repo: bazaarschool/bazaar-school` to your real `owner/repo`. Commit and push again. The CMS will not log in until this matches.

## 3. Deploy on Netlify (15 minutes)

1. Sign in at netlify.com (the same account as BLOGACIOUS is fine; sites are separate).
2. Add new site → Import an existing project → GitHub → choose the `bazaarschool` repository.
3. Build command `npm run build`, publish directory `dist`. These are already in `netlify.toml`, so just confirm and deploy. The first build takes about a minute and gives you a `something.netlify.app` address. Check it.
4. Site configuration → Domain management → Add a domain → `bazaarschool.com`, and add `www.bazaarschool.com` as an alias.
5. Point the domain at Netlify. The simplest route: in Netlify choose "Set up Netlify DNS", copy the four nameservers it shows, and paste them into the nameserver settings at the registrar where you bought bazaarschool.com. The alternative is to leave the registrar's DNS and add an A record for `@` pointing to Netlify's load balancer address (shown in the same screen) plus a CNAME for `www` pointing to your `something.netlify.app`. Either way, propagation takes anything from ten minutes to a day.
6. Once the domain shows "Netlify DNS" or "DNS verified", HTTPS is provisioned automatically. Do not skip the wait; the CMS and share images need the real domain.
7. Forms: open Site → Forms. The `newsletter` form is detected on the first deploy. Turn on email notifications for new submissions so subscribers reach your inbox until you connect a proper email tool.

## 4. Switch on the CMS login (10 minutes)

1. Netlify → Site configuration → Identity → Enable Identity.
2. Under Registration, choose **Invite only**. Otherwise anyone can create a login.
3. Identity → Services → **Enable Git Gateway**. This is what lets the editor commit to GitHub on your behalf.
4. Identity → Invite users → your email. Open the invitation email; the link lands on bazaarschool.com, which forwards you to `/admin/` to set a password.
5. From then on: https://bazaarschool.com/admin/ → log in → Lessons & articles → New. Publishing commits a Markdown file to GitHub, Netlify rebuilds, and the page is live in about a minute.

## 5. Measurement (20 minutes, can wait a week)

1. Google Analytics: analytics.google.com → create a property for bazaarschool.com → Web data stream → copy the Measurement ID (`G-XXXXXXXXXX`). Paste it into CMS → Site settings → Google Analytics ID (or `src/data/settings.json`). Analytics loads only after a visitor accepts analytics cookies; that is intentional.
2. Google Search Console: search.google.com/search-console → Add property → Domain → `bazaarschool.com`. Verify by adding the TXT record it gives you at Netlify DNS (or your registrar). Then Sitemaps → submit `https://bazaarschool.com/sitemap-index.xml`.
3. Bing Webmaster Tools → import the site from Search Console. Two minutes, free traffic.

## 6. Money, in the order it becomes realistic

**Broker affiliate (can start on day one).** Zerodha, Upstox, Angel One and Groww each run a referral or partner programme; apply from their websites. Paste the link into CMS → Site settings → Partner box, with a heading such as "Open a free demat account". The box appears in every article sidebar with the affiliate disclosure the law expects. The demat lesson is the natural place; nothing else needs changing.

**AdSense (after about 25 to 30 articles and a few weeks of traffic).** Apply at adsense.google.com with the live domain. Google wants original content, a privacy policy, an about page and a contact route, all of which exist. When approved, paste the publisher id (`ca-pub-...`) into Site settings. Ads appear in the slot under each article; add more slots later by placing `<AdSlot />` in the page templates.

**Newsletter.** Netlify Forms collects addresses. When you have a few hundred, export the CSV and import into a sending tool (Buttondown, MailerLite and Beehiiv all have free tiers) and swap the form's `action` to the tool's endpoint, or keep Netlify and send by hand. The "Monday lesson" promise on the site means one email a week, in course order; the first fifteen articles are fifteen weeks of emails already written.

**Sponsored posts (later).** Mark them clearly in the title or excerpt and in the first line. SEBI and the advertising council both expect disclosure, and a finance audience punishes anything that looks like a hidden ad.

## 7. Compliance you should keep an eye on

- The site never recommends a security, and every article renders the disclaimer. Keep it that way; the SEBI research analyst and investment adviser regulations are why.
- `hello@bazaarschool.com` is printed on the About, Disclaimer, Privacy and Terms pages. Create the mailbox (Zoho Mail's free tier, Google Workspace, or email forwarding at your registrar) before launch so those pages are not pointing at nothing.
- Have a professional read the privacy policy and terms once; they are starter templates and say so.
- Facts: the starter lessons quote tax rates, SEBI rules, lot sizes and charges from memory of the published rules as of November 2026, not from a live check. Before launch, open each primary source (SEBI circular, exchange notice, Finance Act, your broker's charge sheet), confirm the figure, and reword the italic line at the end of the lesson to say you checked it. When a rule changes later (Budget day, SEBI circulars), update the lesson and set its "Updated on" date in the CMS.

## 8. The weekly routine

1. Write the next chapter in the CMS. Courses: pick its module, set the chapter number inside that module, add two or three "You can now" lines and three self-check questions, then delete the title from the module's planned list. Numbering, progress bars, previous/next links and the curriculum update themselves. If the chapter uses a new market word, add a glossary card for it too.
2. Cover image: either upload a photo in the CMS, or leave the default path and run `npm run covers` locally before pushing (the script draws a cover for any article that lacks one).
3. Read it aloud once. Cut anything you would not say to a friend. No em dashes, no "let's dive in", no stock tips.
4. Publish. Check the live page on your phone.
5. Send the Monday email.

## 9. What to write next

The planned chapters now live inside the modules (CMS > Modules), and the site shows them as "Coming soon" in order: 9 for Basics, 7 for Intermediate, 7 for Advanced. Write them top to bottom. Two chapters a week clears Basics in about a month, and finishing a whole level before the next is the plan that gives readers the most "module complete" moments.

Stories and AI have no order. Good next stories: Dhirubhai Ambani's 1977 IPO and the shareholder meetings in stadiums; the 2008 crash as seen from Dalal Street; the Ketan Parekh years and what changed after 2001; how the NSE went from nothing to the biggest derivatives exchange in the world. Good next AI pieces: building a watchlist screener with a chatbot and a spreadsheet; what SEBI's AI consultation means for your broker's app; the limits of AI-generated "research reports" doing the rounds on WhatsApp.

## 10. Later improvements, when there is time

Replace the generated covers with photographs where it matters (home page, the lead story on each feed). Add a named author with a photo and a short real biography; it helps readers trust the site and helps search engines rank finance content. Add a glossary page built from the terms the lessons define. Consider Hindi or Hinglish versions of the Basics course once the English one is complete. Upgrade search to a static index (Pagefind) when the article count passes a hundred.
