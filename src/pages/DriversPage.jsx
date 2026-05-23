import { SectionHeading } from '../components/SectionHeading'
import { ImageWithLoader } from '../components/ImageWithLoader'
import { drivers } from '../data/drivers'
import { useTranslation } from '../hooks/useTranslation'

export function DriversPage() {
  const { t, language } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.drivers}
        subtitle={t.pages.driversIntro}
      />

      <div className="card-grid driver-grid">
        {drivers.map((driver) => (
          <article key={driver.id} className="card driver-card">
            <div className="portrait-frame">
              <ImageWithLoader
                src={driver.photo}
                fallbackSrc={driver.photoFallback}
                alt={driver.name[language]}
                className="portrait-image"
                wrapperClassName="portrait-image-shell"
              />
            </div>
            <div className="driver-card-content">
              <h3>{driver.name[language]}</h3>
              <p>{driver.experience[language]}</p>
              <p>{driver.specialty[language]}</p>
              <p>{driver.languages[language].join(' • ')}</p>
              <p className="driver-phone">{driver.phone}</p>
              <p className={driver.availability ? 'badge badge-available' : 'badge badge-unavailable'}>
                <span className="badge-dot"></span>
                {driver.availability ? t.common.available : t.common.unavailable}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
