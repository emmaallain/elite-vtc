import { getMediaSource } from '../utils/media'

const vehicleExteriorSource =
  import.meta.env.VITE_VEHICLE_EXTERIOR_IMAGE?.trim() || 'vehicles/v-class-exterior.jpg'
const vehicleInteriorSource =
  import.meta.env.VITE_VEHICLE_INTERIOR_IMAGE?.trim() || 'vehicles/v-class-interior.jpg'

const vehicleExterior = getMediaSource(vehicleExteriorSource, {
  cloudinaryPath: vehicleExteriorSource,
  localPath: 'vehicles/v-class-exterior.jpg',
  width: 1400,
})
const vehicleInterior = getMediaSource(vehicleInteriorSource, {
  cloudinaryPath: vehicleInteriorSource,
  localPath: 'vehicles/v-class-interior.jpg',
  width: 1400,
})

export const vehicles = [
  {
    id: 'vehicle-1',
    name: { fr: 'Mercedes Classe V', en: 'Mercedes V-Class' },
    category: { fr: 'Van Premium', en: 'Premium Van' },
    capacity: { fr: '7 passagers', en: '7 passengers' },
    capacityCount: 7,
    features: {
      fr: ['Interieur cuir', 'Eau a bord', 'Chargeurs'],
      en: ['Leather interior', 'Water on board', 'Charging ports'],
    },
    gallery: [
      {
        src: vehicleExterior.src,
        fallbackSrc: vehicleExterior.fallbackSrc,
        alt: { fr: 'Mercedes Classe V de profil', en: 'Mercedes V-Class side view' },
      },
      {
        src: vehicleInterior.src,
        fallbackSrc: vehicleInterior.fallbackSrc,
        alt: { fr: 'Mercedes Classe V interieur', en: 'Mercedes V-Class interior' },
      },
    ],
  },
  {
    id: 'vehicle-2',
    name: { fr: 'Mercedes Classe V', en: 'Mercedes V-Class' },
    category: { fr: 'Van Premium', en: 'Premium Van' },
    capacity: { fr: '7 passagers', en: '7 passengers' },
    capacityCount: 7,
    features: {
      fr: ['Interieur cuir', 'Eau a bord', 'Chargeurs'],
      en: ['Leather interior', 'Water on board', 'Charging ports'],
    },
    gallery: [
      {
        src: vehicleExterior.src,
        fallbackSrc: vehicleExterior.fallbackSrc,
        alt: { fr: 'Mercedes Classe V de profil', en: 'Mercedes V-Class side view' },
      },
      {
        src: vehicleInterior.src,
        fallbackSrc: vehicleInterior.fallbackSrc,
        alt: { fr: 'Mercedes Classe V interieur', en: 'Mercedes V-Class interior' },
      },
    ],
  },
]
