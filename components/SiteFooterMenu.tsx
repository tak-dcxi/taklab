import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { menu, MenuType } from '~/constant/menu'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseCenter } from './BaseCenter'
import { BaseStack } from './BaseStack'
import { SiteSNSLinks } from './SiteSNSLinks'

export const SiteFooterMenu: React.VFC = () => {
  const router: NextRouter = useRouter()
  const path: string = router.asPath

  return (
    <BaseStack gap={'32px'}>
      <MenuWrapper>
        <Menu aria-label="サイト内メニュー">
          {menu.map((item: MenuType, index: number) => {
            const isBlogPage: boolean = /\/blog\/.+$/.test(path) || item.path === path

            return (
              <li key={index}>
                <Link href={item.path} passHref>
                  {item.id === 'blog' ? (
                    <FooterLink {...(isBlogPage && { 'aria-current': 'page' })}>{item.title}</FooterLink>
                  ) : (
                    <FooterLink {...(item.path === path && { 'aria-current': 'page' })}>{item.title}</FooterLink>
                  )}
                </Link>
              </li>
            )
          })}
        </Menu>
      </MenuWrapper>
      <BaseCenter gutters={'0'} intrinsic>
        <SiteSNSLinks />
      </BaseCenter>
    </BaseStack>
  )
}

const MenuWrapper = styled.div`
  overflow: hidden;
`

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -8px;

  & li {
    margin: 8px;
  }

  @media ${breakpoints.mdUntil} {
    align-items: center;
    flex-direction: column;
  }
`

const FooterLink = styled.a`
  display: inline-block;
  font-family: var(--font-designed);
  font-size: ${14 / 16}rem;
  padding: 4px;
  position: relative;
  text-transform: uppercase;
  transition: color 0.3s;

  &::before,
  &::after {
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }

  &::after {
    background-color: var(--color-primary);
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  &[aria-current] {
    &::before {
      background-color: var(--color-grayscale-3);
    }
  }

  ${hoverable(`
    color: var(--color-primary);

    &::after {
      transform: scaleX(1);
    }
  `)}
`
