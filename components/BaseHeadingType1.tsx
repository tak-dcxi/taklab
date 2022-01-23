import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type BaseHeadingPropsType = {
  children: string
  lv: 1 | 2 | 3 | 4
  id?: string
}

export const BaseHeadingType1: React.VFC<BaseHeadingPropsType> = ({ children, lv, id }) => {
  return (
    <>
      {lv === 1 && (
        <H1 id={id} className="BaseHeadingType1">
          {children}
        </H1>
      )}
      {lv === 2 && (
        <H2 id={id} className="BaseHeadingType1">
          {children}
        </H2>
      )}
      {lv === 3 && (
        <H3 id={id} className="BaseHeadingType1">
          {children}
        </H3>
      )}
      {lv === 4 && (
        <H4 id={id} className="BaseHeadingType1">
          {children}
        </H4>
      )}
    </>
  )
}

const H1 = styled.h1`
  font-family: var(--font-designed);
  font-size: ${clamp(24, 32, true)};
  letter-spacing: 0.02em;
  line-height: var(--leading-tight);
  min-height: 0.01vw; /* Safariにてfont-size:clamp()がリサイズ時に動かないバグを解消する */
  text-align: center;
  text-transform: uppercase;

  &::after {
    background-color: currentColor;
    content: '';
    display: block;
    height: 2px;
    margin: 12px auto 0;
    width: 40px;
  }
`

const H2 = H1.withComponent('h2')
const H3 = H1.withComponent('h3')
const H4 = H1.withComponent('h4')
