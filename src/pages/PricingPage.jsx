import { SectionHeading } from '../components/SectionHeading'
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
}

export function PricingPage() {
  const { t, language } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        eyebrow="Transparent Pricing"
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
  )
}
