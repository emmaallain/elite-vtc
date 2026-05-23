import { useTranslation } from '../hooks/useTranslation'

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      <button
        type="button"
        className={`lang-option ${language === 'fr' ? 'lang-option-active' : ''}`}
        onClick={() => setLanguage('fr')}
        aria-label="Francais"
        title="Francais"
      >
        <span aria-hidden="true" className="lang-flag">🇫🇷</span>
      </button>

      <button
        type="button"
        className={`lang-option ${language === 'en' ? 'lang-option-active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="English"
        title="English"
      >
        <span aria-hidden="true" className="lang-flag">🇬🇧</span>
      </button>
    </div>
  )
}
