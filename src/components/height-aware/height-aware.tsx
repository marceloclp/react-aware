import React, { ElementType, MutableRefObject } from 'react'
import useMeasure, { UseMeasureOptions } from '../../hooks/use-measure'
import useSyncRefs from '../../hooks/use-sync-ref'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import { PropsAs, RenderFn } from '../../types/utilities'

const equalityFn: UseMeasureOptions['equalityFn'] = (prev, next) =>
  prev.height === next.height

export type HeightAwareProps = {
  children: RenderFn<{ height: number }>
}

type HeightAwareFC = <T extends ElementType = 'div'>(
  props: PropsAs<T, HeightAwareProps>
) => JSX.Element

const DEFAULT_HEIGHT_AWARE_TAG_NAME: ElementType = 'div'

// prettier-ignore
/**
 * The height aware component will render a wrapper element which will have its
 * dimensions tracked. The height is passed as an argument of the render
 * function, and can be used to create scrollable elements.
 *
 * The wrapper component should be styled properly to take the desired height.
 */
export const HeightAware: HeightAwareFC = forwardRefWithAs(
  function HeightAware<T extends ElementType = 'div'>({
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
