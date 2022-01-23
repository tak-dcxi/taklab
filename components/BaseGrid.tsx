import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

type CommonPropsType = {
  columnMin: string
  gap: string
  track?: 'fit' | 'fill'
}

type BaseGridPropsType = {
  as?: React.ElementType
  children: React.ReactNode
} & CommonPropsType

export const BaseGrid: React.VFC<BaseGridPropsType> = ({
  as = 'div',
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
    <Wrapper as={as} ref={gridRef} className="BaseGrid" isOverflowing={isOverflowing} {...{ columnMin, gap, track }}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div<CommonPropsType & { isOverflowing: boolean }>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.gap};
  grid-template-columns: ${(props) =>
    props.isOverflowing
      ? `repeat(${props.track === 'fit' ? 'auto-fit' : 'auto-fill'}, minmax(${props.columnMin}, 1fr)) `
      : '100%'};
`
