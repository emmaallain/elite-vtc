import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcon'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { excursions } from '../data/excursions'
import { services } from '../data/services'
import { useTranslation } from '../hooks/useTranslation'

export function ServicesPage() {
  const { t, contentLanguage } = useTranslation()

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
              <h3>{service.title[contentLanguage]}</h3>
            </div>
            <p>{service.description[contentLanguage]}</p>
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
                title={excursion.name[contentLanguage]}
                gallery={excursion.gallery}
                language={contentLanguage}
              />
              <div className="excursion-copy">
                <h4>{excursion.name[contentLanguage]}</h4>
                <p>{excursion.summary[contentLanguage]}</p>
              </div>
              <div className="price-box excursion-price-box">
                <p className="price-value">{excursion.priceEstimate[contentLanguage]}</p>
                <p className="price-unit">{excursion.priceContext?.[contentLanguage] ?? ''}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
