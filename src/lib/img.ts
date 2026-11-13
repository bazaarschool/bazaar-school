// Image helper. Returns images as-is (served from your own site). After the
// first deploy is verified, flip USE_NETLIFY_IMG to true to route images through
// Netlify's image CDN (resize + webp), then check the live site before relying on it.
const USE_NETLIFY_IMG = false;

export function img(src: string, width: number, q: number = 72): string {
  if (!src) return src;
  if (!USE_NETLIFY_IMG || !import.meta.env.PROD) return src;
  return '/.netlify/images?url=' + encodeURIComponent(src) + '&w=' + width + '&fm=webp&q=' + q;
}
