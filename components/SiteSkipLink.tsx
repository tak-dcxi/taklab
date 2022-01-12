import React from 'react'
import styled from 'styled-components'
import { visuallyHiddenStyle } from '~/styles/trumps/VisuallyHidden'
import { BaseIcon } from '~/components/BaseIcon'

export const SiteSkipLink: React.VFC = () => {
  return (
    <MyLink href="#main">
      メインコンテンツへ進む
      <BaseIcon type={'enter'} />
    </MyLink>
  )
}

const MyLink = styled.a`
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-grayscale-7);
  display: flex;
  left: 16px;
  padding: 1em 1.5em;
  position: fixed;
  top: 16px;
  transition: opacity 0.3s;
  z-index: var(--context-popup);

  &:not(:focus) {
    ${visuallyHiddenStyle}
  }

  & > svg {
    margin-left: 0.5em;
  }
`
