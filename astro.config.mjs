// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` powers canonical URLs, Open Graph tags, the sitemap and robots.txt.
// It is already set to the real domain for Bazaar School.
export default defineConfig({
  site: 'https://bazaarschool.com',
  // The thank-you page is noindex, so keep it out of the sitemap too.
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you/') })],
  // The dev toolbar overlaps bottom-fixed UI (cookie bar, theme toggle) during
  // local testing. Off so localhost looks like production.
  devToolbar: { enabled: false },
});
