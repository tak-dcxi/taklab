import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Transition } from 'react-transition-group'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from './BaseIcon'
import { clamp } from '~/styles/tools/clamp'
import { throttle } from 'lodash'

const duration = 300

export const SiteReturnToTopButton: React.VFC = () => {
  // Transitionコンポーネントにおける "findDOMNode is deprecated in StrictMode" Warningを無効化します
  // https://www.kindacode.com/article/react-warning-finddomnode-is-deprecated-in-strictmode/
  const buttonRef = useRef(null)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      const target: number = 100
      const scroll: number = window.scrollY

      setVisible(target <= scroll)
    }

    window.addEventListener('scroll', throttle(handleScroll, 500))
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Transition in={visible} timeout={duration} unmountOnExit nodeRef={buttonRef}>
      <Button type="button" aria-label="ページトップに戻る" visible={visible} onClick={handleClick} ref={buttonRef}>
        <BaseIcon type="arrow-up" />
      </Button>
    </Transition>
  )
}

const enterButton = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const exitButton = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const Button = styled.button<{ visible: boolean }>`
  align-items: center;
  background-color: var(--theme-button-background);
  border-radius: 4px;
  bottom: ${clamp(16, 32)};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: var(--color-grayscale-7);
  display: inline-flex;
  height: ${clamp(32, 48)};
  justify-content: center;
  padding: 0;
  position: fixed;
  right: ${clamp(16, 32)};
  transition: background-color 0.3s;
  width: ${clamp(32, 48)};
  z-index: var(--context-fixed-object);

  & > svg {
    height: auto;
    width: max(40%, 16px);
  }

  ${(props) =>
    props.visible
      ? css`
          animation: ${enterButton} ${duration}ms forwards;
        `
      : css`
          animation: ${exitButton} ${duration}ms forwards;
        `}

  ${hoverable(`
    background-color: var(--color-primary);
  `)}
`
