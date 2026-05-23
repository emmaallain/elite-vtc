import { SectionHeading } from '../components/SectionHeading'
import { drivers } from '../data/drivers'
import { useTranslation } from '../hooks/useTranslation'

export function DriversPage() {
  const { t, language } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        eyebrow="Elite VTC"
        title={t.sections.drivers}
        subtitle={t.pages.driversIntro}
      />

      <div className="card-grid">
        {drivers.map((driver) => (
          <article key={driver.id} className="card">
            <div className="portrait-frame">
              <img src={driver.photo} alt={driver.name[language]} className="portrait-image" />
            </div>
            <h3>{driver.name[language]}</h3>
            <p>{driver.experience[language]}</p>
            <p>{driver.specialty[language]}</p>
            <p>{driver.languages[language].join(' • ')}</p>
            <p className="badge">
              {driver.availability ? t.common.available : t.common.unavailable}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
