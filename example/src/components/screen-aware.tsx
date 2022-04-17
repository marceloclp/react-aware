import React, { FC, Fragment, useRef } from 'react'
import { Breakpoint, ScreenAware } from '@marceloclp/react-aware'

const breakpoints: Breakpoint[] = [
  { name: 'mobile', min: 0 },
  { name: 'tablet', min: 500 },
  { name: 'desktop', min: 1000 },
]

export const Example: FC = () => (
  <ScreenAware as="div" breakpoints={breakpoints}>
    {({ breakpoint: { name }}) => ({
      mobile: () => <div>Mobile screen</div>,
      tablet: () => <div>Tablet screen</div>,
      desktop: () => <div>Desktop screen</div>,
    }[name])()}
  </ScreenAware>
)

/**
 * Note that `ScreenAware` does not wrap its content around a container, and you
 * must passthrough the `setRef` if you with to have access to the a ref object.
 * 
 * Note that the ref object you will have access must also be passed down by a
 * parent component as the `ref` prop of `ScreenAware`.
 */
export const ExampleFragment: FC = () => {
  const ref = useRef(null)
  return (
    <ScreenAware as={Fragment} breakpoints={breakpoints} ref={ref}>
      {({ breakpoint: { name }}, setRef) => ({
        mobile: () => <div ref={setRef}>Mobile screen</div>,
        tablet: () => <div ref={setRef}>Tablet screen</div>,
        desktop: () => <div ref={setRef}>Desktop screen</div>,
      }[name])()}
    </ScreenAware>
  )
}