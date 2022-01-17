import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type ContactFormStepsPropsType = {
  current: 1 | 2 | 3
}

export const ContactFormSteps: React.VFC<ContactFormStepsPropsType> = ({ current }) => {
  return (
    <List>
      <Item {...(current === 1 && { 'aria-current': 'step' })}>
        <Number>1</Number>入力
      </Item>
      <Item {...(current === 2 && { 'aria-current': 'step' })}>
        <Number>2</Number>確認
      </Item>
      <Item {...(current === 3 && { 'aria-current': 'step' })}>
        <Number>3</Number>完了
      </Item>
    </List>
  )
}

const List = styled.ol`
  display: flex;
  justify-content: center;

  & > li + li {
    margin-left: ${clamp(40, 64, true, 320, 960)};
  }
`

const Item = styled.li`
  font-size: ${14 / 16}rem;
  text-align: center;

  &[aria-current] {
    color: var(--color-primary);
    font-weight: bold;
  }
`

const Number = styled.span`
  align-items: center;
  background-color: var(--color-grayscale-3);
  border-radius: 50%;
  color: var(--color-grayscale-7);
  display: flex;
  font-family: var(--font-montserrat);
  font-size: 1rem;
  font-weight: normal;
  height: ${32 / 16}rem;
  justify-content: center;
  line-height: 1;
  margin-bottom: 0.5em;
  position: relative;
  width: ${32 / 16}rem;

  &::before,
  &::after {
    background-color: var(--color-grayscale-3);
    bottom: 0;
    height: 2px;
    margin: auto 0;
    position: absolute;
    top: 0;
    width: ${clamp(20, 32, true, 320, 960)};
    z-index: -1;
  }

  &::before {
    right: 100%;
  }

  &::after {
    left: 100%;
  }

  ${`${Item}[aria-current]`} & {
    background-color: var(--color-primary);
  }

  ${`${Item}:not(:first-child)`} & {
    &::before {
      content: '';
    }
  }

  ${`${Item}:not(:last-child)`} & {
    &::after {
      content: '';
    }
  }
`
