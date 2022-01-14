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
      if (!dummyRef.current) return

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
  position: relative;
`

const MyInput = styled.textarea`
  ${formFieldStyle}

  display: block;
  left: 0;
  overflow: hidden;
  position: absolute;
  resize: none;
  top: 0;
`

const MyDummy = styled.span`
  border: 1px solid;
  display: block;
  font-size: max(var(--fontsize-2), 14px);
  min-height: ${240 / 16}rem;
  overflow: hidden;
  overflow-wrap: break-word;
  padding: 1em;
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
`
