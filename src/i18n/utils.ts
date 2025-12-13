// reference: https://docs.astro.build/en/recipes/i18n/

// tables
import koreanTable from './translations/ko.js'

const translationTables: { [index: string]: any } = {
  // language-code reference: https://www.w3schools.com/tags/ref_language_codes.asp
  'ko': koreanTable
}

export const defaultLanguage = 'en'
export const supportedLangCodes = [defaultLanguage, ...Object.keys(translationTables)]

// dynamic route definitions to be used in getStaticPaths() function of each page
// (reference: https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
export const dynamicRoutes: Array<any> = supportedLangCodes.map((langCode: string) => {
  return { params: { locale: langCode } }
})

export function useTranslation (lang: string = '', area: string = '') {
  if (lang === defaultLanguage || !(lang in translationTables)) {
    return (key: string): string => key
  }

  const table = translationTables[lang]
  return (key: string): string => {
    return area in table
      ? table[area][key] || table[key] || key
      : table[key] || key
  }
}
