export const pricing = [
  {
    id: 'price-1',
    serviceKey: 'airport',
    title: { fr: 'Aéroport -> Cannes', en: 'Airport -> Cannes' },
    amount: '85 EUR',
    unit: 'trip',
    note: {
      fr: 'Tarif indicatif susceptible de varier les dimanches, jours fériés et pendant les périodes de congrès.',
      en: 'Indicative fare subject to change on Sundays, public holidays and during congress periods.',
    },
  },
  {
    id: 'price-2',
    serviceKey: 'hourly',
    title: { fr: 'Mise à disposition berline', en: 'Business sedan with chauffeur' },
    amount: '70 EUR',
    unit: 'hour',
    note: {
      fr: 'Réservation minimale recommandée.',
      en: 'Minimum booking recommended.',
    },
  },
  {
    id: 'price-3',
    serviceKey: 'day',
    title: { fr: 'Mise à disposition van', en: 'Premium van full-day service' },
    amount: '590 EUR',
    unit: 'day',
    note: {
      fr: 'Idéal pour mariages, événements et circuits privés.',
      en: 'Ideal for weddings, events and private tours.',
    },
  },
]
