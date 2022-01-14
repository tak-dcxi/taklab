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
      {lv === 2 && <MyH2 id={id}>{children}</MyH2>}
      {lv === 3 && <MyH3 id={id}>{children}</MyH3>}
      {lv === 4 && <MyH4 id={id}>{children}</MyH4>}
    </>
  )
}

const MyH2 = styled.h1`
  font-family: var(--font-montserrat);
  font-size: ${clamp(20, 24, true)}; /* clamp() */
  letter-spacing: 0.02em;
  line-height: var(--leading-tight);
  min-height: 0.01vw; /* Safariにてfont-size:clamp()がリサイズ時に動かないバグを解消する */
  text-transform: uppercase;
`

const MyH3 = MyH2.withComponent('h3')
const MyH4 = MyH2.withComponent('h4')
