import fs from 'fs'
import { BinaryData, JSDOM } from 'jsdom'
import { Feed } from 'feed'
import { client } from '~/libs/microCMS'
import { config } from '~/site.config'

async function generatedRssFeed(): Promise<void> {
  const baseURL: string = config.baseURL || ''
  const date: Date = new Date()

  // RSSフィードの基本情報を設定
  const feed = new Feed({
    title: config.siteMeta.title || '',
    description: config.siteMeta.description,
    id: baseURL,
    link: baseURL,
    language: 'ja',
    image: `${baseURL}/favicon.png`, // ここではOGP画像ではなく、ファビコンを指定
    copyright: `© ${date.getFullYear()} TAK / Web Creator`,
    updated: date,
    feedLinks: {
      rss2: `${baseURL}/rss/feed.xml`,
      json: `${baseURL}/rss/feed.json`,
      atom: `${baseURL}/rss/atom.xml`,
    },
  })

  // microCMSからブログのデータを取得
  const posts = await client.get({ endpoint: 'blog' })

  // 取得したブログデータをRSSフィードに追加
  posts.contents.forEach(
    (content: {
      category: { id: any }
      id: any
      body: string | Buffer | BinaryData
      title: any
      publishedAt: string | number | Date
    }) => {
      const postURL: string = `${baseURL}/blog/${content.category.id}/${content.id}`

      // jsdomを利用してHTMLを解析
      const dom = new JSDOM(content.body)
      const text: string = dom.window.document.body.textContent || ''

      feed.addItem({
        title: content.title,
        description: text,
        id: postURL,
        link: postURL,
        content: text,
        date: new Date(content.publishedAt),
      })
    }
  )

  // public/rssにRSSフィードを保存
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}

export default generatedRssFeed
