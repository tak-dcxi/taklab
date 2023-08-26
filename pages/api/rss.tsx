import type { NextApiRequest, NextApiResponse } from 'next'
import generateRSSFeed from '~/libs/feed'

const rssHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const xml = await generateRSSFeed()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)
}

export default rssHandler
