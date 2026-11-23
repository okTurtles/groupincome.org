// Frontmatter of the blog posts in src/posts/*.{md,mdx}.
// Load them with import.meta.glob<MarkdownInstance<PostFrontmatter>>(...) to get this type.
export type PostFrontmatter = {
  title: string
  description: string
  author?: string // BlogPostEntry.vue falls back to 'Greg Slepak'
  date: string // human-readable, e.g. 'November 13, 2025'
  isoDate: string // ISO 8601
  pubDate: string // ISO 8601, used for sorting
  image?: string // absolute path from public/
  layout: string
  permalink: string // starts and ends with '/'
  categories?: string[]
  tags?: string[]
  draft?: boolean // if true, the post is excluded from builds
}
