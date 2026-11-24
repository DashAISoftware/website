import type { Metadata } from 'next'
import es from '@/public/locales/es/about.json'
import { AboutRoute } from '@/components/community/routes/AboutRoute'

export const metadata: Metadata = {
  title: es['abt.h'],
  description: es['abt.lead'],
  alternates: { canonical: '/about' },
}

export default function Page() {
  return <AboutRoute />
}
