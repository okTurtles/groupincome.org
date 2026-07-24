export type TranslationFn = (key: string, args?: Record<string, string>) => string

const tableLoaders: Record<string, () => Promise<any>> = {
  'ko': () => import('../../strings/korean.json').then(module => module.default),
  'fr': () => import('../../strings/french.json').then(module => module.default)
}
const translationTables: Record<string, any> = {}

export const languageDisplayNames: Record<string, string> = {
  // language display names in their own languages
  en: 'English',
  ko: '한국어',
  fr: 'Français'
}

export const defaultLanguage = 'en'
export const supportedLangCodes: string[] = [defaultLanguage, ...Object.keys(tableLoaders)]

export async function loadTranslationTable (lang: string): Promise<void> {
  if (!tableLoaders[lang] || translationTables[lang]) return
  translationTables[lang] = await tableLoaders[lang]()
}

// dynamic route definitions to be used in getStaticPaths() function of each page
// (reference: https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
export function getDynamicRoutes(): Array<any> {
  return supportedLangCodes.map((locale) => ({
    params: { locale }
  }))
}

const argsRegex = /\{([0-9a-zA-Z_]+)\}/g

function replaceArgs (string: string, args: Record<string, string> = {}): string {
  return string.replace(argsRegex, (match, capture, index) => {
    // Avoid replacing the capture if it is escaped by double curly braces.
    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return capture
    }

    return args[capture] || ''
  })
}

export function LTags (...tags: string[]): Record<string, string> {
  const o: Record<string, string> = {
    'br_': '<br/>'
  }
  for (const tag of tags) {
    o[`${tag}_`] = `<${tag}>`
    o[`_${tag}`] = `</${tag}>`
  }
  return o
}

export function useTranslation (lang: string = ''): TranslationFn {
  const noLookupNeeded = lang === defaultLanguage || !(lang in translationTables)
  const table = translationTables[lang]
  const removeWhiteSpaces = (text: string) => {
    return text.replace(/\s+$/, '') // Remove trailing whitespaces.
      .replace(/\n[ \t]+/g, '\n') // Remove leading whitespaces in each line.
  }

  return (key: string, args: Record<string, string> = {}): string => {
    key = removeWhiteSpaces(key)

    const stringFromTable = noLookupNeeded
      ? key
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

export function localeAwareDateString (date: string, lang: string = ''): string {
  const dateObj = new Date(date)
  
  // Validate date
  if (isNaN(dateObj.getTime())) {
    return date // Return original string if date is invalid
  }

  return dateObj.toLocaleDateString(lang || defaultLanguage, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
