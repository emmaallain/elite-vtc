import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'

export function YachtingPage() {
  const { t } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.yachting}
        subtitle={t.pages.yachtingIntro}
      />

      <div className="card-grid">
        {t.pages.yachtingItems.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
