import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { GetStaticProps } from "next"
import { SITE_LINKS } from "src/components/routing/routes"

const LandingPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      router.replace(SITE_LINKS.COMPANY_MANAGER.HOME.GET_STARTED)
    }
  }, [router])

  return <div />
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

export default LandingPage
