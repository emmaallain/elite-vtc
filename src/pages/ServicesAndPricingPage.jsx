import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcon'
import { VehicleCarousel } from '../components/VehicleCarousel'
import { excursions } from '../data/excursions'
import { services } from '../data/services'
import { useAdmin } from '../hooks/useAdmin'
import { useTranslation } from '../hooks/useTranslation'
import { EXCURSIONS_STORAGE_KEY, getStoredArray, setStoredArray } from '../utils/adminData'
import { createWhatsAppUrl } from '../utils/whatsapp'

export function ServicesAndPricingPage() {
  const { t, language, contentLanguage } = useTranslation()
  const { isAdmin } = useAdmin()
  const [excursionItems, setExcursionItems] = useState(excursions)
  const [selectedExcursion, setSelectedExcursion] = useState(null)

  useEffect(() => {
    setExcursionItems(getStoredArray(EXCURSIONS_STORAGE_KEY, excursions))
  }, [])

  useEffect(() => {
    setStoredArray(EXCURSIONS_STORAGE_KEY, excursionItems)
  }, [excursionItems])

  useEffect(() => {
    if (!selectedExcursion) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedExcursion(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedExcursion])

  const getExcursionWhatsappMessage = (excursionName) => {
    const template = t.pages.excursionPreparedMessage
    if (typeof template === 'string' && template.includes('{excursion}')) {
      return template.replace('{excursion}', excursionName)
    }

    if (language === 'fr') {
      return `Bonjour, je souhaite organiser l'excursion ${excursionName}. Pouvez-vous me proposer un programme et un devis ?`
    }

    if (language === 'ru') {
      return `Здравствуйте, хочу организовать экскурсию ${excursionName}. Можете предложить программу и расчет стоимости?`
    }

    if (language === 'ar') {
      return `مرحباً، أود تنظيم رحلة ${excursionName}. هل يمكنكم اقتراح برنامج وتقدير سعر؟`
    }

    return `Hello, I would like to organize the ${excursionName} excursion. Could you suggest a program and a quote?`
  }

  const handleDeleteExcursion = (excursionId) => {
    setExcursionItems((current) => current.filter((excursion) => excursion.id !== excursionId))
    setSelectedExcursion((current) => (current?.id === excursionId ? null : current))
  }

  return (
    <>
      {selectedExcursion ? (
        <div
          className="excursion-dialog-overlay"
          role="presentation"
          onClick={() => setSelectedExcursion(null)}
        >
          <section
            className="excursion-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="excursion-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="excursion-dialog-title">{selectedExcursion.name[contentLanguage]}</h3>

            <VehicleCarousel
              title={selectedExcursion.name[contentLanguage]}
              gallery={selectedExcursion.gallery}
              language={contentLanguage}
            />

            <p className="excursion-dialog-summary">{selectedExcursion.summary[contentLanguage]}</p>

            <h4>{t.pages.excursionWhatYouCanDoTitle}</h4>
            <ul className="excursion-dialog-list">
              {t.pages.excursionWhatYouCanDoItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="excursion-dialog-note">{t.pages.excursionPopupContactHint}</p>

            <div className="excursion-dialog-actions">
              <a
                className="cta cta-primary excursion-contact-button"
                href={createWhatsAppUrl(getExcursionWhatsappMessage(selectedExcursion.name[contentLanguage]))}
                target="_blank"
                rel="noreferrer"
              >
                {t.pages.excursionContactCta}
              </a>

              <button
                type="button"
                className="cta cta-secondary excursion-dialog-close"
                onClick={() => setSelectedExcursion(null)}
              >
                {t.pages.excursionCloseCta}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {/* Services Section */}
      <section className="panel">
        <SectionHeading
          title={t.sections.services}
          subtitle={`${t.pages.servicesIntro} ${t.pages.servicesQuoteOnlyNote}`}
        />

        <div className="card-grid">
          {services.map((service) => {
            return (
            <article key={service.id} className="card service-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ServiceIcon type={service.icon} />
                <h3>{service.title[contentLanguage]}</h3>
              </div>
              <p>{service.description[contentLanguage]}</p>
            </article>
            )
          })}
        </div>

        <div className="excursions-section">
          <h3>{t.pages.excursionsTitle}</h3>
          <p>{t.pages.excursionsIntro}</p>
          <p className="excursions-tap-hint">{t.pages.excursionsTapHint}</p>

          <div className="card-grid excursions-grid">
            {excursionItems.map((excursion) => (
              <article key={excursion.id} className="card excursion-card">
                <VehicleCarousel
                  title={excursion.name[contentLanguage]}
                  gallery={excursion.gallery}
                  language={contentLanguage}
                />

                <div className="excursion-copy">
                  <h4>{excursion.name[contentLanguage]}</h4>
                  <p>{excursion.summary[contentLanguage]}</p>
                </div>

                <button
                  type="button"
                  className="cta cta-secondary excursion-open-button"
                  onClick={() => setSelectedExcursion(excursion)}
                >
                  {t.pages.excursionOpenCta}
                </button>

                {isAdmin ? (
                  <button
                    type="button"
                    className="admin-action-button"
                    onClick={() => handleDeleteExcursion(excursion.id)}
                  >
                    Supprimer cette excursion
                  </button>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
