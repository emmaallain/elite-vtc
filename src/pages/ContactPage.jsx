import { SITE_CONFIG } from '../config/siteConfig'
import { SectionHeading } from '../components/SectionHeading'
import { createWhatsAppUrl } from '../utils/whatsapp'
import { useTranslation } from '../hooks/useTranslation'

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <section className="panel contact-panel">
      <SectionHeading
        eyebrow="WhatsApp Concierge"
        title={t.sections.contact}
        subtitle={t.pages.contactIntro}
      />

      <div className="contact-card">
        <p>{SITE_CONFIG.phone}</p>
        <p>{SITE_CONFIG.email}</p>
        <p>{SITE_CONFIG.serviceArea}</p>
        <a className="cta cta-primary whatsapp-cta" href={createWhatsAppUrl()} target="_blank" rel="noreferrer">
          {t.common.whatsappNow}
        </a>
      </div>
    </section>
  )
}
