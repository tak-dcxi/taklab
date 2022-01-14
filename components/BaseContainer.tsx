import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type BaseContainerPropsType = {
  children: React.ReactNode
  size?: 'default' | 'narrow' | 'wide'
}

export const BaseContainer: React.VFC<BaseContainerPropsType> = ({ children, size = 'default' }) => {
  return <Container size={size}>{children}</Container>
}

const Container = styled.div<{ size: 'default' | 'narrow' | 'wide' }>`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) =>
    props.size === 'narrow'
      ? 'var(--max-width-narrow)'
        ? 'wide'
        : 'var(--max-width-wide)'
      : 'var(--max-width-default)'};
  padding: 0 ${clamp(16, 32)};
`
