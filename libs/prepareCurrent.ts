/**
 * nav要素内のリンクに`aria-current`を付与します。
 */

const hrefToRootAbsolutePath = (selector: HTMLAnchorElement): string => {
  const absolutePath: string = selector.href
  const windowLocation: Location = window.location
  const protocolHost: string = `${windowLocation.protocol}//${windowLocation.host}`

  return absolutePath.replace(protocolHost, '').replace(/index\.html$/, '')
}

const rootAbsolutePathToArray = (absolutePath: string): string[] => {
  return absolutePath
    .replace(/\\/g, '/')
    .replace(/\/[^/]*$/, '')
    .slice(1)
    .split('/')
}

const setCurrentLocation = (selector: HTMLAnchorElement, level = 1): void => {
  const paths: string[] = rootAbsolutePathToArray(hrefToRootAbsolutePath(selector))
  const matchedPath: string[] = paths.map((path: string, index: number) => {
    if (index <= level - 1) return `${path}/`
    return null
  })

  const directories: string[] = rootAbsolutePathToArray(window.location.pathname)
  const matchedDirectory: string[] = directories.map((directory: string, index: number) => {
    if (index <= level - 1) return `${directory}/`
    return null
  })

  const directory: string = `/${matchedDirectory.join('')}`
  const href: string = `/${matchedPath.join('')}`

  if (href === directory && href !== '//') selector.setAttribute('aria-current', 'location')
}

const setCurrentPage = (selector: HTMLAnchorElement): void => {
  const path: string = hrefToRootAbsolutePath(selector)
  const locationPathname: string = window.location.pathname.replace(/index\.html$/, '')

  if (path === locationPathname) selector.setAttribute('aria-current', 'page')
}

export const prepareCurrent = (): void => {
  const target: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav a')

  if (!target.length) return

  target.forEach((element: HTMLAnchorElement) => {
    if (element.hasAttribute('aria-current')) element.removeAttribute('aria-current')
    setCurrentLocation(element)
    setCurrentPage(element)
  })
}
