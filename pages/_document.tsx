import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { GlobalStyle } from '~/styles/global'

export default class MyDocument extends Document {
  googleFontsId = 'myGoogleFonts'

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <GlobalStyle />
                <App {...props} />
              </>
            ),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ja" data-js="false">
        <Head prefix="og: http://ogp.me/ns#">
          {/* Next.jsでは外部スタイルシートは_document.jsの中でリンクするのが推奨されている */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;700&display=swap"
          />
          <link
            id={this.googleFontsId}
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;700&display=swap"
            media="print"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
