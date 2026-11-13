'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'

export function LabDetailRoute({ slug }: { slug: string }) {
  const { t } = useTranslation('labs')

  return (
    <main data-route="labs">
      <section className="vn-hero">
        <div className="wrap">
          <h1>{t(`labs.item.${slug}.title`)}</h1>
        </div>
      </section>
    </main>
  )
}
