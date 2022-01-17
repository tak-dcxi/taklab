export type MenuType = {
  id: string
  title: string
  subtitle: string
  path: string
}

export const menu: MenuType[] = [
  {
    id: 'home',
    title: 'Home',
    subtitle: 'トップページ',
    path: '/',
  },
  {
    id: 'blog',
    title: 'Blog',
    subtitle: 'ブログ',
    path: '/blog',
  },
  {
    id: 'about',
    title: 'About',
    subtitle: '当サイトについて',
    path: '/about',
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'お問い合わせ',
    path: '/contact',
  },
]
