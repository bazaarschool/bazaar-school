import { getCollection, render } from 'astro:content';

// Load one editable page (about / privacy / terms / disclaimer) by its file id.
export async function getPage(id: string) {
  const entry = (await getCollection('pages')).find((p) => p.id === id);
  if (!entry) throw new Error('Missing page content: src/content/pages/' + id + '.md');
  const { Content } = await render(entry);
  return { data: entry.data, Content };
}
