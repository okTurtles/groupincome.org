import { inject, type InjectionKey } from 'vue'
import type { TranslationFn } from '../i18n/utils'
import type { LangDir } from '@/types'

function injectOrThrow<T> (key: InjectionKey<T>): T {
  const value = inject<T>(key)

  if (value === undefined) {
    throw new Error(`[translations.ts] ${key.description} is not provided`)
  }

  return value
}

export const LKey: InjectionKey<TranslationFn> = Symbol('L')
export const LocaleKey: InjectionKey<string> = Symbol('locale')
export const LangDirKey: InjectionKey<LangDir> = Symbol('langDir')
export const IsBlogpostKey: InjectionKey<boolean> = Symbol('isBlogpost')

export const useL = () => injectOrThrow(LKey)
export const useLocale = () => injectOrThrow(LocaleKey)
export const useIsRTL = () => injectOrThrow(LangDirKey) === 'rtl'
export const useIsBlogpost = () => injectOrThrow(IsBlogpostKey)
