import React from 'react'
import styled from 'styled-components'

export const SiteAdSence: React.VFC = () => {
  return <Wrapper aria-label="Sponsored Link"></Wrapper>
}

const Wrapper = styled.aside`
  background-color: var(--theme-background-strong);
  border: 1px solid var(--theme-divider);
  isolation: isolate;
  margin-left: auto;
  margin-right: auto;
  max-width: ${360 / 16}rem;
  padding: 12px;
  position: relative;

  &::after {
    align-items: center;
    bottom: 0;
    color: var(--theme-text-muted);
    content: attr(aria-label) '';
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`
