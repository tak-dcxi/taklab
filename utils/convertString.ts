/**
 * 文字列をケバブケースへ変換
 * @param {string} string 変換前の文字列
 * @return {string} 変換された文字列を返す
 */

export const toKebabCase = (string: string): string => {
  string = string.replace(/^ *?[A-Z]/, (allString) => {
    return allString.toLowerCase()
  })
  string = string.replace(/_/g, '-')
  string = string.replace(/ *?[A-Z]/g, (allString) => {
    return '-' + allString.replace(/ /g, '').toLowerCase()
  })
  return string
}
