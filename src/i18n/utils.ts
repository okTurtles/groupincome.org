export type TranslationFn = (key: string, args?: Record<string, string>) => string

const tableLoaders: Record<string, () => Promise<any>> = {
  'ko': () => import('../../strings/korean.json').then(module => module.default),
  'fr': () => import('../../strings/french.json').then(module => module.default),
  'zh': () => import('../../strings/chinese.json').then(module => module.default),
  'de': () => import('../../strings/german.json').then(module => module.default),
  'ja': () => import('../../strings/japanese.json').then(module => module.default),
  'ru': () => import('../../strings/russian.json').then(module => module.default),
  'es': () => import('../../strings/spanish.json').then(module => module.default),
  'he': () => import('../../strings/hebrew.json').then(module => module.default)
}
const translationTables: Record<string, any> = {}

export const languageDisplayNames: Record<string, string> = {
  // language display names in their own languages
  en: 'English',
  ko: '한국어',
  fr: 'Français',
  zh: '中文',
  de: 'Deutsch',
  ja: '日本語',
  ru: 'Русский',
  es: 'Español',
  he: 'עברית'
}

export const flagEmojiMap: Record<string, string> = {
  en: '🇬🇧',
  ko: '🇰🇷',
  fr: '🇫🇷',
  zh: '🇨🇳',
  de: '🇩🇪',
  ja: '🇯🇵',
  ru: '🇷🇺',
  es: '🇪🇸',
  he: '🇮🇱'
}

const rtlLangCodes: string[] = ['he']

export const defaultLanguage = 'en'
export const supportedLangCodes: string[] = [defaultLanguage, ...Object.keys(tableLoaders)]

export async function loadTranslationTable (lang: string): Promise<void> {
  if (!tableLoaders[lang] || translationTables[lang]) return
  translationTables[lang] = await tableLoaders[lang]()
}

// Figures out the visitor's preferred language from their browser/OS settings — exposed by the
// browser via navigator.languages (e.g. a Korean-configured device reports ['ko-KR', 'ko', ...]) —
// and returns the locale we should redirect them to, falling back to the default language.
//
// Both sides of the comparison may carry a region subtag: the browser almost always sends one, and
// supportedLangCodes may hold either a bare language ('he') or a region-qualified code ('he-IL').
// So for each browser tag, in the visitor's own order of preference, we try three things:
//   1. an exact match                             ('he-IL' -> 'he-IL')
//   2. primary subtag match                       ('he-IL' -> 'he')
//   3. any supported code in the same language    ('he'    -> 'he-IL')
// Preference order beats match precision (e.g. A user listing 'pt-PT' ahead of 'en-US' can get 'pt-BR')
// BCP 47 tags are case-insensitive, so we match on lowercased copies,
// but always return the code as spelled in supportedLangCodes.
export function getRedirectLocale (): string {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  const byLowerCase = new Map(
    supportedLangCodes.map((code): [string, string] => [code.toLowerCase(), code])
  )

  for (const tag of preferred) {
    const lowercaseWholeTag = (tag || '').toLowerCase()
    const primarySubtag = lowercaseWholeTag.split('-')[0]
    // 1. Check for an exact match first.
    const exactMatch = byLowerCase.get(lowercaseWholeTag)

    if (exactMatch) {
      return exactMatch
    } else if (primarySubtag !== lowercaseWholeTag) {
      // 2. Check for a primary subtag match next if the tag is in 'primary-region' format.
      const matchingCode = byLowerCase.get(primarySubtag)
      if (matchingCode) { return matchingCode }
    }

    // 3: If no matches were found, settle for any region of the same language.
    //    When several qualify we take the first one listed.
    const languagePrefix = `${primarySubtag}-`
    const sameLanguage = supportedLangCodes.find((code) => code.toLowerCase().startsWith(languagePrefix))
    if (sameLanguage) return sameLanguage
  }

  // If none of the above matches, return the default language.
  return defaultLanguage
}

export function isLocaleRTL (locale: string = ''): boolean {
  return rtlLangCodes.includes(locale)
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
