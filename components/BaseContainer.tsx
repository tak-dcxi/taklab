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
  max-width: 960px;
  padding-left: 16px;
  padding-right: 16px;
`
