import React from 'react'
import styled, { css } from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type CommonPropsType = {
  maxWidth?: string
  gutters?: string
  intrinsic?: boolean
  andText?: boolean
}

type BaseCenterPropsType = {
  as?: React.ElementType
  children: React.ReactNode
} & CommonPropsType

export const BaseCenter: React.VFC<BaseCenterPropsType> = ({
  as = 'div',
  children,
  maxWidth = 'var(--max-width-default)',
  gutters = clamp(16, 32),
  intrinsic,
  andText,
}) => {
  return (
    <Center as={as} maxWidth={maxWidth} gutters={gutters} intrinsic={intrinsic} andText={andText}>
      {children}
    </Center>
  )
}

const Center = styled.div<CommonPropsType>`
  box-sizing: content-box;
  margin-inline: auto;
  max-width: ${(props) => props.maxWidth};
  padding-inline: ${(props) => props.gutters};

  ${(props) =>
    props.intrinsic &&
    css`
      align-items: center;
      display: flex;
      flex-direction: column;
    `}

  ${(props) =>
    props.andText &&
    css`
      text-align: center;
    `}
`
