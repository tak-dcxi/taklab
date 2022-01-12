import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { menu } from '~/constant/menu'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from '~/components/BaseIcon'
import { useTheme } from '~/context/ThemeProvider'

export const SiteDesktopMenu: React.VFC = () => {
  const { asPath } = useRouter()
  const { colorMode, setColorMode } = useTheme()

  return (
    <MyRoot>
      {menu.map((item, index) => {
        return (
          <li key={index}>
            <Link href={item.path} passHref>
              <MyNavbarLink {...(item.path === asPath && { 'aria-current': 'page' })}>{item.title}</MyNavbarLink>
            </Link>
          </li>
        )
      })}
      <li>
        <MyNavbarThemeToggler
          type="button"
          title={`現在のテーマは${colorMode === 'dark' ? 'ダークモード' : 'ライトモード'}です`}
          onClick={setColorMode}
        >
          <MyThemeIcon data-type={colorMode === 'dark' ? 'dark' : 'light'}>
            <span>
              <BaseIcon type="sun" />
              <BaseIcon type="moon" />
            </span>
          </MyThemeIcon>
          Theme
        </MyNavbarThemeToggler>
      </li>
    </MyRoot>
  )
}

const MyRoot = styled.ul`
  align-items: center;
  display: flex;

  & > li + li {
    margin-left: 16px;
  }

  @media ${breakpoints.lgUntil} {
    display: none;
  }
`

const MyNavbarLink = styled.a`
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

const MyThemeIcon = styled.span`
  display: inline-block;
  height: 1em;
  margin-right: 0.25em;
  overflow: hidden;
  width: 1em;

  & > span {
    display: block;
    transition: transform 0.3s ease-out;
  }

  &[data-type='dark'] {
    & > span {
      transform: translateY(-1em);
    }
  }

  & svg {
    display: block;
    height: 1em;
    width: 1em;
  }
`

const MyNavbarThemeToggler = MyNavbarLink.withComponent('button')
