import fs from 'fs'
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
  posts.contents.forEach((content) => {
    const postURL: string = `${baseURL}/blog/${content.category.id}/${content.id}`
    const parser: DOMParser = new DOMParser()
    const parsedDescription: Document = parser.parseFromString(content.body, 'text/html')
    const text: string = parsedDescription.body.textContent || ''

    feed.addItem({
      title: content.title,
      description: text,
      id: postURL,
      link: postURL,
      content: text,
      date: new Date(content.publishedAt),
    })
  })

  // public/rssにRSSフィードを保存
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}

export default generatedRssFeed
