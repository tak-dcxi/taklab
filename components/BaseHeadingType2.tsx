import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type BaseHeadingPropsType = {
  children: string
  lv: 2 | 3 | 4
  id?: string
  align?: 'left' | 'center' | 'right'
}

export const BaseHeadingType2: React.VFC<BaseHeadingPropsType> = ({ children, lv, id }) => {
  return (
    <>
      {lv === 2 && (
        <H2 id={id} className="BaseHeadingType2">
          {children}
        </H2>
      )}
      {lv === 3 && (
        <H3 id={id} className="BaseHeadingType2">
          {children}
        </H3>
      )}
      {lv === 4 && (
        <H4 id={id} className="BaseHeadingType2">
          {children}
        </H4>
      )}
    </>
  )
}

const H2 = styled.h1`
  font-family: var(--font-designed);
  font-size: ${clamp(20, 24, true)}; /* clamp() */
  letter-spacing: 0.02em;
  line-height: var(--leading-tight);
  min-height: 0.01vw; /* Safariにてfont-size:clamp()がリサイズ時に動かないバグを解消する */
  text-transform: uppercase;
`

const H3 = H2.withComponent('h3')
const H4 = H2.withComponent('h4')
