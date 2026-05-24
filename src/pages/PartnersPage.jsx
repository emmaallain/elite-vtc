import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'

export function PartnersPage() {
  const { t } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.partners}
        subtitle={t.pages.partnersIntro}
      />

      <div className="card-grid">
        {t.pages.partnersItems.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
