import { getMediaSource } from '../utils/media'

const yannickPhoto = getMediaSource('drivers/yannick.jpg', { width: 900 })
const christellePhoto = getMediaSource('drivers/christelle.jpg', { width: 900 })

export const drivers = [
  {
    id: 'driver-1',
    name: { fr: 'Yannick ALLAIN', en: 'Yannick ALLAIN' },
    experience: { fr: '12 ans d experience', en: '12 years of experience' },
    specialty: {
      fr: 'Transferts aeroport & clientele affaires',
      en: 'Airport transfers & business clients',
    },
    languages: { fr: ['Francais', 'English'], en: ['French', 'English'] },
    availability: true,
    phone: '+33 6 12 34 56 78',
    photo: yannickPhoto.src,
    photoFallback: yannickPhoto.fallbackSrc,
  },
  {
    id: 'driver-2',
    name: { fr: 'Christelle ALLAIN', en: 'Christelle ALLAIN' },
    experience: { fr: '9 ans d experience', en: '9 years of experience' },
    specialty: {
      fr: 'Mise a disposition evenementielle & VIP',
      en: 'Event-based and VIP chauffeur service',
    },
    languages: { fr: ['Francais', 'English', 'Allemand'], en: ['French', 'English', 'German'] },
    availability: true,
    phone: '+33 6 98 76 54 32',
    photo: christellePhoto.src,
    photoFallback: christellePhoto.fallbackSrc,
  },
]
