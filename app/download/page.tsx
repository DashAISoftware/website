import type { Metadata } from 'next'
import es from '@/public/locales/es/download.json'
import { DownloadRoute } from '@/components/community/routes/DownloadRoute'

export const metadata: Metadata = {
  title: es['dl.h'],
  description: es['dl.lead'],
  alternates: { canonical: '/download' },
}

export default function Page() {
  return <DownloadRoute />
}
