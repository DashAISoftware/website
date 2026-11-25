import type { Metadata } from 'next'
import es from '@/public/locales/es/contribute.json'
import { ContributeRoute } from '@/components/community/routes/ContributeRoute'

export const metadata: Metadata = {
  title: es['ct.h'],
  description: es['ct.lead'],
  alternates: { canonical: '/contribute' },
}

export default function Page() {
  return <ContributeRoute />
}
