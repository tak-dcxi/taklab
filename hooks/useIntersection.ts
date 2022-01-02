import React, { useState, useEffect } from 'react'

/**
 * 任意の要素（DOM）同士の交差を監視します。
 * @param {React.Ref} ref 監視対象となる要素(要useRef)
 * @return {boolean}
 */

export const useIntersection = (ref: { current: HTMLElement }): boolean => {
  const [intersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref])

  return intersecting
}
