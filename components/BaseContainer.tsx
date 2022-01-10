import React from 'react'
import styled from 'styled-components'

type BaseContainerPropsType = {
  children: React.ReactNode
}

export const BaseContainer: React.VFC<BaseContainerPropsType> = ({ children }) => {
  return <MyContainer>{children}</MyContainer>
}

const MyContainer = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
  padding: 0 max(16px, min(11px + 1.4815vw, 32px));
`
