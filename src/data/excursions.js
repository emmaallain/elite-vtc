import { getMediaSource } from '../utils/media'

export const excursions = [
  {
    id: 'monaco-montecarlo',
    name: {
      fr: 'Monaco / Monte-Carlo',
      en: 'Monaco / Monte-Carlo',
      ru: 'Монако / Монте-Карло',
      ar: 'موناكو / مونت كارلو',
    },
    image: getMediaSource('excursions/Monaco.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/Monaco.jpeg', { width: 1400 }),
        alt: {
          fr: 'Monaco et Monte-Carlo en bord de mer',
          en: 'Monaco and Monte-Carlo by the sea',
          ru: 'Монако и Монте-Карло у моря',
          ar: 'موناكو ومونت كارلو على البحر',
        },
      },
      {
        ...getMediaSource('excursions/monaco-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Vue supplémentaire de Monaco',
          en: 'Additional Monaco view',
          ru: 'Дополнительный вид Монако',
          ar: 'إطلالة إضافية على موناكو',
        },
      },
    ],
    summary: {
      fr: 'Une escapade élégante entre le Rocher, le Casino et les plus belles vues de la Principauté.',
      en: 'An elegant escape between the Rock, the Casino and the finest views across the Principality.',
      ru: 'Элегантная поездка между Скаллой, Казино и лучшими панорамами Княжества.',
      ar: 'رحلة أنيقة بين الصخرة والكازينو وأجمل إطلالات الإمارة.',
    },
    priceEstimate: {
      fr: 'Dès 180 EUR',
      en: 'From EUR 180',
      ru: 'От 180 EUR',
      ar: 'ابتداءً من 180 EUR',
    },
  },
  {
    id: 'nice-ville',
    name: {
      fr: 'Nice et vieille ville',
      en: 'Nice and old town',
      ru: 'Ницца и старый город',
      ar: 'نيس والمدينة القديمة',
    },
    image: getMediaSource('excursions/nice.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/nice.jpeg', { width: 1400 }),
        alt: {
          fr: 'Promenade et panorama de Nice',
          en: 'Nice promenade and panorama',
          ru: 'Набережная и панорама Ниццы',
          ar: 'كورنيش وإطلالة بانورامية على نيس',
        },
      },
      {
        ...getMediaSource('excursions/nice-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Vieille ville de Nice',
          en: 'Nice old town',
          ru: 'Старый город Ниццы',
          ar: 'المدينة القديمة في نيس',
        },
      },
      {
        ...getMediaSource('excursions/nice-2.jpeg', { width: 1400 }),
        alt: {
          fr: 'Autre point de vue sur Nice',
          en: 'Another Nice viewpoint',
          ru: 'Еще одна точка обзора Ниццы',
          ar: 'إطلالة أخرى على نيس',
        },
      },
    ],
    summary: {
      fr: 'Une découverte douce entre front de mer, vieille ville colorée et haltes panoramiques.',
      en: 'A smooth discovery through the seafront, colorful old town and panoramic stops.',
      ru: 'Приятное знакомство с набережной, красочным старым городом и панорамными остановками.',
      ar: 'اكتشاف هادئ بين الواجهة البحرية والمدينة القديمة الملونة ومحطات بانورامية.',
    },
    priceEstimate: {
      fr: 'Dès 120 EUR',
      en: 'From EUR 120',
      ru: 'От 120 EUR',
      ar: 'ابتداءً من 120 EUR',
    },
  },
  {
    id: 'cannes-croisette',
    name: {
      fr: 'Cannes & Croisette',
      en: 'Cannes & Croisette',
      ru: 'Канны и Круазетт',
      ar: 'كان والكورنيش',
    },
    image: getMediaSource('excursions/cannes.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/cannes.jpeg', { width: 1400 }),
        alt: {
          fr: 'Cannes et la Croisette',
          en: 'Cannes and the Croisette',
          ru: 'Канны и Круазетт',
          ar: 'كان والكورنيش',
        },
      },
      {
        ...getMediaSource('excursions/cannes-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Ambiance supplémentaire à Cannes',
          en: 'Additional Cannes scenery',
          ru: 'Дополнительный вид Канн',
          ar: 'مشهد إضافي من كان',
        },
      },
    ],
    summary: {
      fr: 'Une sortie chic entre palaces, boutiques, Croisette et bord de mer mythique.',
      en: 'A refined outing between palaces, boutiques, the Croisette and the iconic waterfront.',
      ru: 'Элегантная поездка среди дворцов, бутиков, Круазетт и легендарной набережной.',
      ar: 'جولة راقية بين القصور والبوتيكات والكورنيش والواجهة البحرية الشهيرة.',
    },
    priceEstimate: {
      fr: 'Dès 170 EUR',
      en: 'From EUR 170',
      ru: 'От 170 EUR',
      ar: 'ابتداءً من 170 EUR',
    },
  },
  {
    id: 'saint-tropez',
    name: {
      fr: 'Saint-Tropez',
      en: 'Saint-Tropez',
      ru: 'Сен-Тропе',
      ar: 'سان تروبيه',
    },
    image: getMediaSource('excursions/sttropez.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/sttropez.jpeg', { width: 1400 }),
        alt: {
          fr: 'Port et ambiance de Saint-Tropez',
          en: 'Saint-Tropez harbor and atmosphere',
          ru: 'Порт и атмосфера Сен-Тропе',
          ar: 'ميناء وأجواء سان تروبيه',
        },
      },
      {
        ...getMediaSource('excursions/sttropez-&.jpeg', { width: 1400 }),
        alt: {
          fr: 'Vue supplémentaire de Saint-Tropez',
          en: 'Additional Saint-Tropez view',
          ru: 'Дополнительный вид Сен-Тропе',
          ar: 'إطلالة إضافية على سان تروبيه',
        },
      },
    ],
    summary: {
      fr: 'Une excursion signature pour profiter du port, des ruelles et de l atmosphère iconique de la côte.',
      en: 'A signature excursion to enjoy the harbor, narrow streets and iconic Riviera atmosphere.',
      ru: 'Фирменная экскурсия: порт, узкие улочки и знаковая атмосфера Лазурного Берега.',
      ar: 'رحلة مميزة للاستمتاع بالميناء والأزقة وأجواء الريفييرا الشهيرة.',
    },
    priceEstimate: {
      fr: 'Dès 390 EUR',
      en: 'From EUR 390',
      ru: 'От 390 EUR',
      ar: 'ابتداءً من 390 EUR',
    },
  },
  {
    id: 'eze-village-panoramique',
    name: {
      fr: 'Èze et village panoramique',
      en: 'Eze and panoramic village',
      ru: 'Эз и панорамная деревня',
      ar: 'إيز والقرية البانورامية',
    },
    image: getMediaSource('excursions/EZE.jpeg', { width: 960 }),
    gallery: [
      {
        ...getMediaSource('excursions/EZE.jpeg', { width: 1400 }),
        alt: {
          fr: 'Village d Èze et panorama',
          en: 'Eze village and panorama',
          ru: 'Деревня Эз и панорама',
          ar: 'قرية إيز والإطلالة البانورامية',
        },
      },
      {
        ...getMediaSource('excursions/eze-1.jpeg', { width: 1400 }),
        alt: {
          fr: 'Autre vue panoramique d Èze',
          en: 'Another panoramic view of Eze',
          ru: 'Еще одна панорама Эза',
          ar: 'إطلالة بانورامية أخرى على إيز',
        },
      },
    ],
    summary: {
      fr: 'Un itinéraire panoramique entre village perché, ruelles de caractère et vues spectaculaires.',
      en: 'A panoramic route through the hilltop village, character-filled lanes and spectacular views.',
      ru: 'Панорамный маршрут: деревня на высоте, атмосферные улочки и впечатляющие виды.',
      ar: 'مسار بانورامي بين القرية المرتفعة والأزقة المميزة والمناظر الخلابة.',
    },
    priceEstimate: {
      fr: 'Dès 150 EUR',
      en: 'From EUR 150',
      ru: 'От 150 EUR',
      ar: 'ابتداءً من 150 EUR',
    },
  },
]