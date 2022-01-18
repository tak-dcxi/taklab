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

const App: React.VFC<AppProps> = ({ Component, pageProps, router }) => {
  usePageView()

  useEffect(() => {
    document.documentElement.classList.remove('no-js')

    try {
      document.querySelector(':focus-visible')
    } catch (error) {
      loadCDN(
        'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
        'sha384-xRa5B8rCDfdg0npZcxAh+RXswrbFk3g6dlHVeABeluN8EIwdyljz/LqJgc2R3KNA'
      )
    }

    if (!('scrollBehavior' in document.documentElement.style)) smoothscroll.polyfill()

    scrollBehavior()

    setViewHeight()
  }, [])

  useEffect(() => {
    const handleRouteChange = (): void => {
      const main: HTMLElement = document.getElementById('main')
      main.focus()
      window.scrollTo(0, 0)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <ThemeProvider>
      <SiteStructureTemplate>
        <SiteScriptTags />
        <Component {...pageProps} />
      </SiteStructureTemplate>
    </ThemeProvider>
  )
}

export default App
