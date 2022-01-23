import React from 'react'
import Script from 'next/script'
import { existsGaId, GA_ID } from '~/libs/gtag'

export const SiteScriptTags: React.VFC = () => {
  const isNotSupportInert: boolean = !('inert' in document.documentElement)

  let isNotSupportFocusVisible: boolean = false

  try {
    document.querySelector(':focus-visible')
  } catch (error) {
    isNotSupportFocusVisible = true
  }

  const isNotSupportScrollBehavior: boolean = !('scrollBehavior' in document.documentElement.style)

  const isNotSupportIntersectionObserver: boolean = !(
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  )

  return (
    <>
      {existsGaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} async strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
          </Script>
        </>
      )}
      {isNotSupportInert && (
        <Script
          src="https://cdn.jsdelivr.net/npm/wicg-inert@3.1.0/dist/inert.min.js"
          integrity="sha384-RkY5SwIRNwK/U6yj2dNeFxYJEA1FjwffakxeSJvsggmMidmbsCrH4PJ/799+3qMb"
          crossOrigin="anonymous"
          defer
          strategy="afterInteractive"
        />
      )}
      {isNotSupportFocusVisible && (
        <Script
          src="https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js"
          integrity="sha384-xRa5B8rCDfdg0npZcxAh+RXswrbFk3g6dlHVeABeluN8EIwdyljz/LqJgc2R3KNA"
          crossOrigin="anonymous"
          defer
          strategy="afterInteractive"
        />
      )}
      {isNotSupportScrollBehavior && (
        <Script
          src="https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"
          integrity="sha384-EYn4rWu1DHvYD0sSSSbMEtXQmMl58CFJd897806+RT1jJVYbhuZlZMN6yG9nCyFa"
          crossOrigin="anonymous"
          defer
          strategy="afterInteractive"
        />
      )}
      {isNotSupportIntersectionObserver && (
        <Script
          src="https://cdn.jsdelivr.net/npm/intersection-observer-polyfill@0.1.0/index.min.js"
          integrity="sha384-3ou67cSLPlqbWs2vyPz/t28wMveOdZf1ysTnpmRmv9Af3UsRl7HJLvgD3g5orDOq"
          crossOrigin="anonymous"
          defer
          strategy="afterInteractive"
        />
      )}
    </>
  )
}
