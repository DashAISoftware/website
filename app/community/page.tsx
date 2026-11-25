import type { Metadata } from 'next'
import { CommunityRoute } from '@/components/community/routes/CommunityRoute'

export const metadata: Metadata = { title: 'Comunidad' }

export default function Page() {
  return <CommunityRoute />
}
