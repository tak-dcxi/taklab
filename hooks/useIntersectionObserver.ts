import { useRef, useState, useEffect } from 'react'
import shallowEqual from 'shallowequal'

/**
 * 任意の要素（DOM）同士の交差を監視します。
 * @param {React.Ref} ref 監視対象となる要素(要useRef)
 * @return {boolean}
 */

export type IntersectionChangeHandler = (entry: IntersectionObserverEntry) => void

export type IntersectionOptions = {
  root?: React.RefObject<Element>
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
  defaultIntersecting?: boolean
}

export const useIntersectionObserver = (
  target: React.RefObject<Element> | Element | null,
  options: IntersectionOptions = {},
  callback?: IntersectionChangeHandler
): boolean => {
  const { defaultIntersecting, once, ...opts } = options
  const optsRef = useRef(opts)
  const [intersecting, setIntersecting] = useState<boolean>(defaultIntersecting === true)
  const intersectedRef = useRef(false)

  useEffect(() => {
    if (!shallowEqual(optsRef.current, opts)) optsRef.current = opts
  }, [opts])

  useEffect(() => {
    if (!target) return

    const element: Element = target instanceof Element ? target : target.current

    if (!element) return

    if (once && intersectedRef.current) return

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const entry: IntersectionObserverEntry = entries[entries.length - 1]

        setIntersecting(entry.isIntersecting)

        if (callback != null) callback(entry)

        if (entry.isIntersecting) intersectedRef.current = true

        if (once && entry.isIntersecting && element != null) observer.disconnect()
      },
      {
        ...optsRef.current,
        root: optsRef.current.root != null ? optsRef.current.root.current : null,
      }
    )

    observer.observe(element)

    return () => {
      if (once && intersectedRef.current) return

      if (element != null) observer.disconnect()
    }
  }, [callback, once, target])

  return intersecting
}
