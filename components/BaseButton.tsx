import React from 'react'
import styled from 'styled-components'
import { buttonStyle } from '~/styles/object/buttonStyle'

type BaseButtonPropsType = {
  children: string
  icon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const BaseButton: React.VFC<BaseButtonPropsType> = ({ children, icon, type = 'button', disabled, onClick }) => {
  return (
    <Button type={type} onClick={onClick} {...(disabled && { disabled, 'aria-disabled': 'true' })}>
      {children}
      {icon}
    </Button>
  )
}

const Button = styled.button`
  ${buttonStyle}
`
