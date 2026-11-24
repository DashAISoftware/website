import type { Metadata } from 'next'
import es from '@/public/locales/es/faq.json'
import { FaqRoute } from '@/components/community/routes/FaqRoute'

export const metadata: Metadata = {
  title: es['faq.h'],
  description: es['faq.lead'],
  alternates: { canonical: '/faq' },
}

export default function Page() {
  return <FaqRoute />
}
