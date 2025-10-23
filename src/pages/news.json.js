const getPostDate = (post) => {
  return new Date(post.createdAt).getTime()
}

export function GET () {
  const newsPosts = Object.values(import.meta.glob('../posts/news/*.md', { eager: true }))
  const newsJSONarray = newsPosts.map(post => {
    return {
      title: post.frontmatter.title,
      createdAt: post.frontmatter.createdAt,
      content: post.rawContent().trim()
        .replace(/[ \t]+(?=\n)/g, '') // remove unnecessary whitespaces that occur between line-breaks (e.g. '\n     \n' -> '\n\n')
    }
  })

  newsJSONarray.sort((a, b) => getPostDate(b) - getPostDate(a))
  return new Response(
    JSON.stringify(newsJSONarray),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
