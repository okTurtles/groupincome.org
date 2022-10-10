'use strict'

export function sortedPosts (paths) {
  return paths
    .filter(p => !p.frontmatter.draft)
    .sort(
    (a, b) => new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
  )
}