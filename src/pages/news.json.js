const getPostDate = (post) => {
  return new Date(post.createdAt).getTime()
}

// reference: https://docs.astro.build/en/guides/endpoints/#static-file-endpoints
export function GET () {
  const newsPosts = Object.values(import.meta.glob('../posts/news/*.md', { eager: true }))
  const newsJSONarray = newsPosts.map(post => {
    return {
      title: post.frontmatter.title,
      createdAt: post.frontmatter.createdAt,
      content: post.rawContent().trim()
        // remove unnecessary whitespaces that occur between line-breaks (e.g. '\n     \n' -> '\n\n')
        .replace(/[ \t]+(?=\n)/g, '')
    }
  })

  // Sort the news posts by the latest first
  newsJSONarray.sort((a, b) => getPostDate(b) - getPostDate(a))

  return new Response(
    JSON.stringify(newsJSONarray),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Enable CORS for the news.json endpoint
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    }
  )
}
