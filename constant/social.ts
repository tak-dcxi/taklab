import { config } from '~/site.config'

type SocialType = {
  name: string
  url: string
}

export const social: { [key: string]: SocialType } = {
  twitter: {
    name: 'Twitter',
    url: 'https://twitter.com/tak_dcxi',
  },
  github: {
    name: 'GitHub',
    url: 'https://github.com/tak-dcxi',
  },
  zenn: {
    name: 'Zenn',
    url: 'https://zenn.dev/tak_dcxi',
  },
  note: {
    name: 'note',
    url: 'https://note.com/tak_dcxi/',
  },
  rss: {
    name: 'RSS',
    url: `${config.baseURL}/rss/feed.xml`,
  },
}
