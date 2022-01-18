import debounce from 'lodash/debounce'

export const setViewHeight = (): void => {
  let vw: number = window.innerWidth

  const handleResize = (): void => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  window.addEventListener(
    'resize',
    debounce(() => {
      // 画面の横幅にサイズ変動がない場合は処理を終える
      if (vw === window.innerWidth) return

      // 画面の横幅のサイズ変動があった時場合hは高さを再計算する
      vw = window.innerWidth
      handleResize()
    }, 300)
  )
  handleResize()
}
