import styled from 'styled-components'
import { SiteNavbar } from '~/components/SIteNavbar'
import { SiteFooter } from '~/components/SiteFooter'
import { SiteSkipLink } from '~/components/SiteSkipLink'

type SiteStructureTemplatePropsType = {
  children: React.ReactNode
}

export const SiteStructureTemplate: React.VFC<SiteStructureTemplatePropsType> = ({ children }) => {
  return (
    <Root>
      <SiteSkipLink />
      <SiteNavbar />
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
