import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from '@/config'
import { resolvePath, sortedPosts } from '@/utils/helpers'

// reference: https://docs.astro.build/en/recipes/rss/
export function GET ({ url }) {
  const posts = sortedPosts(import.meta.glob('../posts/*.{md,mdx}', { eager: true }))

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: new URL(import.meta.env.BASE_URL, url),
    items: posts.map(post => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: post.frontmatter.pubDate,
      // Give @astrojs/rss an absolute link: it resolves a link that starts with `/`
      // against the host only, which drops the `/groupincome.org/` base of staging.
      link: new URL(resolvePath(post.frontmatter.permalink), url).href
    }))
  })
}
