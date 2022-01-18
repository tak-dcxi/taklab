import hljs from 'highlight.js'
import { JSDOM } from 'jsdom'

export const HTMLParser = (htmlString: string): string => {
  const dom = new JSDOM(htmlString)
  setCodeHighlight(dom.window.document.querySelectorAll('pre code'))
  return dom.window.document.body.innerHTML
}

const setCodeHighlight = (elements: NodeListOf<Element>) => {
  elements.forEach((element: HTMLElement) => {
    element.innerHTML = hljs.highlightAuto(element.textContent ?? '').value
    element.classList.add('hljs')
  })
}
