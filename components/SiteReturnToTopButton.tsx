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
  --size: ${clamp(40, 48)};
  --offset: ${clamp(16, 32)};

  align-items: center;
  animation-duration: ${duration}ms;
  animation-fill-mode: forwards;
  animation-name: ${(props) => (props.visible ? fadeIn : fadeOut)};
  background-color: var(--theme-button-background);
  border-radius: 4px;
  bottom: var(--offset);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: var(--color-grayscale-7);
  display: inline-flex;
  height: var(--size);
  justify-content: center;
  padding: 0;
  position: fixed;
  right: var(--offset);
  transition: background-color 0.3s;
  width: var(--size);
  z-index: var(--context-fixed-object);

  @supports (bottom: env(safe-area-inset-bottom)) {
    bottom: calc(var(--offset) + env(safe-area-inset-bottom));
  }

  ${hoverable(`
    background-color: var(--color-primary);
  `)}
`
