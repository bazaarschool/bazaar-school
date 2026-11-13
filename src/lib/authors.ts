import { getCollection } from 'astro:content';

export interface AuthorInfo {
  name: string;
  bio: string;
  role: string;
  photo?: string;
}

// Resolve an article's author (stored by name) to its editable profile.
export async function getAuthorMap(): Promise<Record<string, AuthorInfo>> {
  const authors = await getCollection('authors');
  const map: Record<string, AuthorInfo> = {};
  for (const a of authors) {
    map[a.data.name] = {
      name: a.data.name,
      bio: a.data.bio ?? '',
      role: a.data.role ?? '',
      photo: a.data.photo || undefined,
    };
  }
  return map;
}
