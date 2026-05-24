import { SITE_CONFIG } from '../config/siteConfig'
import { SectionHeading } from '../components/SectionHeading'
import { createWhatsAppUrl } from '../utils/whatsapp'
import { useTranslation } from '../hooks/useTranslation'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

function PhoneIcon() {
  return <MdPhone aria-hidden="true" className="contact-icon" focusable="false" />
}

function EmailIcon() {
  return <MdEmail aria-hidden="true" className="contact-icon" focusable="false" />
}

function LocationIcon() {
  return <MdLocationOn aria-hidden="true" className="contact-icon" focusable="false" />
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
        <a className="cta cta-primary whatsapp-cta" href={createWhatsAppUrl()} target="_blank" rel="noreferrer">
          {t.common.whatsappNow}
        </a>
        <a className="cta cta-secondary contact-quick-link" href={emailHref}>
          Envoyer un email
        </a>
        
      </div>
    </section>
  )
}
