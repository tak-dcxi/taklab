import React from 'react'
import styled, { css } from 'styled-components'
import { BaseIcon } from './BaseIcon'

type BaseAlertPropsType = {
  children: string
  centering?: boolean
}

export const BaseAlert: React.VFC<BaseAlertPropsType> = ({ children, centering }) => {
  return (
    <MyAlert role="alert" centering={centering}>
      <BaseIcon type={'alert'} size={14} />
      {children}
    </MyAlert>
  )
}

const MyAlert = styled.p<{ centering: boolean }>`
  align-items: center;
  background-color: var(--color-accent-2);
  border-radius: 4px;
  color: var(--color-accent-1);
  display: flex;
  padding: 0.75em 1em;
  width: fit-content;

  ${(props) =>
    props.centering &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}

  & > svg {
    margin-right: 0.5em;
  }
`
