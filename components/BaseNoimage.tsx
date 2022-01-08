import React from 'react'
import styled from 'styled-components'

type BaseNoimagePropsType = {
  x?: number
  y?: number
}

export const BaseNoimage: React.VFC<BaseNoimagePropsType> = ({ x = 3, y = 2 }) => {
  return (
    <MyRoot X={x} Y={y}>
      <p>No Image</p>
    </MyRoot>
  )
}

type MyRootPropsType = {
  X?: number
  Y?: number
}

const MyRoot = styled.div<MyRootPropsType>`
  background-color: var(--color-grayscale-1);
  color: var(--text-color-lighten);
  position: relative;

  &::before {
    content: '';
    float: left;
    padding-top: ${(props) => (props.Y / props.X) * 100}%;
  }

  &::after {
    clear: both;
    content: '';
    display: block;
  }

  & > * {
    bottom: 0;
    display: grid;
    left: 0;
    place-items: center;
    position: absolute;
    right: 0;
    top: 0;
  }
`
