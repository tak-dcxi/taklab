import React from 'react'
import styled from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'
import { SiteNavbar } from '~/components/SiteNavbar'

export const SiteHeader: React.VFC = () => {
  return (
    <MyRoot>
      <BaseContainer>
        <MyContainer>
          <MyLogo>LOGO</MyLogo>
          <SiteNavbar />
        </MyContainer>
      </BaseContainer>
    </MyRoot>
  )
}

const MyRoot = styled.header`
  background-color: var(--fixed-header-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  position: sticky;
  top: 0;
  z-index: var(--fixed-object-context);
`

const MyContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const MyLogo = styled.p`
  font-size: var(--fsize-5);
  font-weight: bold;
`
