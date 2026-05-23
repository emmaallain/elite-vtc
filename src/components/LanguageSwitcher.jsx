import { useTranslation } from '../hooks/useTranslation'

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useTranslation()

  const icon = (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="switcher-icon" fill="none">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.8 12h16.4M12 3.8c2.3 2.2 3.6 5 3.6 8.2S14.3 17.8 12 20.2c-2.3-2.4-3.6-5.2-3.6-8.2S9.7 6 12 3.8ZM12 3.8c-2.3 2.2-3.6 5-3.6 8.2S9.7 17.8 12 20.2c2.3-2.4 3.6-5.2 3.6-8.2S14.3 6 12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <button type="button" className="lang-switcher" onClick={toggleLanguage}>
      {icon}
      {language === 'fr' ? 'FR' : 'EN'}
    </button>
  )
}
