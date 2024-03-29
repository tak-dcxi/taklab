import React from 'react'
import styled from 'styled-components'
import { BaseCenter } from '~/components/BaseCenter'
import { BaseLogo } from '~/components/BaseLogo'
import { clamp } from '~/styles/tools/clamp'
import { SiteReturnToTopButton } from './SiteReturnToTopButton'
import { SiteFooterMenu } from './SiteFooterMenu'
import { BaseStack } from './BaseStack'
import { darkMode } from '~/styles/tools/darkMode'

export const SiteFooter: React.VFC = () => {
  return (
    <Root aria-label="サイトフッター">
      <BaseCenter>
        <BaseStack gap={'48px'}>
          <LogoWrapper>
            <BaseLogo size={clamp(184, 220, true)} />
          </LogoWrapper>
          <SiteFooterMenu />
          <Copyright>
            <small lang="en" translate="no">
              © {new Date().getFullYear()} TAK / Web Creator
            </small>
          </Copyright>
        </BaseStack>
      </BaseCenter>
      <SiteReturnToTopButton />
    </Root>
  )
}

const Root = styled.footer`
  background-color: var(--color-grayscale-1);
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

const Copyright = styled.p`
  font-family: var(--font-designed);
  font-size: var(--fontsize-1);
  text-align: center;

  & small {
    font-size: 1em;
  }
`
