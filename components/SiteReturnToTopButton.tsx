import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { Transition } from 'react-transition-group'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from './BaseIcon'
import { clamp } from '~/styles/tools/clamp'
import throttle from 'lodash/throttle'
import { fadeIn, fadeOut } from '~/styles/settings/keyframes'

const duration = 300

export const SiteReturnToTopButton: React.VFC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      const target: number = 100
      const scroll: number = window.scrollY

      setVisible(target <= scroll)
    }

    window.addEventListener('scroll', throttle(handleScroll, 1000), { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (event: React.MouseEvent): void => {
    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Transition in={visible} timeout={duration} unmountOnExit nodeRef={buttonRef}>
      <Button type="button" aria-label="ページトップに戻る" visible={visible} onClick={handleClick} ref={buttonRef}>
        <BaseIcon type="arrow-up" size={'max(40%, 16px)'} />
      </Button>
    </Transition>
  )
}

const Button = styled.button<{ visible: boolean }>`
  --this-size: ${clamp(40, 48)};
  --this-offset: ${clamp(16, 32)};

  align-items: center;
  background-color: var(--theme-button-background);
  border-radius: 4px;
  bottom: var(--this-offset);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: var(--color-grayscale-7);
  display: inline-flex;
  height: var(--this-size);
  justify-content: center;
  padding: 0;
  position: fixed;
  right: var(--this-offset);
  transition: background-color 0.3s;
  width: var(--this-size);
  z-index: var(--context-fixed-object);

  @supports (bottom: env(safe-area-inset-bottom)) {
    bottom: calc(var(--this-offset) + env(safe-area-inset-bottom));
  }

  ${(props) =>
    props.visible
      ? css`
          animation: ${fadeIn} ${duration}ms forwards;
        `
      : css`
          animation: ${fadeOut} ${duration}ms forwards;
        `}

  ${hoverable(`
    background-color: var(--color-primary);
  `)}
`
