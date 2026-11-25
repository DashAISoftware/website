import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

// Internal paths ("/faq") navigate without a full reload; anything else is a plain link.
export function AppLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith('/')) return <Link href={href} {...rest} />
  return <a href={href} {...rest} />
}
