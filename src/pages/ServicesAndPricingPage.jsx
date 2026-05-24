import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcon'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { excursions } from '../data/excursions'
import { services } from '../data/services'
import { useTranslation } from '../hooks/useTranslation'

export function ServicesAndPricingPage() {
  const { t, contentLanguage } = useTranslation()

  return (
    <>
      {/* Services Section */}
      <section className="panel">
        <SectionHeading
          title={t.sections.services}
          subtitle={`${t.pages.servicesIntro} ${t.pages.servicesQuoteOnlyNote}`}
        />

        <div className="card-grid">
          {services.map((service) => {
            return (
            <article key={service.id} className="card service-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ServiceIcon type={service.icon} />
                <h3>{service.title[contentLanguage]}</h3>
              </div>
              <p>{service.description[contentLanguage]}</p>
            </article>
            )
          })}
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
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
