import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcon'
import { services } from '../data/services'
import { useTranslation } from '../hooks/useTranslation'

export function ServicesPage() {
  const { t, language } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        eyebrow={t.pages.servicesEyebrow}
        title={t.sections.services}
        subtitle={t.pages.servicesIntro}
      />

      <div className="card-grid">
        {services.map((service) => (
          <article key={service.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ServiceIcon type={service.icon} />
              <h3>{service.title[language]}</h3>
            </div>
            <p>{service.description[language]}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
