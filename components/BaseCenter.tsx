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
    <Center as={as} className="BaseCenter" {...{ maxWidth, gutters, intrinsic, andText }}>
      {children}
    </Center>
  )
}

const Center = styled.div<CommonPropsType>`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => props.maxWidth};
  padding-left: ${(props) => props.gutters};
  padding-right: ${(props) => props.gutters};

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