import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { drivers } from '../data/drivers'
import { excursions } from '../data/excursions'
import { vehicles } from '../data/vehicles'
import { useAdmin } from '../hooks/useAdmin'
import {
  createDriverFromAdminInput,
  createExcursionFromAdminInput,
  createVehicleFromAdminInput,
  DRIVERS_STORAGE_KEY,
  EXCURSIONS_STORAGE_KEY,
  getStoredArray,
  setStoredArray,
  VEHICLES_STORAGE_KEY,
} from '../utils/adminData'

export function AdminPage() {
  const { isAdmin } = useAdmin()

  const [driverItems, setDriverItems] = useState(drivers)
  const [vehicleItems, setVehicleItems] = useState(vehicles)
  const [excursionItems, setExcursionItems] = useState(excursions)

  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    experience: '',
    specialty: '',
    languagesCsv: '',
    photoUrl: '',
    availability: true,
  })

  const [newVehicle, setNewVehicle] = useState({
    name: '',
    category: '',
    capacityCount: 7,
    featuresCsv: '',
    imageUrl: '',
  })

  const [newExcursion, setNewExcursion] = useState({
    name: '',
    summary: '',
    imageUrl: '',
  })

  useEffect(() => {
    setDriverItems(getStoredArray(DRIVERS_STORAGE_KEY, drivers))
    setVehicleItems(getStoredArray(VEHICLES_STORAGE_KEY, vehicles))
    setExcursionItems(getStoredArray(EXCURSIONS_STORAGE_KEY, excursions))
  }, [])

  useEffect(() => {
    setStoredArray(DRIVERS_STORAGE_KEY, driverItems)
  }, [driverItems])

  useEffect(() => {
    setStoredArray(VEHICLES_STORAGE_KEY, vehicleItems)
  }, [vehicleItems])

  useEffect(() => {
    setStoredArray(EXCURSIONS_STORAGE_KEY, excursionItems)
  }, [excursionItems])

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  const handleAddDriver = (event) => {
    event.preventDefault()

    const payload = {
      ...newDriver,
      name: newDriver.name.trim(),
      phone: newDriver.phone.trim(),
      experience: newDriver.experience.trim(),
      specialty: newDriver.specialty.trim(),
      languagesCsv: newDriver.languagesCsv.trim(),
      photoUrl: newDriver.photoUrl.trim(),
    }

    if (!payload.name || !payload.phone || !payload.photoUrl) {
      return
    }

    setDriverItems((current) => [createDriverFromAdminInput(payload), ...current])

    setNewDriver({
      name: '',
      phone: '',
      experience: '',
      specialty: '',
      languagesCsv: '',
      photoUrl: '',
      availability: true,
    })
  }

  const handleAddVehicle = (event) => {
    event.preventDefault()

    const payload = {
      ...newVehicle,
      name: newVehicle.name.trim(),
      category: newVehicle.category.trim(),
      featuresCsv: newVehicle.featuresCsv.trim(),
      imageUrl: newVehicle.imageUrl.trim(),
      capacityCount: Number(newVehicle.capacityCount),
    }

    if (!payload.name || !payload.category || !payload.imageUrl) {
      return
    }

    setVehicleItems((current) => [createVehicleFromAdminInput(payload), ...current])

    setNewVehicle({
      name: '',
      category: '',
      capacityCount: 7,
      featuresCsv: '',
      imageUrl: '',
    })
  }

  const handleAddExcursion = (event) => {
    event.preventDefault()

    const payload = {
      name: newExcursion.name.trim(),
      summary: newExcursion.summary.trim(),
      imageUrl: newExcursion.imageUrl.trim(),
    }

    if (!payload.name || !payload.summary || !payload.imageUrl) {
      return
    }

    setExcursionItems((current) => [createExcursionFromAdminInput(payload), ...current])

    setNewExcursion({
      name: '',
      summary: '',
      imageUrl: '',
    })
  }

  return (
    <section className="panel admin-page-panel">
      <SectionHeading
        title="Administration"
        subtitle="Ajoutez des contenus ici. Les suppressions restent disponibles dans les pages concernées en mode admin."
      />

      <div className="admin-page-grid">
        <form className="admin-form" onSubmit={handleAddDriver}>
          <h3>Ajouter un chauffeur</h3>
          <input
            type="text"
            placeholder="Nom"
            value={newDriver.name}
            onChange={(event) => setNewDriver((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={newDriver.phone}
            onChange={(event) => setNewDriver((current) => ({ ...current, phone: event.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Expérience (ex: 10 years)"
            value={newDriver.experience}
            onChange={(event) => setNewDriver((current) => ({ ...current, experience: event.target.value }))}
          />
          <input
            type="text"
            placeholder="Spécialité"
            value={newDriver.specialty}
            onChange={(event) => setNewDriver((current) => ({ ...current, specialty: event.target.value }))}
          />
          <input
            type="text"
            placeholder="Langues (séparées par virgules)"
            value={newDriver.languagesCsv}
            onChange={(event) => setNewDriver((current) => ({ ...current, languagesCsv: event.target.value }))}
          />
          <input
            type="url"
            placeholder="URL photo"
            value={newDriver.photoUrl}
            onChange={(event) => setNewDriver((current) => ({ ...current, photoUrl: event.target.value }))}
            required
          />
          <label className="admin-checkbox-line">
            <input
              type="checkbox"
              checked={newDriver.availability}
              onChange={(event) => setNewDriver((current) => ({ ...current, availability: event.target.checked }))}
            />
            Disponible
          </label>
          <button type="submit" className="cta cta-primary">Ajouter le chauffeur</button>
        </form>

        <form className="admin-form" onSubmit={handleAddVehicle}>
          <h3>Ajouter un véhicule</h3>
          <input
            type="text"
            placeholder="Nom du véhicule"
            value={newVehicle.name}
            onChange={(event) => setNewVehicle((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={newVehicle.category}
            onChange={(event) => setNewVehicle((current) => ({ ...current, category: event.target.value }))}
            required
          />
          <input
            type="number"
            min={1}
            max={25}
            placeholder="Capacité"
            value={newVehicle.capacityCount}
            onChange={(event) => setNewVehicle((current) => ({ ...current, capacityCount: event.target.value }))}
          />
          <input
            type="text"
            placeholder="Équipements (séparés par virgules)"
            value={newVehicle.featuresCsv}
            onChange={(event) => setNewVehicle((current) => ({ ...current, featuresCsv: event.target.value }))}
          />
          <input
            type="url"
            placeholder="URL image"
            value={newVehicle.imageUrl}
            onChange={(event) => setNewVehicle((current) => ({ ...current, imageUrl: event.target.value }))}
            required
          />
          <button type="submit" className="cta cta-primary">Ajouter le véhicule</button>
        </form>

        <form className="admin-form" onSubmit={handleAddExcursion}>
          <h3>Ajouter une excursion</h3>
          <input
            type="text"
            placeholder="Nom de l'excursion"
            value={newExcursion.name}
            onChange={(event) => setNewExcursion((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Résumé"
            value={newExcursion.summary}
            onChange={(event) => setNewExcursion((current) => ({ ...current, summary: event.target.value }))}
            required
          />
          <input
            type="url"
            placeholder="URL image"
            value={newExcursion.imageUrl}
            onChange={(event) => setNewExcursion((current) => ({ ...current, imageUrl: event.target.value }))}
            required
          />
          <button type="submit" className="cta cta-primary">Ajouter l'excursion</button>
        </form>
      </div>
    </section>
  )
}
