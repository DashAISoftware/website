import type { Metadata } from 'next'
import { ModelsRoute } from '@/components/community/routes/ModelsRoute'

export const metadata: Metadata = { title: 'Modelos' }

export default function Page() {
  return <ModelsRoute />
}
