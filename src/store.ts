import { atom, StoreValue } from 'nanostores'
import type { LanguageOptions } from './i18n/types.ts'
import { initProjectLanguage } from './i18n/utils.ts'

export const isNavigationOpen = atom<boolean>(false)
export const isFundraiserOpen = atom<boolean>(true)
export const currentLanguage = atom<LanguageOptions>(initProjectLanguage())

// manipulate navigation menu
export const openNavigation = (): StoreValue<typeof isNavigationOpen> => {
  isNavigationOpen.set(true)
  return isNavigationOpen.get()
}
export const closeNavigation = (): StoreValue<typeof isNavigationOpen> => {
  isNavigationOpen.set(false)
  return isNavigationOpen.get()
}
export const toggleNavigation = (): StoreValue<typeof isNavigationOpen> => {
  isNavigationOpen.set(!isNavigationOpen.get())
  return isNavigationOpen.get()
}

// fundraiser
export const closeFundraiser = (): StoreValue<typeof isFundraiserOpen> => {
  isFundraiserOpen.set(false)
  return isFundraiserOpen.get()
}

// language selection
export const selectLanguage = (id: LanguageOptions): StoreValue<typeof currentLanguage> => {
  currentLanguage.set(id)
  return currentLanguage.get()
}
