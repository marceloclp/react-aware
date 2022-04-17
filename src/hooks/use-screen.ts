import { useEffect, useState as useRAFState } from 'react'
import { Breakpoint, IScreen } from '../types/screen'
import { IS_BROWSER } from '../config/constants'

const defaultBreakpoint: Breakpoint = { name: '___', min: 0 }

const defaultScreen: IScreen = {
  width: Infinity,
  height: Infinity,
  breakpoint: defaultBreakpoint,
}

const findBreakpoint = (width: number, breakpoints: Breakpoint[]) => {
  const breakpoint = breakpoints
    // Sort in descending order.
    .sort(({ min: minA }, { min: minB }) => {
      if (minA > minB) return -1
      if (minB < minA) return 1
      else return 0
    })
    // Find the smallest breakpoint that fits the criteria.
    .find(({ min, max = Infinity }) => {
      return width >= min && width < max
    })
  return breakpoint || defaultBreakpoint
}

const getScreen = (breakpoints: Breakpoint[]): IScreen => {
  if (!IS_BROWSER) return defaultScreen
  const width = window.innerWidth
  const height = window.innerHeight
  return { width, height, breakpoint: findBreakpoint(width, breakpoints) }
}

const useScreen = ({ breakpoints = [] }: { breakpoints?: Breakpoint[] }) => {
  const [screen, setScreen] = useRAFState(() => getScreen(breakpoints))

  useEffect(() => {
    if (!IS_BROWSER) return
    const onResize = () => setScreen(getScreen(breakpoints))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoints])

  return screen
}

export default useScreen
