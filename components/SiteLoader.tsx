import React, { useEffect } from 'react'
import styled from 'styled-components'
import { rotateClockwise } from '~/styles/settings/keyframes'
import { clamp } from '~/styles/tools/clamp'

export const SiteLoader: React.VFC = () => {
  useEffect(() => {
    document.documentElement.setAttribute('aria-busy', 'true')

    return () => document.documentElement.removeAttribute('aria-busy')
  }, [])

  return <Loader role="img" aria-label="ローディング中" />
}

const Loader = styled.div`
  animation: ${rotateClockwise} 0.5s linear infinite;
  border-bottom: none;
  border-left: none;
  border-radius: 50%;
  border-right: 2px solid transparent;
  border-top: 2px solid var(--color-primary);
  bottom: 0;
  height: ${clamp(40, 64)};
  left: 0;
  margin: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: ${clamp(40, 64)};
  z-index: 1;
`
