import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { debounce } from '~/utils/debounce'

type SiteHeadTagsPropsType = {
  title?: string
  description?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

export const SiteHeadTags: React.VFC<SiteHeadTagsPropsType> = ({ title, description, type, noindex }) => {
  const siteName: string = 'Next + WordPress Template'
  const siteDescription: string = 'ここにdescriptionが入ります。'
  const baseURL: string = process.env.BASE_URL
  const currentURL: string = baseURL + useRouter().pathname

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
      <title>{title || siteName}</title>
      <meta name="viewport" content={viewport} />
      <meta name="description" content={description || siteDescription} />
      <meta name="format-detection" content="email=no,telephone=no,address=no" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={currentURL} />
      <meta name="theme-color" content="#333" />
      <meta property="og:type" content={type || 'article'} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:url" content={currentURL} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:site_name" content={title || siteName} />
      <meta property="og:image" content={`${baseURL}/ogp.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
      <script
        dangerouslySetInnerHTML={{
          __html: `
              function loadCDN(src, integrity) {
                var script = document.createElement('script')
                script.src = src
                script.integrity = integrity
                script.crossOrigin = 'anonymous'
                script.defer = true
                document.head.appendChild(script)
              }`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              try {
                document.querySelector(':focus-visible')
              } catch (error) {
                loadCDN(
                  'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
                  'sha384-xRa5B8rCDfdg0npZcxAh+RXswrbFk3g6dlHVeABeluN8EIwdyljz/LqJgc2R3KNA'
                )
              }`,
        }}
      />
    </Head>
  )
}
