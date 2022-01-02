/**
 * 要素の幅と高さを取得します。
 * windowを参照しているため、useEffect内で利用してください。
 * @param {HTMLElement} target 幅と高さを取得する要素
 * @return {{width: Number, height: Number}}
 */

export const getSize = (ref: { current: HTMLElement }): { width: number; height: number } => {
  const element: HTMLElement = ref.current
  const isInvisibleElement: boolean =
    window.getComputedStyle(element).getPropertyValue('display') === 'none' ||
    window.getComputedStyle(element).getPropertyValue('height') === '0px'

  // style属性値があれば保存、なければ空文字を保存する
  const styleAttrDisplay: string = element.style.display === '' ? '' : element.style.display
  const styleAttrPosition: string = element.style.position === '' ? '' : element.style.position
  const styleAttrVisibility: string = element.style.visibility === '' ? '' : element.style.visibility
  const styleAttrHeight: string = element.style.height === '' ? '' : element.style.height

  // 幅と高さが取得できない要素は、不可視状態で取得する
  if (isInvisibleElement) {
    element.style.setProperty('display', 'block', 'important')
    element.style.setProperty('position', 'relative', 'important')
    element.style.setProperty('visibility', 'hidden', 'important')
    element.style.setProperty('height', 'auto', 'important')
  }

  // 幅を取得する
  const elementWidth: number = element.getBoundingClientRect().width
  // 高さを取得する
  const elementHeight: number = element.getBoundingClientRect().height

  // 元のstyle属性に戻す
  if (isInvisibleElement) {
    element.style.display = styleAttrDisplay
    element.style.position = styleAttrPosition
    element.style.visibility = styleAttrVisibility
    element.style.height = styleAttrHeight
  }

  return {
    width: elementWidth,
    height: elementHeight,
  }
}
