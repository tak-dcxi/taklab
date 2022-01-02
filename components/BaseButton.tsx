import React from 'react'
import styled from 'styled-components'
import { buttonStyle } from '~/styles/object/buttonStyle'

type BaseButtonPropsType = {
  children: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const BaseButton: React.VFC<BaseButtonPropsType> = ({ children, type = 'button', disabled, onClick }) => {
  return (
    <MyButton type={type} onClick={onClick} {...(disabled && { disabled, 'aria-disabled': 'true' })}>
      {children}
    </MyButton>
  )
}

const MyButton = styled.button`
  ${buttonStyle}
`
