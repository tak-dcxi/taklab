import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import 'wicg-inert'
import smoothscroll from 'smoothscroll-polyfill'
import { scrollBehavior } from '~/libs/scrollBehavior'
import { SiteScriptTags } from '~/components/SiteScriptTags'
import { ThemeProvider } from '~/context/ThemeProvider'
import { SiteStructureTemplate } from '~/components/SiteStructureTemplate'
import { setViewHeight } from '~/libs/setViewHeight'
import { loadCDN } from '~/utils/loadCDN'
import { usePageView } from '~/hooks/usePageView'
import { HeaderIntersectionObserveProvider } from '~/context/HeaderIntersectionOberve'

const App: React.VFC<AppProps> = ({ Component, pageProps, router }) => {
  usePageView()

  useEffect(() => {
    try {
      document.querySelector(':focus-visible')
    } catch (error) {
      loadCDN(
        'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
        'sha384-xRa5B8rCDfdg0npZcxAh+RXswrbFk3g6dlHVeABeluN8EIwdyljz/LqJgc2R3KNA'
      )
    }

    if (
      !(
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      )
    ) {
      loadCDN(
        'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        'sha384-3ou67cSLPlqbWs2vyPz/t28wMveOdZf1ysTnpmRmv9Af3UsRl7HJLvgD3g5orDOq'
      )
    }

    if (!('scrollBehavior' in document.documentElement.style)) smoothscroll.polyfill()

    scrollBehavior()

    setViewHeight()
  }, [])

  useEffect(() => {
    const handleRouteChange = (): void => {
      const main: HTMLElement = document.getElementById('main')
      if (main) main.focus()
      window.scrollTo(0, 0)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
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
