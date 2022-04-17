import { ElementType, MutableRefObject, RefCallback } from 'react'
import { AwareComponent, PropsAs } from '../../types/utilities'
import { ElementRect } from '../../types/element-rect'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import renderAs from '../../utils/render-as'
import useMeasure from '../../hooks/use-measure'
import useSyncRefs from '../../hooks/use-sync-ref'

type RectAwareProps = {
  children: (rect: ElementRect, setRef: RefCallback<any>) => JSX.Element
}

type RectAwareComponent = AwareComponent<
  <T extends ElementType = typeof RECT_AWARE_TAG_NAME>(
    props: PropsAs<T, RectAwareProps>
  ) => JSX.Element
>

const RECT_AWARE_TAG_NAME = 'div'
const RECT_AWARE_DISPLAY_NAME = 'RectAware'

// prettier-ignore
/**
 * Returns a container that is aware of its bounding rectangle.
 * 
 * ```tsx
 *  <RectAware as="div" style={{ height: '100%', width: '100%' }}>
 *    {({ width, height }) => `Height: ${height}, width: ${width}`}
 *  </RectAware>
 * ```
 * 
 * Alternatively, you can also render the component as a `Fragment` and attach
 * the ref object directly to one of your own nodes:
 * 
 * ```tsx
 *  <RectAware as={Fragment}>
 *    {({ width, height }, setRef) => (
 *      <div ref={setRef} style={{ height: '100%', width: '100%' }}>
 *        Height: {height}, width: {width}
 *      </div>
 *    )}
 *  </RectAware>
 * ```
 */
export const RectAware: RectAwareComponent = forwardRefWithAs(
  function RectAware<T extends ElementType = typeof RECT_AWARE_TAG_NAME>({
      as: tagName,
      children,
      ...props
    }: PropsAs<T, RectAwareProps>,
    forwardedRef: MutableRefObject<HTMLElement>
  ) {
    const [setMeasuredRef, rect] = useMeasure()
    const setRef = useSyncRefs<Element>(forwardedRef, setMeasuredRef)

    return renderAs({
      displayName: RECT_AWARE_DISPLAY_NAME,
      tagName: tagName || RECT_AWARE_TAG_NAME,
      children: children(rect, setRef),
      props,
      setRef,
    })
  }
)
