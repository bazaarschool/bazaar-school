import { getCollection, type CollectionEntry } from 'astro:content';
import { catSlug } from './format';

export type Post = CollectionEntry<'blog'>;

export interface Section {
  name: string;        // "Bazaar Basics"
  slug: string;        // "basics" (served at /basics/)
  kind: 'course' | 'feed';
  short: string;       // "Basics"
  tagline: string;
  description: string;
  image?: string;
  order: number;
}

// The five sections, read from src/content/categories and sorted by "order".
export async function getSections(): Promise<Section[]> {
  const cats = await getCollection('categories');
  return cats
    .map((c) => ({
      name: c.data.name,
      slug: c.data.slug || catSlug(c.data.name),
      kind: c.data.kind,
      short: c.data.short || c.data.name.replace(/^Bazaar\s+/i, ''),
      tagline: c.data.tagline ?? '',
      description: c.data.description ?? '',
      image: c.data.image,
      order: c.data.order ?? 99,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getSectionByName(name: string): Promise<Section | undefined> {
  return (await getSections()).find((s) => s.name === name);
}

export function sectionHref(s: Pick<Section, 'slug'>): string {
  return '/' + s.slug + '/';
}

// Feed sections (Stories, AI): newest first.
export function orderFeed(posts: Post[], section: Section): Post[] {
  return posts
    .filter((p) => !p.data.draft && p.data.category === section.name)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Every live article, newest first.
export async function getLivePosts(): Promise<Post[]> {
  return (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// "8 min" -> 8
export function minutesOf(readTime: string): number {
  const m = parseInt(readTime, 10);
  return Number.isFinite(m) ? m : 6;
}

// ---------------------------------------------------------------------------
// Courses: a level (Basics, Intermediate, Advanced) holds modules, a module
// holds chapters. A chapter is numbered "module.chapter", e.g. 1.2.
// Written chapters come from articles with `module` + `lesson` set; planned
// chapters come from the module's `planned` list and show as "coming soon".
// ---------------------------------------------------------------------------

export interface ChapterRow {
  num: string;     // "1.2"
  title: string;
  post?: Post;     // missing for planned chapters
}

export interface ModuleBlock {
  id: string;
  index: number;   // position inside the level, 1-based
  title: string;
  description: string;
  rows: ChapterRow[];
  liveIds: string[];
}

export interface Chapter {
  post: Post;
  num: string;
  module: ModuleBlock;
}

export interface Level {
  section: Section;
  index: number;       // 1 = Basics, 2 = Intermediate, 3 = Advanced
  modules: ModuleBlock[];
  chapters: Chapter[]; // written chapters in reading order
  planned: number;
  minutes: number;
}

function byLesson(a: Post, b: Post): number {
  const la = a.data.lesson ?? 9999;
  const lb = b.data.lesson ?? 9999;
  return la - lb || a.data.date.getTime() - b.data.date.getTime();
}

function makeBlock(id: string, index: number, title: string, description: string, live: Post[], planned: string[]): ModuleBlock {
  const rows: ChapterRow[] = [];
  let n = 0;
  for (const p of live) {
    const want = p.data.lesson ?? 0;
    n = want > n ? want : n + 1;
    rows.push({ num: `${index}.${n}`, title: p.data.title, post: p });
  }
  // A planned title that has since been written is skipped automatically.
  const written = new Set(live.map((p) => p.data.title.trim().toLowerCase()));
  for (const t of planned) {
    if (written.has(t.trim().toLowerCase())) continue;
    n += 1;
    rows.push({ num: `${index}.${n}`, title: t });
  }
  return { id, index, title, description, rows, liveIds: live.map((p) => p.id) };
}

export async function getLevels(): Promise<Level[]> {
  const sections = (await getSections()).filter((s) => s.kind === 'course');
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  const mods = await getCollection('modules');

  return sections.map((section, i) => {
    const mine = posts.filter((p) => p.data.category === section.name);
    const defs = mods
      .filter((m) => m.data.section === section.name)
      .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
    const known = new Set(defs.map((m) => m.id));
    const modules = defs.map((m, j) =>
      makeBlock(m.id, j + 1, m.data.title, m.data.description, mine.filter((p) => p.data.module === m.id).sort(byLesson), m.data.planned),
    );
    // Chapters without a valid module still appear, in a block at the end.
    const loose = mine.filter((p) => !p.data.module || !known.has(p.data.module)).sort(byLesson);
    if (loose.length) modules.push(makeBlock(`${section.slug}-more`, modules.length + 1, 'More chapters', '', loose, []));

    const chapters: Chapter[] = modules.flatMap((m) =>
      m.rows.filter((r) => r.post).map((r) => ({ post: r.post as Post, num: r.num, module: m })),
    );
    const planned = modules.reduce((n, m) => n + m.rows.length - m.liveIds.length, 0);
    const minutes = chapters.reduce((n, c) => n + minutesOf(c.post.data.readTime), 0);
    return { section, index: i + 1, modules, chapters, planned, minutes };
  });
}

export async function getLevel(slug: string): Promise<Level | undefined> {
  return (await getLevels()).find((l) => l.section.slug === slug);
}

// Where one article sits in the course, with its neighbours.
export interface Placement {
  level: Level;
  chapter: Chapter;
  pos: number;          // 0-based index among the level's written chapters
  prev?: Chapter;
  next?: Chapter;
  nextLevel?: Level;
}

export async function getPlacement(postId: string): Promise<Placement | undefined> {
  const levels = await getLevels();
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const pos = level.chapters.findIndex((c) => c.post.id === postId);
    if (pos < 0) continue;
    return {
      level,
      chapter: level.chapters[pos],
      pos,
      prev: level.chapters[pos - 1],
      next: level.chapters[pos + 1],
      nextLevel: levels[i + 1],
    };
  }
  return undefined;
}
