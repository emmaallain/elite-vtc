import { SectionHeading } from '../components/SectionHeading'
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
            <h3>{item.title[language]}</h3>
            <p className="price-value">{item.amount}</p>
            <p>{unitLabelByLanguage[language][item.unit]}</p>
            <p>{item.note[language]}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
