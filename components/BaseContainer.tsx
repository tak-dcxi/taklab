import React from 'react'
import styled, { css } from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type CommonPropsType = {
  maxWidth?: string
  gutters?: string
  intrinsic?: boolean
  andText?: boolean
}

type BaseContainerPropsType = {
  children: React.ReactNode
} & CommonPropsType

export const BaseContainer: React.VFC<BaseContainerPropsType> = ({
  children,
  maxWidth = 'var(--max-width-default)',
  gutters = clamp(16, 32),
  intrinsic,
  andText,
}) => {
  return <Container {...{ maxWidth, gutters, intrinsic, andText }}>{children}</Container>
}

const Container = styled.div<CommonPropsType>`
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
