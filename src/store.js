import { atom, action } from 'nanostores';

export const isNavigationOpen = atom(false);
export const isFundraiserOpen = atom(true);

// nano stores actions: https://github.com/nanostores/nanostores#actions
export const openNavigation = action(isNavigationOpen, 'openNavigation', store => {
  store.set(true)
  return store.get()
})
export const closeNavigation = action(isNavigationOpen, 'closeNavigation', store => {
  store.set(false)
  return store.get()
})
export const toggleNavigation = action(isNavigationOpen, 'toggleNavigation', store => {
  store.set(!store.get())
  return store.get()
})
