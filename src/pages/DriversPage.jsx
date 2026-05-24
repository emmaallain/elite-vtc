import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { ImageWithLoader } from '../components/ImageWithLoader'
import { drivers } from '../data/drivers'
import { useAdmin } from '../hooks/useAdmin'
import { useTranslation } from '../hooks/useTranslation'
import { DRIVERS_STORAGE_KEY, getStoredArray, setStoredArray } from '../utils/adminData'
import { readCloudArray, writeCloudArray } from '../utils/cloudStorage'

export function DriversPage() {
  const { t, contentLanguage } = useTranslation()
  const { isAdmin } = useAdmin()
  const [driverItems, setDriverItems] = useState(drivers)
  const [isSyncedReady, setIsSyncedReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    const hydrate = async () => {
      const localDrivers = getStoredArray(DRIVERS_STORAGE_KEY, drivers)

      if (!isMounted) {
        return
      }

      setDriverItems(localDrivers)

      const cloudDrivers = await readCloudArray(DRIVERS_STORAGE_KEY)

      if (!isMounted) {
        return
      }

      if (Array.isArray(cloudDrivers)) {
        setDriverItems(cloudDrivers)
      }

      setIsSyncedReady(true)
    }

    hydrate()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isSyncedReady) {
      return
    }

    setStoredArray(DRIVERS_STORAGE_KEY, driverItems)
    writeCloudArray(DRIVERS_STORAGE_KEY, driverItems)
  }, [driverItems, isSyncedReady])

  const handleDeleteDriver = (driverId) => {
    setDriverItems((current) => current.filter((driver) => driver.id !== driverId))
  }

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.drivers}
        subtitle={t.pages.driversIntro}
      />

      <div className="card-grid driver-grid">
        {driverItems.map((driver) => (
          <article key={driver.id} className="card driver-card">
            <div className="portrait-frame">
              <ImageWithLoader
                src={driver.photo}
                fallbackSrc={driver.photoFallback}
                alt={driver.name[contentLanguage]}
                className="portrait-image"
                wrapperClassName="portrait-image-shell"
              />
            </div>
            <div className="driver-card-content">
              <h3>{driver.name[contentLanguage]}</h3>
              <p>{driver.experience[contentLanguage]}</p>
              <p>{driver.specialty[contentLanguage]}</p>
              <p>{driver.languages[contentLanguage].join(' • ')}</p>
              <p className="driver-phone">{driver.phone}</p>
              <p className={driver.availability ? 'badge badge-available' : 'badge badge-unavailable'}>
                <span className="badge-dot"></span>
                {driver.availability ? t.common.available : t.common.unavailable}
              </p>

              {isAdmin ? (
                <button
                  type="button"
                  className="admin-action-button"
                  onClick={() => handleDeleteDriver(driver.id)}
                >
                  Supprimer ce chauffeur
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
