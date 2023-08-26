import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import { scrollBehavior } from '~/libs/scrollBehavior'
import { ThemeProvider } from '~/context/ThemeProvider'
import { SiteStructureTemplate } from '~/components/SiteStructureTemplate'
import { setViewHeight } from '~/libs/setViewHeight'
import { usePageView } from '~/hooks/usePageView'
import { HeaderIntersectionObserveProvider } from '~/context/HeaderIntersectionOberve'

const SiteScriptTags = dynamic(() => import('~/components/SiteScriptTags').then((module) => module.SiteScriptTags), {
  ssr: false,
})

const App: React.VFC<AppProps> = ({ Component, pageProps, router }) => {
  // ページビューのカスタムフックを使用
  usePageView()

  useEffect(() => {
    // JavaScriptが有効であることを示す属性を追加
    document.documentElement.setAttribute('data-js', 'true')

    // スクロールの挙動を設定
    scrollBehavior()

    // ビューポートの高さを設定
    setViewHeight()

    // GoogleFontsのリンク要素を取得し、media属性を変更
    const googleFontsLink = document.getElementById('myGoogleFonts') as HTMLLinkElement
    if (googleFontsLink) {
      googleFontsLink.media = 'all'
    }

    // ルートが変更されたときの処理を設定
    const handleRouteChange = (): void => {
      const main: HTMLElement = document.getElementById('main')
      if (main) main.focus()
      // mainにfocusする都合上、見た目のスクロール位置がズレるので最上部までスクロールする
      window.scrollTo(0, 0)
    }

    // ルートが変更されたら処理を実行
    router.events.on('routeChangeComplete', handleRouteChange)

    // コンポーネントがアンマウントされるときに処理を解除
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <ThemeProvider>
      <HeaderIntersectionObserveProvider>
        <SiteStructureTemplate>
          <SiteScriptTags />
          <Component {...pageProps} />
        </SiteStructureTemplate>
      </HeaderIntersectionObserveProvider>
    </ThemeProvider>
  )
}

export default App
