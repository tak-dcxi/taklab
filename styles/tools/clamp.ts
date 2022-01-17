/**
 * 任意の大きさに最小値、推奨値、最大値を指定します
 * @param {number} minSize 最小値
 * @param {number} maxSize 最大値
 * @param {boolean} pix2rem pxをremに変換します(font-size等で指定します）
 * @param {number} minWidth ビューポートの最小値（指定されたビューポート以下では最小値となります）
 * @param {number} maxWidth ビューポートの最大値（指定されたビューポート以上では最大値となります）
 * @return {string}
 */

const globalFontSize: number = 16

export const clamp = (minSize: number, maxSize: number, pix2rem?: boolean, minWidth = 320, maxWidth = 1200): string => {
  const slope: number = (maxSize - minSize) / (maxWidth - minWidth)
  const yAxisIntersection: number = minSize + slope * (minWidth * -1)

  if (pix2rem) {
    return `max(${minSize / globalFontSize}rem, min(${yAxisIntersection / globalFontSize}rem + ${slope * 100}vw, ${
      maxSize / globalFontSize
    }rem))`
  }

  return `max(${minSize}px, min(${Math.round(yAxisIntersection)}px + ${slope * 100}vw, ${maxSize}px))`
}
