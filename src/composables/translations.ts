import { inject } from 'vue'
import type { TranslationFn } from '../i18n/utils'

function injectOrThrow<T> (key: string): T {
  const value = inject<T>(key)

  if (value === undefined) {
    throw new Error(`[translations.ts] ${key} is not provided`)
  }

  return value
}

export const useL = () => injectOrThrow<TranslationFn>('L')
export const useLocale = () => injectOrThrow<string>('locale')
export const useLangDir = () => injectOrThrow<string>('langDir')
export const useIsBlogpost = () => injectOrThrow<boolean>('isBlogpost')
