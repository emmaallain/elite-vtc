const SUPPORTED_LANGUAGES = ['fr', 'en', 'ru', 'ar']

export const DRIVERS_STORAGE_KEY = 'elite-vtc-admin-drivers'
export const VEHICLES_STORAGE_KEY = 'elite-vtc-admin-vehicles'
export const EXCURSIONS_STORAGE_KEY = 'elite-vtc-admin-excursions'
export const REVIEWS_STORAGE_KEY = 'elite-vtc-reviews'

export function getStoredArray(storageKey, fallbackArray) {
  try {
    const raw = localStorage.getItem(storageKey)

    if (!raw) {
      return fallbackArray
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return fallbackArray
    }

    return parsed
  } catch {
    return fallbackArray
  }
}

export function setStoredArray(storageKey, value) {
  localStorage.setItem(storageKey, JSON.stringify(value))
}

export function localizedText(value) {
  return SUPPORTED_LANGUAGES.reduce((acc, language) => {
    acc[language] = value
    return acc
  }, {})
}

function isLocalizedValue(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function ensureLocalizedText(value) {
  return isLocalizedValue(value) ? value : localizedText(value)
}

export function localizedList(value) {
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return SUPPORTED_LANGUAGES.reduce((acc, language) => {
    acc[language] = items
    return acc
  }, {})
}

function ensureLocalizedList(value) {
  return isLocalizedValue(value) ? value : localizedList(value)
}

export function createDriverFromAdminInput({ name, phone, experience, specialty, languagesCsv, languages, photoUrl, availability }) {
  const timestamp = Date.now()

  return {
    id: `driver-admin-${timestamp}`,
    name: ensureLocalizedText(name),
    experience: ensureLocalizedText(experience),
    specialty: ensureLocalizedText(specialty),
    languages: ensureLocalizedList(languages || languagesCsv),
    availability,
    phone,
    photo: photoUrl,
    photoFallback: photoUrl,
  }
}

export function createVehicleFromAdminInput({ name, category, capacityCount, capacityLabel, featuresCsv, features, imageUrl }) {
  const safeCapacity = Number.isFinite(capacityCount) && capacityCount > 0 ? capacityCount : 1
  const timestamp = Date.now()

  return {
    id: `vehicle-admin-${timestamp}`,
    name: ensureLocalizedText(name),
    category: ensureLocalizedText(category),
    capacity: ensureLocalizedText(capacityLabel || `${safeCapacity} passagers`),
    capacityCount: safeCapacity,
    features: ensureLocalizedList(features || featuresCsv),
    gallery: [
      {
        src: imageUrl,
        fallbackSrc: imageUrl,
        alt: ensureLocalizedText(name),
      },
    ],
  }
}

export function createExcursionFromAdminInput({ name, summary, imageUrl, priceEstimate = 'Sur devis' }) {
  const timestamp = Date.now()

  return {
    id: `excursion-admin-${timestamp}`,
    name: ensureLocalizedText(name),
    image: {
      src: imageUrl,
      fallbackSrc: imageUrl,
    },
    gallery: [
      {
        src: imageUrl,
        fallbackSrc: imageUrl,
        alt: ensureLocalizedText(name),
      },
    ],
    summary: ensureLocalizedText(summary),
    priceEstimate: ensureLocalizedText(priceEstimate),
  }
}
