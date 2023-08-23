export const backfaceFixed = (fixed: boolean): void => {
  // body要素を取得
  const body = document.body as HTMLElement

  // スクロールバーの幅を計算
  const scrollbarWidth: number = window.innerWidth - body.clientWidth

  // サポートしていない場合、固定時にスクロールバーの幅だけ右のボーダーを設定
  // 型エラーを回避するために一時的にanyにキャスト
  ;(body.style as any).borderRight = fixed ? `${scrollbarWidth}px solid transparent` : ''

  // スクローリングする要素を取得する関数
  const getScrollingElement = (): Element | HTMLElement => {
    const browser: string = window.navigator.userAgent.toLowerCase()
    // スクローリング要素がdocumentに存在するかチェック
    if ('scrollingElement' in document) return (document as any).scrollingElement as Element
    // WebKitブラウザの場合、bodyがスクロール要素として扱われる
    if (browser.includes('webkit')) return body
    // それ以外のブラウザでは、html要素がスクロール要素として扱われる
    return (document as any).documentElement as Element
  }

  // 現在のスクロール位置を取得
  const scrollY: number = fixed ? getScrollingElement().scrollTop : parseInt(body.style.top || '0')

  // body要素を固定するためのスタイル定義
  const fixedStyles: { [key: string]: string } = {
    height: '100vh',
    left: '0',
    overflow: 'hidden',
    position: 'fixed',
    top: `${scrollY * -1}px`,
    width: '100vw',
  }

  // 固定する場合、上で定義したスタイルを適用
  if (fixed) {
    Object.keys(fixedStyles).forEach((key) => (body.style[key] = fixedStyles[key]))
    ;(document.documentElement as HTMLElement).style.height = '100vh'
  } else {
    // 固定を解除する場合、スタイルをクリア
    Object.keys(fixedStyles).forEach((key) => (body.style[key] = ''))
    ;(document.documentElement as HTMLElement).style.height = ''
    // 元のスクロール位置に戻す
    window.scrollTo(0, scrollY * -1)
  }
}
