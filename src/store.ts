import { atom, StoreValue } from 'nanostores'

export const isNavigationOpen = atom<boolean>(false)
export const isFundraiserOpen = atom<boolean>(true)

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
