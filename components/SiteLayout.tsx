import styled from 'styled-components'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'

type SiteLayoutPropsType = {
  children: React.ReactNode
}

export const SiteLayout: React.VFC<SiteLayoutPropsType> = ({ children }) => {
  return (
    <MyWrapper>
      <SiteHeader />
      <MyMain aria-label="メインコンテンツ">{children}</MyMain>
      <SiteFooter />
    </MyWrapper>
  )
}

const MyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 320px;

  & > * {
    flex-shrink: 0;
  }
`

const MyMain = styled.main`
  flex-grow: 1;
  overflow-x: hidden;
`
