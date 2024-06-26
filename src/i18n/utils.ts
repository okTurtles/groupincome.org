import type { LanguageEntry } from './types.ts'
export const defaultLanguage = 'en'
export const supportedLanguages: Array<LanguageEntry> = [
  { id: 'en', name: 'English' },
  { id: 'ko', name: 'Korean' }
]

export function initProjectLanguage (): string {
  const stored = window.localStorage.getItem('lang')
  return stored || defaultLanguage
}
