import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type PostGridPropsType = {
  children: React.ReactNode
}

export const PostGrid: React.VFC<PostGridPropsType> = ({ children }) => {
  return <Root tabIndex={-1}>{children}</Root>
}

const Root = styled.div`
  display: grid;
  gap: ${clamp(16, 32)};
  grid-template-columns: repeat(auto-fill, minmax(296px, 1fr));
`
