'use client'

import { useTranslation } from 'react-i18next'
import '@/app/i18n'

export function LabsRoute() {
  const { t } = useTranslation('labs')
  const th = (key: string) => ({ __html: t(key) })

  return (
    <main data-route="labs">
      <section className="vn-hero">
        <div className="wrap">
          <div className="eyebrow"><span className="num">[ {t('labs.bracket')} ]</span> <span>{t('labs.ey')}</span></div>
          <h1 dangerouslySetInnerHTML={th('labs.h')} />
          <p className="lead">{t('labs.lead')}</p>
        </div>
      </section>
    </main>
  )
}
