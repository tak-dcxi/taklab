import { useEffect } from 'react'

export const useMutationObserver = (
  elements: { current: Node }[],
  callback: (arg0: MutationRecord[]) => void,
  config: MutationObserverInit
) => {
  useEffect(() => {
    const mutationObserver = new MutationObserver((mutations) => {
      mutationObserver.disconnect()
      callback(mutations)
      elements.forEach((element: { current: Node }) => {
        element.current && mutationObserver.observe(element.current, config)
      })
    })

    elements.forEach((element: { current: Node }) => {
      element.current && mutationObserver.observe(element.current, config)
    })

    return () => mutationObserver.disconnect()
  }, [callback, config, elements])
}
