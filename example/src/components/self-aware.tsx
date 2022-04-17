import React, { FC, Fragment } from 'react'
import { SelfAware } from '@marceloclp/react-aware'

export const Example: FC = () => (
  <SelfAware as={Fragment}>
    {(_, ref, setRef) => (
      <button onClick={() => {
        setTimeout(() => {
          console.log(`Text height is ${ref.current?.clientHeight}`)
        }, 1000)
      }}>
        <span ref={setRef}>Click me!</span>
      </button>
    )}
  </SelfAware>
)
