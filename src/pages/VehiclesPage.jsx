import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { vehicles } from '../data/vehicles'
import { useAdmin } from '../hooks/useAdmin'
import { useTranslation } from '../hooks/useTranslation'
import { getStoredArray, setStoredArray, VEHICLES_STORAGE_KEY } from '../utils/adminData'
import { MdPerson } from 'react-icons/md'

export function VehiclesPage() {
  const { t, contentLanguage } = useTranslation()
  const { isAdmin } = useAdmin()
  const [vehicleItems, setVehicleItems] = useState(vehicles)

  useEffect(() => {
    setVehicleItems(getStoredArray(VEHICLES_STORAGE_KEY, vehicles))
  }, [])

  useEffect(() => {
    setStoredArray(VEHICLES_STORAGE_KEY, vehicleItems)
  }, [vehicleItems])

  const handleDeleteVehicle = (vehicleId) => {
    setVehicleItems((current) => current.filter((vehicle) => vehicle.id !== vehicleId))
  }

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.vehicles}
        subtitle={t.pages.vehiclesIntro}
      />

      <div className="card-grid vehicle-grid">
        {vehicleItems.map((vehicle) => (
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

              {isAdmin ? (
                <button
                  type="button"
                  className="admin-action-button"
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                >
                  Supprimer ce véhicule
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
