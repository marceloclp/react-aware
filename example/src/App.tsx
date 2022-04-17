import React, { Fragment } from 'react'

import { SelfAware } from '@marceloclp/react-aware'

const App = () => {
  return (
    <SelfAware as={Fragment}>
      {(elem, ref) => (
        <span ref={ref as any}>asdasda</span>
      )}
    </SelfAware>
  )
}

export default App
