import type { Metadata } from 'next'
import es from '@/public/locales/es/news.json'
import { NewsRoute } from '@/components/community/routes/NewsRoute'

export const metadata: Metadata = {
  title: es['news.h'],
  description: es['news.lead'],
  alternates: { canonical: '/news' },
}

export default function Page() {
  return <NewsRoute />
}
