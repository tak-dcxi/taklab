import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import styled, { css, keyframes } from 'styled-components'
import { Transition } from 'react-transition-group'
import { menu, MenuType } from '~/constant/menu'
import { social } from '~/constant/social'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from '~/components/BaseIcon'
import { BaseSocialIcon } from '~/components/BaseSocialIcon'
import { SiteDrawerButton } from '~/components/SiteDrawerToggler'
import { useTheme } from '~/context/ThemeProvider'
import { clamp } from '~/styles/tools/clamp'
import { fadeIn, fadeOut, slideInRight, slideOutRight } from '~/styles/settings/keyframes'

type CommonPropsType = {
  expanded: boolean
}

type SiteDrawerBodyPropsType = {
  opener: { current: HTMLButtonElement }
  onClose: () => void
} & CommonPropsType

const duration: number = 400

export const SiteDrawerBody = React.forwardRef(
  ({ expanded, opener, onClose }: SiteDrawerBodyPropsType, ref: { current: HTMLDivElement }) => {
    const { asPath } = useRouter()
    const { colorMode, setColorMode } = useTheme()

    const handleClose = async () => {
      await new Promise<void>((resolve) => {
        onClose()
        resolve()
      })

      if (opener.current) {
        opener.current.focus()
        try {
          document.querySelector(':focus-visible')
        } catch (error) {
          opener.current.classList.add('js-focus-visible')
        }
      } else {
        const focusTarget = document.getElementById('menu')
        if (!focusTarget) return
        focusTarget?.focus()
      }
    }

    // inert属性は現在Reactでサポートされていないため、refを通して指定します
    useEffect(() => {
      if (!ref.current) return
      expanded ? ref.current.removeAttribute('inert') : ref.current.setAttribute('inert', '')
    }, [ref, expanded])

    if (!process.browser) return

    return createPortal(
      <Transition in={expanded} timeout={duration} unmountOnExit nodeRef={ref}>
        <Root ref={ref} role="dialog" aria-modal="true" aria-label="折りたたみメニュー" tabIndex={-1}>
          <Container {...{ expanded }}>
            <Contents>
              <List>
                {menu.map((item: MenuType, index: number) => {
                  const isBlogPage = /\/blog\/.+$/.test(asPath) || item.path === asPath

                  return (
                    <li key={index}>
                      {item.id === 'blog' ? (
                        <MyLink
                          href={item.path}
                          passHref
                          onClick={() => onClose()}
                          {...(isBlogPage && { 'aria-current': 'page' })}
                        >
                          <PrimaryLabel style={{ textTransform: 'uppercase' }} lang="en" translate="no">
                            {item.title}
                          </PrimaryLabel>
                          <SecondaryLabel>{item.subtitle}</SecondaryLabel>
                        </MyLink>
                      ) : (
                        <MyLink
                          href={item.path}
                          passHref
                          onClick={() => onClose()}
                          {...(item.path === asPath && { 'aria-current': 'page' })}
                        >
                          <PrimaryLabel style={{ textTransform: 'uppercase' }} lang="en" translate="no">
                            {item.title}
                          </PrimaryLabel>
                          <SecondaryLabel>{item.subtitle}</SecondaryLabel>
                        </MyLink>
                      )}
                    </li>
                  )
                })}
              </List>
              <GroupList>
                <GroupListTitle>Follow Me</GroupListTitle>
                <GroupListItem>
                  <SocialLink href={social.twitter.url} translate="no">
                    <BaseSocialIcon type="twitter" size={20} presentation />
                    Twitter
                  </SocialLink>
                </GroupListItem>
                <GroupListItem>
                  <SocialLink href={social.zenn.url} translate="no">
                    <BaseSocialIcon type="zenn" size={20} presentation />
                    Zenn
                  </SocialLink>
                </GroupListItem>
                <GroupListItem>
                  <SocialLink href={social.note.url} translate="no">
                    <BaseSocialIcon type="note" size={20} presentation />
                    note
                  </SocialLink>
                </GroupListItem>
                <GroupListItem>
                  <SocialLink href={social.rss.url} translate="no">
                    <BaseSocialIcon type="rss" size={20} presentation />
                    RSS
                  </SocialLink>
                </GroupListItem>
              </GroupList>
              <ThemeTogglerWrapper>
                <ThemeToggler
                  type="button"
                  title={`現在のテーマは${colorMode === 'dark' ? 'ダークモード' : 'ライトモード'}です`}
                  onClick={setColorMode}
                >
                  <ThemeIconWrapper>
                    <ThemeIcon current={colorMode === 'dark' ? 'dark' : 'light'}>
                      <BaseIcon type="sun" size={`${20 / 16}rem`} />
                      <BaseIcon type="moon" size={`${20 / 16}rem`} />
                    </ThemeIcon>
                  </ThemeIconWrapper>
                  Theme
                </ThemeToggler>
              </ThemeTogglerWrapper>
            </Contents>
            <ButtonWrapper>
              <SiteDrawerButton type="close" onClick={handleClose} />
            </ButtonWrapper>
          </Container>
          <Overlay onClick={handleClose} {...{ expanded }} />
        </Root>
      </Transition>,
      document.body
    )
  }
)

