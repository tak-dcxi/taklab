import { GetServerSidePropsContext } from 'next'
import { client } from '~/libs/microCMS'
import { config } from '~/site.config'
import { PostType } from '~/types/microCMS'

const Sitemap = () => null

/**
 * sitemap.xml を動的に生成する関数です。
 */
const generateSitemapXml = async () => {
  let xml: string = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const pages = await client.get({ endpoint: 'pages' })
  const blog = await client.get({ endpoint: 'blog' })

  // ページ情報をxmlに追加
  pages.contents.forEach((page: { updatedAt: string; id: string }) => {
    const loc = page.id === 'home' ? config.baseURL : `${config.baseURL}/${page.id}`
    xml += `
      <url>
        <loc>${loc}</loc>
        <lastmod>${page.updatedAt}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `
  })

  // ブログの情報をxmlに追加
  blog.contents.forEach((post: PostType) => {
    xml += `
      <url>
        <loc>${config.baseURL}/blog/${post.category.id}/${post.id}</loc>
        <lastmod>${post.updatedAt}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `
  })

  xml += `</urlset>`
  return xml
}

/**
 * サーバーサイドでsitemap.xmlを生成してレスポンスとして返す
 */
export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml: string = await generateSitemapXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}

export default Sitemap
