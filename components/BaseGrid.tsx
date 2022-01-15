import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'

type GridCommonType = {
  columnMin: string
  gap: string
  track?: 'fit' | 'fill'
}

type BaseGridPropsType = {
  children: React.ReactNode
} & GridCommonType

export const BaseGrid: React.VFC<BaseGridPropsType> = ({
  children,
  columnMin = '256px',
  gap = '16px',
  track = 'fit',
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = (): void => {
      const element: HTMLDivElement = gridRef.current

      if (!element) return

      const test: HTMLDivElement = document.createElement('div')
      test.style.width = columnMin!
      element.appendChild(test)
      const minToPixels: number = test.offsetWidth
      element.removeChild(test)

      setIsOverflowing(element.scrollWidth > minToPixels)
    }

    window.addEventListener('resize', debounce(handleResize, 300), false)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [columnMin, gridRef])

  return (
    <Wrapper columnMin={columnMin} gap={gap} track={track} isOverflowing={isOverflowing} ref={gridRef}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div<GridCommonType & { isOverflowing: boolean }>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.gap};
  grid-template-columns: ${(props) =>
    props.isOverflowing
      ? `repeat(${props.track === 'fit' ? 'auto-fit' : 'auto-fill'}, minmax(${props.columnMin}, 1fr)) `
      : '100%'};
`
