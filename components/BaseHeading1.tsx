import React from 'react'
import styled from 'styled-components'

type BaseHeadingPropsType = {
  children: string
  lv: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
}

export const BaseHeading1: React.VFC<BaseHeadingPropsType> = ({ children, lv, id }) => {
  return (
    <>
      {lv === 1 && <H1 id={id}>{children}</H1>}
      {lv === 2 && <H2 id={id}>{children}</H2>}
      {lv === 3 && <H3 id={id}>{children}</H3>}
      {lv === 4 && <H4 id={id}>{children}</H4>}
      {lv === 5 && <H5 id={id}>{children}</H5>}
      {lv === 6 && <H6 id={id}>{children}</H6>}
    </>
  )
}

const H1 = styled.h1`
  font-family: var(--designed-font);
  font-size: var(--fsize-7);
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: var(--leading-x-tight);
  text-align: center;
  text-transform: uppercase;

  &::after {
    background-color: var(--primary-color-1);
    content: '';
    display: block;
    height: 1px;
    margin: 16px auto 0;
    width: 40px;
  }
`

const H2 = H1.withComponent('h2')
const H3 = H1.withComponent('h3')
const H4 = H1.withComponent('h4')
const H5 = H1.withComponent('h5')
const H6 = H1.withComponent('h6')
