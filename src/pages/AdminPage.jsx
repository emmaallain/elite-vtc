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
import { buildLocalizedList, buildLocalizedText } from '../utils/autoTranslate'
import { readCloudArray, writeCloudArray } from '../utils/cloudStorage'

export function AdminPage() {
  const { isAdmin } = useAdmin()

  const [driverItems, setDriverItems] = useState(drivers)
  const [vehicleItems, setVehicleItems] = useState(vehicles)
  const [excursionItems, setExcursionItems] = useState(excursions)
  const [isSyncedReady, setIsSyncedReady] = useState(false)

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
  const [isAutoTranslating, setIsAutoTranslating] = useState(false)
  const [adminStatus, setAdminStatus] = useState('')

  useEffect(() => {
    let isMounted = true

    const hydrate = async () => {
      const localDrivers = getStoredArray(DRIVERS_STORAGE_KEY, drivers)
      const localVehicles = getStoredArray(VEHICLES_STORAGE_KEY, vehicles)
      const localExcursions = getStoredArray(EXCURSIONS_STORAGE_KEY, excursions)

      if (!isMounted) {
        return
      }

      setDriverItems(localDrivers)
      setVehicleItems(localVehicles)
      setExcursionItems(localExcursions)

      const [cloudDrivers, cloudVehicles, cloudExcursions] = await Promise.all([
        readCloudArray(DRIVERS_STORAGE_KEY),
        readCloudArray(VEHICLES_STORAGE_KEY),
        readCloudArray(EXCURSIONS_STORAGE_KEY),
      ])

      if (!isMounted) {
        return
      }

      if (Array.isArray(cloudDrivers)) {
        setDriverItems(cloudDrivers)
      }

      if (Array.isArray(cloudVehicles)) {
        setVehicleItems(cloudVehicles)
      }

      if (Array.isArray(cloudExcursions)) {
        setExcursionItems(cloudExcursions)
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

  useEffect(() => {
    if (!isSyncedReady) {
      return
    }

    setStoredArray(VEHICLES_STORAGE_KEY, vehicleItems)
    writeCloudArray(VEHICLES_STORAGE_KEY, vehicleItems)
  }, [vehicleItems, isSyncedReady])

  useEffect(() => {
    if (!isSyncedReady) {
      return
    }

    setStoredArray(EXCURSIONS_STORAGE_KEY, excursionItems)
    writeCloudArray(EXCURSIONS_STORAGE_KEY, excursionItems)
  }, [excursionItems, isSyncedReady])

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  const handleAddDriver = async (event) => {
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

    setIsAutoTranslating(true)
    setAdminStatus('Traduction automatique du chauffeur en cours...')

    const [localizedName, localizedExperience, localizedSpecialty, localizedLanguages] = await Promise.all([
      buildLocalizedText(payload.name),
      buildLocalizedText(payload.experience || payload.name),
      buildLocalizedText(payload.specialty || payload.name),
      buildLocalizedList(payload.languagesCsv || 'Français'),
    ])

    setDriverItems((current) => [
      createDriverFromAdminInput({
        ...payload,
        name: localizedName,
        experience: localizedExperience,
        specialty: localizedSpecialty,
        languages: localizedLanguages,
      }),
      ...current,
    ])

    setNewDriver({
      name: '',
      phone: '',
      experience: '',
      specialty: '',
      languagesCsv: '',
      photoUrl: '',
      availability: true,
    })

    setAdminStatus('Chauffeur ajouté avec traduction automatique.')
    setIsAutoTranslating(false)
  }

  const handleAddVehicle = async (event) => {
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

    setIsAutoTranslating(true)
    setAdminStatus('Traduction automatique du véhicule en cours...')

    const [localizedName, localizedCategory, localizedFeatures, localizedCapacityLabel] = await Promise.all([
      buildLocalizedText(payload.name),
      buildLocalizedText(payload.category),
      buildLocalizedList(payload.featuresCsv || 'Confort premium'),
      buildLocalizedText(`${payload.capacityCount} passagers`),
    ])

    setVehicleItems((current) => [
      createVehicleFromAdminInput({
        ...payload,
        name: localizedName,
        category: localizedCategory,
        features: localizedFeatures,
        capacityLabel: localizedCapacityLabel,
      }),
      ...current,
    ])

    setNewVehicle({
      name: '',
      category: '',
      capacityCount: 7,
      featuresCsv: '',
      imageUrl: '',
    })

    setAdminStatus('Véhicule ajouté avec traduction automatique.')
    setIsAutoTranslating(false)
  }

  const handleAddExcursion = async (event) => {
    event.preventDefault()

    const payload = {
      name: newExcursion.name.trim(),
      summary: newExcursion.summary.trim(),
      imageUrl: newExcursion.imageUrl.trim(),
    }

    if (!payload.name || !payload.summary || !payload.imageUrl) {
      return
    }

    setIsAutoTranslating(true)
    setAdminStatus('Traduction automatique de l excursion en cours...')

    const [localizedName, localizedSummary, localizedPriceEstimate] = await Promise.all([
      buildLocalizedText(payload.name),
      buildLocalizedText(payload.summary),
      buildLocalizedText('Sur devis'),
    ])

    setExcursionItems((current) => [
      createExcursionFromAdminInput({
        ...payload,
        name: localizedName,
        summary: localizedSummary,
        priceEstimate: localizedPriceEstimate,
      }),
      ...current,
    ])

    setNewExcursion({
      name: '',
      summary: '',
      imageUrl: '',
    })

    setAdminStatus('Excursion ajoutée avec traduction automatique.')
    setIsAutoTranslating(false)
  }

  return (
    <section className="panel admin-page-panel">
      <SectionHeading
        title="Administration"
        subtitle="Ajoutez des contenus ici. Les suppressions restent disponibles dans les pages concernées en mode admin."
      />

      {adminStatus ? <p className="admin-dialog-error">{adminStatus}</p> : null}

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
            type="text"
            placeholder="URL ou chemin photo"
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
          <button type="submit" className="cta cta-primary" disabled={isAutoTranslating}>Ajouter le chauffeur</button>
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
            type="text"
            placeholder="URL ou chemin image"
            value={newVehicle.imageUrl}
            onChange={(event) => setNewVehicle((current) => ({ ...current, imageUrl: event.target.value }))}
            required
          />
          <button type="submit" className="cta cta-primary" disabled={isAutoTranslating}>Ajouter le véhicule</button>
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
            type="text"
            placeholder="URL ou chemin image"
            value={newExcursion.imageUrl}
            onChange={(event) => setNewExcursion((current) => ({ ...current, imageUrl: event.target.value }))}
            required
          />
          <button type="submit" className="cta cta-primary" disabled={isAutoTranslating}>Ajouter l'excursion</button>
        </form>
      </div>
    </section>
  )
}
