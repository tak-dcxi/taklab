import React from 'react'
import styled from 'styled-components'
import { slideOutLeft } from '~/styles/settings/keyframes'
import { clamp } from '~/styles/tools/clamp'
import { BaseLogo } from './BaseLogo'

export const SiteFooterMarquee: React.VFC = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
`

const Item = styled.div`
  animation: ${slideOutLeft} 14s linear infinite;
  color: var(--theme-text-x-muted);
  flex-shrink: 0;
  padding: 0 max(1.5%, 16px);
  width: ${clamp(480, 1080, false, 320, 1920)};
`
