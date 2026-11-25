import type { ReactNode } from 'react'

type Props = {
  title: string
  desc: string
  icon: ReactNode
  // Chip in the top right corner (level on the home, status on Labs)
  tag: string
  // Small tags in the footer; without them the card has no footer or arrow
  tags?: string[]
  // Small line above the title, e.g. "Caso 01"
  kicker?: string
  // Without href the card is plain text and shows no arrow
  href?: string
  external?: boolean
  // Extra classes, e.g. the docs section colour or the "soon" state
  className?: string
}

// Card with icon, chip, title, description and footer tags. Used by the home
// docs section and the Labs catalog; styles live under .hm-doc in globals.css.
export function DocCard({ title, desc, icon, tag, tags, kicker, href, external, className }: Props) {
  const classes = `hm-doc${className ? ` ${className}` : ''}`
  const body = (
    <>
      <span className="hm-doc-top">
        <span className="hm-doc-icon">{icon}</span>
        <span className="hm-tag">{tag}</span>
      </span>
      {kicker && <span className="lab-code">{kicker}</span>}
      <span className="hm-doc-title">{title}</span>
      <span className="hm-doc-desc">{desc}</span>
      {tags && tags.length > 0 && (
        <span className="hm-doc-foot">
          <span className="hm-doc-tags">
            {tags.map((tg) => <span key={tg} className="hm-tag hm-tag--sm">{tg}</span>)}
          </span>
          {href && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </span>
      )}
    </>
  )

  if (!href) return <div className={classes}>{body}</div>
  return (
    <a className={classes} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {body}
    </a>
  )
}
