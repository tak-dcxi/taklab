import React, { useRef } from 'react'
import styled from 'styled-components'
import { formFieldStyle } from '~/styles/object/formFieldStyle'

export type BaseTextAreaPropsType = {
  id?: string
  title?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: any
}

type HookFormPropsType = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>
}

export const BaseTextArea = React.forwardRef<HTMLTextAreaElement, BaseTextAreaPropsType & HookFormPropsType>(
  (
    {
      id,
      title,
      placeholder,
      required,
      disabled,
      value,
      onChange,
      onBlur,
      error,
    }: BaseTextAreaPropsType & HookFormPropsType,
    ref
  ) => {
    const dummyRef = useRef<HTMLSpanElement>(null)

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
      dummyRef.current.textContent = event.currentTarget.value + '\u200b'
    }

    return (
      <MyWrapper>
        <MyInput
          ref={ref}
          id={id}
          title={title}
          placeholder={placeholder}
          aria-invalid={error}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onInput={handleInput}
          {...(required && { 'aria-required': 'true' })}
          {...(disabled && { disabled, 'aria-disabled': 'true' })}
        />
        <MyDummy ref={dummyRef} aria-hidden="true" />
      </MyWrapper>
    )
  }
)

const MyWrapper = styled.span`
  display: block;
  font-size: max(var(--fsize-3), 16px);
  position: relative;
`

const MyInput = styled.textarea`
  appearance: none;
  background-color: var(--grayscale-6);
  border: 1px solid var(--grayscale-4);
  border-radius: 0;
  display: block;
  font: inherit;
  height: 100%;
  left: 0;
  overflow: hidden;
  padding: 12px;
  position: absolute;
  resize: none;
  top: 0;
  width: 100%;

  &[aria-invalid='true'] {
    border-color: var(--invalid-color);
  }

  &:focus {
    border-color: var(--active-color);
    outline: 0;
  }
`

const MyDummy = styled.span`
  border: 1px solid;
  display: block;
  min-height: ${240 / 16}rem;
  overflow: hidden;
  overflow-wrap: break-word;
  padding: 12px;
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
`
