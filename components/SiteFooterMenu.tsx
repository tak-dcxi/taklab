import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { menu, MenuType } from '~/constant/menu'
import { social } from '~/constant/social'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseSocialIcon } from './BaseSocialIcon'

export const SiteFooterMenu: React.VFC = () => {
  const router: NextRouter = useRouter()
  const path: string = router.asPath

  return (
    <Root>
      <Menu aria-label="サイト内メニュー">
        {menu.map((item: MenuType, index: number) => {
          const isBlogPage = /\/blog\/.+$/.test(path) || item.path === path

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
      <SocialList aria-label="Follow Me">
        <li>
          <SocialLink href={social.twitter.url} target="_blank" rel="noopener noreferrer">
            <BaseSocialIcon size={20} type="twitter" />
          </SocialLink>
        </li>
        <li>
          <SocialLink href={social.zenn.url} target="_blank" rel="noopener noreferrer">
            <BaseSocialIcon size={20} type="zenn" />
          </SocialLink>
        </li>
        <li>
          <SocialLink href={social.note.url} target="_blank" rel="noopener noreferrer">
            <BaseSocialIcon size={20} type="note" />
          </SocialLink>
        </li>
        <li>
          <SocialLink href={social.rss.url} target="_blank" rel="noopener noreferrer">
            <BaseSocialIcon size={20} type="rss" />
          </SocialLink>
        </li>
      </SocialList>
    </Root>
  )
}

const Root = styled.div`
  overflow: hidden;

  & > * + * {
    padding-top: 16px;
  }
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

const SocialList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -8px;

  & li {
    margin: 8px;
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

const SocialLink = styled.a`
  display: inline-block;
  isolation: isolate;
  padding: 4px;
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
      opacity: 1;
    }
  `)}
`
