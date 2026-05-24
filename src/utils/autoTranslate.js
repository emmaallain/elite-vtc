const TARGET_LANGUAGES = ['fr', 'en', 'ru', 'ar']
const DEFAULT_SOURCE_LANGUAGE = 'fr'
const TRANSLATION_API_URL =
  import.meta.env.VITE_TRANSLATION_API_URL?.trim() || 'https://api.mymemory.translated.net/get'
const TRANSLATION_API_KEY = import.meta.env.VITE_TRANSLATION_API_KEY?.trim()

function isMyMemoryEndpoint() {
  return TRANSLATION_API_URL.includes('translated.net/get')
}

async function requestTranslation(text, sourceLanguage, targetLanguage) {
  if (!text || sourceLanguage === targetLanguage) {
    return text
  }

  try {
    if (isMyMemoryEndpoint()) {
      const requestUrl = new URL(TRANSLATION_API_URL)
      requestUrl.searchParams.set('q', text)
      requestUrl.searchParams.set('langpair', `${sourceLanguage}|${targetLanguage}`)

      const response = await fetch(requestUrl.toString())
      const data = await response.json()
      const translatedText = data.responseData?.translatedText?.trim()

      return translatedText || text
    }

    const response = await fetch(TRANSLATION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text',
        api_key: TRANSLATION_API_KEY || undefined,
      }),
    })

    const data = await response.json()
    const translatedText = data.translatedText?.trim()

    return translatedText || text
  } catch (error) {
    console.error('Auto translation failed:', error)
    return text
  }
}

export async function buildLocalizedText(value, options = {}) {
  const sourceLanguage = options.sourceLanguage || DEFAULT_SOURCE_LANGUAGE
  const cleanValue = value.trim()

  const translatedEntries = await Promise.all(
    TARGET_LANGUAGES.map(async (language) => [
      language,
      await requestTranslation(cleanValue, sourceLanguage, language),
    ]),
  )

  return Object.fromEntries(translatedEntries)
}

export async function translateText(value, targetLanguage, options = {}) {
  const sourceLanguage = options.sourceLanguage || DEFAULT_SOURCE_LANGUAGE
  const cleanValue = value.trim()

  return requestTranslation(cleanValue, sourceLanguage, targetLanguage)
}

export async function buildLocalizedList(value, options = {}) {
  const sourceLanguage = options.sourceLanguage || DEFAULT_SOURCE_LANGUAGE
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  const translatedEntries = await Promise.all(
    TARGET_LANGUAGES.map(async (language) => {
      const translatedItems = await Promise.all(
        items.map((item) => requestTranslation(item, sourceLanguage, language)),
      )

      return [language, translatedItems]
    }),
  )

  return Object.fromEntries(translatedEntries)
}