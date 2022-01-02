export const scrollBehavior = (): void => {
  const isModifiedEvent = (event: MouseEvent): boolean => {
    return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey
  }

  const scrollIntoView = (element: HTMLElement): void => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const forceFocus = (element: HTMLElement): void => {
    element.focus({ preventScroll: true })

    if (document.activeElement !== element) {
      element.tabIndex = -1
      element.focus({ preventScroll: true })
    }
  }

  document.addEventListener(
    'click',
    (event: MouseEvent) => {
      const anchorElement: HTMLAnchorElement = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]')

      if (!anchorElement?.hash || anchorElement.classList.contains('js-scroll-behavior-disabled')) return

      if (event.button === 0 && !isModifiedEvent(event)) {
        history.pushState(null, '', anchorElement.hash)

        const target: HTMLElement =
          document.querySelector<HTMLElement>(anchorElement.hash) ||
          (anchorElement.hash === '#' && document.documentElement)

        if (target) {
          event.preventDefault()
          scrollIntoView(target)
          forceFocus(target)
        }
      }
    },
    { capture: true }
  )
}
