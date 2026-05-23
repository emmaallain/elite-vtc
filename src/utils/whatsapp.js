import { SITE_CONFIG } from '../config/siteConfig'

export function createWhatsAppUrl(customMessage) {
  const message = customMessage || SITE_CONFIG.whatsappDefaultMessage
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`
}
