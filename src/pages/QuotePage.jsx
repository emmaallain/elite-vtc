import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'

export function QuotePage() {
  const { t } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading title={t.nav.quote} subtitle={t.common.futureFeature} />
      <article className="card">
        <h3>{t.common.comingSoon}</h3>
        <p>{t.common.requestQuote}</p>
      </article>
    </section>
  )
}
