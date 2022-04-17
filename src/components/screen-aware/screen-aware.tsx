import { ElementType, ForwardedRef, Fragment, RefCallback } from 'react'
import { AwareComponent, PropsAs } from '../../types/utilities'
import { Breakpoint, IScreen } from '../../types/screen'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import renderAs from '../../utils/render-as'
import useScreen from '../../hooks/use-screen'
import useSyncRefs from '../../hooks/use-sync-ref'

type ScreenAwareProps = {
  breakpoints?: Breakpoint[]
  children: (screen: IScreen, setRef: RefCallback<any>) => JSX.Element
}

type ScreenAwareComponent = AwareComponent<
  <T extends ElementType = typeof SCREEN_AWARE_TAG_NAME>(
    props: PropsAs<T, ScreenAwareProps>
  ) => JSX.Element
>

const SCREEN_AWARE_TAG_NAME = Fragment
const SCREEN_AWARE_DISPLAY_NAME = 'ScreenAware'

// prettier-ignore
/**
 * Implements a component that is aware of the screen size. An array of
 * breakpoints can be specified to get the currently active breakpoint as one of
 * the render function parameters.
 * 
 * By default it renders a `Fragment`. If you want it to render a valid react
 * element, specify a valid value for the `as` prop.
 * 
 * This component is particularly useful if you need to render different screens
 * based on screen width.
 * 
 * ```tsx
 *  <ScreenAware breakpoints={[ ... ]}>
 *    {({ width, height, breakpoint: { name } }, setRef) => (
 *      <div ref={setRef}>
 *        Width: {width}, height: {height}, breakpoint: {name}
 *      </div>
 *    )}
 *  </ScreenAware>
 * ```
 */
export const ScreenAware: ScreenAwareComponent = forwardRefWithAs(
  function ScreenAware<T extends ElementType = typeof SCREEN_AWARE_TAG_NAME>({
      as: tagName,
      breakpoints,
      children,
      ...props
    }: PropsAs<T, ScreenAwareProps>,
    forwardedRef: ForwardedRef<Element>
  ) {
    const setRef = useSyncRefs(forwardedRef)
    const screen = useScreen({ breakpoints })

    return renderAs({
      displayName: SCREEN_AWARE_DISPLAY_NAME,
      tagName: tagName || SCREEN_AWARE_TAG_NAME,
      children: children(screen, setRef),
      props,
      setRef,
    })
  }
)
