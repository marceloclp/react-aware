import React, { FC, Fragment, PropsWithChildren } from 'react'
import { getScrollableStyle, HeightAware } from '@marceloclp/react-aware'

export const Example: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <HeightAware as='div' style={{ height: '100%', display: 'flex' }}>
      {(height) => <div style={getScrollableStyle(height)}>{children}</div>}
    </HeightAware>
  </div>
)

export const FragmentExample: FC = () => (
  <HeightAware as={Fragment}>
    {(height, setRef) => (
      <div ref={setRef}>The height of this component is {height}px</div>
    )}
  </HeightAware>
)