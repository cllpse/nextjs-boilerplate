import React, { ReactNode } from "react"
import Head from "next/head"
import styled from "@emotion/styled"

const ContentWithNewLayout = styled.div`
  min-height: calc(100vh + 90px);
`

const HeaderFooterContainer = ({ children }: { children: ReactNode }) => {
  return (
    <ContentWithNewLayout>{children}</ContentWithNewLayout>
  )
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeaderFooterContainer>{children}</HeaderFooterContainer>
    </div>
  )
}

export default Layout
