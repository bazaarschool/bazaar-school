export function fmtDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fmtDateLong(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function relativeTime(date: Date): string {
  const d = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (d <= 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 7) return d + ' days ago';
  if (d < 30) return Math.floor(d / 7) + 'w ago';
  if (d < 365) return Math.floor(d / 30) + 'mo ago';
  return Math.floor(d / 365) + 'y ago';
}

export function catSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
