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
