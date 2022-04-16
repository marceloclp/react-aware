import React, { Fragment } from 'react'

import { SelfAware } from '@marceloclp/react-aware'
import '@marceloclp/react-aware/dist/index.css'

const App = () => {
  return <SelfAware as={Fragment}>{(ref, elem) => <div ref={ref as any}>{elem?.ATTRIBUTE_NODE}adada</div>}</SelfAware>
}

export default App
