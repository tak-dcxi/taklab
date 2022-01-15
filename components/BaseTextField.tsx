import React from 'react'
import styled from 'styled-components'
import { formFieldStyle } from '~/styles/object/formFieldStyle'
import { toKebabCase } from '~/utils/convertString'

export type BaseTextFieldPropsType = {
  type?: 'text' | 'email' | 'tel' | 'password'
  id?: string
  name: string
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
      name,
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
    return (
      <Wrapper>
        <Input
          ref={ref}
          id={id}
          name={name}
          type={type}
          title={title}
          placeholder={placeholder}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete={autoComplete}
          aria-invalid={error}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...(required && { 'aria-required': 'true' })}
          {...(disabled && { disabled, 'aria-disabled': 'true' })}
        />
      </Wrapper>
    )
  }
)

const Wrapper = styled.span`
  background-color: var(--theme-textfield-background);
  display: block;
  height: ${48 / 16}rem;
  overflow: hidden;
`

const Input = styled.input`

  --this-scale: 0.875;

  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: inset 0 0 0 2px var(--theme-divider);
  font-size: max(1rem, 16px);
  height: calc(100% / var(--this-scale));
  line-height: ${48 / 16}rem;
  padding: 0 1em;
  transform: scale(var(--this-scale));
  transform-origin: top left;
  width: calc(100% / var(--this-scale));

  &::-webkit-input-placeholder {
    color: var(--color-grayscale-3);
  }

  &::placeholder {
    color: var(--color-grayscale-3);
  }

  &[aria-invalid='true'] {
    box-shadow: inset 0 0 0 2px var(--color-accent-1);
  }

  &:focus {
    box-shadow: inset 0 0 0 2px var(--color-primary);
    outline: 0;
  }
`
