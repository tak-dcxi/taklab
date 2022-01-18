import React from 'react'
import Script from 'next/script'
import { existsGaId, GA_ID } from '~/libs/gtag'

export const SiteScriptTags: React.VFC = () => {
  return (
    <>
      {existsGaId && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
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
    </>
  )
}