const Root = styled.div`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
`

const Container = styled.div<CommonPropsType>`
  animation: ${(props) => (props.expanded ? slideInRight : slideOutRight)} ${duration}ms ease-out both;
  background-color: var(--theme-drawer-background);
  bottom: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  width: ${clamp(280, 440)};
  z-index: 1;
`

const Contents = styled.div`
  flex: 1;
  overflow-y: auto;
`

const List = styled.ul`
  border-bottom: 2px solid var(--theme-drawer-divider);

  & > li + li {
    border-top: 1px dashed var(--theme-drawer-divider);
  }
`

const MyLink = styled(Link)`
  display: block;
  letter-spacing: 0.01em;
  padding: 12px 30px 12px 24px;
  position: relative;

  &[aria-current] {
    background-color: var(--theme-drawer-current);
  }

  &:not([aria-current]) {
    transition: background-color 0.3s;

    &::after {
      border-right: 2px solid var(--theme-text-muted);
      border-top: 2px solid var(--theme-text-muted);
      bottom: 0;
      content: '';
      display: inline-block;
      height: max(8px, 0.5em);
      margin: auto 0;
      position: absolute;
      right: 24px;
      top: 0;
      transform: rotate(45deg);
      width: max(8px, 0.5em);
    }

    ${hoverable(`
      background-color: var(--color-grayscale-5);
    `)}
  }
`

const PrimaryLabel = styled.span`
  display: block;
  font-family: var(--font-designed);
`

const SecondaryLabel = styled.span`
  color: var(--theme-text-muted);
  display: block;
  font-size: max(var(--fontsize-1), 10px);
`

const ButtonWrapper = styled.div`
  border-bottom: var(--theme-drawer-divider) 1px solid;
  display: flex;
  justify-content: flex-end;
  order: -1;
`

const GroupList = styled.dl`
  border-bottom: 2px solid var(--theme-drawer-divider);
  font-family: var(--font-designed);
`

const GroupListTitle = styled.dt`
  padding: 16px 24px;
  text-transform: uppercase;
`

const GroupListItem = styled.dd`
  border-top: 1px dashed var(--theme-drawer-divider);
`

const SocialLink = styled.a`
  align-items: center;
  display: flex;
  padding: 16px 24px;
  position: relative;
  transition: background-color 0.3s;

  & .BaseSocialIcon {
    margin-right: 1em;
  }

  &::after {
    border-right: 2px solid var(--theme-text-muted);
    border-top: 2px solid var(--theme-text-muted);
    bottom: 0;
    content: '';
    display: inline-block;
    height: max(8px, 0.5em);
    margin: auto 0;
    position: absolute;
    right: 24px;
    top: 0;
    transform: rotate(45deg);
    width: max(8px, 0.5em);
  }

  ${hoverable(`
    background-color: var(--color-grayscale-5);
  `)}
`

const ThemeTogglerWrapper = styled.p`
  border-bottom: 2px solid var(--theme-drawer-divider);
`

const ThemeToggler = styled.button`
  align-items: center;
  display: flex;
  font-family: var(--font-designed);
  padding: 16px 24px;
  text-transform: uppercase;
  transition: background-color 0.3s;
  width: 100%;

  ${hoverable(`
    background-color: var(--color-grayscale-5);
  `)}
`

const ThemeIconWrapper = styled.span`
  display: inline-block;
  height: ${20 / 16}em;
  margin-right: 1em;
  overflow: hidden;
  width: ${20 / 16}em;
`

const ThemeIcon = styled.span<{ current: 'dark' | 'light' }>`
  display: block;
  transition: transform 0.3s ease-out;

  & .BaseIcon {
    display: block;
  }

  ${(props) =>
    props.current === 'dark' &&
    css`
      transform: translateY(${(20 / 16) * -1}em);
    `}
`

const Overlay = styled.div<CommonPropsType>`
  animation: ${(props) => (props.expanded ? fadeIn : fadeOut)} ${duration}ms both;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`
