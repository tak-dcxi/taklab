import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { config } from '~/site.config'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseSocialIcon } from './BaseSocialIcon'

type SiteShareButtonPropsType = {
  title: string
}

type ItemsType = {
  id: 'twitter' | 'facebook' | 'hatena' | 'line' | 'feedly' | 'pocket'
  label: string
  href: string
  color: string
}[]

export const SiteShareButton: React.VFC<SiteShareButtonPropsType> = ({ title }) => {
  const router: NextRouter = useRouter()
  const path: string = router.asPath
  const currentURL: string = config.baseURL + path

  const items: ItemsType = [
    {
      id: 'twitter',
      label: 'Twitterでシェアする',
      href: `https://twitter.com/share?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(title)}`,
      color: '#1da1f2',
    },
    {
      id: 'facebook',
      label: 'Facebookでシェアする',
      href: `https://www.facebook.com/share.php?u=${encodeURIComponent(currentURL)}`,
      color: '#1877f2',
    },
    {
      id: 'hatena',
      label: 'はてなブックマークに登録する',
      href: `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(currentURL)}&title=${encodeURIComponent(
        title
      )}`,
      color: '#00a4de',
    },
    {
      id: 'line',
      label: 'LINEに送る',
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentURL)}`,
      color: '#00c300',
    },
    {
      id: 'feedly',
      label: 'Feedlyに送る',
      href: `https://feedly.com/i/subscription/feed/${encodeURIComponent(currentURL)}`,
      color: '#2bb24c',
    },
    {
      id: 'pocket',
      label: 'Pocketに送る',
      href: `https://getpocket.com/edit?url=${encodeURIComponent(currentURL)}`,
      color: '#ef3f56',
    },
  ]

  const handleClick = (href: string) => {
    const options: string = 'width=680,height=450,menubar=no,toolbar=no,resizable=yes,scrollbars=yes'
    window.open(href, '', options)
  }

  return (
    <Root>
      <Header>
        <span aria-hidden="true">＼</span>Share<span aria-hidden="true">／</span>
      </Header>
      <dd>
        <List>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <Button
                  type="button"
                  aria-label={item.label}
                  onClick={(event) => {
                    event.preventDefault
                    handleClick(item.href)
                  }}
                  backgroundColor={item.color}
                >
                  <BaseSocialIcon type={item.id} size={18} color={'currentColor'} presentation />
                </Button>
              </li>
            )
          })}
        </List>
      </dd>
    </Root>
  )
}

const Root = styled.dl`
  & > * + * {
    margin-top: 16px;
  }
`

const Header = styled.dt`
  font-family: var(--font-montserrat);
  text-align: center;
  text-transform: uppercase;

  & > span {
    margin: 0 0.5em;
  }
`

const List = styled.ul`
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(3, 1fr);

  @media ${breakpoints.sm} {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
`

const Button = styled.button<{ backgroundColor: string }>`
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  color: var(--color-grayscale-7);
  display: inline-flex;
  justify-content: center;
  padding: ${12 / 16}rem;
  transition: opacity 0.3s;
  width: 100%;

  ${hoverable(`
    opacity: 0.7;
  `)};
`
