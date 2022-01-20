import { NextRouter, useRouter } from 'next/router'
import { createContext, useCallback, useContext, useState } from 'react'

type HeaderIntersectionObserveContextType = {
  intersecting: boolean
  setIntersecting: (interesting: boolean) => void
}

const defaultContext: HeaderIntersectionObserveContextType = {
  intersecting: false,
  setIntersecting: () => {},
}

const HeaderIntersectionObserveContext: React.Context<HeaderIntersectionObserveContextType> =
  createContext<HeaderIntersectionObserveContextType>(defaultContext)

type HeaderIntersectionObserveProviderPropsType = {
  children: React.ReactNode
}

export const HeaderIntersectionObserveProvider: React.VFC<HeaderIntersectionObserveProviderPropsType> = ({
  children,
}) => {
  const router: NextRouter = useRouter()
  const path: string = router.asPath
  const [value, setValue] = useState<boolean>(path === '/')

  const setIntersecting = useCallback((current: boolean): void => {
    setValue(current)
  }, [])

  const intersecting: boolean = value

  return (
    <HeaderIntersectionObserveContext.Provider
      value={{
        intersecting,
        setIntersecting,
      }}
    >
      {children}
    </HeaderIntersectionObserveContext.Provider>
  )
}

export const useHeaderIntersectionObserve = () => useContext(HeaderIntersectionObserveContext)
