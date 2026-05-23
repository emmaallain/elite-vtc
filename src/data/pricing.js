export const pricing = [
  {
    id: 'price-1',
    serviceKey: 'airport',
    title: { fr: 'Aeroport -> Cannes', en: 'Airport -> Cannes' },
    amount: '85 EUR',
    unit: 'trip',
    note: {
      fr: 'Tarif indicatif susceptible de varier les dimanches, jours feries et pendant les periodes de congres.',
      en: 'Indicative fare subject to change on Sundays, public holidays and during congress periods.',
    },
  },
  {
    id: 'price-2',
    serviceKey: 'hourly',
    title: { fr: 'Mise a disposition berline', en: 'Business sedan with chauffeur' },
    amount: '70 EUR',
    unit: 'hour',
    note: {
      fr: 'Reservation minimale recommandee.',
      en: 'Minimum booking recommended.',
    },
  },
  {
    id: 'price-3',
    serviceKey: 'day',
    title: { fr: 'Mise a disposition van', en: 'Premium van full-day service' },
    amount: '590 EUR',
    unit: 'day',
    note: {
      fr: 'Ideal pour mariages, evenements et circuits prives.',
      en: 'Ideal for weddings, events and private tours.',
    },
  },
]
