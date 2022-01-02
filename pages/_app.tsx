import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import 'focus-visible'
import 'wicg-inert'
import smoothscroll from 'smoothscroll-polyfill'
import { prepareCurrent } from '~/libs/prepareCurrent'
import { scrollBehavior } from '~/libs/scrollBehavior'

const App: React.VFC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    document.documentElement.classList.remove('no-js')
    if (!('scrollBehavior' in document.documentElement.style)) smoothscroll.polyfill()
    scrollBehavior()
  }, [])

  useEffect(() => prepareCurrent(), [router.pathname])

  return <Component {...pageProps} />
}

export default App
