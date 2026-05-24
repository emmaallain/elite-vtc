import { SectionHeading } from '../components/SectionHeading'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { vehicles } from '../data/vehicles'
import { useTranslation } from '../hooks/useTranslation'
import { MdPerson } from 'react-icons/md'

export function VehiclesPage() {
  const { t, contentLanguage } = useTranslation()

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.vehicles}
        subtitle={t.pages.vehiclesIntro}
      />

      <div className="card-grid vehicle-grid">
        {vehicles.map((vehicle) => (
          <article key={vehicle.id} className="card vehicle-card">
            <div className="vehicle-card-media">
              <VehicleCarousel
                title={t.common.gallery}
                gallery={vehicle.gallery}
                language={contentLanguage}
              />
            </div>

            <div className="vehicle-card-content">
              <div className="vehicle-card-header">
                <div>
                  <h3>{vehicle.name[contentLanguage]}</h3>
                  <p>{vehicle.category[contentLanguage]}</p>
                </div>
                <div className="capacity-badge" aria-label={vehicle.capacity[contentLanguage]}>
                  <span>{vehicle.capacityCount}</span>
                  <MdPerson aria-hidden="true" focusable="false" />
                </div>
              </div>
              <ul className="feature-list">
                {vehicle.features[contentLanguage].map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
