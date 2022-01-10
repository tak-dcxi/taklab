import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { Transition } from 'react-transition-group'
import { menu } from '~/constant/menu'
import { social } from '~/constant/social'
import { switchTheme } from '~/libs/theme'
import { useGetCurrentThemeState } from '~/hooks/useGetCurrentThemeState'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from '~/components/BaseIcon'
import { BaseSocialIcon } from '~/components/BaseSocialIcon'
import { SiteDrawerButton } from '~/components/SiteDrawerToggler'

type SiteDrawerBodyPropsType = {
  expanded: boolean
  opener: { current: HTMLButtonElement }
  onClose: () => void
}

const duration: number = 400

export const SiteDrawerBody = React.forwardRef(
  ({ expanded, opener, onClose }: SiteDrawerBodyPropsType, ref: { current: HTMLDivElement }) => {
    const { asPath } = useRouter()
    const { currentTheme, getCurrentThemeState } = useGetCurrentThemeState()

    const handleTogglerClick = () => {
      switchTheme()
      getCurrentThemeState()
    }

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
        <MyRoot
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="折りたたみメニュー"
          tabIndex={-1}
          data-drawer-transition={expanded ? 'enter' : 'exit'}
        >
          <MyContainer>
            <MyContents>
              <MyList>
                {menu.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={item.path} passHref>
                        <MyLink onClick={() => onClose()} {...(item.path === asPath && { 'aria-current': 'page' })}>
                          <MyPrimaryLabel style={{ textTransform: 'uppercase' }} lang="en" translate="no">
                            {item.title}
                          </MyPrimaryLabel>
                          <MySecondaryLabel>{item.subtitle}</MySecondaryLabel>
                        </MyLink>
                      </Link>
                    </li>
                  )
                })}
              </MyList>
              <MyGroupList>
                <dt>Follow Me</dt>
                <dd>
                  <MySocialLink href={social.twitter.url} translate="no">
                    <BaseSocialIcon type="twitter" size={20} presentation />
                    Twitter
                  </MySocialLink>
                </dd>
                <dd>
                  <MySocialLink href={social.zenn.url} translate="no">
                    <BaseSocialIcon type="zenn" size={20} presentation />
                    Zenn
                  </MySocialLink>
                </dd>
                <dd>
                  <MySocialLink href={social.note.url} translate="no">
                    <BaseSocialIcon type="note" size={20} presentation />
                    note
                  </MySocialLink>
                </dd>
                <dd>
                  <MySocialLink href={social.rss.url} translate="no">
                    <BaseSocialIcon type="rss" size={20} presentation />
                    RSS
                  </MySocialLink>
                </dd>
              </MyGroupList>
              <MyThemeTogglerWrapper>
                <MyThemeToggler
                  type="button"
                  title={`現在のテーマは${currentTheme === 'dark' ? 'ダークモード' : 'ライトモード'}です`}
                  onClick={handleTogglerClick}
                >
                  {currentTheme === 'dark' ? <BaseIcon type="moon" size={20} /> : <BaseIcon type="sun" size={20} />}
                  Theme
                </MyThemeToggler>
              </MyThemeTogglerWrapper>
            </MyContents>
            <MyButtonWrapper>
              <SiteDrawerButton type="close" onClick={handleClose} />
            </MyButtonWrapper>
          </MyContainer>
          <MyOverlay onClick={handleClose} />
        </MyRoot>
      </Transition>,
      document.body
    )
  }
)

const MyRoot = styled.div`
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

const MyContainer = styled.div`
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
  width: max(280px, min(14.537rem + 14.8148vw, 440px));
  z-index: 1;

  [data-drawer-transition='enter'] & {
    animation-name: ${enterMenu};
  }

  [data-drawer-transition='exit'] & {
    animation-name: ${exitMenu};
  }
`

const MyContents = styled.div`
  flex: 1;
  overflow-y: auto;
`

const MyList = styled.ul`
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
      border-right: 2px solid var(--theme-text-weak);
      border-top: 2px solid var(--theme-text-weak);
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

const MyPrimaryLabel = styled.span`
  display: block;
  font-family: var(--font-montserrat);
`

const MySecondaryLabel = styled.span`
  color: var(--theme-text-weak);
  display: block;
  font-size: max(var(--fontsize-1), 10px);
`

const MyButtonWrapper = styled.div`
  border-bottom: var(--theme-drawer-divider) 1px solid;
  display: flex;
  justify-content: flex-end;
  order: -1;
`

const MyGroupList = styled.dl`
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

const MySocialLink = styled.a`
  align-items: center;
  display: flex;
  padding: 16px 24px;
  position: relative;
  transition: background-color 0.3s;

  & > svg {
    margin-right: 1em;
  }

  &::after {
    border-right: 2px solid var(--theme-text-weak);
    border-top: 2px solid var(--theme-text-weak);
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

const MyThemeTogglerWrapper = styled.p`
  border-bottom: 2px solid var(--theme-drawer-divider);
`

const MyThemeToggler = styled.button`
  align-items: center;
  display: flex;
  font-family: var(--font-montserrat);
  padding: 16px 24px;
  text-transform: uppercase;
  transition: background-color 0.3s;
  width: 100%;

  & > svg {
    margin-right: 1em;
  }

  ${hoverable(`
    background-color: var(--color-grayscale-5);
  `)}
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

const MyOverlay = styled.div`
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
