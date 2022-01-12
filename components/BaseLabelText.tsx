import React from 'react'
import styled from 'styled-components'

type BaseLabelTextPropsType = {
  children: string
  required?: boolean
}

export const BaseLabelText: React.VFC<BaseLabelTextPropsType> = ({ children, required }) => {
  return (
    <MyText>
      {children}
      {required && <MyRequiredIcon>必須</MyRequiredIcon>}
    </MyText>
  )
}

const MyText = styled.span`
  align-items: baseline;
  display: inline-flex;
  font-weight: bold;
`

const MyRequiredIcon = styled.strong`
  background-color: var(--color-grayscale-3);
  border-radius: 2px;
  font-size: var(--fontsize-1);
  letter-spacing: 0.08em;
  margin-left: 8px;
  padding: 4px 8px;
`
