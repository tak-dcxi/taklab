import styled from 'styled-components'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { SiteSkipLink } from '~/components/SiteSkipLink'

type SiteStructureTemplatePropsType = {
  children: React.ReactNode
}

export const SiteStructureTemplate: React.VFC<SiteStructureTemplatePropsType> = ({ children }) => {
  const mainTagId = 'main'

  return (
    <Root>
      <SiteSkipLink />
      <SiteHeader />
      <Main id={mainTagId} aria-label="メインコンテンツ" tabIndex={-1}>
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
