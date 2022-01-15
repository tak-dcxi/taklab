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

type SiteDrawerBodyPropsType = {
  expanded: boolean
  opener: { current: HTMLButtonElement }
  onClose: () => void
}

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
        <Root
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="折りたたみメニュー"
          tabIndex={-1}
          data-drawer-transition={expanded ? 'enter' : 'exit'}
        >
          <Container>
            <Contents>
              <List>
                {menu.map((item: MenuType, index: number) => {
                  const isBlogPage = /\/blog\/.+$/.test(asPath) || item.path === asPath

                  return (
                    <li key={index}>
                      <Link href={item.path} passHref>
                        {item.id === 'blog' ? (
                          <MyLink onClick={() => onClose()} {...(isBlogPage && { 'aria-current': 'page' })}>
                            <PrimaryLabel style={{ textTransform: 'uppercase' }} lang="en" translate="no">
                              {item.title}
                            </PrimaryLabel>
                            <SecondaryLabel>{item.subtitle}</SecondaryLabel>
                          </MyLink>
                        ) : (
                          <MyLink onClick={() => onClose()} {...(item.path === asPath && { 'aria-current': 'page' })}>
                            <PrimaryLabel style={{ textTransform: 'uppercase' }} lang="en" translate="no">
                              {item.title}
                            </PrimaryLabel>
                            <SecondaryLabel>{item.subtitle}</SecondaryLabel>
                          </MyLink>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </List>
              <GroupList>
                <dt>Follow Me</dt>
                <dd>
                  <SocialLink href={social.twitter.url} translate="no">
                    <BaseSocialIcon type="twitter" size={20} presentation />
                    Twitter
                  </SocialLink>
                </dd>
                <dd>
                  <SocialLink href={social.zenn.url} translate="no">
                    <BaseSocialIcon type="zenn" size={20} presentation />
                    Zenn
                  </SocialLink>
                </dd>
                <dd>
                  <SocialLink href={social.note.url} translate="no">
                    <BaseSocialIcon type="note" size={20} presentation />
                    note
                  </SocialLink>
                </dd>
                <dd>
                  <SocialLink href={social.rss.url} translate="no">
                    <BaseSocialIcon type="rss" size={20} presentation />
                    RSS
                  </SocialLink>
                </dd>
              </GroupList>
              <ThemeTogglerWrapper>
                <ThemeToggler
                  type="button"
                  title={`現在のテーマは${colorMode === 'dark' ? 'ダークモード' : 'ライトモード'}です`}
                  onClick={setColorMode}
                >
                  <ThemeIcon iconType={colorMode === 'dark' ? 'dark' : 'light'}>
                    <span>
                      <BaseIcon type="sun" size={`${20 / 16}rem`} />
                      <BaseIcon type="moon" size={`${20 / 16}rem`} />
                    </span>
                  </ThemeIcon>
                  Theme
                </ThemeToggler>
              </ThemeTogglerWrapper>
            </Contents>
            <ButtonWrapper>
              <SiteDrawerButton type="close" onClick={handleClose} />
            </ButtonWrapper>
          </Container>
          <Overlay onClick={handleClose} />
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

const enterMenu = keyframes`
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
`

const exitMenu = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
`

const Container = styled.div`
  animation-duration: ${duration}ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
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

  [data-drawer-transition='enter'] & {
    animation-name: ${enterMenu};
  }

  [data-drawer-transition='exit'] & {
    animation-name: ${exitMenu};
  }
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

const MyLink = styled.a`
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
  font-family: var(--font-montserrat);
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
  font-family: var(--font-montserrat);

  & > dt {
    padding: 16px 24px;
    text-transform: uppercase;
  }

  & > dd {
    border-top: 1px dashed var(--theme-drawer-divider);
  }
`

const SocialLink = styled.a`
  align-items: center;
  display: flex;
  padding: 16px 24px;
  position: relative;
  transition: background-color 0.3s;

  & > svg {
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
  font-family: var(--font-montserrat);
  padding: 16px 24px;
  text-transform: uppercase;
  transition: background-color 0.3s;
  width: 100%;

  ${hoverable(`
    background-color: var(--color-grayscale-5);
  `)}
`

const ThemeIcon = styled.span<{ iconType: 'dark' | 'light' }>`
  display: inline-block;
  height: ${20 / 16}em;
  margin-right: 1em;
  overflow: hidden;
  width: ${20 / 16}em;

  & > span {
    display: block;
    transition: transform 0.3s ease-out;
  }

  & svg {
    display: block;
    height: ${20 / 16}em;
    width: ${20 / 16}em;
  }

  ${(props) =>
    props.iconType === 'dark' &&
    css`
      & > span {
        transform: translateY(${(20 / 16) * -1}em);
      }
    `}
`

const enterOverlay = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const exitOverlay = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const Overlay = styled.div`
  animation-duration: ${duration}ms;
  animation-fill-mode: forwards;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  [data-drawer-transition='enter'] & {
    animation-name: ${enterOverlay};
  }

  [data-drawer-transition='exit'] & {
    animation-name: ${exitOverlay};
  }
`
