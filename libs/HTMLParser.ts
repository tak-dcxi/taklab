import hljs from 'highlight.js'
import { JSDOM } from 'jsdom'

/**
 * HTML文字列を解析して、コードブロックのハイライトを設定します。
 * @param htmlString ハイライトする前のHTML文字列
 * @returns ハイライト後のHTML文字列
 */
export const HTMLParser = (htmlString: string): string => {
  const dom = new JSDOM(htmlString)
  setCodeHighlight(dom.window.document.querySelectorAll('pre code'))
  return dom.window.document.body.innerHTML
}

/**
 * 与えられたコードブロック要素にシンタックスハイライトを設定します。
 * @param elements シンタックスハイライトを適用する要素のリスト
 */
const setCodeHighlight = (elements: NodeListOf<Element>) => {
  elements.forEach((element: HTMLElement) => {
    element.innerHTML = hljs.highlightAuto(element.textContent ?? '').value
    element.classList.add('hljs')
  })
}
