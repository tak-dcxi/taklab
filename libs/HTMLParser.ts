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
  setImgAttributes(dom.window.document.querySelectorAll('img'))
  wrapIframe(dom.window.document.querySelectorAll('iframe'))
  removeScriptTags(dom.window.document.querySelectorAll('script'))
  removeEmptyParagraphs(dom.window.document.querySelectorAll('p'))
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

/**
 * 画像の最適化処理を行う
 */
const setImgAttributes = (imgElements: NodeListOf<HTMLImageElement>) => {
  const widths = [640, 960, 1080, 1280, 1920, 2048]

  imgElements.forEach((img: HTMLImageElement) => {
    img.setAttribute('decoding', 'async')
    img.setAttribute('loading', 'lazy')

    const srcValue: string = img.getAttribute('src') || ''
    const srcSetValues: string[] = widths.map((width) => `${srcValue}?fm=webp&w=${width} ${width}w`)
    img.setAttribute('srcset', srcSetValues.join(', '))
  })
}

const wrapIframe = (iframeElements: NodeListOf<HTMLIFrameElement>) => {
  iframeElements.forEach((iframe: HTMLIFrameElement) => {
    const wrapper = iframe.ownerDocument.createElement('div')
    wrapper.className = 'iframe'
    iframe.before(wrapper)
    wrapper.appendChild(iframe)
  })
}

/**
 * リッチエディタの中にscriptタグが含まれる場合、取り除く
 */
const removeScriptTags = (scriptElements: NodeListOf<HTMLScriptElement>) => {
  scriptElements.forEach((script: HTMLScriptElement) => {
    script.remove()
  })
}

/**
 * `<p></p>`または`<p><br></p>`のようにpタグの中身が空の場合、取り除く
 */
const removeEmptyParagraphs = (pElements: NodeListOf<HTMLParagraphElement>) => {
  pElements.forEach((p: HTMLParagraphElement) => {
    if (p.innerHTML.trim() === '<br>' || p.innerHTML.trim() === '') {
      p.remove()
    }
  })
}
