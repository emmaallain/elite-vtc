const SUPPORTED_LANGUAGES = ['fr', 'en', 'ru', 'ar']

export const DRIVERS_STORAGE_KEY = 'elite-vtc-admin-drivers'
export const VEHICLES_STORAGE_KEY = 'elite-vtc-admin-vehicles'
export const EXCURSIONS_STORAGE_KEY = 'elite-vtc-admin-excursions'

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

export function createDriverFromAdminInput({ name, phone, experience, specialty, languagesCsv, photoUrl, availability }) {
  const timestamp = Date.now()

  return {
    id: `driver-admin-${timestamp}`,
    name: localizedText(name),
    experience: localizedText(experience),
    specialty: localizedText(specialty),
    languages: localizedList(languagesCsv),
    availability,
    phone,
    photo: photoUrl,
    photoFallback: photoUrl,
  }
}

export function createVehicleFromAdminInput({ name, category, capacityCount, featuresCsv, imageUrl }) {
  const safeCapacity = Number.isFinite(capacityCount) && capacityCount > 0 ? capacityCount : 1
  const timestamp = Date.now()

  return {
    id: `vehicle-admin-${timestamp}`,
    name: localizedText(name),
    category: localizedText(category),
    capacity: localizedText(`${safeCapacity} passengers`),
    capacityCount: safeCapacity,
    features: localizedList(featuresCsv),
    gallery: [
      {
        src: imageUrl,
        fallbackSrc: imageUrl,
        alt: localizedText(name),
      },
    ],
  }
}

export function createExcursionFromAdminInput({ name, summary, imageUrl }) {
  const timestamp = Date.now()

  return {
    id: `excursion-admin-${timestamp}`,
    name: localizedText(name),
    image: {
      src: imageUrl,
      fallbackSrc: imageUrl,
    },
    gallery: [
      {
        src: imageUrl,
        fallbackSrc: imageUrl,
        alt: localizedText(name),
      },
    ],
    summary: localizedText(summary),
    priceEstimate: localizedText('On request'),
  }
}
