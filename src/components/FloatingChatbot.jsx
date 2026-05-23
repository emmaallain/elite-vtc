import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '../config/siteConfig'
import { useTranslation } from '../hooks/useTranslation'
import { createWhatsAppUrl } from '../utils/whatsapp'

function RobotIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className} fill="none">
      <rect x="16" y="6" width="32" height="24" rx="10" stroke="currentColor" strokeWidth="4" />
      <rect x="20" y="14" width="24" height="14" rx="7" stroke="currentColor" strokeWidth="4" />
      <path d="M26 21c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34 21c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 18c-3.9 0-7 3.1-7 7s3.1 7 7 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 18c3.9 0 7 3.1 7 7s-3.1 7-7 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 30h20c4.4 0 8 3.6 8 8v4c0 6.9-4.4 13.1-11 15.3a22.7 22.7 0 0 1-14 0A16.2 16.2 0 0 1 14 42v-4c0-4.4 3.6-8 8-8Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 54c4.8 2.7 10.8 2.7 15.6 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M30.5 34h3l2.5 2.5-2.5 2.5h-3L28 36.5l2.5-2.5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M14 39h-3.5A4.5 4.5 0 0 0 6 43.5v2A4.5 4.5 0 0 0 10.5 50H14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 39h3.5a4.5 4.5 0 0 1 4.5 4.5v2a4.5 4.5 0 0 1-4.5 4.5H50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M10 50v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M54 50v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="10" cy="58" r="4.5" stroke="currentColor" strokeWidth="4" />
      <circle cx="54" cy="58" r="4.5" stroke="currentColor" strokeWidth="4" />
      <path d="M30 57.5c0 2.8 1.8 5 4 5s4-2.2 4-5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
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
