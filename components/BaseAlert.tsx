import React from 'react'
import styled, { css } from 'styled-components'
import { BaseIcon } from './BaseIcon'

type BaseAlertPropsType = {
  children: string
  centering?: boolean
}

export const BaseAlert: React.VFC<BaseAlertPropsType> = ({ children, centering }) => {
  return (
    <Alert role="alert" centering={centering}>
      <BaseIcon type={'alert'} size={`${14 / 16}rem`} />
      {children}
    </Alert>
  )
}

const Alert = styled.span<{ centering: boolean }>`
  align-items: center;
  background-color: var(--color-accent-2);
  border-radius: 4px;
  color: var(--color-accent-1);
  display: flex;
  font-size: var(--fontsize-1);
  padding: 0.75em 1em;
  width: fit-content;

  & > svg {
    margin-right: 0.5em;
  }

  ${(props) =>
    props.centering &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}
`
