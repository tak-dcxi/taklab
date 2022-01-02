import React from 'react'
import styled from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'

export const SiteFooter: React.VFC = () => {
  return (
    <MyRoot>
      <BaseContainer>
        <MyCopyright>
          <small lang="en" translate="no">
            © 2022 Takahiro Arai
          </small>
        </MyCopyright>
      </BaseContainer>
    </MyRoot>
  )
}

const MyRoot = styled.footer`
  border-top: 1px solid var(--boundary-color-strong);
  padding: 32px 0;
`

const MyCopyright = styled.p`
  font-size: var(--fsize-1);
  text-align: center;

  & > small {
    font-size: 1em;
  }
`
