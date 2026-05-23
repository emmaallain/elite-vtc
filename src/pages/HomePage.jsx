import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="hero-panel">
        <h2 className="hero-title">{t.hero.title}</h2>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-actions">
          <Link className="cta cta-secondary" to="/services">
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </section>

      <section className="panel trust-panel">
        <SectionHeading title={t.trust.title} />
        <ul className="trust-list">
          {t.trust.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  )
}
