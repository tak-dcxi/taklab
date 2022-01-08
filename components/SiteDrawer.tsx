import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { SiteDrawerButton } from '~/components/SiteDrawerToggler'
import { SiteDrawerBody } from '~/components/SiteDrawerBody'
import { useMatchMedia } from '~/hooks/useMatchMedia'
import { backfaceFixed } from '~/utils/backfaceFixed'

export const SiteDrawer: React.VFC = () => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const media = useMatchMedia()

  const onOpen = (): void => {
    document.getElementById('__next').setAttribute('inert', '')
    document.body.addEventListener('keydown', handleKeydown, false)
    setExpanded(true)
    backfaceFixed(true)
  }

  const onClose = (): void => {
    document.getElementById('__next').removeAttribute('inert')
    document.body.removeEventListener('keydown', handleKeydown)
    setExpanded(false)
    backfaceFixed(false)
  }

  const handleButtonClick = async (): Promise<void> => {
    await new Promise<void>((resolve) => {
      onOpen()
      resolve()
    })

    if (bodyRef.current) bodyRef.current.focus()
  }

  const handleKeydown = (event: { key: string }): void => {
    if (event.key === 'Escape' || event.key === 'Esc') onClose()
  }

  return (
    <>
      {!media.lg && (
        <MyButtonWrapper>
          <SiteDrawerButton type="open" onClick={handleButtonClick} setExpanded={setExpanded} ref={buttonRef} />
        </MyButtonWrapper>
      )}
      <SiteDrawerBody expanded={expanded} onClose={onClose} opener={buttonRef} ref={bodyRef} />
    </>
  )
}

const MyButtonWrapper = styled.p`
  display: contents;

  @media ${breakpoints.lg} {
    display: none;
  }
`
