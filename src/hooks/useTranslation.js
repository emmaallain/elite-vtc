import { useContext } from 'react'
import { LanguageContext } from '../context/language-context'
import { dictionaries } from '../i18n/dictionaries'

export function useTranslation() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider')
  }

  const dict = dictionaries[context.language] ?? dictionaries.en
  const supportedContentLanguages = ['fr', 'en', 'ru', 'ar']
  const contentLanguage = supportedContentLanguages.includes(context.language)
    ? context.language
    : 'en'

  return {
    language: context.language,
    contentLanguage,
    setLanguage: context.setLanguage,
    toggleLanguage: context.toggleLanguage,
    t: dict,
  }
}
