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
  usePageView()

  useEffect(() => {
    document.documentElement.setAttribute('data-js', 'true')
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
