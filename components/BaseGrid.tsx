import React, { useEffect, useRef, useState, useCallback, HTMLAttributes, DetailedHTMLProps } from 'react'
import styled, { ThemedStyledProps } from 'styled-components'
import debounce from 'lodash/debounce'

// 共通のプロパティの型定義
type CommonPropsType = {
  columnMin: string
  gap: string
  track?: 'fit' | 'fill'
}

// BaseGridのプロパティの型定義
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
  const [isWide, setIsWide] = useState<boolean>(true)

  // ウィンドウサイズが変更された時の処理
  const handleResize = useCallback(() => {
    const element: HTMLDivElement | null = gridRef.current
    if (!element) return

    const test = document.createElement('div')
    test.style.width = columnMin
    element.appendChild(test)

    // 要素の実際の幅を計算
    const computedWidth = parseFloat(window.getComputedStyle(test).width)
    element.removeChild(test)

    // ウィンドウが広いかどうかを判断
    setIsWide(element.scrollWidth > computedWidth)
  }, [columnMin])

  // handleResize関数を遅延させる
  const debouncedHandleResize = useRef(debounce(() => handleResize(), 300)).current

  // イベントリスナーの設定とクリーンアップ
  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize, false)
    handleResize()
    return () => {
      debouncedHandleResize.cancel()
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [handleResize, debouncedHandleResize])

  return (
    <Wrapper ref={gridRef} className="BaseGrid" isWide={isWide} as={as} columnMin={columnMin} gap={gap} track={track}>
      {children}
    </Wrapper>
  )
}

// グリッドの列のスタイルを生成
const generateGridTemplateColumns = (
  props: ThemedStyledProps<
    Pick<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      'key' | keyof React.HTMLAttributes<HTMLDivElement>
    > & { ref?: React.Ref<HTMLDivElement> } & CommonPropsType & { isWide: boolean },
    any
  >
): string => {
  if (props.isWide) {
    return `repeat(${props.track === 'fit' ? 'auto-fit' : 'auto-fill'}, minmax(${props.columnMin}, 1fr))`
  }
  return '100%'
}

// スタイル付きのラッパーコンポーネント
const Wrapper = styled.div<CommonPropsType & { isWide: boolean }>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.gap};
  grid-template-columns: ${(props) => generateGridTemplateColumns(props)}; /* stylelint-disable-line */
`
