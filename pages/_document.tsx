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
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
