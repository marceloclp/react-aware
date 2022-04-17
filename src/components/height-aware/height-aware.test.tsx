import '../../__mocks__/mock-resize-observer'
import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { HeightAware } from './height-aware'

describe('HeightAware', () => {
  it('should be defined', () => {
    expect(HeightAware).toBeDefined()
  })
  it('should have the correct display name', () => {
    expect(HeightAware.displayName).toBe('HeightAware')
  })

  describe('when rendering as a valid react element', () => {
    let result: RenderResult
    beforeEach(() => {
      result = render(
        <HeightAware as="div" data-testid="wrapper">
          {(height) => <span>{height}</span>}
        </HeightAware>
      )
    })
    it('should use the value of `as` as the tag name', () => {
      expect(result.getByTestId('wrapper').tagName).toBe('DIV')
    })
  })

  describe('when rendering as a react fragment', () => {
    let result: RenderResult
    beforeEach(() => {
      result = render(
        <HeightAware as={React.Fragment} data-testid="wrapper">
          {(height, setRef) => (
            <span ref={setRef}>Height: {height}</span>
          )}
        </HeightAware>
      )
    })
    it('should return a valid react element', () => {
      expect(result.getByTestId('wrapper').tagName).toBe('SPAN')
    })
  })
})
