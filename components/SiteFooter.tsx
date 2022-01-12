import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { menu } from '~/constant/menu'
import { social } from '~/constant/social'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseLogo } from '~/components/BaseLogo'
import { BaseSocialIcon } from '~/components/BaseSocialIcon'

export const SiteFooter: React.VFC = () => {
  const { asPath } = useRouter()

  return (
    <MyRoot aria-label="サイトフッター">
      <BaseContainer>
        <MyLogoWrapper>
          <BaseLogo size={'max(11.5rem, min(10.8333rem + 3.3333vw, 13.75rem))'} />
        </MyLogoWrapper>
        <MyFooterMenu>
          <ul>
            {menu.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path} passHref>
                    <MyFooterLink {...(item.path === asPath && { 'aria-current': 'page' })}>{item.title}</MyFooterLink>
                  </Link>
                </li>
              )
            })}
          </ul>
        </MyFooterMenu>
        <MyFooterSocial>
          <ul>
            <li>
              <MySocialLink href={social.twitter.url} target="_blank" rel="noopener noreferrer">
                <BaseSocialIcon size={20} type="twitter" />
              </MySocialLink>
            </li>
            <li>
              <MySocialLink href={social.zenn.url} target="_blank" rel="noopener noreferrer">
                <BaseSocialIcon size={20} type="zenn" />
              </MySocialLink>
            </li>
            <li>
              <MySocialLink href={social.note.url} target="_blank" rel="noopener noreferrer">
                <BaseSocialIcon size={20} type="note" />
              </MySocialLink>
            </li>
            <li>
              <MySocialLink href={social.rss.url} target="_blank" rel="noopener noreferrer">
                <BaseSocialIcon size={20} type="rss" />
              </MySocialLink>
            </li>
          </ul>
        </MyFooterSocial>
        <MyCopyright>
          <small lang="en" translate="no">
            © {new Date().getFullYear()} TAK / Web Creator
          </small>
        </MyCopyright>
      </BaseContainer>
    </MyRoot>
  )
}

const MyRoot = styled.footer`
  background-color: var(--color-grayscale-1);
  border-top: 1px solid var(--theme-divider);
  color: var(--color-grayscale-7);
  padding: max(48px, min(44px + 1.4815vw, 64px)) 0;
`

const MyLogoWrapper = styled.p`
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

const MyFooterMenu = styled.div`
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

const MyFooterSocial = styled.div`
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

const MyFooterLink = styled.a`
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

const MySocialLink = styled.a`
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

const MyCopyright = styled.p`
  font-family: var(--font-montserrat);
  font-size: var(--fontsize-1);
  margin-top: 48px;
  text-align: center;

  & > small {
    font-size: 1em;
  }
`
