import { useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { existsGaId, GA_ID, pageview } from '~/libs/gtag'

export const usePageView = (): void => {
  const router: NextRouter = useRouter()

  console.log(GA_ID)

  useEffect(() => {
    if (!existsGaId) return

    const handleRouteChange = (path: string, { shallow }): void => {
      if (!shallow) pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
