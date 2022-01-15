import React from 'react'
import styled, { css } from 'styled-components'

type StackPropsType = {
  gap: string
  recursive?: boolean
}

type BaseStackPropsType = {
  children: React.ReactNode
} & StackPropsType

export const BaseStack: React.VFC<BaseStackPropsType> = ({ children, recursive, gap = '0' }) => {
  return (
    <Stack recursive={recursive} gap={gap}>
      {children}
    </Stack>
  )
}

const Stack = styled.div<StackPropsType>`
  ${(props) => (props.recursive ? '' : '>')} * + * {
    margin-top: ${(props) => props.gap};
  }
`
