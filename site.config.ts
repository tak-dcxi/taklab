export const config = {
  siteMeta: {
    title: 'TAK / Web Creator',
    description: 'Web制作者かつフロントエンドエンジニアのTAKによるブログです',
  },
  baseURL: process.env.NODE_ENV === 'production' ? 'https://www.tak-dcxi.com' : 'http://localhost:3000',
  apiKey: process.env.BLOG_API_KEY,
  serviceId: process.env.BLOG_SERVICE_ID,
}
