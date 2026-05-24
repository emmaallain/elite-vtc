import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcon'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { excursions } from '../data/excursions'
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

      <div className="excursions-section">
        <h3>{t.pages.excursionsTitle}</h3>
        <p>{t.pages.excursionsIntro}</p>

        <div className="card-grid excursions-grid">
          {excursions.map((excursion) => (
            <article key={excursion.id} className="card excursion-card">
              <VehicleCarousel
                title={excursion.name[language]}
                gallery={excursion.gallery}
                language={language}
              />
              <div className="excursion-copy">
                <h4>{excursion.name[language]}</h4>
                <p>{excursion.summary[language]}</p>
              </div>
              <div className="price-box excursion-price-box">
                <p className="price-value">{excursion.priceEstimate[language]}</p>
                <p className="price-unit">{excursion.priceContext[language]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
