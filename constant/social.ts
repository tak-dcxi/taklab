import { meta } from '~/constant/meta'

type SocialType = {
  name: string
  url: string
  color: string
}

export const social: { [key: string]: SocialType } = {
  twitter: {
    name: 'Twitter',
    url: 'https://twitter.com/tak_dcxi',
    color: '#1d9bf0',
  },
  github: {
    name: 'GitHub',
    url: 'https://github.com/tak-dcxi',
    color: '#333',
  },
  zenn: {
    name: 'Zenn',
    url: 'https://zenn.dev/tak_dcxi',
    color: '#3ea8ff',
  },
  note: {
    name: 'note',
    url: 'https://note.com/tak_dcxi/',
    color: '#41c9b4',
  },
  rss: {
    name: 'RSS',
    url: `${meta.baseURL}/rss/feed.xml`,
    color: 'var(--color-primary)',
  },
}
