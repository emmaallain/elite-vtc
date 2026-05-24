import { getMediaSource } from '../utils/media'

export const excursions = [
  {
    id: 'monaco-montecarlo',
    name: {
      fr: 'Monaco / Monte-Carlo',
      en: 'Monaco / Monte-Carlo',
    },
    image: getMediaSource('excursions/Monaco.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/Monaco.jpeg', { width: 1400 }),
        alt: {
          fr: 'Monaco et Monte-Carlo en bord de mer',
          en: 'Monaco and Monte-Carlo by the sea',
        },
      },
      {
        ...getMediaSource('excursions/monaco-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Vue supplementaire de Monaco',
          en: 'Additional Monaco view',
        },
      },
    ],
    summary: {
      fr: 'Une escapade elegante entre le Rocher, le Casino et les plus belles vues de la Principaute.',
      en: 'An elegant escape between the Rock, the Casino and the finest views across the Principality.',
    },
    priceEstimate: {
      fr: 'Des 180 EUR',
      en: 'From EUR 180',
    },
  },
  {
    id: 'nice-ville',
    name: {
      fr: 'Nice et vieille ville',
      en: 'Nice and old town',
    },
    image: getMediaSource('excursions/nice.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/nice.jpeg', { width: 1400 }),
        alt: {
          fr: 'Promenade et panorama de Nice',
          en: 'Nice promenade and panorama',
        },
      },
      {
        ...getMediaSource('excursions/nice-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Vieille ville de Nice',
          en: 'Nice old town',
        },
      },
      {
        ...getMediaSource('excursions/nice-2.jpeg', { width: 1400 }),
        alt: {
          fr: 'Autre point de vue sur Nice',
          en: 'Another Nice viewpoint',
        },
      },
    ],
    summary: {
      fr: 'Une decouverte douce entre front de mer, vieille ville coloree et haltes panoramiques.',
      en: 'A smooth discovery through the seafront, colorful old town and panoramic stops.',
    },
    priceEstimate: {
      fr: 'Des 120 EUR',
      en: 'From EUR 120',
    },
  },
  {
    id: 'cannes-croisette',
    name: {
      fr: 'Cannes & Croisette',
      en: 'Cannes & Croisette',
    },
    image: getMediaSource('excursions/cannes.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/cannes.jpeg', { width: 1400 }),
        alt: {
          fr: 'Cannes et la Croisette',
          en: 'Cannes and the Croisette',
        },
      },
      {
        ...getMediaSource('excursions/cannes-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Ambiance supplementaire a Cannes',
          en: 'Additional Cannes scenery',
        },
      },
    ],
    summary: {
      fr: 'Une sortie chic entre palaces, boutiques, Croisette et bord de mer mythique.',
      en: 'A refined outing between palaces, boutiques, the Croisette and the iconic waterfront.',
    },
    priceEstimate: {
      fr: 'Des 170 EUR',
      en: 'From EUR 170',
    },
  },
  {
    id: 'saint-tropez',
    name: {
      fr: 'Saint-Tropez',
      en: 'Saint-Tropez',
    },
    image: getMediaSource('excursions/sttropez.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/sttropez.jpeg', { width: 1400 }),
        alt: {
          fr: 'Port et ambiance de Saint-Tropez',
          en: 'Saint-Tropez harbor and atmosphere',
        },
      },
      {
        ...getMediaSource('excursions/sttropez-&.jpeg', { width: 1400 }),
        alt: {
          fr: 'Vue supplementaire de Saint-Tropez',
          en: 'Additional Saint-Tropez view',
        },
      },
    ],
    summary: {
      fr: 'Une excursion signature pour profiter du port, des ruelles et de l atmosphere iconique de la cote.',
      en: 'A signature excursion to enjoy the harbor, narrow streets and iconic Riviera atmosphere.',
    },
    priceEstimate: {
      fr: 'Des 390 EUR',
      en: 'From EUR 390',
    },
  },
  {
    id: 'eze-village-panoramique',
    name: {
      fr: 'Eze et village panoramique',
      en: 'Eze and panoramic village',
    },
    image: getMediaSource('excursions/EZE.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/EZE.jpeg', { width: 1400 }),
        alt: {
          fr: 'Village d Eze et panorama',
          en: 'Eze village and panorama',
        },
      },
      {
        ...getMediaSource('excursions/eze-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Autre vue panoramique d Eze',
          en: 'Another panoramic view of Eze',
        },
      },
    ],
    summary: {
      fr: 'Un itineraire panoramique entre village perche, ruelles de caractere et vues spectaculaires.',
      en: 'A panoramic route through the hilltop village, character-filled lanes and spectacular views.',
    },
    priceEstimate: {
      fr: 'Des 150 EUR',
      en: 'From EUR 150',
    },
  },
]