import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'
import { createWhatsAppUrl } from '../utils/whatsapp'

export function ConciergePage() {
  const { t, language } = useTranslation()
  const [selectedConciergeItem, setSelectedConciergeItem] = useState(null)

  useEffect(() => {
    if (!selectedConciergeItem) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedConciergeItem(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConciergeItem])

  const getConciergeWhatsappMessage = (serviceName) => {
    const template = t.pages.conciergePreparedMessage

    if (typeof template === 'string' && template.includes('{service}')) {
      return template.replace('{service}', serviceName)
    }

    if (language === 'fr') {
      return `Bonjour, je souhaite organiser le service de conciergerie: ${serviceName}. Pouvez-vous me proposer une solution sur mesure ?`
    }

    if (language === 'ru') {
      return `Здравствуйте, хочу организовать услугу консьерж: ${serviceName}. Можете предложить индивидуальное решение?`
    }

    if (language === 'ar') {
      return `مرحباً، أود تنظيم خدمة كونسيرج: ${serviceName}. هل يمكنكم اقتراح حل مخصص؟`
    }

    return `Hello, I would like to organize this concierge service: ${serviceName}. Could you propose a tailored solution?`
  }

  return (
    <>
      {selectedConciergeItem ? (
        <div
          className="excursion-dialog-overlay"
          role="presentation"
          onClick={() => setSelectedConciergeItem(null)}
        >
          <section
            className="excursion-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="concierge-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="concierge-dialog-title">{selectedConciergeItem.title}</h3>
            <p className="excursion-dialog-summary">{selectedConciergeItem.description}</p>

            <h4>{t.pages.conciergeWhatIncludedTitle}</h4>
            <ul className="excursion-dialog-list">
              {selectedConciergeItem.proposals.map((proposal) => (
                <li key={proposal}>{proposal}</li>
              ))}
            </ul>

            <p className="excursion-dialog-note">{t.pages.conciergePopupContactHint}</p>

            <div className="excursion-dialog-actions">
              <a
                className="cta cta-primary excursion-contact-button"
                href={createWhatsAppUrl(getConciergeWhatsappMessage(selectedConciergeItem.title))}
                target="_blank"
                rel="noreferrer"
              >
                {t.pages.conciergeContactCta}
              </a>

              <button
                type="button"
                className="cta cta-secondary excursion-dialog-close"
                onClick={() => setSelectedConciergeItem(null)}
              >
                {t.pages.conciergeCloseCta}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <section className="panel">
        <SectionHeading
          title={t.sections.concierge}
          subtitle={t.pages.conciergeIntro}
        />

        <p className="excursions-tap-hint">{t.pages.conciergeTapHint}</p>

        <div className="card-grid">
          {t.pages.conciergeItems.map((item) => (
            <article key={item.title} className="card service-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <button
                type="button"
                className="cta cta-secondary excursion-open-button"
                onClick={() => setSelectedConciergeItem(item)}
              >
                {t.pages.conciergeOpenCta}
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
