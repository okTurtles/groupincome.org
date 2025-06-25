'use strict'

export function sortedPosts (matches) {
  // NOTE: This function assumes that matches passed in is the result of import.meta.glob()
  // reference: https://docs.astro.build/en/guides/imports/#importmetaglob

  const posts = Object.values(matches)
  return posts
    .filter(p => !p.frontmatter.draft)
    .sort(
      (a, b) => new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
    )
}
