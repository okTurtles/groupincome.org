// reference: https://docs.astro.build/en/recipes/i18n/

import type { LanguageEntry, LanguageOptions } from './types.ts'

// tables
import englishTable from './translation-tables/english.js'
import koreanTable from './translation-tables/korean.js'

export const defaultLanguage = 'ko'
const translationTables: { [index: string]: any } = {
  'en': englishTable,
  'ko': koreanTable
}
const defaultTable = translationTables[defaultLanguage]

export const supportedLanguages: Array<LanguageEntry> = [
  { id: 'en', name: 'English' },
  { id: 'ko', name: 'Korean' }
]

export function getProjectLanguage (): LanguageOptions {
  const stored = window.localStorage.getItem('lang')
  return stored || defaultLanguage
}

export function useTranslation () {
  const table = translationTables[getProjectLanguage()] || defaultTable

  return (key: string) => table[key] || key
}
