// reference: https://docs.astro.build/en/recipes/i18n/

// tables
import englishTable from './translations/en.js'
import koreanTable from './translations/ko.js'

const translationTables: { [index: string]: any } = {
  // language-code reference: https://www.w3schools.com/tags/ref_language_codes.asp
  'en': englishTable,
  'ko': koreanTable
}

export const defaultLanguage = 'en'
export const defaultTable = translationTables[defaultLanguage]
export const supportedLangCodes = Object.keys(translationTables)

// dynamic route definitions to be used in getStaticPaths() function of each page
// (reference: https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
export const dynamicRoutes: Array<any> = supportedLangCodes.map((langCode: string) => {
  return { params: { locale: langCode } }
})

export function useTranslation (lang: string = '', area: string = '') {
  const table = lang in translationTables ?  translationTables[lang] : defaultTable

  return (key: string): string => {
    return area in table
      ? table[area][key] || table[key] || key
      : table[key] || key
  }
}
