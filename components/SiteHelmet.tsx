import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import debounce from 'lodash/debounce'
import { useTheme } from '~/context/ThemeProvider'
import { config } from '~/site.config'

type SiteHelmetPropsType = {
  title?: string
  description?: string
  image?: string
  isErrorPage?: boolean
}

type ViewportType = 'width=device-width,initial-scale=1' | 'width=360'
type ColorShemeType = 'light' | 'dark' | 'light dark'

// デフォルトのプロップ値を外で定義
const defaultProps = {
  title: config.siteMeta.title,
  description: config.siteMeta.description,
  image: `${config.baseURL}/ogp.png`,
}

export const SiteHelmet: React.VFC<SiteHelmetPropsType> = ({
  title = defaultProps.title,
  description = defaultProps.description,
  image = defaultProps.image,
  isErrorPage,
}) => {
  const router = useRouter()
  const path = router.asPath
  const currentURL = config.baseURL + path

  const [viewport, setViewport] = useState<ViewportType>('width=device-width,initial-scale=1')
  const [colorScheme, setColorScheme] = useState<ColorShemeType>('light dark')
  const { colorMode } = useTheme()

  // debounceされたresizeイベントリスナ関数を外で定義
  const debouncedResize = debounce(() => {
    const value: ViewportType = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360'
    if (viewport !== value) setViewport(value)
  }, 1000)

  useEffect(() => {
    window.addEventListener('resize', debouncedResize)
    debouncedResize()

    return () => window.removeEventListener('resize', debouncedResize)
  }, [debouncedResize, viewport])

  useEffect(() => {
    setColorScheme(colorMode === 'dark' ? 'dark' : 'light')
  }, [colorMode])

  return (
    <Head>
      <title>{path === '/' ? title : `${title} | ${config.siteMeta.title}`}</title>
      <meta name="viewport" content={viewport} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="email=no,telephone=no,address=no" />
      {isErrorPage ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <>
          <link rel="canonical" href={currentURL} />
          <meta property="og:type" content={path === '/' ? 'website' : 'article'} />
          <meta property="og:title" content={title} />
          <meta property="og:url" content={currentURL} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={config.siteMeta.title} />
          <meta property="og:image" content={image} />
          <meta property="og:locale" content="ja_JP" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@tak_dcxi" />
        </>
      )}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon alternate" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#2f2f2f" />
      <meta name="theme-color" content="#019bb6" />
      <meta name="color-scheme" content={colorScheme} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
}
