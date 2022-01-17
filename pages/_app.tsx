import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import 'wicg-inert'
import smoothscroll from 'smoothscroll-polyfill'
import { scrollBehavior } from '~/libs/scrollBehavior'
import { SiteScriptTags } from '~/components/SiteScriptTags'
import { ThemeProvider } from '~/context/ThemeProvider'
import { SiteStructureTemplate } from '~/components/SiteStructureTemplate'

const App: React.VFC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    document.documentElement.classList.remove('no-js')

    const loadCDN = (src: string, integrity: string): void => {
      const script: HTMLScriptElement = document.createElement('script')
      script.src = src
      script.integrity = integrity
      script.crossOrigin = 'anonymous'
      script.defer = true
      document.head.appendChild(script)
    }

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
