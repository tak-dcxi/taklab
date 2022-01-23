import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
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

export const SiteHelmet: React.VFC<SiteHelmetPropsType> = ({
  title = config.siteMeta.title,
  description = config.siteMeta.description,
  image = `${config.baseURL}/ogp.png`,
  isErrorPage,
}) => {
  const router: NextRouter = useRouter()
  const path: string = router.asPath
  const currentURL: string = config.baseURL + path

  const [viewport, setViewport] = useState<ViewportType>('width=device-width,initial-scale=1')
  const [colorScheme, setColorScheme] = useState<ColorShemeType>('light dark')
  const { colorMode } = useTheme()

  useEffect(() => {
    const handleResize = (): void => {
      const value: ViewportType = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360'
      if (viewport !== value) setViewport(value)
    }

    window.addEventListener(
      'resize',
      debounce(() => handleResize(), 1000)
    )
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [viewport])

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
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;700&display=swap"
        media="print"
        // @ts-ignore
        onLoad="this.media='all'"
      />
    </Head>
  )
}
