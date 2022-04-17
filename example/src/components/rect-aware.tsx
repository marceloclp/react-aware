import React, { FC, Fragment } from 'react'
import { RectAware } from '@marceloclp/react-aware'

export const Example: FC = () => (
  <RectAware as='div' style={{ height: '100%', width: '100%' }}>
    {({ width, height }) => (
      <span>
        Width: {width}, height: {height}
      </span>
    )}
  </RectAware>
)

export const FragmentExample: FC = () => (
  <RectAware as={Fragment}>
    {({ width, height }, setRef) => (
      <div ref={setRef}>
        Width: {width}, height: {height}
      </div>
    )}
  </RectAware>
)