import { useTranslation } from '../hooks/useTranslation'
import { MdLanguage } from 'react-icons/md'

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const languageOptions = [
    { value: 'fr', label: '🇫🇷 FR' },
    { value: 'en', label: '🇬🇧 EN' },
    { value: 'ru', label: '🇷🇺 RU' },
    { value: 'ar', label: '🇸🇦 AR' },
  ]

  return (
    <>
      <div className="lang-switcher lang-switcher-desktop" role="group" aria-label="Language selector">
        {languageOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`lang-option ${language === option.value ? 'lang-option-active' : ''}`}
            onClick={() => setLanguage(option.value)}
            aria-label={option.label}
            title={option.label}
          >
            <span aria-hidden="true" className="lang-flag">{option.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="lang-switcher lang-switcher-mobile" role="group" aria-label="Language selector">
        <label className="lang-globe" aria-label="Language selector">
          <MdLanguage aria-hidden="true" className="lang-globe-icon" focusable="false" />
          <select
            className="lang-globe-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label="Select language"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  )
}
