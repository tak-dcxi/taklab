import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type PostGridPropsType = {
  children: React.ReactNode
}

export const PostGrid: React.VFC<PostGridPropsType> = ({ children }) => {
  return <MyRoot tabIndex={-1}>{children}</MyRoot>
}

const MyRoot = styled.div`
  display: grid;
  gap: ${clamp(16, 32)};
  grid-template-columns: repeat(auto-fill, minmax(296px, 1fr));
`
