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

## 2. Code on GitHub (done)

The code lives at github.com/bazaarschool/bazaar-school on the `main` branch. Edits made through the CMS are committed there for you. For edits made on your computer, publish them with:

```bash
git add -A
```

```bash
git commit -m "Describe the change"
```

```bash
git push
```

If you have also published from the CMS, fetch those commits before working locally:

```bash
git pull
```

## 3. Deploy on Netlify (15 minutes)

Before you start, sign in to github.com as **bazaarschool** in the same browser, so Netlify sees the right GitHub account.

1. Sign in at app.netlify.com. The same Netlify account as BLOGACIOUS is fine; each project is separate.
2. On the **Projects** page choose **Add new project**, then **Import an existing project**, then **GitHub**.
3. If GitHub asks you to authorise or install the Netlify app, pick the **bazaarschool** account and give it access to **Only select repositories: bazaar-school**. If the repository is missing from Netlify's list, use the link on that screen to configure the Netlify app on GitHub.
4. Pick **bazaar-school**. Netlify reads `netlify.toml`, so the build command (`npm run build`) and publish directory (`dist`) fill themselves in. Set the project name to `bazaarschool` if it is free; that gives you `bazaarschool.netlify.app`.
5. Click **Deploy**. The first build takes one to two minutes. When it says Published, open the `.netlify.app` address and click around.
6. Forms: Netlify switches form detection off for new projects. Go to **Project configuration > Forms** and enable form detection, then **Deploys > Trigger deploy > Deploy project** so the newsletter form is picked up. After that deploy the Forms page lists `newsletter`. Turn on email notifications for form submissions (Project configuration > Notifications) so subscribers reach your inbox until you connect a proper email tool.

## 3b. Connect bazaarschool.com (10 minutes, then a wait)

1. **Domain management > Add a domain** and enter `bazaarschool.com`. Netlify adds `www.bazaarschool.com` with it.
2. Point the domain at Netlify in one of two ways. **Netlify DNS** is simplest: copy the four nameservers Netlify shows and paste them into the nameserver settings at the registrar where you bought the domain. Or **keep your registrar's DNS** and add the records Netlify shows on the same screen, usually an A record for `@` and a CNAME for `www` pointing to `bazaarschool.netlify.app`.
3. DNS changes take from ten minutes to a day. When the domain shows as verified, Netlify issues the HTTPS certificate by itself. If it hasn't after an hour, use **HTTPS > Verify DNS configuration**.

## 4. Switch on the CMS login (10 minutes)

The editor at `/admin/` signs you in with GitHub. Netlify handles that sign-in once you give it the keys of a small GitHub "OAuth app". The older Netlify Identity plus Git Gateway method is deprecated on Netlify, so this site doesn't use it.

1. On GitHub, signed in as bazaarschool, open **Settings > Developer settings > OAuth Apps > New OAuth App** (github.com/settings/developers). If bazaarschool is an organisation, use the organisation's own Settings > Developer settings instead. Fill in:
   - Application name: `Bazaar School CMS`
   - Homepage URL: `https://bazaarschool.com` (or the `.netlify.app` address until the domain works)
   - Authorization callback URL: `https://api.netlify.com/auth/done`, exactly
2. Click **Register application**. Copy the **Client ID**, then click **Generate a new client secret** and copy the secret. Paste both only into Netlify in the next step; never email or chat them to anyone.
3. In Netlify: **Project configuration > Security > OAuth > Install provider > GitHub**. Paste the Client ID and secret, and save.
4. Open `/admin/` on your site and click **Login with GitHub**. Approve the pop-up and the editor opens.
5. From then on: Lessons & articles > New. Publishing commits a Markdown file to GitHub, Netlify rebuilds, and the page is live in about a minute. Anyone you want as an editor needs write access to the GitHub repository.

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
