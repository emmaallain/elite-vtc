import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdSmartToy } from 'react-icons/md'
import { SITE_CONFIG } from '../config/siteConfig'
import { useTranslation } from '../hooks/useTranslation'
import { createWhatsAppUrl } from '../utils/whatsapp'

function RobotIcon({ className }) {
  return <MdSmartToy aria-hidden="true" className={className} focusable="false" />
}

const chatContent = {
  fr: {
    title: 'Robot Assistant Elite VTC',
    subtitle: 'Reponse rapide',
    message: 'Bonjour, besoin d aide pour une reservation ou un devis ?',
    call: 'Appeler',
    email: 'Email',
    quote: 'Devis',
    whatsapp: 'WhatsApp',
    open: 'Ouvrir le chat',
    close: 'Fermer le chat',
  },
  en: {
    title: 'Elite VTC Robot Assistant',
    subtitle: 'Quick help',
    message: 'Hello, need help with a booking or a quote?',
    call: 'Call',
    email: 'Email',
    quote: 'Quote',
    whatsapp: 'WhatsApp',
    open: 'Open chat',
    close: 'Close chat',
  },
}

export function FloatingChatbot() {
  const { language } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const text = chatContent[language]

  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`
  const emailHref = `mailto:${SITE_CONFIG.email}`

  return (
    <div className="floating-chatbot">
      {isOpen ? (
        <section className="chatbot-panel" aria-live="polite">
          <header className="chatbot-header">
            <div className="chatbot-identity">
              <span className="chatbot-robot-badge">
                <RobotIcon className="chatbot-robot-icon" />
              </span>
              <div>
                <p className="chatbot-title">{text.title}</p>
                <p className="chatbot-subtitle">{text.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label={text.close}
            >
              ×
            </button>
          </header>

          <p className="chatbot-message">{text.message}</p>

          <div className="chatbot-actions">
            <a className="chatbot-action" href={phoneHref}>{text.call}</a>
            <a className="chatbot-action" href={emailHref}>{text.email}</a>
            <Link className="chatbot-action" to="/devis">{text.quote}</Link>
            <a className="chatbot-action chatbot-action-primary" href={createWhatsAppUrl()} target="_blank" rel="noreferrer">
              {text.whatsapp}
            </a>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className={`chatbot-launcher ${isOpen ? 'chatbot-launcher-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? text.close : text.open}
      >
        <RobotIcon className="chatbot-launcher-icon" />
      </button>

    </div>
  )
}
