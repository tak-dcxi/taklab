import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type GridCommonType = {
  min: string
  gap: string
  wide?: boolean
}

type BaseGridPropsType = {
  children: React.ReactNode
} & GridCommonType

export const BaseGrid: React.VFC<BaseGridPropsType> = ({ children, min = '256px', gap = '16px', wide }) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [isWide, setIsWide] = useState<boolean>(wide)

  useEffect(() => {
    const handleResize = () => {
      const element: HTMLDivElement = gridRef.current

      if (!element) return

      const testDiv: HTMLDivElement = document.createElement('div')
      testDiv.style.width = min!
      element.appendChild(testDiv)
      const minToPixels: number = testDiv.offsetWidth
      element.removeChild(testDiv)

      setIsWide(element.scrollWidth > minToPixels)
    }

    window.addEventListener('resize', handleResize, false)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [min, gridRef])

  return (
    <Wrapper min={min} gap={gap} wide={isWide} ref={gridRef}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div<GridCommonType>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.gap};
  grid-template-columns: ${(props) => (props.wide ? `repeat(auto-fit, minmax(${props.min}, 1fr)) ` : '100%')};
`
