import React from 'react'
import styled from 'styled-components'

type PostGridPropsType = {
  children: React.ReactNode
}

export const PostGrid: React.VFC<PostGridPropsType> = ({ children }) => {
  return <MyRoot tabIndex={-1}>{children}</MyRoot>
}

const MyRoot = styled.div`
  display: grid;
  gap: max(16px, min(11px + 1.4815vw, 32px));
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`
