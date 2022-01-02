import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { GlobalStyle } from '~/styles/global'

type MyDocumentProps = {
  styleTags: string
}
export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()

    const page = renderPage(
      (App) => (props) =>
        sheet.collectStyles(
          <>
            <GlobalStyle />
            <App {...props} />
          </>
        )
    )

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    return (
      <Html className="no-js" lang="ja">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net/" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="preload"
            as="style"
            href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css"
          />
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Heebo:wght@600&display=swap" />
          {/*
           * linkタグにonload属性を付与するとエラーが発生するのでそれを防止します
           * https://github.com/vercel/next.js/issues/12984
           */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            </style>
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css"
                media="print"
                onload="this.media='all'"
              />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Heebo:wght@600&display=swap"
                media="print"
                onload="this.media='all'"
              />
            <style>`,
            }}
          />
          <noscript>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo&display=swap" />
          </noscript>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
