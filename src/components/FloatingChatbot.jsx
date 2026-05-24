import { useEffect, useState } from 'react'
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
    subtitle: 'Réponse rapide',
    message: 'Bonjour, besoin d’aide pour une réservation ou un devis ?',
    hint: 'N’hésitez pas à nous contacter pour tout devis ou demande.',
    closeHint: 'Fermer ce message',
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
    hint: 'Feel free to contact us for any quote or request.',
    closeHint: 'Close this message',
    call: 'Call',
    email: 'Email',
    quote: 'Quote',
    whatsapp: 'WhatsApp',
    open: 'Open chat',
    close: 'Close chat',
  },
  ru: {
    title: 'Робот-помощник Elite VTC',
    subtitle: 'Быстрый ответ',
    message: 'Здравствуйте, нужна помощь с бронированием или расчетом?',
    hint: 'Свяжитесь с нами по любому вопросу или для расчета стоимости.',
    closeHint: 'Закрыть это сообщение',
    call: 'Позвонить',
    email: 'Email',
    quote: 'Расчет',
    whatsapp: 'WhatsApp',
    open: 'Открыть чат',
    close: 'Закрыть чат',
  },
  ar: {
    title: 'مساعد Elite VTC الآلي',
    subtitle: 'رد سريع',
    message: 'مرحبًا، هل تحتاج مساعدة في الحجز أو طلب عرض سعر؟',
    hint: 'لا تتردد في التواصل معنا لأي طلب أو عرض سعر.',
    closeHint: 'إغلاق هذه الرسالة',
    call: 'اتصال',
    email: 'البريد الإلكتروني',
    quote: 'عرض سعر',
    whatsapp: 'واتساب',
    open: 'فتح الدردشة',
    close: 'إغلاق الدردشة',
  },
}

export function FloatingChatbot() {
  const { language } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isHintDismissed, setIsHintDismissed] = useState(false)
  const [animateHintOnLoad, setAnimateHintOnLoad] = useState(false)
  const text = chatContent[language] ?? chatContent.en

  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`
  const emailHref = `mailto:${SITE_CONFIG.email}`

  useEffect(() => {
    const hintAnimationSeenKey = 'elite-vtc-chatbot-hint-animated'
    const hasSeenHintAnimation = window.localStorage.getItem(hintAnimationSeenKey) === 'true'

    if (!hasSeenHintAnimation) {
      setAnimateHintOnLoad(true)
      window.localStorage.setItem(hintAnimationSeenKey, 'true')
    }
  }, [])

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

      {!isOpen && !isHintDismissed ? (
        <div
          className={`chatbot-hint ${animateHintOnLoad ? 'chatbot-hint-animate' : ''}`}
          role="status"
          aria-live="polite"
        >
          <p className="chatbot-hint-text">{text.hint}</p>
          <button
            type="button"
            className="chatbot-hint-close"
            onClick={() => setIsHintDismissed(true)}
            aria-label={text.closeHint}
          >
            ×
          </button>
        </div>
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
