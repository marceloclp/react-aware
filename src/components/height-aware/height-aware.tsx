import React, { CSSProperties, ElementType, MutableRefObject } from 'react'
import useMeasure from '../../hooks/use-measure'
import useSyncRefs from '../../hooks/use-sync-ref'
import { UseMeasureOptions } from '../../hooks/use-measure'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import { PropsAs, RenderFn } from '../../types/utilities'

const equalityFn: UseMeasureOptions['equalityFn'] = (prev, next) =>
  prev.height === next.height

/**
 * Helper utility that returns a `CSSProperties` object where `height` and
 * `max-height` are both set to the specified value.
 *
 * Mostly useful when you need to create a component with a fixed height.
 */
export const getEnforcedHeightStyle = (height: number): CSSProperties => ({
  height: `${height}px`,
  maxHeight: `${height}px`
})

/**
 * Helper utility that returns a `CSSProperties` object with the `height`,
 * `max-height` and `overflow` properties set to allow scrolling within the
 * styled container.
 */
export const getScrollableStyle = (height: number): CSSProperties => ({
  ...getEnforcedHeightStyle(height),
  overflow: 'scroll'
})

// prettier-ignore
export type HeightAwareProps = {
  children: RenderFn<{ height: number }>
}
const DEFAULT_HEIGHT_AWARE_TAG_NAME: ElementType = 'div'

/**
 * The height aware component will render a wrapper element which will have its
 * dimensions tracked. The height is passed as an argument of the render
 * function, and can be used to create scrollable elements.
 *
 * The wrapper component should be styled properly to take the desired height.
 */
export const HeightAware = forwardRefWithAs(
  function HeightAware<T extends ElementType = 'div'>(
    {
      as,
      children,
      ...props
    }: PropsAs<T, HeightAwareProps>,
    ref: MutableRefObject<HTMLElement>
  ) {
    const TagName = as || DEFAULT_HEIGHT_AWARE_TAG_NAME

    const [setMeasuredRef, { height }] = useMeasure({ equalityFn })
    const syncedRef = useSyncRefs(ref, setMeasuredRef)

    // @ts-ignore
    return <TagName {...props} ref={syncedRef}>{children({ height })}</TagName>
  }
)
