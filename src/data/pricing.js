export const pricing = [
  {
    id: 'price-1',
    serviceKey: 'airport',
    title: { fr: 'Aéroport -> Cannes', en: 'Airport -> Cannes', ru: 'Аэропорт -> Канны', ar: 'المطار -> كان' },
    amount: '85 EUR',
    unit: 'trip',
    note: {
      fr: 'Tarif indicatif susceptible de varier les dimanches, jours fériés et pendant les périodes de congrès.',
      en: 'Indicative fare subject to change on Sundays, public holidays and during congress periods.',
      ru: 'Ориентировочный тариф может меняться по воскресеньям, в праздничные дни и в периоды конгрессов.',
      ar: 'السعر إرشادي وقد يتغير أيام الأحد والعطل الرسمية وخلال فترات المؤتمرات.',
    },
  },
  {
    id: 'price-2',
    serviceKey: 'hourly',
    title: { fr: 'Mise à disposition berline', en: 'Business sedan with chauffeur', ru: 'Седан с водителем', ar: 'سيارة سيدان مع سائق' },
    amount: '70 EUR',
    unit: 'hour',
    note: {
      fr: 'Réservation minimale recommandée.',
      en: 'Minimum booking recommended.',
      ru: 'Рекомендуется минимальный заказ.',
      ar: 'يُنصح بحد أدنى للحجز.',
    },
  },
  {
    id: 'price-3',
    serviceKey: 'day',
    title: { fr: 'Mise à disposition van', en: 'Premium van full-day service', ru: 'Премиум-ван на день', ar: 'فان فاخر ليوم كامل' },
    amount: '590 EUR',
    unit: 'day',
    note: {
      fr: 'Idéal pour mariages, événements et circuits privés.',
      en: 'Ideal for weddings, events and private tours.',
      ru: 'Идеально для свадеб, мероприятий и частных туров.',
      ar: 'مثالي لحفلات الزفاف والفعاليات والجولات الخاصة.',
    },
  },
]
