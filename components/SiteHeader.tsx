import React from 'react'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import styled, { css } from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseLogo } from '~/components/BaseLogo'
import { SiteDrawer } from '~/components/SiteDrawer'
import { useMatchMedia } from '~/hooks/useMatchMedia'
import { clamp } from '~/styles/tools/clamp'
import { useHeaderIntersectionObserve } from '~/context/HeaderIntersectionOberve'

const SiteHeaderMenu = dynamic(() => import('~/components/SiteHeaderMenu').then((module) => module.SiteHeaderMenu))
const SiteSNSLinks = dynamic(() => import('~/components/SiteSNSLinks').then((module) => module.SiteSNSLinks))

export const SiteHeader: React.VFC = () => {
  const router: NextRouter = useRouter()
  const path: string = router.asPath
  const media: { [key: string]: boolean } = useMatchMedia()
  const { intersecting } = useHeaderIntersectionObserve()

  return (
    <Root aria-label="サイトヘッダー" isHome={path === '/'} intersecting={intersecting}>
      <Container>
        <Logo>
          <Link href={'/'} passHref>
            <LogoLink title={'トップページ'}>
              <BaseLogo size={`${144 / 16}rem`} />
            </LogoLink>
          </Link>
        </Logo>
        <Menu id="menu" tabIndex={-1} aria-label="サイト内メニュー">
          {media.lg && <SiteHeaderMenu />}
          <SiteDrawer />
        </Menu>
        {media.lg && (
          <SNSList>
            <SiteSNSLinks />
          </SNSList>
        )}
      </Container>
    </Root>
  )
}

type HeaderRootPropsType = {
  isHome: boolean
  intersecting?: boolean
}

const Root = styled.header<HeaderRootPropsType>`
  height: var(--height-header);
  position: ${(props) => (props.isHome ? 'fixed' : 'sticky')};
  top: 0;
  width: 100%;
  z-index: var(--context-fixed-object);

  &::after {
    background-color: var(--theme-background-default);
    bottom: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  /* トップページでの処理 */
  ${(props) =>
    props.isHome &&
    css`
      &::after {
        opacity: ${props.intersecting ? 0 : 1};
      }
    `}
`

const Container = styled.div`
  align-items: center;
  display: grid;
  grid-template-areas: 'header-logo header-nav';
  grid-template-columns: 1fr auto;
  height: inherit;
  margin: auto;
  max-width: var(--max-width-wide);

  @media ${breakpoints.lg} {
    grid-template-areas: 'header-logo header-nav header-social';
    grid-template-columns: 1fr auto 1fr;
  }
`

const Logo = styled.p`
  grid-area: header-logo;
  padding: 0 ${clamp(16, 32, false, 320, 1920)};
`

const LogoLink = styled.a`
  display: inline-block;
  isolation: isolate;
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

const Menu = styled.nav`
  grid-area: header-nav;
  justify-self: end;
`

const SNSList = styled.div`
  grid-area: header-social;
  justify-self: end;
  padding: 0 ${clamp(16, 32, false, 320, 1920)};

  @media ${breakpoints.lgUntil} {
    display: none;
  }
`
