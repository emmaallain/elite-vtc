import { useMemo, useState } from 'react'
import { LanguageContext } from './language-context'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr')

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((currentLanguage) =>
          currentLanguage === 'fr' ? 'en' : 'fr',
        ),
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}
