import { getCollection } from 'astro:content';

export interface Term {
  id: string;
  title: string;
  short: string;
  aliases: string[];
  related: string[];
  lesson?: string;
  autolink: boolean;
}

export async function getTerms(): Promise<Term[]> {
  const entries = await getCollection('glossary');
  return entries
    .map((e) => ({
      id: e.id,
      title: e.data.title,
      short: e.data.short,
      aliases: e.data.aliases,
      related: e.data.related,
      lesson: e.data.lesson,
      autolink: e.data.autolink,
    }))
    .sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
}

export function letterOf(title: string): string {
  const c = title.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : '#';
}

// Related terms are stored by title or id; resolve whichever was used.
export function resolveTerms(refs: string[], all: Term[]): Term[] {
  const out: Term[] = [];
  for (const r of refs) {
    const key = r.trim().toLowerCase();
    const t = all.find((x) => x.id === key || x.title.toLowerCase() === key);
    if (t && !out.includes(t)) out.push(t);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Auto-linking: turn the first mention of each glossary term inside an
// article's paragraphs and list items into a link to its card. Runs on the
// rendered HTML at page build time, so new terms reach old articles on the
// next build. Headings, links, code and tables are never touched.
// ---------------------------------------------------------------------------

const VOID = new Set(['area', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const SKIP = new Set(['a', 'button', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'kbd', 'pre', 'script', 'style', 'sup', 'summary', 'td', 'th']);
const ALLOW = new Set(['li', 'p']);

interface Matcher { id: string; short: string; re: RegExp; }

function escRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

function escAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// All-caps terms (SEBI, STT, P/E, T+1) match case-sensitively; others ignore case.
function isAcronym(p: string): boolean {
  return /^[A-Z0-9/&+.\-]+$/.test(p) && /[A-Z].*[A-Z]|[A-Z][0-9+]/.test(p);
}

function buildMatchers(terms: Term[], skip: Set<string>): Matcher[] {
  const out: Matcher[] = [];
  for (const t of terms) {
    if (!t.autolink || skip.has(t.id)) continue;
    const phrases = new Set([t.title, ...t.aliases].map((p) => p.trim()).filter((p) => p.length > 1));
    for (const p of phrases) {
      out.push({
        id: t.id,
        short: t.short,
        re: new RegExp(`(?<![\\p{L}\\p{N}])${escRe(p)}(?![\\p{L}\\p{N}])`, isAcronym(p) ? 'u' : 'iu'),
      });
    }
  }
  return out;
}

export function linkGlossary(html: string, terms: Term[], opts: { skip?: string[]; max?: number } = {}): string {
  const matchers = buildMatchers(terms, new Set(opts.skip ?? []));
  if (!matchers.length) return html;
  const max = opts.max ?? 8;
  const used = new Set<string>();
  let links = 0;
  const stack: string[] = [];

  const linkText = (text: string): string => {
    let out = '';
    let rest = text;
    while (links < max) {
      let best: { index: number; len: number; m: Matcher } | null = null;
      for (const m of matchers) {
        if (used.has(m.id)) continue;
        const r = m.re.exec(rest);
        if (!r) continue;
        if (!best || r.index < best.index || (r.index === best.index && r[0].length > best.len)) {
          best = { index: r.index, len: r[0].length, m };
        }
      }
      if (!best) break;
      used.add(best.m.id);
      links++;
      const word = rest.slice(best.index, best.index + best.len);
      out += rest.slice(0, best.index) + `<a href="/glossary/${best.m.id}/" class="gloss" title="${escAttr(best.m.short)}">${word}</a>`;
      rest = rest.slice(best.index + best.len);
    }
    return out + rest;
  };

  return html.replace(/(<[^>]+>)|([^<]+)/g, (_all, tag: string | undefined, text: string | undefined) => {
    if (tag) {
      const t = /^<\s*(\/)?\s*([a-zA-Z][a-zA-Z0-9]*)/.exec(tag);
      if (t) {
        const name = t[2].toLowerCase();
        if (t[1]) {
          const i = stack.lastIndexOf(name);
          if (i >= 0) stack.length = i;
        } else if (!VOID.has(name) && !tag.endsWith('/>')) {
          stack.push(name);
        }
      }
      return tag;
    }
    const s = text ?? '';
    if (links >= max || !s.trim()) return s;
    if (!stack.some((n) => ALLOW.has(n)) || stack.some((n) => SKIP.has(n))) return s;
    return linkText(s);
  });
}
