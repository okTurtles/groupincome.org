// Frontmatter of the blog posts in src/posts/*.{md,mdx}.
// Load them with import.meta.glob<MarkdownInstance<PostFrontmatter>>(...) to get this type.
// (Reference for import.meta.glob() return type: https://docs.astro.build/en/guides/imports/#markdown-files)
export type PostFrontmatter = {
  title: string
  description: string
  author?: string
  date: string
  isoDate: string // ISO 8601
  pubDate: string // ISO 8601, used for sorting
  image?: string // absolute path from public/
  layout: string // layout file path from src/layouts/
  permalink: string
  categories?: string[]
  tags?: string[]
  draft?: boolean // if true, the post is excluded from builds. refer to sortedPosts() in helpers.js
}
