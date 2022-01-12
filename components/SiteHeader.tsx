import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseLogo } from '~/components/BaseLogo'
import { SiteDesktopMenu } from '~/components/SiteDesktopMenu'
import { SiteDesktopSocialList } from './SiteDesktopSocialList'
import { SiteDrawer } from '~/components/SiteDrawer'
import { useMatchMedia } from '~/hooks/useMatchMedia'

export const SiteHeader: React.VFC = () => {
  const media: { [key: string]: boolean } = useMatchMedia()

  return (
    <MyRoot aria-label="サイトヘッダー">
      <MyContainer>
        <MyLogo>
          <Link href={'/'} passHref>
            <MyLogoLink title={'トップページ'}>
              <BaseLogo size={`${144 / 16}rem`} />
            </MyLogoLink>
          </Link>
        </MyLogo>
        <MyMenu id="menu" tabIndex={-1} aria-label="サイト内メニュー">
          {media.lg && <SiteDesktopMenu />}
          <SiteDrawer />
        </MyMenu>
        {media.lg && <SiteDesktopSocialList />}
      </MyContainer>
    </MyRoot>
  )
}

const MyRoot = styled.header`
  background-color: var(--theme-header-background);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: var(--height-header);
  position: sticky;
  top: 0;
  z-index: var(--context-fixed-object);
`

const MyContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-areas: 'header-logo header-nav';
  grid-template-columns: 1fr auto;
  height: inherit;
  margin: auto;
  max-width: 1920px;

  @media ${breakpoints.lg} {
    grid-template-areas: 'header-logo header-nav header-social';
    grid-template-columns: 1fr auto 1fr;
  }
`

const MyLogo = styled.p`
  grid-area: header-logo;
  padding: 0 max(16px, min(11px + 1.4815vw, 32px));
`

const MyLogoLink = styled.a`
  display: inline-block;
  position: relative;

  &::after {
    background-color: var(--color-grayscale-3);
    border-radius: 4px;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  ${hoverable(`
    &::after {
      opacity: 0.5;
    }
  `)}
`

const MyMenu = styled.nav`
  grid-area: header-nav;
  justify-self: end;
`
