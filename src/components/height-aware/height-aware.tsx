import { ElementType, RefCallback, RefObject } from 'react'
import { AwareComponent, EqualityFn, PropsAs } from '../../types/utilities'
import { ElementRect } from '../../types/element-rect'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import renderAs from '../../utils/render-as'
import useMeasure from '../../hooks/use-measure'
import useSyncRefs from '../../hooks/use-sync-ref'

type HeightAwareProps = {
  children: (height: number, setRef: RefCallback<any>) => JSX.Element
}

type HeightAwareComponent = AwareComponent<
  <T extends ElementType = typeof HEIGHT_AWARE_TAG_NAME>(
    props: PropsAs<T, HeightAwareProps>
  ) => JSX.Element
>

const HEIGHT_AWARE_TAG_NAME = 'div'
const HEIGHT_AWARE_DISPLAY_NAME = 'HeightAware'

const equalityFn: EqualityFn<ElementRect> = (prev, next) =>
  prev.height === next.height

// prettier-ignore
/**
 * A slimmed down version of the `RectAware` component that will only trigger
 * updates when its height changes.
 * 
 * Returns a container that is aware of its bounding rectangle height.
 * 
 * ```tsx
 *  <div style={{ display: 'flex', flexDirection: 'column' }}>
 *    <HeightAware as="div" style={{ flexGrow: 1 }}>
 *      {(height) => <div style={getScrollableStyle(height)} />}
 *    </HeightAware>
 *  </div>
 * ```
 */
export const HeightAware: HeightAwareComponent = forwardRefWithAs(
  function HeightAware<T extends ElementType = typeof HEIGHT_AWARE_TAG_NAME>({
      as: tagName,
      children,
      ...props
    }: PropsAs<T, HeightAwareProps>,
    forwardedRef: RefObject<Element>
  ) {
    const [setMeasuredRef, { height }] = useMeasure({ equalityFn })
    const setRef = useSyncRefs<Element>(forwardedRef, setMeasuredRef)

    return renderAs({
      displayName: HEIGHT_AWARE_DISPLAY_NAME,
      tagName: tagName || HEIGHT_AWARE_TAG_NAME,
      children: children(height, setRef),
      props,
      setRef,
    })
  }
)
