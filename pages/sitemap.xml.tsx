import { GetServerSidePropsContext } from 'next'
import { client } from '~/libs/microCMS'
import { config } from '~/site.config'
import { PostType } from '~/types/microCMS'

const Sitemap = () => null

// @see https://zenn.dev/catnose99/articles/c441954a987c24

const generateSitemapXml = async () => {
  let xml: string = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const pages = await client.get({ endpoint: 'pages' })
  const blog = await client.get({ endpoint: 'blog' })

  pages.contents.forEach((page: { updatedAt: string; id: string }) => {
    if (page.id === 'home') {
      xml += `
      <url>
        <loc>${config.baseURL}</loc>
        <lastmod>${page.updatedAt}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `
    } else {
      xml += `
      <url>
        <loc>${config.baseURL}/${page.id}</loc>
        <lastmod>${page.updatedAt}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `
    }
  })

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
