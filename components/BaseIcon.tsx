import React from 'react'
import styled from 'styled-components'

type BaseIconPropsType = {
  color?: string
  size?: number
  label?: string
}

type BaseIconChevronPropsType = {
  type: 'up' | 'right' | 'down' | 'left'
}

const Wrapper: React.VFC<BaseIconPropsType & { children: React.ReactNode }> = ({
  children,
  color = 'currentColor',
  size = 16,
  label,
}) => {
  return (
    <MySVGtag
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="square"
      {...(label && { 'aria-label': label })}
    >
      {children}
    </MySVGtag>
  )
}

export const BaseIconChevron: React.VFC<BaseIconPropsType & BaseIconChevronPropsType> = ({
  type,
  color,
  size,
  label,
}) => {
  return (
    <Wrapper size={size} color={color} label={label}>
      {type === 'up' && <path d="m6 14 6-6 6 6h0" />}
      {type === 'right' && <path d="m10 6 6 6-6 6h0" />}
      {type === 'down' && <path d="m6 10 6 6 6-6" />}
      {type === 'left' && <path d="m14 18-6-6 6-6h0" />}
    </Wrapper>
  )
}

type MySVGTagPropsType = {
  width: number
  height: number
}

const MySVGtag = styled.svg<MySVGTagPropsType>`
  height: ${(props) => props.height / 16}rem;
  width: ${(props) => props.width / 16}rem;
`
