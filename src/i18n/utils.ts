// reference: https://docs.astro.build/en/recipes/i18n/

// tables
import koreanTable from './tables/ko.js'

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

const argsRegex = /\{([0-9a-zA-Z_]+)\}/g

function replaceArgs (string: string, args: Record<string, string> = {}): string {
  const replacementsByKey = args

  return string.replace(argsRegex, (match, capture, index) => {
    // Avoid replacing the capture if it is escaped by double curly braces.
    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return capture
    }

    return replacementsByKey[capture] || ''
  })
}

export function useTranslation (lang: string = '', area: string = '') {
  const noLookupNeeded = lang === defaultLanguage || !(lang in translationTables)
  const table = translationTables[lang]

  return (key: string, args: Record<string, string> = {}): string => {
    const stringFromTable = noLookupNeeded
      ? key
      : area in table
        ? table[area][key] || table[key] || key
        : table[key] || key
    const hasArgs = Object.keys(args).length > 0

    return hasArgs
      ? replaceArgs(stringFromTable, args)
      : stringFromTable
  }
}

export function classNames (...args: any[]): string {
  // simplified version of 'classnames' npm package (https://www.npmjs.com/package/classnames) 
  const isObjectLiteral = (val: any) => {
    return typeof val === 'object' && val !== null && val.constructor === Object
  }

  return args.filter(Boolean)
    .map(arg => {
      if (typeof arg === 'string') { return arg }
      else if (isObjectLiteral(arg)) {
        const validKeyArr = []

        for (const [key, val] of Object.entries(arg)) {
          if (val) { validKeyArr.push(key) }
        }
        return validKeyArr.join(' ')
      }
    }).join(' ')
}
