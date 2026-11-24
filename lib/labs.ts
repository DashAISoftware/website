// Pure helpers for the Labs section. Relative imports only, so `node --test`
// can load this file without the `@/` alias.
import { LABS, type Lab, type LabFile, type LabTask } from '../data/labs.ts'

// Lowercase, without accents: "Tutoría" and "TUTORIA" match.
export function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function filterLabs(labs: Lab[], task: 'all' | LabTask, query: string, textOf: (lab: Lab) => string): Lab[] {
  const q = normalize(query.trim())
  return labs.filter(lab =>
    (task === 'all' || lab.tasks.includes(task)) &&
    (!q || normalize(textOf(lab)).includes(q)),
  )
}

// What the catalog search looks at: everything a card shows (code, title,
// summary, concepts) plus the task names. `t` is the i18n translate function.
export function labSearchText(lab: Lab, t: (key: string) => string): string {
  const p = `labs.item.${lab.slug}`
  return [t(`${p}.code`), t(`${p}.title`), t(`${p}.summary`), t(`${p}.concepts`), ...lab.tasks].join(' ')
}

export function getLab(slug: string): Lab | undefined {
  return LABS.find(l => l.slug === slug)
}

// "Otros labs" on a lab page: available ones first, then in catalog order.
export function otherLabs(slug: string, max = 2): Lab[] {
  const rest = LABS.filter(l => l.slug !== slug)
  return [...rest.filter(l => l.status === 'available'), ...rest.filter(l => l.status !== 'available')].slice(0, max)
}

export function sessionFile(lab: Lab): LabFile | undefined {
  return lab.files.find(f => f.kind === 'session')
}

// Files that aren't uploaded yet get no link at all.
export function fileHref(file: LabFile | undefined): string | null {
  return file?.ready ? `/${file.path}` : null
}

export function formatMetric(n: number, lang: string): string {
  return new Intl.NumberFormat(lang, { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(n)
}

// Base 1000, like the sizes shown in the mockup: "49 KB", "2,5 MB".
export function formatSize(bytes: number, lang: string): string {
  if (bytes >= 1_000_000) {
    return `${new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`
  }
  return `${new Intl.NumberFormat(lang, { maximumFractionDigits: 0 }).format(bytes / 1000)} KB`
}

// Reads the URL hash into the page route.
// `#labs/<slug>` opens a lab page only when that lab has one; otherwise the catalog.
export function parseHash(hash: string): { route: string; slug: string | null; isSubAnchor: boolean } {
  const raw = (hash || '#home').replace(/^#/, '') || 'home'
  if (raw.startsWith('faq-')) return { route: 'faq', slug: null, isSubAnchor: true }
  if (raw === 'first-pr' || raw.startsWith('guide-') || raw.startsWith('contrib-')) return { route: 'contribute', slug: null, isSubAnchor: true }
  if (raw.startsWith('hm-')) return { route: 'home', slug: null, isSubAnchor: true }
  if (raw === 'labs' || raw.startsWith('labs/')) {
    const slug = raw.slice('labs/'.length)
    return { route: 'labs', slug: getLab(slug)?.hasDetail ? slug : null, isSubAnchor: false }
  }
  return { route: raw, slug: null, isSubAnchor: false }
}
