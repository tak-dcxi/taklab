import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { menu, MenuType } from '~/constant/menu'
import { social } from '~/constant/social'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseLogo } from '~/components/BaseLogo'
import { BaseSocialIcon } from '~/components/BaseSocialIcon'
import { clamp } from '~/styles/tools/clamp'
import { SiteReturnToTopButton } from './SiteReturnToTopButton'

export const SiteFooter: React.VFC = () => {
  const { asPath } = useRouter()

  return (
    <Root aria-label="サイトフッター">
      <BaseContainer>
        <LogoWrapper>
          <BaseLogo size={clamp(184, 220, true)} />
        </LogoWrapper>
        <FooterMenu>
          <ul>
            {menu.map((item: MenuType, index: number) => {
              const isBlogPage = /\/blog\/.+$/.test(asPath) || item.path === asPath

              return (
                <li key={index}>
                  <Link href={item.path} passHref>
                    {item.id === 'blog' ? (
                      <FooterLink {...(isBlogPage && { 'aria-current': 'page' })}>{item.title}</FooterLink>
                    ) : (
                      <FooterLink {...(item.path === asPath && { 'aria-current': 'page' })}>{item.title}</FooterLink>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </FooterMenu>
        <FooterSocial>
          <ul>
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
          </ul>
        </FooterSocial>
        <Copyright>
          <small lang="en" translate="no">
            © {new Date().getFullYear()} TAK / Web Creator
          </small>
        </Copyright>
      </BaseContainer>
      <SiteReturnToTopButton />
    </Root>
  )
}

const Root = styled.footer`
  background-color: var(--color-grayscale-1);
  border-top: 1px solid var(--theme-divider);
  color: var(--color-grayscale-7);
  padding: ${clamp(48, 64)} 0;
`

const LogoWrapper = styled.p`
  text-align: center;

  &::after {
    background-color: var(--color-grayscale-3);
    content: '';
    display: block;
    height: 2px;
    margin: 32px auto 0;
    width: 40px;
  }
`

const FooterMenu = styled.div`
  margin-top: 28px;
  overflow: hidden;

  & ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -8px;
  }

  & li {
    margin: 8px;
  }

  @media ${breakpoints.mdUntil} {
    & ul {
      align-items: center;
      flex-direction: column;
    }
  }
`

const FooterSocial = styled.div`
  margin-top: 20px;
  overflow: hidden;

  & ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -8px;
  }

  & li {
    margin: 8px;
  }
`

const FooterLink = styled.a`
  display: inline-block;
  font-family: var(--font-montserrat);
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

const Copyright = styled.p`
  font-family: var(--font-montserrat);
  font-size: var(--fontsize-1);
  margin-top: 48px;
  text-align: center;

  & > small {
    font-size: 1em;
  }
`
