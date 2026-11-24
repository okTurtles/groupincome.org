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

// Frontmatter of the job posts in src/jobs/*.{md,mdx}.
// Files prefixed with _ (e.g. _fundraiser.md) are hidden from the jobs listing.
export type JobFrontmatter = {
  id: number
  title: string
  pubDate: string // ISO 8601, used for sorting
  type: string // e.g. 'remote'
  permalink: string
  layout: string // layout file path from src/layouts/
  draft?: boolean // not used by any job post yet, but sortedPosts() in helpers.js excludes it if true
}

// Frontmatter of the news posts in src/posts/news/*.md, served at /news.json (src/pages/news.json.js).
export type NewsFrontmatter = {
  title: string
  createdAt: Date // written as an unquoted YAML timestamp, so it's parsed into a Date, not a string
}

export type LangDir = 'ltr' | 'rtl'
