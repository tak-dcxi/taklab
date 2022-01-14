import styled from 'styled-components'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { SiteSkipLink } from '~/components/SiteSkipLink'

type SiteTemplatePropsType = {
  children: React.ReactNode
}

export const SiteTemplate: React.VFC<SiteTemplatePropsType> = ({ children }) => {
  return (
    <Root>
      <SiteSkipLink />
      <SiteHeader />
      <Main id="main" aria-label="メインコンテンツ" tabIndex={-1}>
        {children}
      </Main>
      <SiteFooter />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: 320px;

  & > * {
    flex-shrink: 0;
  }
`

const Main = styled.main`
  flex-grow: 1;
  overflow-x: hidden;
`
