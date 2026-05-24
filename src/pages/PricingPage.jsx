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

export function PricingPage() {
  const { t, language, contentLanguage } = useTranslation()

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
              <h3>{item.title[contentLanguage]}</h3>
              <p>{item.note[contentLanguage]}</p>
            </div>
            <div className="price-box">
              <p className="price-value">{item.amount}</p>
              <p className="price-unit">{(unitLabelByLanguage[language] ?? unitLabelByLanguage.en)[item.unit]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
