import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { menu, MenuType } from '~/constant/menu'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from '~/components/BaseIcon'
import { useTheme } from '~/context/ThemeProvider'

export const SiteNavbarMenu: React.VFC = () => {
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
          <ThemeIcon iconType={colorMode === 'dark' ? 'dark' : 'light'}>
            <span>
              <BaseIcon type="sun" />
              <BaseIcon type="moon" />
            </span>
          </ThemeIcon>
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
  font-family: var(--font-montserrat);
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
    z-index: -1;
  }

  &::after {
    background-color: var(--color-primary);
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  &[aria-current] {
    &::before {
      background-color: currentColor;
    }
  }

  ${hoverable(`
    color: var(--color-primary);

    &::after {
      transform: scaleX(1);
    }
  `)}
`

const ThemeIcon = styled.span<{ iconType: 'dark' | 'light' }>`
  display: inline-block;
  height: 1em;
  margin-right: 0.25em;
  overflow: hidden;
  width: 1em;

  & > span {
    display: block;
    transition: transform 0.3s ease-out;
  }

  & svg {
    display: block;
    height: 1em;
    width: 1em;
  }

  ${(props) =>
    props.iconType === 'dark' &&
    css`
      & > span {
        transform: translateY(-1em);
      }
    `}
`

const NavbarThemeToggler = NavbarLink.withComponent('button')