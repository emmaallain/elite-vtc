import { useTranslation } from '../hooks/useTranslation'

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      <button
        type="button"
        className={`lang-option ${language === 'fr' ? 'lang-option-active' : ''}`}
        onClick={() => setLanguage('fr')}
        aria-label="Français"
        title="Français"
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

      <button
        type="button"
        className={`lang-option ${language === 'ru' ? 'lang-option-active' : ''}`}
        onClick={() => setLanguage('ru')}
        aria-label="Русский"
        title="Русский"
      >
        <span aria-hidden="true" className="lang-flag">🇷🇺</span>
      </button>

      <button
        type="button"
        className={`lang-option ${language === 'ar' ? 'lang-option-active' : ''}`}
        onClick={() => setLanguage('ar')}
        aria-label="العربية"
        title="العربية"
      >
        <span aria-hidden="true" className="lang-flag">🇸🇦</span>
      </button>
    </div>
  )
}
