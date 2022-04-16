import { useEffect, useLayoutEffect } from 'react'
import { IS_BROWSER } from '../config/constants'

/**
 * `useLayoutEffect` that does not show warning when server-side rendering.
 */
const useIsomorphicLayoutEffect = IS_BROWSER ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
