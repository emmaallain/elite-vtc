import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'
import { createWhatsAppUrl } from '../utils/whatsapp'

export function PartnersPage() {
  const { t, language } = useTranslation()
  const [selectedPartner, setSelectedPartner] = useState(null)

  useEffect(() => {
    if (!selectedPartner) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPartner(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedPartner])

  const getPartnerWhatsappMessage = (partnerName) => {
    const template = t.pages.partnerPreparedMessage

    if (typeof template === 'string' && template.includes('{partner}')) {
      return template.replace('{partner}', partnerName)
    }

    if (language === 'fr') {
      return `Bonjour, je souhaite échanger concernant le partenariat ${partnerName}. Pouvez-vous me recontacter ?`
    }

    if (language === 'ru') {
      return `Здравствуйте, хочу обсудить партнерство ${partnerName}. Можете связаться со мной?`
    }

    if (language === 'ar') {
      return `مرحباً، أود مناقشة شراكة ${partnerName}. هل يمكنكم التواصل معي؟`
    }

    return `Hello, I would like to discuss the ${partnerName} partnership. Could you contact me?`
  }

  return (
    <>
      {selectedPartner ? (
        <div
          className="excursion-dialog-overlay"
          role="presentation"
          onClick={() => setSelectedPartner(null)}
        >
          <section
            className="excursion-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="partner-dialog-title">{selectedPartner.title}</h3>
            <p className="excursion-dialog-summary">{selectedPartner.description}</p>

            <h4>{t.pages.partnerWhatIncludedTitle}</h4>
            <ul className="excursion-dialog-list">
              {selectedPartner.proposals.map((proposal) => (
                <li key={proposal}>{proposal}</li>
              ))}
            </ul>

            <p className="excursion-dialog-note">{t.pages.partnerPopupContactHint}</p>

            <div className="excursion-dialog-actions">
              <a
                className="cta cta-primary excursion-contact-button"
                href={createWhatsAppUrl(getPartnerWhatsappMessage(selectedPartner.title))}
                target="_blank"
                rel="noreferrer"
              >
                {t.pages.partnerContactCta}
              </a>

              <button
                type="button"
                className="cta cta-secondary excursion-dialog-close"
                onClick={() => setSelectedPartner(null)}
              >
                {t.pages.partnerCloseCta}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <section className="panel">
        <SectionHeading
          title={t.sections.partners}
          subtitle={t.pages.partnersIntro}
        />

        <div className="partners-vertical-list">
          {t.pages.partnersItems.map((item) => (
            <button
              key={item.title}
              type="button"
              className="partners-list-item"
              onClick={() => setSelectedPartner(item)}
            >
              <span className="partners-list-copy">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </span>
              <span className="partners-list-action" aria-hidden="true">
                <span className="partners-list-arrow">→</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
