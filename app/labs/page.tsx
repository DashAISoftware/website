import type { Metadata } from 'next'
import es from '@/public/locales/es/labs.json'
import { LabsRoute } from '@/components/community/routes/LabsRoute'

export const metadata: Metadata = {
  title: es['labs.h'],
  description: es['labs.lead'],
  alternates: { canonical: '/labs' },
}

export default function Page() {
  return <LabsRoute />
}
