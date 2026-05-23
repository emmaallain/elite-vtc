import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcon'
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

  return (
    <>
      {/* Services Section */}
      <section className="panel">
        <SectionHeading
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

      {/* Pricing Section */}
      <section className="panel">
        <SectionHeading
          title={t.sections.pricing}
          subtitle={t.pages.pricingIntro}
        />

        <div className="card-grid">
          {pricing.map((item) => (
            <article key={item.id} className="card pricing-card">
              <div>
                <h3>{item.title[language]}</h3>
                <p>{item.note[language]}</p>
              </div>
              <div className="price-box">
                <p className="price-value">{item.amount}</p>
                <p className="price-unit">{unitLabelByLanguage[language][item.unit]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
