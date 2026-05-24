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
    name: { fr: 'Mercedes Classe V', en: 'Mercedes V-Class', ru: 'Mercedes V-Class', ar: 'مرسيدس V-Class' },
    category: { fr: 'Van Premium', en: 'Premium Van', ru: 'Премиум-ван', ar: 'فان فاخر' },
    capacity: { fr: '7 passagers', en: '7 passengers', ru: '7 пассажиров', ar: '7 ركاب' },
    capacityCount: 7,
    features: {
      fr: ['Intérieur cuir', 'Eau à bord', 'Chargeurs'],
      en: ['Leather interior', 'Water on board', 'Charging ports'],
      ru: ['Кожаный салон', 'Вода на борту', 'Зарядные устройства'],
      ar: ['مقصورة جلدية', 'مياه على متن السيارة', 'شواحن'],
    },
    gallery: [
      {
        src: vehicleExterior.src,
        fallbackSrc: vehicleExterior.fallbackSrc,
        alt: {
          fr: 'Mercedes Classe V de profil',
          en: 'Mercedes V-Class side view',
          ru: 'Mercedes V-Class, вид сбоку',
          ar: 'مرسيدس V-Class من الجانب',
        },
      },
      {
        src: vehicleInterior.src,
        fallbackSrc: vehicleInterior.fallbackSrc,
        alt: {
          fr: 'Mercedes Classe V intérieur',
          en: 'Mercedes V-Class interior',
          ru: 'Салон Mercedes V-Class',
          ar: 'داخلية مرسيدس V-Class',
        },
      },
    ],
  },
  {
    id: 'vehicle-2',
    name: { fr: 'Mercedes Classe V', en: 'Mercedes V-Class', ru: 'Mercedes V-Class', ar: 'مرسيدس V-Class' },
    category: { fr: 'Van Premium', en: 'Premium Van', ru: 'Премиум-ван', ar: 'فان فاخر' },
    capacity: { fr: '7 passagers', en: '7 passengers', ru: '7 пассажиров', ar: '7 ركاب' },
    capacityCount: 7,
    features: {
      fr: ['Intérieur cuir', 'Eau à bord', 'Chargeurs'],
      en: ['Leather interior', 'Water on board', 'Charging ports'],
      ru: ['Кожаный салон', 'Вода на борту', 'Зарядные устройства'],
      ar: ['مقصورة جلدية', 'مياه على متن السيارة', 'شواحن'],
    },
    gallery: [
      {
        src: vehicleExterior.src,
        fallbackSrc: vehicleExterior.fallbackSrc,
        alt: {
          fr: 'Mercedes Classe V de profil',
          en: 'Mercedes V-Class side view',
          ru: 'Mercedes V-Class, вид сбоку',
          ar: 'مرسيدس V-Class من الجانب',
        },
      },
      {
        src: vehicleInterior.src,
        fallbackSrc: vehicleInterior.fallbackSrc,
        alt: {
          fr: 'Mercedes Classe V intérieur',
          en: 'Mercedes V-Class interior',
          ru: 'Салон Mercedes V-Class',
          ar: 'داخلية مرسيدس V-Class',
        },
      },
    ],
  },
]
