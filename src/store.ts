import { atom, StoreValue } from 'nanostores'
import { persistentAtom } from '@nanostores/persistent'

export const isNavigationOpen = atom<boolean>(false)
export const isFundraiserOpen = persistentAtom<boolean>('groupincome.org_fundraiser_banner', true, {
  encode: JSON.stringify,
  decode: JSON.parse
})

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

export const closeFundraiser = (): StoreValue<typeof isFundraiserOpen> => {
  isFundraiserOpen.set(false)
  return isFundraiserOpen.get()
}
