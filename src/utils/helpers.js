'use strict'

export function resolvePath (relPath) {
  console.log('resolving Path: ', relPath)
  relPath = relPath.startsWith('/') ? relPath.slice(1) : relPath
  return `${import.meta.env.BASE_URL}${relPath}`
}