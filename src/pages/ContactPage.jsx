import { SITE_CONFIG } from '../config/siteConfig'
import { SectionHeading } from '../components/SectionHeading'
import { createWhatsAppUrl } from '../utils/whatsapp'
import { useTranslation } from '../hooks/useTranslation'

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="contact-icon">
      <path
        d="M3.5 5.2c0-.8.7-1.5 1.5-1.5h2.1c.6 0 1.2.4 1.4 1l1.5 5.1c.2.6 0 1.3-.5 1.6l-1.5 1.2c.7 1.8 2.2 3.3 4 4l1.2-1.5c.4-.5 1-.6 1.6-.5l5.1 1.5c.6.2 1 .8 1 1.4v2.1c0 .8-.7 1.5-1.5 1.5-6.6 0-12-5.4-12-12 0-.8.7-1.5 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="contact-icon">
      <path
        d="M3.5 5.5h17c.8 0 1.5.7 1.5 1.5v12c0 .8-.7 1.5-1.5 1.5h-17c-.8 0-1.5-.7-1.5-1.5v-12c0-.8.7-1.5 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m21 7-9 5.25L3 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="contact-icon">
      <path
        d="M12 2c-4.4 0-8 3.1-8 7 0 2.5 1.2 4.8 3 6.3 1.7 1.5 3.5 2.7 5 4.2 1.5-1.5 3.3-2.7 5-4.2 1.8-1.5 3-3.8 3-6.3 0-3.9-3.6-7-8-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function ContactPage() {
  const { t } = useTranslation()
  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`
  const emailHref = `mailto:${SITE_CONFIG.email}`

  return (
    <section className="panel">
      <SectionHeading
        title={t.sections.contact}
        subtitle={t.pages.contactIntro}
      />

      <div className="contact-grid">
        <article className="contact-item">
          <div className="contact-item-header">
            <PhoneIcon />
            <h3>Téléphone</h3>
          </div>
          <p>{SITE_CONFIG.phone}</p>
        </article>

        <article className="contact-item">
          <div className="contact-item-header">
            <EmailIcon />
            <h3>Email</h3>
          </div>
          <p>{SITE_CONFIG.email}</p>
        </article>

        <article className="contact-item">
          <div className="contact-item-header">
            <LocationIcon />
            <h3>Zone d'intervention</h3>
          </div>
          <p>{SITE_CONFIG.serviceArea}</p>
        </article>
      </div>

      <div className="contact-cta">
        <a className="cta cta-secondary contact-quick-link" href={phoneHref}>
          Appeler
        </a>
        <a className="cta cta-secondary contact-quick-link" href={emailHref}>
          Envoyer un email
        </a>
        <a className="cta cta-primary whatsapp-cta" href={createWhatsAppUrl()} target="_blank" rel="noreferrer">
          {t.common.whatsappNow}
        </a>
      </div>
    </section>
  )
}
