import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Articles. `category` is the section name ("Bazaar Basics", "Bazaar Stories", ...).
// Course sections order their articles by `lesson` and group them by `module`;
// feed sections order by `date`.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    lesson: z.number().int().positive().optional(),
    module: z.string().optional(),
    outcomes: z.array(z.string()).default([]),
    quiz: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    author: z.string(),
    authorBio: z.string().optional().default(''),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string(),
    imageWide: z.string().optional(),
    readTime: z.string().default('6 min'),
    featured: z.boolean().default(false),
    hot: z.boolean().default(false),
    draft: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

// Sections = the five top-level heads in the navigation.
const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    kind: z.enum(['course', 'feed']).default('feed'),
    short: z.string().optional(),
    tagline: z.string().optional().default(''),
    description: z.string().optional().default(''),
    image: z.string().optional(),
    order: z.number().default(99),
  }),
});

// Modules group the chapters of a course section. `planned` lists chapter
// titles that are not written yet; they show as "coming" on the syllabus.
const modules = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/modules' }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    section: z.string(),
    order: z.number().default(99),
    description: z.string().optional().default(''),
    planned: z.array(z.string()).default([]),
  }),
});

// Glossary: one term per Markdown file. The body is the definition plus an example.
const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    title: z.string(),
    short: z.string(),
    aliases: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    lesson: z.string().optional(),
    // false = never turn mentions of this term into links (for common words like "share")
    autolink: z.boolean().default(true),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    bio: z.string().optional().default(''),
    role: z.string().optional(),
    photo: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    updated: z.coerce.date().optional(),
    heroEyebrow: z.string().optional(),
    heading: z.string().optional(),
    headingAccent: z.string().optional(),
    intro: z.string().optional(),
  }),
});

export const collections = { blog, categories, modules, glossary, authors, pages };
