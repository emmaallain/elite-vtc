import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './language-context'

const supportedLanguages = ['fr', 'en', 'ru', 'ar']
const languageStorageKey = 'elite-vtc-language'

function normalizeLanguage(language) {
  if (!language) {
    return null
  }

  const loweredLanguage = language.toLowerCase()

  if (loweredLanguage.startsWith('fr')) return 'fr'
  if (loweredLanguage.startsWith('en')) return 'en'
  if (loweredLanguage.startsWith('ru')) return 'ru'
  if (loweredLanguage.startsWith('ar')) return 'ar'

  return null
}

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'fr'
  }

  const savedLanguage = normalizeLanguage(window.localStorage.getItem(languageStorageKey))

  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage
  }

  const navigatorLanguages = Array.isArray(window.navigator.languages)
    ? window.navigator.languages
    : [window.navigator.language]

  for (const navigatorLanguage of navigatorLanguages) {
    const matchedLanguage = normalizeLanguage(navigatorLanguage)
    if (matchedLanguage && supportedLanguages.includes(matchedLanguage)) {
      return matchedLanguage
    }
  }

  return 'fr'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((currentLanguage) => {
          const currentIndex = supportedLanguages.indexOf(currentLanguage)
          const safeIndex = currentIndex === -1 ? 0 : currentIndex
          return supportedLanguages[(safeIndex + 1) % supportedLanguages.length]
        }),
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}
