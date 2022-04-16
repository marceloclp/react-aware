import { useLayoutEffect, useMemo, useState } from 'react'
import { IS_BROWSER } from '../config/constants'
import { ElementRect } from '../types/utilities'

export type UseMeasureOptions = {
  equalityFn?: (prevRect: ElementRect, nextRect: ElementRect) => boolean
}

const defaultRect: ElementRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

/**
 * React sensor hook that tracks dimensions of an HTML element using the
 * `Resize Observer` API.
 *
 * @see https://github.com/streamich/react-use/blob/master/docs/useMeasure.md
 */
const useBrowserMeasure = ({ equalityFn }: UseMeasureOptions = {}) => {
  const [element, setRef] = useState<HTMLElement | null>(null)
  const [rect, setRect] = useState(defaultRect)

  const observer = useMemo(() => {
    return new (window as any).ResizeObserver((entries: any) => {
      if (!entries[0]) return
      const { contentRect: currRect } = entries[0]
      const nextRect = {
        x: currRect.x,
        y: currRect.y,
        width: currRect.width,
        height: currRect.height,
        top: currRect.top,
        right: currRect.right,
        bottom: currRect.bottom,
        left: currRect.left,
      }
      setRect((prevRect) => {
        if (equalityFn?.(prevRect, nextRect)) return prevRect
        return nextRect
      })
    })
  }, [])

  useLayoutEffect(() => {
    if (!element) return
    observer.observe(element)
    return () => observer.disconnect()
  }, [element])

  return [setRef, rect] as const
}

const useMeasure: typeof useBrowserMeasure = IS_BROWSER
  ? useBrowserMeasure
  : () => [() => undefined, defaultRect]

export default useMeasure
