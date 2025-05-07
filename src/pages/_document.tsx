import React from "react"
//Adding this as it seems NextJS throws an error below during linting, as this file is a UploadExcelAccordion.tsx file and not .js
/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document"
import createEmotionServer from "@emotion/server/create-instance"
import { MUI_THEME } from "../legacy/styles/theme"
import createEmotionCache from "../legacy/styles/createEmotionCache"

export default class MainDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={MUI_THEME.palette.primary.main} />

        <Head>


          {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" /> */}

          {/* eslint-disable */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />


          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          // @ts-expect-error
          crossOrigin="true"
          />

          <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            //@ts-ignore
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap"
            rel="stylesheet"
          ></link>
          {/* eslint-disable */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MainDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()

  const { extractCriticalToChunks } = createEmotionServer(cache)


  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => props => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <App emotionCache={cache} {...props} />
      ),
    })
  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))
  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
}
