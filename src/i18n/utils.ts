// reference: https://docs.astro.build/en/recipes/i18n/

type LanguageEntry = { id: string, name: string }

// tables
import englishTable from './translation-tables/en.js'
import koreanTable from './translation-tables/ko.js'


const translationTables: { [index: string]: any } = {
  // language-code reference: https://www.w3schools.com/tags/ref_language_codes.asp
  'en': englishTable,
  'ko': koreanTable
}
export const defaultLanguage = 'en'
export const defaultTable = translationTables[defaultLanguage]

export const supportedLanguages: Array<LanguageEntry> = [
  { id: 'en', name: 'English' },
  { id: 'ko', name: 'Korean' }
]

// dynamic route definitions to be used in getStaticPaths() function of each page
// (reference: https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
export const dynamicRoutes: Array<any> = Object.keys(translationTables).map((langCode: string) => {
  return { params: { locale: langCode } }
})
export function useTranslation (lang: string = '', componentName: string = '') {
  const table = lang in translationTables ?  translationTables[lang] : defaultTable

  return (key: string) => {
    return componentName in table
      ? table[componentName][key] || key
      : table[key] || key
  }
}

export function getSiteLanguageCode () {
  const rootEl = document.documentElement
  return rootEl.getAttribute('lang') || defaultLanguage
}
