import React from 'react'
import styled from 'styled-components'
import { formFieldStyle } from '~/styles/object/formFieldStyle'

export type BaseTextFieldPropsType = {
  type?: 'text' | 'email' | 'tel' | 'password'
  id?: string
  title?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  disabled?: boolean
  error?: any
}

type HookFormPropsType = {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler<HTMLInputElement>
}

export const BaseTextField = React.forwardRef<HTMLInputElement, BaseTextFieldPropsType & HookFormPropsType>(
  (
    {
      type,
      id,
      title,
      placeholder,
      autoComplete,
      required,
      disabled,
      value,
      onChange,
      onBlur,
      error,
    }: BaseTextFieldPropsType & HookFormPropsType,
    ref
  ) => {
    let autoFill: string = autoComplete
    if (type === 'tel') autoFill = 'tel'
    if (type === 'email') autoFill = 'email'
    if (type === 'password') autoFill = 'password'

    return (
      <MyWrapper>
        <MyInput
          ref={ref}
          id={id}
          type={type}
          title={title}
          placeholder={placeholder}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete={autoFill}
          aria-invalid={error}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...(required && { 'aria-required': 'true' })}
          {...(disabled && { disabled, 'aria-disabled': 'true' })}
        />
      </MyWrapper>
    )
  }
)

const MyWrapper = styled.span`
  display: block;
  overflow: hidden;
`

const MyInput = styled.input`
  ${formFieldStyle}
`
