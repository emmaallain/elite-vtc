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
    day: 'par journée',
  },
  en: {
    trip: 'per trip',
    hour: 'per hour',
    day: 'per day',
  },
  ru: {
    trip: 'за поездку',
    hour: 'в час',
    day: 'в день',
  },
  ar: {
    trip: 'لكل رحلة',
    hour: 'لكل ساعة',
    day: 'لكل يوم',
  },
}

export function ServicesAndPricingPage() {
  const { t, language, contentLanguage } = useTranslation()
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
                <h3>{service.title[contentLanguage]}</h3>
              </div>
              <p>{service.description[contentLanguage]}</p>

              {servicePricing.length > 0 ? (
                <div className="service-pricing-list">
                  {servicePricing.map((item) => (
                    <div key={item.id} className="service-pricing-item">
                      <div className="service-pricing-copy">
                        <h4>{item.title[contentLanguage]}</h4>
                        <p>{item.note[contentLanguage]}</p>
                      </div>
                      <div className="price-box service-price-box">
                        <p className="price-value">{item.amount}</p>
                        <p className="price-unit">{(unitLabelByLanguage[language] ?? unitLabelByLanguage.en)[item.unit]}</p>
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
