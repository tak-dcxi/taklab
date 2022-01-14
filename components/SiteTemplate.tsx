import styled from 'styled-components'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { SiteSkipLink } from '~/components/SiteSkipLink'

type SiteTemplatePropsType = {
  children: React.ReactNode
}

export const SiteTemplate: React.VFC<SiteTemplatePropsType> = ({ children }) => {
  return (
    <MyRoot>
      <SiteSkipLink />
      <SiteHeader />
      <MyMain id="main" aria-label="メインコンテンツ" tabIndex={-1}>
        {children}
      </MyMain>
      <SiteFooter />
    </MyRoot>
  )
}

const MyRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: 320px;

  & > * {
    flex-shrink: 0;
  }
`

const MyMain = styled.main`
  flex-grow: 1;
  overflow-x: hidden;
`
