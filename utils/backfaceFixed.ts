export const backfaceFixed = (fixed: boolean): void => {
  const html: HTMLElement = document.documentElement
  const body: HTMLElement = document.body
  const scrollbarWidth: number = window.innerWidth - body.clientWidth

  body.style.borderRight = fixed ? `${scrollbarWidth}px solid transparent` : ''

  const scrollingElement = (): Element | HTMLElement => {
    const browser: string = window.navigator.userAgent.toLowerCase()
    if ('scrollingElement' in document) return document.scrollingElement
    if (browser.indexOf('webkit') > 0) return body
    return html
  }

  const scrollY: number = fixed ? scrollingElement().scrollTop : parseInt(body.style.top || '0')

  const styles: { [key: string]: string } = {
    height: '100vh',
    left: '0',
    overflow: 'hidden',
    position: 'fixed',
    top: `${scrollY * -1}px`,
    width: '100vw',
  }

  Object.keys(styles).forEach((key) => (body.style[key] = fixed ? styles[key] : ''))
  html.style.height = fixed ? '100vh' : ''

  if (!fixed) window.scrollTo(0, scrollY * -1)
}
