import { CSSProperties } from 'react'

/**
 * Helper utility that returns a `CSSProperties` object where `height` and
 * `max-height` are both set to the specified value.
 *
 * Mostly useful when you need to create a component with a fixed height.
 */
export const getEnforcedHeightStyle = (height: number): CSSProperties => ({
  height: `${height}px`,
  maxHeight: `${height}px`,
})

/**
 * Helper utility that returns a `CSSProperties` object with the `height`,
 * `max-height` and `overflow` properties set to allow scrolling within the
 * styled container.
 * 
 * @example
 * ```tsx
 *  <HeightAware style={{ flexGrow: 1 }}>
 *    {({ height }) => <div style={getScrollableStyle(height)} />}
 *  </HeightAware>
 * ```
 */
export const getScrollableStyle = (height: number): CSSProperties => ({
  ...getEnforcedHeightStyle(height),
  overflow: 'scroll',
})
