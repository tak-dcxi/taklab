import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '~/libs/microCMS'
import { meta } from '~/constant/meta'

const feed = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await client.get({ endpoint: 'blog' })

  if (!posts) return res.status(401).json({ message: 'Invalid slug' })

  let itemList: string = ''
  posts.contents.map(
    (content: { title: string; id: string; body: string; publishedAt: string }) =>
      (itemList += `<item>
          <title>${content.title}</title>
          <link>${meta.baseURL}/posts/${content.id}</link>
          <description>${content.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')}</description>
          <pubDate>${content.publishedAt}</pubDate>
        </item>`)
  )

  const feed: string = `<?xml version='1.0' encoding='UTF-8'?>
  <rss version="2.0">
    <channel>
        <title>${meta.siteName}</title>
        <link>${meta.baseURL}</link>
        <description>${meta.description}</description>
        <language>ja</language>
        <docs>${meta.baseURL}/feed</docs>
        ${itemList}
    </channel>
  </rss>`

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.end(feed)
}

export default feed
