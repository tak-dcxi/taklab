import fs from 'fs'
import { Feed } from 'feed'
import { client } from '~/libs/microCMS'
import { config } from '~/site.config'

async function generatedRssFeed(): Promise<void> {
  const baseURL: string = config.baseURL || ''
  const date: Date = new Date()

  // デフォルトになる feed の情報
  const feed = new Feed({
    title: config.siteMeta.title || '',
    description: config.siteMeta.description,
    id: baseURL,
    link: baseURL,
    language: 'ja',
    image: `${baseURL}/favicon.png`, // image には OGP 画像でなくファビコンを指定
    copyright: `© ${date.getFullYear()} TAK / Web Creator`,
    updated: date,
    feedLinks: {
      rss2: `${baseURL}/rss/feed.xml`,
      json: `${baseURL}/rss/feed.json`,
      atom: `${baseURL}/rss/atom.xml`,
    },
  })

  // ローカルファイルや API 経由などでファイルのデータを取得する関数を書く
  const posts = await client.get({ endpoint: 'blog' })

  // feed で定義した情報から各記事での変更点を宣言
  posts.contents.forEach(
    (content: {
      id: string
      title: string
      description: string
      content: string
      publishedAt: string
      body: string
      category: {
        id: string
      }
    }) => {
      // post のプロパティ情報は使用しているオブジェクトの形式に合わせる
      const postURL: string = `${baseURL}/blog/${content.category.id}/${content.id}`

      feed.addItem({
        title: content.title,
        description: content.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
        id: postURL,
        link: postURL,
        content: content.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
        date: new Date(content.publishedAt),
      })
    }
  )

  // フィード情報を public/rss 配下にディレクトリを作って保存
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}

export default generatedRssFeed
