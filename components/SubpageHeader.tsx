import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type SubpageHeaderPropsType = {
  headline: string
}

export const SubpageHeader: React.VFC<SubpageHeaderPropsType> = ({ headline }) => {
  return (
    <Root>
      <Headline>{headline}</Headline>
    </Root>
  )
}

const Root = styled.header`
  background-image: var(--theme-background-pattern);
  border-bottom: 1px solid var(--theme-divider);
  border-top: 1px solid var(--theme-divider);
  display: grid;
  font-family: var(--font-montserrat);
  min-height: ${clamp(220, 440)};
  place-items: center;
`

const Headline = styled.h1`
  font-size: ${clamp(28, 44, true)};
  font-weight: bold;
  padding: 32px;
  text-transform: uppercase;
`
