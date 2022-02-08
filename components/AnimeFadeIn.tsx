import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type CommonPropsType = {
  active: boolean
  delay?: number
}

type AnimeFadeInPropsType = {
  as?: 'div' | 'span'
  children: React.ReactNode
} & CommonPropsType

export const AnimeFadeIn: React.VFC<AnimeFadeInPropsType> = ({ as = 'div', children, active, delay = 0 }) => {
  return <Wrapper {...{ as, active, delay }}>{children}</Wrapper>
}

const Wrapper = styled.div<CommonPropsType>`
  display: block;
  opacity: ${(props) => (props.active ? '1' : '0')};
  transform: ${(props) => (props.active ? 'translate3d(0, 0, 0)' : `translate3d(0, ${clamp(16, 32)}, 0) `)};
  transition: opacity 0.8s linear ${(props) => props.delay}ms,
    transform 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${(props) => props.delay}ms;
`
