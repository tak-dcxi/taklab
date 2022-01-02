/**
 * 文字列を解析して、適切に改行されるように`wbr`タグを挿入します。
 * @see https://github.com/google/budoux/tree/main/javascript
 * @param {string} text 最適化したいテキスト
 * @return {string}
 */

import { loadDefaultJapaneseParser } from 'budoux'

const parser = loadDefaultJapaneseParser()

export const adjustLineBreaks = (text: string): string => {
  return parser.translateHTMLString(text)
}
