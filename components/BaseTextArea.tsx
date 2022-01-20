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
      <Wrapper>
        <Input
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
        <Dummy ref={dummyRef} aria-hidden="true" />
      </Wrapper>
    )
  }
)

const Wrapper = styled.span`
  background-color: var(--theme-textfield-background);
  display: block;
  min-height: ${240 / 16}rem;
  position: relative;
`

const Input = styled.textarea`
  --this-scale: 0.875;

  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: inset 0 0 0 1px var(--theme-divider);
  display: block;
  font-size: max(1rem, 16px);
  height: calc(100% / var(--this-scale));
  overflow: hidden;
  padding: 1em;
  transform: scale(var(--this-scale));
  transform-origin: top left;
  width: calc(100% / var(--this-scale));

  &:not(:only-child) {
    left: 0;
    position: absolute;
    resize: none;
    top: 0;
  }

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

const Dummy = styled.span`
  border: 1px solid;
  display: block;
  font-size: max(var(--fontsize-2), 14px);
  overflow: hidden;
  overflow-wrap: break-word;
  padding: 1em;
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
`
