import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import 'wicg-inert'
import smoothscroll from 'smoothscroll-polyfill'
import { scrollBehavior } from '~/libs/scrollBehavior'
import { discriminationTheme } from '~/libs/theme'
import { SiteLayout } from '~/components/SiteLayout'

const App: React.VFC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    document.documentElement.classList.remove('no-js')

    discriminationTheme()

    if (!('scrollBehavior' in document.documentElement.style)) smoothscroll.polyfill()

    scrollBehavior()
  }, [])

  useEffect(() => {
    const handleRouteChange = (): void => {
      const main: HTMLElement = document.getElementById('main')
      main.focus()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  )
}

export default App
