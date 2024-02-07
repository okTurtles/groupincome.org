'use strict'

export function resolvePath (relPath) {
  // used to resolve any assets or page index file paths with the baseUrl configured by 'base' option in astro.config.mjs
  // (reference: https://docs.astro.build/en/reference/configuration-reference/#base)

  relPath = relPath.startsWith('/') ? relPath.slice(1) : relPath
  return `${import.meta.env.BASE_URL}${relPath}`
}

export function debounceSimple (callback, wait) {
  let timeoutId = null

  return (...args) => {
    if (timeoutId) { clearTimeout(timeoutId) }

    timeoutId = setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}
