// Relative imports only, so `node --test` can load this file.
import { getLab } from './labs.ts'

// Pages of the site, by path. `null` is the home page.
export const ROUTES = ['download', 'faq', 'labs', 'contribute', 'about', 'news', 'models', 'plugins', 'community'] as const
export type Route = (typeof ROUTES)[number] | 'home'

// Which page a path belongs to, for the navbar: "/labs/tutorias" -> "labs".
export function routeOf(pathname: string): Route {
  const first = pathname.replace(/^\/+/, '').split('/')[0]
  return (ROUTES as readonly string[]).includes(first) ? (first as Route) : 'home'
}

// The site used to route with the hash ("/#faq", "/#labs/tutorias").
// Returns where an old link should go now, or null when it needs no change.
export function legacyPath(hash: string): string | null {
  const raw = hash.replace(/^#/, '')
  if (!raw || raw === 'home') return null
  if (raw.startsWith('hm-')) return null // home anchors keep working as they are
  if (raw.startsWith('faq-')) return `/faq#${raw}`
  if (raw.startsWith('contrib-')) return `/contribute#${raw}`
  if (raw === 'first-pr' || raw.startsWith('guide-')) return '/contribute'
  if (raw === 'labs' || raw.startsWith('labs/')) {
    const slug = raw.slice('labs/'.length)
    return getLab(slug)?.hasDetail ? `/labs/${slug}` : '/labs'
  }
  if ((ROUTES as readonly string[]).includes(raw)) return `/${raw}`
  return null
}
