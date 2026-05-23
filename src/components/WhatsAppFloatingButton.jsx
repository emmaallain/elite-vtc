import { createWhatsAppUrl } from '../utils/whatsapp'
import { useTranslation } from '../hooks/useTranslation'

export function WhatsAppFloatingButton() {
  const { t } = useTranslation()

  return (
    <a
      className="whatsapp-floating"
      href={createWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={t.common.whatsappNow}
    >
      WhatsApp
    </a>
  )
}
