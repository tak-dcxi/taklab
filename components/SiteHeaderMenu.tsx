import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { menu, MenuType } from '~/constant/menu'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from '~/components/BaseIcon'
import { useTheme } from '~/context/ThemeProvider'

export const SiteHeaderMenu: React.VFC = () => {
  const { asPath } = useRouter()
  const { colorMode, setColorMode } = useTheme()

  return (
    <Root>
      {menu.map((item: MenuType, index: number) => {
        const isBlogPage = /\/blog\/.+$/.test(asPath) || item.path === asPath

        return (
          <li key={index}>
            <Link href={item.path} passHref>
              {item.id === 'blog' ? (
                <NavbarLink {...(isBlogPage && { 'aria-current': 'page' })}>{item.title}</NavbarLink>
              ) : (
                <NavbarLink {...(item.path === asPath && { 'aria-current': 'page' })}>{item.title}</NavbarLink>
              )}
            </Link>
          </li>
        )
      })}
      <li>
        <NavbarThemeToggler
          type="button"
          title={`現在のテーマは${colorMode === 'dark' ? 'ダークモード' : 'ライトモード'}です`}
          onClick={setColorMode}
        >
          <ThemeIconWrapper>
            <ThemeIcon current={colorMode === 'dark' ? 'dark' : 'light'}>
              <BaseIcon type="sun" />
              <BaseIcon type="moon" />
            </ThemeIcon>
          </ThemeIconWrapper>
          Theme
        </NavbarThemeToggler>
      </li>
    </Root>
  )
}

const Root = styled.ul`
  align-items: center;
  display: flex;

  & > li + li {
    margin-left: 16px;
  }

  @media ${breakpoints.lgUntil} {
    display: none;
  }
`

const NavbarLink = styled.a`
  align-items: center;
  display: inline-flex;
  font-family: var(--font-designed);
  font-size: ${14 / 16}rem;
  padding: 4px;
  position: relative;
  text-transform: uppercase;
  transition: color 0.3s;

  &::before,
  &::after {
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
    top: 100%;
    transform: scaleX(0);
    transition: transform 0.3s;
    z-index: -1;
  }

  &::before {
    background-color: currentColor;
  }

  &::after {
    background-color: var(--color-primary);
  }

  &[aria-current] {
    &::before {
      transform: scaleX(1);
    }
  }

  ${hoverable(`
    color: var(--color-primary);

    &::after {
      transform: scaleX(1);
    }
  `)}
`

const ThemeIconWrapper = styled.span`
  display: inline-block;
  height: 1em;
  margin-right: 0.25em;
  overflow: hidden;
  width: 1em;

  & .BaseIcon {
    display: block;
  }
`

const ThemeIcon = styled.span<{ current: 'dark' | 'light' }>`
  display: block;
  transition: transform 0.3s ease-out;

  ${(props) =>
    props.current === 'dark' &&
    css`
      transform: translateY(-1em);
    `}
`

const NavbarThemeToggler = NavbarLink.withComponent('button')
