// reference: https://docs.astro.build/en/recipes/i18n/

type LanguageEntry = { id: string, name: string }

// tables
import englishTable from './translation-tables/en.json'
import koreanTable from './translation-tables/ko.json'


const translationTables: { [index: string]: any } = {
  // language-code reference: https://www.w3schools.com/tags/ref_language_codes.asp
  'en': englishTable,
  'ko': koreanTable
}
export const defaultLanguage = 'ko'
export const defaultTable = translationTables[defaultLanguage]

export const supportedLanguages: Array<LanguageEntry> = [
  { id: 'en', name: 'English' },
  { id: 'ko', name: 'Korean' }
]
export const supportedLanguageCodes: Array<string> = Object.keys(translationTables)

export function useTranslation (lang: string = '') {
  const table = lang in translationTables ?  translationTables[lang] : defaultTable

  return (key: string, componentName: string = '') => {
    return componentName in table
      ? table[componentName][key] || key
      : table[key] || key
  }
}

export function getSiteLanguageCode () {
  const rootEl = document.documentElement
  return rootEl.getAttribute('lang') || defaultLanguage
}
