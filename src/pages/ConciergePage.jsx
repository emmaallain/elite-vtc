import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'

export function ConciergePage() {
  const { t } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.concierge}
        subtitle={t.pages.conciergeIntro}
      />

      <div className="card-grid">
        {t.pages.conciergeItems.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
