import type { Metadata } from 'next'
import { PluginsRoute } from '@/components/community/routes/PluginsRoute'

export const metadata: Metadata = { title: 'Plugins' }

export default function Page() {
  return <PluginsRoute />
}
