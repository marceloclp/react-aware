import { ElementType, ForwardedRef, MutableRefObject } from 'react'
import {
  AwareComponent,
  ElementRect,
  EqualityFn,
  PropsAs,
} from '../../types/utilities'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import renderAs from '../../utils/render-as'
import useMeasure from '../../hooks/use-measure'
import useSyncRefs from '../../hooks/use-sync-ref'

export type HeightAwareProps = {
  children: (height: number, ref: ForwardedRef<Element>) => JSX.Element
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
    forwardedRef: MutableRefObject<HTMLElement>
  ) {
    const [setMeasuredRef, { height }] = useMeasure({ equalityFn })
    const ref = useSyncRefs<Element, true>(forwardedRef, setMeasuredRef)

    return renderAs({
      displayName: HEIGHT_AWARE_DISPLAY_NAME,
      tagName: tagName || HEIGHT_AWARE_TAG_NAME,
      render: () => children(height, ref),
      props,
      ref,
    })
  }
)
