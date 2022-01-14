import React from 'react'
import styled from 'styled-components'

type BaseLabelTextPropsType = {
  children: string
  required?: boolean
}

export const BaseLabelText: React.VFC<BaseLabelTextPropsType> = ({ children, required }) => {
  return (
    <Text>
      {children}
      {required && <RequiredIcon>必須</RequiredIcon>}
    </Text>
  )
}

const Text = styled.span`
  align-items: baseline;
  display: inline-flex;
  font-weight: bold;
`

const RequiredIcon = styled.strong`
  background-color: var(--color-accent-1);
  border-radius: 2px;
  color: var(--color-grayscale-7);
  font-size: var(--fontsize-1);
  font-weight: normal;
  letter-spacing: 0.08em;
  margin-left: 8px;
  padding: 4px 8px;
`
