import { SectionHeading } from '../components/SectionHeading'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { vehicles } from '../data/vehicles'
import { useTranslation } from '../hooks/useTranslation'

export function VehiclesPage() {
  const { t, language } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.vehicles}
        subtitle={t.pages.vehiclesIntro}
      />

      <div className="card-grid vehicle-grid">
        {vehicles.map((vehicle) => (
          <article key={vehicle.id} className="card vehicle-card">
            <div className="vehicle-card-header">
              <div>
                <h3>{vehicle.name[language]}</h3>
                <p>{vehicle.category[language]}</p>
              </div>
              <div className="capacity-badge" aria-label={vehicle.capacity[language]}>
                <span>{vehicle.capacityCount}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 11.2a3.4 3.4 0 1 0-3.4-3.4 3.4 3.4 0 0 0 3.4 3.4Zm0 2.1c-3.22 0-6.2 1.72-6.2 4.18V19h12.4v-1.52c0-2.46-2.98-4.18-6.2-4.18Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <ul className="feature-list">
              {vehicle.features[language].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <VehicleCarousel
              title={t.common.gallery}
              gallery={vehicle.gallery}
              language={language}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
