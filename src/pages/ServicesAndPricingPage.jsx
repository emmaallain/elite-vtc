import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcon'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { excursions } from '../data/excursions'
import { services } from '../data/services'
import { pricing } from '../data/pricing'
import { useTranslation } from '../hooks/useTranslation'

const unitLabelByLanguage = {
  fr: {
    trip: 'par trajet',
    hour: 'par heure',
    day: 'par journee',
  },
  en: {
    trip: 'per trip',
    hour: 'per hour',
    day: 'per day',
  },
}

export function ServicesAndPricingPage() {
  const { t, language } = useTranslation()
  const pricingKeysByService = {
    airport: ['airport'],
    hourly: ['hourly', 'day'],
    event: [],
  }

  return (
    <>
      {/* Services Section */}
      <section className="panel">
        <SectionHeading
          title={t.sections.services}
          subtitle={t.pages.servicesIntro}
        />

        <div className="card-grid">
          {services.map((service) => {
            const servicePricing = pricing.filter((item) =>
              pricingKeysByService[service.icon]?.includes(item.serviceKey),
            )

            return (
            <article key={service.id} className="card service-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ServiceIcon type={service.icon} />
                <h3>{service.title[language]}</h3>
              </div>
              <p>{service.description[language]}</p>

              {servicePricing.length > 0 ? (
                <div className="service-pricing-list">
                  {servicePricing.map((item) => (
                    <div key={item.id} className="service-pricing-item">
                      <div className="service-pricing-copy">
                        <h4>{item.title[language]}</h4>
                        <p>{item.note[language]}</p>
                      </div>
                      <div className="price-box service-price-box">
                        <p className="price-value">{item.amount}</p>
                        <p className="price-unit">{unitLabelByLanguage[language][item.unit]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="price-box service-price-box service-price-box-request">
                  <p className="price-value">{t.common.onRequest}</p>
                </div>
              )}
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
