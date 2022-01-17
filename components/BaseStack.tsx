import React from 'react'
import styled, { css } from 'styled-components'

type CommonPropsType = {
  gap: string
  recursive?: boolean
}

type BaseStackPropsType = {
  children: React.ReactNode
} & CommonPropsType

export const BaseStack: React.VFC<BaseStackPropsType> = ({ children, recursive, gap = '0' }) => {
  return <Stack {...{ gap, recursive }}>{children}</Stack>
}

const Stack = styled.div<CommonPropsType>`
  ${(props) => (props.recursive ? '' : '>')} * + * {
    margin-top: ${(props) => props.gap};
  }
`
