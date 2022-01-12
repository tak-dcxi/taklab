import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { meta } from '~/constant/meta'
import { debounce } from 'lodash'

type SiteHeadTagsPropsType = {
  title?: string
  description?: string
  image?: string
  isErrorPage?: boolean
}

export const SiteHeadTags: React.VFC<SiteHeadTagsPropsType> = ({
  title = meta.siteName,
  description = meta.description,
  image = `${meta.baseURL}/ogp.png`,
  isErrorPage,
}) => {
  const router: NextRouter = useRouter()
  const path: string = router.asPath
  const currentURL: string = meta.baseURL + path
  const [viewport, setViewport] = useState<string>('width=device-width,initial-scale=1')

  useEffect(() => {
    const handleResize = (): void => {
      const value: string = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360'
      if (viewport !== value) setViewport(value)
    }

    window.addEventListener(
      'resize',
      debounce(() => handleResize())
    )
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [viewport])

  return (
    <Head>
      <title>{title}</title>
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
          <meta property="og:site_name" content={meta.siteName} />
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

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap"
        media="print"
        // @ts-ignore
        onLoad="this.media='all'"
      />
      <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" />
      </noscript>
    </Head>
  )
}
