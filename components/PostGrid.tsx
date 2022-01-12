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
  gap: max(16px, min(0.8519rem + 0.7407vw, 24px));
  grid-template-columns: repeat(auto-fill, minmax(296px, 1fr));
`
