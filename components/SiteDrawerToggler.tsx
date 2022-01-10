import React from 'react'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'

type SiteDrawerButtonPropsType = {
  type: 'open' | 'close'
  setExpanded?: (isExpanded: boolean) => void
  onClick?: () => void
}

export const SiteDrawerButton = React.forwardRef(
  ({ type, onClick }: SiteDrawerButtonPropsType, ref: React.Ref<HTMLButtonElement>) => {
    if (type === 'open') {
      return (
        <MyButton ref={ref} type="button" aria-label="メニューを開く" aria-haspopup="true" onClick={onClick}>
          <MyButtonIcon data-type={type} />
        </MyButton>
      )
    }

    if (type === 'close') {
      return (
        <MyButton type="button" aria-label="メニューを閉じる" onClick={onClick}>
          <MyButtonIcon data-type={type} />
        </MyButton>
      )
    }
  }
)

const MyButton = styled.button`
  align-items: center;
  background-color: var(--color-grayscale-1);
  color: var(--color-grayscale-7);
  display: flex;
  height: var(--height-header);
  justify-content: center;
  transition: background-color 0.3s;
  width: var(--height-header);

  ${hoverable(`
    background-color: var(--color-grayscale-2);
  `)}
`

const MyButtonIcon = styled.span`
  display: inline-block;
  height: 2px;
  position: relative;
  width: 18px;

  &::before,
  &::after {
    background-color: currentColor;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &[data-type='open'] {
    background-color: currentColor;

    &::before {
      transform: translateY(-6px);
    }

    &::after {
      transform: translateY(6px);
    }
  }

  &[data-type='close'] {
    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
`
