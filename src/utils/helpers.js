'use strict'

export function resolvePath (relPath = '') {
  // used to resolve any assets or page index file paths with the baseUrl configured by 'base' option in astro.config.mjs
  // (reference: https://docs.astro.build/en/reference/configuration-reference/#base)
  if (!relPath) { return undefined }

  relPath = relPath.startsWith('/') ? relPath.slice(1) : relPath
  return `${import.meta.env.BASE_URL}${relPath}`
}

export function uniq (array) {
  return Array.from(new Set(array))
}

export function validateEmail (email) {
  // reference: https://mailtrap.io/blog/javascript-email-validation/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function waitForElement(
  selectors,
  handler,
  timeout = 100,
  expiry = 5000
) {
  // Recursively document.querySelector('...') the passed selector(s) until,
  //
  // 1) They are found in DOM and returned.
  // 2) expiry duration.
  //
  // NOTE: This method was created to cope with the cases where <script>..</script> in .astro files
  //       somehow get exceuted well ahead of time before the DOM rendering is completed.

  let intervalIds = {}
  let localSelectors = []
  let foundEls = []
  const passToHandler = () => {
    if (!foundEls.length) { handler(null) }

    handler(Array.isArray(selectors) ? foundEls : foundEls[0])
  }

  if (Array.isArray(selectors)) {
    localSelectors = selectors
  } else {
    localSelectors.push(selectors)
  }

  localSelectors.filter(Boolean)
    .forEach((selector, index) => {
      intervalIds[selector] = setInterval(() => {
        const foundEl = document.querySelector(selector)

        if (foundEl) {
          clearInterval(intervalIds[selector])
          delete intervalIds[selector]

          foundEls[index] = foundEl
          if (Object.keys(intervalIds).length === 0) {
            passToHandler()
          }
        }
      }, timeout)
    })

  setTimeout(() => {
    Object.values(intervalIds).forEach(intervalId => {
      clearInterval(intervalId)
    })
  }, expiry)
}
