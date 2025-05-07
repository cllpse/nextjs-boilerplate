import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { GetStaticProps } from "next"

const LandingPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      router.replace("/component-examples")
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
