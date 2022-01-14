import React, { useRef, useState } from 'react'
import styled from 'styled-components'

type GridPropsType = {
  min: string
  isWide: string
  space: string
}

const GridDefaultProps = {
  min: '250px',
  isWide: false,
  space: 'var(--s0)',
}

const Grid: React.FC<GridProps> & { defaultProps: Partial<GridProps> } = (props) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [isWide, setIsWide] = useState(props.isWide)

  useResize(gridRef, () => {
    const element = gridRef.current

    if (element) {
      const test = document.createElement('div')
      test.style.width = props.min!
      element.appendChild(test)
      const minToPixels = test.offsetWidth
      element.removeChild(test)

      setIsWide(element.scrollWidth > minToPixels)
    }
  })

  return <MyGrid {...props} isWide={isWide} ref={gridRef} />
}

const MyGrid = styled.div<GridProps>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.space};
  grid-template-columns: ${(props) => (props.isWide ? `repeat(auto-fit, minmax(${props.min}, 1fr)) ` : '100%')};
`

export default Grid
