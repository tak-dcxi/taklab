import React from 'react'
import styled, { css } from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'

type CommonPropsType = {
  type: 'open' | 'close'
}

type SiteDrawerButtonPropsType = {
  onClick?: () => void
} & CommonPropsType

export const SiteDrawerButton = React.forwardRef(
  ({ type, onClick }: SiteDrawerButtonPropsType, ref: React.Ref<HTMLButtonElement>) => {
    if (type === 'open') {
      return (
        <Button ref={ref} type="button" aria-label="メニューを開く" aria-haspopup="true" onClick={onClick}>
          <ButtonIcon {...{ type }} />
        </Button>
      )
    }

    return (
      <Button type="button" aria-label="メニューを閉じる" onClick={onClick}>
        <ButtonIcon {...{ type }} />
      </Button>
    )
  }
)

const Button = styled.button`
  align-items: center;
  background-color: var(--theme-button-background);
  color: var(--color-grayscale-7);
  display: inline-flex;
  height: var(--height-header);
  justify-content: center;
  transition: background-color 0.3s;
  width: var(--height-header);

  ${hoverable(`
    background-color: var(--color-grayscale-2);
  `)}
`

const ButtonIcon = styled.span<CommonPropsType>`
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

  ${(props) =>
    props.type === 'open'
      ? css`
          background-color: currentColor;

          &::before {
            transform: translateY(-6px);
          }

          &::after {
            transform: translateY(6px);
          }
        `
      : css`
          &::before {
            transform: rotate(45deg);
          }

          &::after {
            transform: rotate(-45deg);
          }
        `}
`
