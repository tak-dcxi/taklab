import React from 'react'
import styled, { css } from 'styled-components'

type CommonPropsType = {
  gap: string
  recursive?: boolean
}

type BaseStackPropsType = {
  as?: React.ElementType
  children: React.ReactNode
} & CommonPropsType

export const BaseStack: React.VFC<BaseStackPropsType> = ({ as = 'div', children, recursive, gap = '0' }) => {
  return (
    <Stack className="BaseStack" {...{ as, gap, recursive }}>
      {children}
    </Stack>
  )
}

const Stack = styled.div<CommonPropsType>`
  display: block;

  ${(props) => (props.recursive ? '' : '>')} * + * {
    margin-top: ${(props) => props.gap};
  }
`
