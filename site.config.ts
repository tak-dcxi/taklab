export const config = {
  siteMeta: {
    title: 'TAK / Web Creator',
    description: 'Web制作者かつフロントエンドエンジニアのTAKによるブログです',
  },
  baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEURL : 'http://localhost:3000',
  apiKey: process.env.NEXT_PUBLIC_BLOG_API_KEY,
  serviceId: process.env.NEXT_PUBLIC_BLOG_SERVICE_ID,
}
