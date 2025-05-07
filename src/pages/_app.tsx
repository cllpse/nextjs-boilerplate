import "../legacy/styles/global.css"
import "@new/Chart/internal/styles.css"
import React, { ReactNode } from "react"
import { ThemeProvider } from "@emotion/react"
import NProgress from "nprogress"
import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles"
import "sweetalert2/dist/sweetalert2.css"
import Layout from "../legacy/components/layout/layout"
import { MUI_THEME, THEME } from "../legacy/styles/theme"
import createEmotionCache from "../legacy/styles/createEmotionCache"
import { CacheProvider, EmotionCache } from "@emotion/react"
import { AppProps } from "next/app"

import "ka-table/style.css"

const clientSideEmotionCache = createEmotionCache()

// eslint-disable-next-line
const handleRouteChangeStart = (path, { shallow }) => {
  NProgress.start()
}

const handleRouteChangeComplete = (path, { shallow }) => {
  NProgress.done()
}

// eslint-disable-next-line
const handlerouteChangeError = err => {
  NProgress.done()
}

interface MainAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const ThemeContexts = ({
  emotionCache,
  muiTheme,
  children,
}: {
  emotionCache: EmotionCache
  muiTheme?: Theme
  children: ReactNode
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider
        // @ts-expect-error
        theme={muiTheme}
      >
        <ThemeProvider theme={THEME}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </CacheProvider>
  )
}

const GeneralContexts = ({ children }: { children: ReactNode }) => {
  //Note: Try to always place modalprovider at top level, so it has access to the data from the other contexts
  return (

                              children

  )
}

const MainApp = (props: MainAppProps) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props
  return (

    <ThemeContexts emotionCache={emotionCache} muiTheme={MUI_THEME}>
      <GeneralContexts>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GeneralContexts>
    </ThemeContexts>
  )
}

export default MainApp
