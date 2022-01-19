import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as THREE from 'three/build/three.min.js'
import FOG from 'vanta/dist/vanta.fog.min.js'

export const HomeVantaEffect: React.VFC = () => {
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 100.0,
      minWidth: 100.0,
      highlightColor: 0xfafafa,
      midtoneColor: 0x757575,
      lowlightColor: 0xf4f4f4,
      baseColor: 0x019bb6,
      blurFactor: 0.3,
      speed: 0.8,
      zoom: 0.5,
    })

    return () => vantaEffect.destroy()
  }, [])

  return <Vanta ref={vantaRef} />
}

const Vanta = styled.div`
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: -1;

  &::after {
    background-color: var(--theme-heroheader-background);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`
