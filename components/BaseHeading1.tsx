import React from 'react'
import styled from 'styled-components'

type BaseHeadingPropsType = {
  children: string
  lv: 1 | 2 | 3 | 4
  id?: string
}

export const BaseHeading1: React.VFC<BaseHeadingPropsType> = ({ children, lv, id }) => {
  return (
    <>
      {lv === 1 && <MyH1 id={id}>{children}</MyH1>}
      {lv === 2 && <MyH2 id={id}>{children}</MyH2>}
      {lv === 3 && <MyH3 id={id}>{children}</MyH3>}
      {lv === 4 && <MyH4 id={id}>{children}</MyH4>}
    </>
  )
}

const MyH1 = styled.h1`
  font-family: var(--font-montserrat);
  font-size: max(var(--fontsize-6), min(1.3519rem + 0.7407vw, var(--fontsize-7))); /* clamp() */
  font-weight: bold;
  letter-spacing: 0.02em;
  line-height: var(--leading-tight);
  min-height: 0.1vw; /* Safariにてfont-size:clamp()がリサイズ時に動かないバグを解消する */
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

const MyH2 = MyH1.withComponent('h2')
const MyH3 = MyH1.withComponent('h3')
const MyH4 = MyH1.withComponent('h4')
