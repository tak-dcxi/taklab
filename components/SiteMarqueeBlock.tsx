import React from 'react'
import styled, { keyframes } from 'styled-components'
import { clamp } from '~/styles/tools/clamp'
import { BaseLogo } from './BaseLogo'

export const SiteMarqueeBlock: React.VFC = () => {
  return (
    <Root>
      <Item>
        <BaseLogo size={'100%'} presentation />
      </Item>
      <Item>
        <BaseLogo size={'100%'} presentation />
      </Item>
      <Item>
        <BaseLogo size={'100%'} presentation />
      </Item>
      <Item>
        <BaseLogo size={'100%'} presentation />
      </Item>
      <Item>
        <BaseLogo size={'100%'} presentation />
      </Item>
    </Root>
  )
}

const LoopAnimationFirst = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
`

const Root = styled.div`
  display: flex;
`

const Item = styled.div`
  animation: ${LoopAnimationFirst} 14s linear infinite;
  color: var(--theme-text-x-muted);
  flex-shrink: 0;
  padding: 0 max(1.5%, 16px);
  width: ${clamp(400, 1080, false, 320, 1920)};
`
