import React from 'react'
import styled from 'styled-components'

type CommonPropsType = {
  active?: boolean
  delay?: number
  maskColor?: string
}

type AnimeMaskSlidePropsType = {
  as?: 'div' | 'span'
  children: React.ReactNode
} & CommonPropsType

export const AnimeMaskSlide: React.VFC<AnimeMaskSlidePropsType> = ({
  as = 'div',
  children,
  active,
  delay = 0,
  maskColor = 'currentColor',
}) => {
  return (
    <Outer as={as} {...{ active, delay }}>
      <Inner as={as} {...{ active, delay, maskColor }}>
        {children}
      </Inner>
    </Outer>
  )
}

const Outer = styled.div<CommonPropsType>`
  display: block;
  opacity: ${(props) => (props.active ? 1 : 0)};
  overflow: hidden;
  transition: opacity 0s ${(props) => props.delay}ms;
  width: fit-content;
`

const Inner = styled.div<CommonPropsType>`
  display: block;
  position: relative;
  transform: ${(props) => (props.active ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)')};
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${(props) => props.delay}ms;
  width: fit-content;

  &::after {
    background-color: ${(props) => props.maskColor};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: ${(props) => (props.active ? 'scale3d(0, 1, 1)' : 'scale3d(1, 1, 1)')};
    transform-origin: right;
    transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${(props) => 400 + props.delay}ms;
  }
`
