import { SectionHeading } from '../components/SectionHeading'
import { drivers } from '../data/drivers'
import { useTranslation } from '../hooks/useTranslation'

export function DriversPage() {
  const { t, language } = useTranslation()

  const handleImageError = (event, fallbackSrc) => {
    if (event.currentTarget.src.endsWith(fallbackSrc)) {
      return
    }

    event.currentTarget.src = fallbackSrc
  }

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.drivers}
        subtitle={t.pages.driversIntro}
      />

      <div className="card-grid">
        {drivers.map((driver) => (
          <article key={driver.id} className="card">
            <div className="portrait-frame">
              <img
                src={driver.photo}
                alt={driver.name[language]}
                className="portrait-image"
                loading="lazy"
                decoding="async"
                onError={(event) => handleImageError(event, driver.photoFallback)}
              />
            </div>
            <h3>{driver.name[language]}</h3>
            <p>{driver.experience[language]}</p>
            <p>{driver.specialty[language]}</p>
            <p>{driver.languages[language].join(' • ')}</p>
            <p className="driver-phone">{driver.phone}</p>
            <p className={driver.availability ? 'badge badge-available' : 'badge badge-unavailable'}>
              <span className="badge-dot"></span>
              {driver.availability ? t.common.available : t.common.unavailable}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
