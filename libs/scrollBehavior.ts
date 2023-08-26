export const scrollBehavior = (): void => {
  // モディファイアキーが押されているかを判断
  const isModifiedEvent = (event: MouseEvent): boolean =>
    event.ctrlKey || event.shiftKey || event.altKey || event.metaKey

  // 指定された要素にスムーズスクロール
  const scrollIntoView = (element: HTMLElement): void =>
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

  // 指定された要素にフォーカスを強制
  const forceFocus = (element: HTMLElement): void => {
    element.focus({ preventScroll: true })

    if (document.activeElement !== element) {
      element.tabIndex = -1
      element.focus({ preventScroll: true })
    }
  }

  // クリックイベントを監視
  document.addEventListener(
    'click',
    (event: MouseEvent) => {
      // クリックされた要素から最も近いアンカーリンクを取得
      const anchorElement: HTMLAnchorElement = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]')

      // アンカーリンクが存在しない、または無効な場合は処理を中断
      if (!anchorElement?.hash || anchorElement.classList.contains('js-scroll-behavior-disabled')) return

      // 左クリックであり、かつモディファイアキーが押されていない場合のみ処理
      if (event.button === 0 && !isModifiedEvent(event)) {
        history.pushState(null, '', anchorElement.hash)

        // 対象となる要素を取得
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
