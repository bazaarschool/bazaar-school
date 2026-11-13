// Generates branded cover images (JPG) for every article and section, the default
// share image, and the PNG favicons, entirely from code: a chalk line chart on a
// chalkboard, coloured by section. No stock photos, nothing downloaded.
//
//   npm run covers            make anything that is missing
//   npm run covers -- --force redraw everything
//
// An article whose `image` points outside /images/articles/ (for example a photo
// uploaded through the CMS into /uploads/) is left alone.
import sharp from 'sharp';
import { readFile, readdir, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');
const FORCE = process.argv.includes('--force');

const BOARD = '#0F2E25';
const CHALK = '#F2F4EE';
const MARIGOLD = '#F2B134';
const LEVEL = { basics: '#3FC27F', intermediate: '#F2B134', advanced: '#F0735C', stories: '#B48CE8', ai: '#7FA3FF' };

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mark(size, x, y) {
  const k = size / 32;
  return `<g transform="translate(${x} ${y}) scale(${k})"><rect width="32" height="32" rx="7" fill="${MARIGOLD}"/><polyline points="6,23 12,17 17,20 26,9" fill="none" stroke="${BOARD}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="26" cy="9" r="2.6" fill="${BOARD}"/></g>`;
}

function coverSvg({ seed, color, kind, w = 1600, h = 900 }) {
  const rand = rng(hash(seed));
  const n = 28;
  const x0 = -40;
  const x1 = w * 0.84;
  let y = 0.66 + (rand() - 0.5) * 0.08;
  const pts = [];
  for (let i = 0; i < n; i++) {
    y += (rand() - 0.5) * 0.16 - 0.013;
    y = Math.min(0.9, Math.max(0.14, y));
    pts.push([x0 + (i / (n - 1)) * (x1 - x0), y * h]);
  }
  const d = pts.map(([x, yy], i) => (i ? 'L' : 'M') + x.toFixed(1) + ' ' + yy.toFixed(1)).join(' ');
  const area = d + ` L${x1.toFixed(1)} ${h} L${x0} ${h} Z`;
  const [ex, ey] = pts[n - 1];

  let grid = '';
  for (let gx = 80; gx < w; gx += 80) grid += `<line x1="${gx}" y1="0" x2="${gx}" y2="${h}"/>`;
  for (let gy = 80; gy < h; gy += 80) grid += `<line x1="0" y1="${gy}" x2="${w}" y2="${gy}"/>`;

  let extra = '';
  if (kind === 'stories') {
    for (let i = 0; i < n; i++) {
      const bh = 30 + rand() * 170;
      const bx = x0 + (i / (n - 1)) * (x1 - x0);
      extra += `<rect x="${(bx - 16).toFixed(1)}" y="${(h - bh).toFixed(1)}" width="32" height="${bh.toFixed(1)}" rx="4" fill="${color}" opacity="0.22"/>`;
    }
  } else if (kind === 'ai') {
    let py = ey;
    let pd = `M${ex.toFixed(1)} ${ey.toFixed(1)}`;
    for (let i = 1; i <= 6; i++) {
      py += (rand() - 0.5) * 60 - 18;
      py = Math.min(h * 0.9, Math.max(h * 0.1, py));
      pd += ` L${(ex + i * ((w - ex) / 6)).toFixed(1)} ${py.toFixed(1)}`;
    }
    extra = `<path d="${pd}" fill="none" stroke="${color}" stroke-width="6" stroke-dasharray="16 16" stroke-linecap="round" opacity="0.8"/>`;
  } else if (kind === 'advanced') {
    for (let i = 2; i < n; i += 3) {
      const [cx, cy] = pts[i];
      const body = 20 + rand() * 70;
      const up = rand() > 0.45;
      extra += `<line x1="${cx.toFixed(1)}" y1="${(cy - body).toFixed(1)}" x2="${cx.toFixed(1)}" y2="${(cy + body).toFixed(1)}" stroke="${color}" stroke-width="3" opacity="0.5"/>`;
      extra += `<rect x="${(cx - 11).toFixed(1)}" y="${(cy - body / 2).toFixed(1)}" width="22" height="${body.toFixed(1)}" rx="3" fill="${up ? color : BOARD}" stroke="${color}" stroke-width="3" opacity="0.85"/>`;
    }
  }

  const ms = Math.round(h * 0.085);
  const pad = Math.round(w * 0.035);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${BOARD}"/>
  <g stroke="${CHALK}" stroke-opacity="0.07" stroke-width="1">${grid}</g>
  <path d="${area}" fill="${color}" opacity="0.14"/>
  ${extra}
  <path d="${d}" fill="none" stroke="${CHALK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" opacity="0.92"/>
  <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="24" fill="${color}" opacity="0.3"/>
  <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="12" fill="${color}"/>
  ${mark(ms, pad, h - ms - pad)}
</svg>`;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}
async function writeJpg(svg, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(dest);
}
function frontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (!m) return fm;
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

async function main() {
  const catDir = path.join(ROOT, 'src/content/categories');
  const sections = [];
  for (const f of await readdir(catDir)) {
    if (f.endsWith('.json')) sections.push(JSON.parse(await readFile(path.join(catDir, f), 'utf8')));
  }
  const byName = new Map(sections.map((s) => [s.name, s]));
  let made = 0;
  let kept = 0;

  for (const s of sections) {
    const dest = path.join(PUB, (s.image || `/images/sections/${s.slug}.jpg`).replace(/^\//, ''));
    if (!FORCE && (await exists(dest))) { kept++; continue; }
    await writeJpg(coverSvg({ seed: 'section:' + s.slug, color: LEVEL[s.slug] || MARIGOLD, kind: s.slug }), dest);
    made++;
  }

  const blogDir = path.join(ROOT, 'src/content/blog');
  for (const f of await readdir(blogDir)) {
    if (!f.endsWith('.md')) continue;
    const slug = f.replace(/\.md$/, '');
    const fm = frontmatter(await readFile(path.join(blogDir, f), 'utf8'));
    const rel = (fm.image || `/images/articles/${slug}.jpg`).replace(/^\//, '');
    if (!rel.startsWith('images/articles/')) continue;
    const dest = path.join(PUB, rel);
    if (!FORCE && (await exists(dest))) { kept++; continue; }
    const s = byName.get(fm.category);
    await writeJpg(coverSvg({ seed: slug, color: LEVEL[s?.slug] || MARIGOLD, kind: s?.slug || 'basics' }), dest);
    made++;
  }

  const og = path.join(PUB, 'images/og-default.jpg');
  if (FORCE || !(await exists(og))) {
    await writeJpg(coverSvg({ seed: 'bazaar-school', color: MARIGOLD, kind: 'basics', w: 1200, h: 630 }), og);
    made++;
  }

  const fav = await readFile(path.join(PUB, 'favicon.svg'));
  for (const [name, size] of [['favicon-16.png', 16], ['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
    const dest = path.join(PUB, name);
    if (!FORCE && (await exists(dest))) { kept++; continue; }
    await sharp(fav, { density: Math.ceil((72 * size) / 32) * 2 }).resize(size, size).png().toFile(dest);
    made++;
  }

  console.log(`covers: ${made} generated, ${kept} already present${FORCE ? ' (forced)' : ''}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
