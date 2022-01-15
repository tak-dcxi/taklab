import React from 'react'
import styled, { keyframes } from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

export const SiteLoader: React.VFC = () => {
  return <Loader role="img" aria-label="ローディング中" />
}

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`
const Loader = styled.div`
  animation: ${loadingAnimation} 0.5s linear infinite;
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
