import { atom, computed, type StoreValue } from 'nanostores'

export const isNavigationOpen = atom<boolean>(false)
export const isFundraiserOpen = atom<boolean>(false)
export const modalEntries = atom<string[]>([])

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

// fundraiser banner
export const closeFundraiser = (): StoreValue<typeof isFundraiserOpen> => {
  isFundraiserOpen.set(false)
  return isFundraiserOpen.get()
}

// modal system utils
export const openModal = (modalName: string): void => {
  const clone = modalEntries.get().slice()

  if (!clone.includes(modalName)) {
    clone.push(modalName)
    modalEntries.set(clone)
  }
}

export const closeModal = (modalName: string): void => {
  const clone = modalEntries.get().slice()

  if (clone.includes(modalName)) {
    modalEntries.set(clone.filter(el => el !== modalName))
  }
}

export const isModalOpen = computed(modalEntries, (modals) => {
  return (modalName: string) => modals.includes(modalName)
})
